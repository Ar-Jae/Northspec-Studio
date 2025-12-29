require('dotenv').config();
const googleDriveService = require('./services/googleDriveService');

async function testGoogleDrive() {
  console.log('--- Google Drive Integration Test ---');
  
  // Check if env variables are set
  const requiredEnv = [
    'GOOGLE_DRIVE_CLIENT_ID',
    'GOOGLE_DRIVE_CLIENT_SECRET',
    'GOOGLE_DRIVE_REDIRECT_URI',
    'GOOGLE_DRIVE_REFRESH_TOKEN'
  ];
  
  const missing = requiredEnv.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing environment variables:', missing.join(', '));
    console.log('Please update your .env file with the required credentials.');
    return;
  }

  console.log('✅ Environment variables found.');
  console.log('Attempting to list files...');

  try {
    const files = await googleDriveService.listFiles();
    console.log(`✅ Success! Found ${files.length} files in Google Drive.`);
    if (files.length > 0) {
      console.log('First 3 files:');
      files.slice(0, 3).forEach(f => console.log(` - ${f.name} (${f.id})`));
    }

    console.log('\nAttempting to list Shared Drives...');
    const drives = await googleDriveService.listSharedDrives();
    console.log(`✅ Success! Found ${drives ? drives.length : 0} shared drives.`);
    if (drives && drives.length > 0) {
      drives.forEach(d => console.log(` - ${d.name} (${d.id})`));
    }
  } catch (error) {
    console.error('❌ Test failed!');
    console.error('Error details:', error.message);
    if (error.message.includes('invalid_grant')) {
      console.log('Hint: Your refresh token might be invalid or expired.');
    } else if (error.message.includes('invalid_client')) {
      console.log('Hint: Your Client ID or Client Secret might be incorrect.');
    }
  }
}

testGoogleDrive();
