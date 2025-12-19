const { mongoose } = require("../config/db")

const Contact = new mongoose.Schema(
    {
        name: { type: String, required: true, max: 50 },
        email: { type: String, required: true },
        phone: { type: String },
        company: { type: String, max: 100 },
        projectType: { type: String },
        projectDescription: { type: String, max: 2000 },
        budget: { type: String },
        budgetApproved: { type: String },
        automationInterest: { type: String },
        timeline: { type: String },
        decisionMaker: { type: String },
        whyUs: { type: String },
        status: { type: String, default: 'New' },
        isRejected: { type: Boolean, default: false }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Contact", Contact)