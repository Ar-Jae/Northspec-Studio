const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_DRIVE_CLIENT_ID,
  process.env.GOOGLE_DRIVE_CLIENT_SECRET,
  process.env.GOOGLE_DRIVE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
});

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

/**
 * List files in a specific folder or root
 */
exports.listFiles = async (folderId = null) => {
  try {
    const query = folderId 
      ? `'${folderId}' in parents and trashed = false`
      : "trashed = false";
      
    const response = await drive.files.list({
      q: query,
      fields: 'nextPageToken, files(id, name, mimeType, size, modifiedTime, iconLink, webViewLink)',
      spaces: 'drive',
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });
    return response.data.files;
  } catch (error) {
    console.error('Error listing files from Google Drive:', error);
    throw error;
  }
};

/**
 * List Shared Drives
 */
exports.listSharedDrives = async () => {
  try {
    const response = await drive.drives.list({
      fields: 'nextPageToken, drives(id, name)',
    });
    return response.data.drives;
  } catch (error) {
    console.error('Error listing shared drives:', error);
    throw error;
  }
};

/**
 * Create a Shared Drive
 */
exports.createSharedDrive = async (name) => {
  try {
    const requestId = Math.random().toString(36).substring(7);
    const response = await drive.drives.create({
      requestId: requestId,
      resource: { name: name },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating shared drive:', error);
    throw error;
  }
};

/**
 * Upload a file to Google Drive
 */
exports.uploadFile = async (fileObject, folderId = null) => {
  try {
    const fileMetadata = {
      name: fileObject.originalname,
      parents: folderId ? [folderId] : [],
    };
    const media = {
      mimeType: fileObject.mimetype,
      body: fs.createReadStream(fileObject.path),
    };
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, name, webViewLink',
      supportsAllDrives: true,
    });
    
    // Clean up local file
    fs.unlinkSync(fileObject.path);
    
    return response.data;
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    throw error;
  }
};

/**
 * Delete a file from Google Drive
 */
exports.deleteFile = async (fileId) => {
  try {
    await drive.files.delete({
      fileId: fileId,
      supportsAllDrives: true,
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting file from Google Drive:', error);
    throw error;
  }
};
