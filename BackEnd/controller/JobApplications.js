const JobApplication = require("../models/JobApplication");

exports.createApplication = async (req, res) => {
    try {
        const application = new JobApplication(req.body);
        await application.save();
        res.status(201).json({ success: true, data: application });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getApplications = async (req, res) => {
    try {
        const applications = await JobApplication.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
