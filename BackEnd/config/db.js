const mongoose = require('mongoose');

const dbURI = process.env.ATLAS_URL

const connectDB = async () => {
    try {
        if (!dbURI) {
            throw new Error('ATLAS_URL variable is not set.');
        }

        mongoose.set("strictQuery", true);
        
        await mongoose.connect(dbURI);
        console.log(`Northspec Studio DB_Connected`);

    } catch (error) {
        console.log('Error connecting to Northspec Studio:', error.message);
        process.exit(1);
    }
}

module.exports = { connectDB, mongoose }

