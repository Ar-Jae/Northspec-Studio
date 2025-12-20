const Campaign = require('../models/Campaign');
const EmailLog = require('../models/EmailLog');
const emailService = require('./emailService');

class CampaignScheduler {
  constructor() {
    this.isRunning = false;
    this.intervalId = null;
    this.checkIntervalMs = 60000; // Check every minute
  }

  /**
   * Start the scheduler
   */
  start() {
    if (this.isRunning) {
      console.log('Campaign scheduler is already running');
      return;
    }

    console.log('Starting campaign scheduler...');
    this.isRunning = true;
    
    // Run immediately on start
    this.processScheduledEmails();
    
    // Then run at intervals
    this.intervalId = setInterval(() => {
      this.processScheduledEmails();
    }, this.checkIntervalMs);
  }

  /**
   * Stop the scheduler
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('Campaign scheduler stopped');
  }

  /**
   * Check if current time is within sending window
   */
  isWithinSendingWindow(settings) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const [startHour, startMinute] = settings.sendTimeStart.split(':').map(Number);
    const [endHour, endMinute] = settings.sendTimeEnd.split(':').map(Number);
    
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    // Check if it's a weekend and if we should skip
    const dayOfWeek = now.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    if (isWeekend && !settings.sendOnWeekends) {
      return false;
    }

    return currentTime >= startTime && currentTime <= endTime;
  }

  /**
   * Calculate next email date based on sequence day offset
   */
  calculateNextEmailDate(firstEmailDate, dayOffset) {
    const nextDate = new Date(firstEmailDate);
    nextDate.setDate(nextDate.getDate() + dayOffset);
    return nextDate;
  }

  /**
   * Process all scheduled emails
   */
  async processScheduledEmails() {
    try {
      // Get all active campaigns
      const activeCampaigns = await Campaign.find({ status: 'active' });

      for (const campaign of activeCampaigns) {
        await this.processCampaign(campaign);
      }
    } catch (error) {
      console.error('Error processing scheduled emails:', error);
    }
  }

  /**
   * Process a single campaign
   */
  async processCampaign(campaign) {
    // Check if within sending window
    if (!this.isWithinSendingWindow(campaign.settings)) {
      return;
    }

    const now = new Date();
    let emailsSentToday = 0;
    const baseUrl = process.env.BASE_URL || 'http://localhost:4000';

    // Count emails already sent today for this campaign
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const sentToday = await EmailLog.countDocuments({
      campaignId: campaign._id,
      sentAt: { $gte: todayStart }
    });
    
    emailsSentToday = sentToday;

    // Process each recipient
    for (const recipient of campaign.recipients) {
      // Check daily limit
      if (emailsSentToday >= campaign.settings.dailySendLimit) {
        console.log(`Daily limit reached for campaign: ${campaign.name}`);
        break;
      }

      // Skip if not in active status
      if (!['pending', 'active'].includes(recipient.status)) {
        continue;
      }

      // Determine which email to send
      let sequenceToSend = null;
      let sequenceIndex = recipient.currentSequenceIndex;

      if (!recipient.firstEmailedAt) {
        // Send first email
        sequenceToSend = campaign.sequences.find(s => s.order === 0);
        sequenceIndex = 0;
      } else {
        // Check if next email is due
        const currentSequence = campaign.sequences[sequenceIndex];
        const nextSequence = campaign.sequences[sequenceIndex + 1];

        if (nextSequence) {
          const nextEmailDate = this.calculateNextEmailDate(
            recipient.firstEmailedAt,
            nextSequence.dayOffset
          );

          if (now >= nextEmailDate) {
            sequenceToSend = nextSequence;
            sequenceIndex = sequenceIndex + 1;
          }
        }
      }

      if (sequenceToSend) {
        await this.sendSequenceEmail(campaign, recipient, sequenceToSend, sequenceIndex, baseUrl);
        emailsSentToday++;
      }
    }

    // Save campaign with updated recipient data
    await campaign.save();
  }

  /**
   * Send a single sequence email to a recipient
   */
  async sendSequenceEmail(campaign, recipient, sequence, sequenceIndex, baseUrl) {
    const trackingId = emailService.generateTrackingId();

    // Replace placeholders in subject and message
    const subject = emailService.replacePlaceholders(sequence.subject, recipient);
    let message = emailService.replacePlaceholders(sequence.message, recipient);
    
    // Convert to HTML and add tracking
    let html = emailService.textToHtml(message);
    html = emailService.addTracking(html, trackingId, baseUrl);

    // Create email log entry
    const emailLog = new EmailLog({
      campaignId: campaign._id,
      recipientEmail: recipient.email,
      recipientName: recipient.name,
      sequenceIndex,
      subject,
      message,
      trackingId,
      status: 'queued'
    });
    await emailLog.save();

    // Send email
    const result = await emailService.sendEmail({
      to: recipient.email,
      from: campaign.senderEmail,
      fromName: campaign.senderName,
      replyTo: campaign.replyToEmail,
      subject,
      text: message,
      html,
      trackingId
    });

    // Update email log
    if (result.success) {
      emailLog.status = 'sent';
      emailLog.sentAt = new Date();
      emailLog.messageId = result.messageId;

      // Update recipient
      if (!recipient.firstEmailedAt) {
        recipient.firstEmailedAt = new Date();
      }
      recipient.lastEmailedAt = new Date();
      recipient.currentSequenceIndex = sequenceIndex;
      recipient.status = 'active';

      // Calculate next email date
      const nextSequence = campaign.sequences[sequenceIndex + 1];
      if (nextSequence) {
        recipient.nextEmailAt = this.calculateNextEmailDate(
          recipient.firstEmailedAt,
          nextSequence.dayOffset
        );
      } else {
        // All emails sent
        recipient.status = 'completed';
      }

      // Update campaign stats
      campaign.stats.totalSent++;
    } else {
      emailLog.status = 'failed';
      emailLog.failedAt = new Date();
      emailLog.errorMessage = result.error;
    }

    await emailLog.save();
  }

  /**
   * Handle email open tracking
   */
  async trackOpen(trackingId, metadata = {}) {
    try {
      const emailLog = await EmailLog.findOne({ trackingId });
      if (!emailLog) return null;

      // Update email log
      if (!emailLog.openedAt) {
        emailLog.openedAt = new Date();
        emailLog.status = 'opened';
      }
      emailLog.metadata.openCount++;
      emailLog.metadata.userAgent = metadata.userAgent;
      emailLog.metadata.ipAddress = metadata.ipAddress;
      await emailLog.save();

      // Update campaign stats
      const campaign = await Campaign.findById(emailLog.campaignId);
      if (campaign) {
        const recipient = campaign.recipients.find(
          r => r.email === emailLog.recipientEmail
        );
        if (recipient) {
          recipient.openCount++;
        }
        campaign.stats.totalOpened++;
        await campaign.save();
      }

      return emailLog;
    } catch (error) {
      console.error('Error tracking open:', error);
      return null;
    }
  }

  /**
   * Handle email click tracking
   */
  async trackClick(trackingId, url, metadata = {}) {
    try {
      const emailLog = await EmailLog.findOne({ trackingId });
      if (!emailLog) return null;

      // Update email log
      if (!emailLog.clickedAt) {
        emailLog.clickedAt = new Date();
        emailLog.status = 'clicked';
      }
      emailLog.metadata.clickCount++;
      emailLog.metadata.userAgent = metadata.userAgent;
      emailLog.metadata.ipAddress = metadata.ipAddress;
      await emailLog.save();

      // Update campaign stats
      const campaign = await Campaign.findById(emailLog.campaignId);
      if (campaign) {
        const recipient = campaign.recipients.find(
          r => r.email === emailLog.recipientEmail
        );
        if (recipient) {
          recipient.clickCount++;
        }
        campaign.stats.totalClicked++;
        await campaign.save();
      }

      return { emailLog, redirectUrl: url };
    } catch (error) {
      console.error('Error tracking click:', error);
      return null;
    }
  }

  /**
   * Handle reply detection (webhook from email provider)
   */
  async handleReply(recipientEmail, campaignId) {
    try {
      const campaign = await Campaign.findById(campaignId);
      if (!campaign) return null;

      const recipient = campaign.recipients.find(r => r.email === recipientEmail);
      if (recipient && campaign.settings.stopOnReply) {
        recipient.status = 'replied';
        recipient.repliedAt = new Date();
        campaign.stats.totalReplied++;
        await campaign.save();
      }

      // Update email log
      await EmailLog.updateMany(
        { campaignId, recipientEmail },
        { $set: { status: 'replied', repliedAt: new Date() } }
      );

      return campaign;
    } catch (error) {
      console.error('Error handling reply:', error);
      return null;
    }
  }
}

module.exports = new CampaignScheduler();
