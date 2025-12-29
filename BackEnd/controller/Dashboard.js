const Lead = require('../models/Lead');
const Activity = require('../models/Activity');
const File = require('../models/File');
const Target = require('../models/Target');
const Budget = require('../models/Budget');
const Admin = require('../models/Admin');

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createLead = async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 }).limit(20);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createActivity = async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFile = async (req, res) => {
  try {
    const newFile = new File(req.body);
    const savedFile = await newFile.save();
    res.status(201).json(savedFile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Targets
exports.getTargets = async (req, res) => {
  try {
    const targets = await Target.find().sort({ deadline: 1 });
    res.json(targets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTarget = async (req, res) => {
  try {
    const target = new Target(req.body);
    await target.save();
    res.status(201).json(target);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Budgets
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find().sort({ category: 1 });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBudget = async (req, res) => {
  try {
    const budget = new Budget(req.body);
    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Users (Admins)
exports.getUsers = async (req, res) => {
  try {
    const users = await Admin.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
