const { mongoose } = require("../config/db")

const JobApplication = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        role: { type: String, required: true },
        experience: { type: String },
        resumeUrl: { type: String },
        portfolioUrl: { type: String },
        message: { type: String },
        status: { type: String, default: 'New' },
    },
    { timestamps: true }
)

module.exports = mongoose.model("JobApplication", JobApplication)
