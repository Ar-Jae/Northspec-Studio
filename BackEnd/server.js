require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const Contact = require('./models/Contact');
const prospectsController = require('./controller/Prospects');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to Database
connectDB();

app.use(cors());
app.use(express.json());

// Mock Data
const leads = [
  {
    id: 1,
    name: "Mr. Johnson",
    property: "Downtown Apartment",
    stage: "Negotiation",
    stageTone: "amber",
    value: 320000,
    createdAt: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(), // 1 month ago
    lastActivity: "Aug 22 - Sent Brochure"
  },
  {
    id: 2,
    name: "Jonathan Weak",
    property: "Lakeside Villa",
    stage: "Contacted",
    stageTone: "green",
    value: 560000,
    createdAt: new Date().toISOString(),
    lastActivity: "Aug 20 - Call"
  },
  {
    id: 3,
    name: "Sarah Connor",
    property: "Suburban House",
    stage: "New",
    stageTone: "sky",
    value: 250000,
    createdAt: new Date().toISOString(),
    lastActivity: "Aug 19 - Added Lead"
  },
  {
    id: 4,
    name: "Michael Smith",
    property: "City Loft",
    stage: "Closed",
    stageTone: "emerald",
    value: 450000,
    createdAt: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
    lastActivity: "Aug 15 - Signed"
  },
  {
    id: 5,
    name: "Emily Davis",
    property: "Beach House",
    stage: "Negotiation",
    stageTone: "amber",
    value: 750000,
    createdAt: new Date().toISOString(),
    lastActivity: "Aug 18 - Meeting"
  },
  {
    id: 6,
    name: "David Wilson",
    property: "Mountain Cabin",
    stage: "New",
    stageTone: "sky",
    value: 180000,
    createdAt: new Date().toISOString(),
    lastActivity: "Today - Inquiry"
  }
];

const news = [
  {
    id: 1,
    title: "Follow up with Mr. Johnson",
    subtitle: "Interested 3BHK Flat at Banani",
    author: "Lisa Wong",
    time: "12:30 pm"
  },
  {
    id: 2,
    title: "New lead added",
    subtitle: "Lisa Wong",
    author: "System",
    time: "12:32 pm"
  },
  {
    id: 3,
    title: "Quarterly Review",
    subtitle: "Meeting with the sales team",
    author: "Management",
    time: "10:00 am"
  },
  {
    id: 4,
    title: "System Maintenance",
    subtitle: "Scheduled for tonight",
    author: "IT Dept",
    time: "09:00 am"
  }
];

// Routes
app.get('/', (req, res) => {
  res.send('Northspec Studio Backend is running');
});

app.get('/api/leads', (req, res) => {
  res.json({ leads });
});

app.get('/api/news', (req, res) => {
  res.json({ items: news });
});

// Prospects Routes
app.post('/api/prospects/scan', prospectsController.scanProspects);

// Contact Routes
app.post('/api/contacts', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
