const googleDriveService = require('../services/googleDriveService');

exports.getDocuments = async (req, res) => {
  try {
    const folderId = req.query.folderId || null;
    const files = await googleDriveService.listFiles(folderId);
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch documents from Google Drive', error: error.message });
  }
};

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const folderId = req.body.folderId || null;
    const result = await googleDriveService.uploadFile(req.file, folderId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload document to Google Drive', error: error.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await googleDriveService.deleteFile(id);
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete document from Google Drive', error: error.message });
  }
};

exports.getSharedDrives = async (req, res) => {
  try {
    const drives = await googleDriveService.listSharedDrives();
    res.json(drives);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch shared drives', error: error.message });
  }
};

exports.createSharedDrive = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Shared drive name is required' });
    }
    const drive = await googleDriveService.createSharedDrive(name);
    res.status(201).json(drive);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create shared drive', error: error.message });
  }
};
