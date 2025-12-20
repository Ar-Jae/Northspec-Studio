const nodemailer = require('nodemailer');
const crypto = require('crypto');

class EmailService {
  constructor() {
    // Initialize transporter - configure with your email provider
    // For production, use services like SendGrid, Mailgun, AWS SES, etc.
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  /**
   * Generate a unique tracking ID for email opens/clicks
   */
  generateTrackingId() {
    return crypto.randomBytes(16).toString('hex');
  }

  /**
   * Replace placeholders in email content
   * Supports: {name}, {company}, {email}, {website}, {industry}, and custom fields
   */
  replacePlaceholders(template, recipient) {
    let content = template;
    
    // Standard placeholders
    const placeholders = {
      name: recipient.name || '',
      first_name: recipient.name ? recipient.name.split(' ')[0] : '',
      company: recipient.company || '',
      email: recipient.email || '',
      website: recipient.website || '',
      industry: recipient.industry || ''
    };

    // Replace standard placeholders
    Object.entries(placeholders).forEach(([key, value]) => {
      const regex = new RegExp(`\\{${key}\\}`, 'gi');
      content = content.replace(regex, value);
    });

    // Replace custom fields
    if (recipient.customFields) {
      recipient.customFields.forEach((value, key) => {
        const regex = new RegExp(`\\{${key}\\}`, 'gi');
        content = content.replace(regex, value);
      });
    }

    return content;
  }

  /**
   * Add tracking pixel and wrap links for click tracking
   */
  addTracking(html, trackingId, baseUrl) {
    // Add tracking pixel for open tracking
    const trackingPixel = `<img src="${baseUrl}/api/campaigns/track/open/${trackingId}" width="1" height="1" style="display:none" />`;
    
    // Wrap links for click tracking
    const linkRegex = /href="(https?:\/\/[^"]+)"/gi;
    const trackedHtml = html.replace(linkRegex, (match, url) => {
      const encodedUrl = encodeURIComponent(url);
      return `href="${baseUrl}/api/campaigns/track/click/${trackingId}?url=${encodedUrl}"`;
    });

    return trackedHtml + trackingPixel;
  }

  /**
   * Convert plain text to HTML
   */
  textToHtml(text) {
    return text
      .replace(/\n/g, '<br />')
      .replace(/  /g, '&nbsp;&nbsp;');
  }

  /**
   * Send a single email
   */
  async sendEmail({ to, from, fromName, replyTo, subject, text, html, trackingId }) {
    try {
      const mailOptions = {
        from: fromName ? `${fromName} <${from}>` : from,
        to,
        replyTo: replyTo || from,
        subject,
        text,
        html: html || this.textToHtml(text)
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      return {
        success: true,
        messageId: result.messageId,
        trackingId
      };
    } catch (error) {
      console.error('Email send error:', error);
      return {
        success: false,
        error: error.message,
        trackingId
      };
    }
  }

  /**
   * Validate email configuration
   */
  async verifyConnection() {
    try {
      await this.transporter.verify();
      return { success: true, message: 'Email configuration is valid' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

module.exports = new EmailService();
