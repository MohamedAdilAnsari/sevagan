import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { User, Donor, BloodRequest, NotificationLog } from './models/dbModels.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection State Flag
let isMongoConnected = false;

// Connect to MongoDB Atlas if MONGODB_URI is provided
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    isMongoConnected = true;
    console.log('🍃 Connected to MongoDB Atlas cloud database!');
    seedMongoDefaults();
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB Atlas connection skipped/failed, fallback to data_store.json:', err.message);
  });
}

// Default Seed Donors for Mongo
const seedMongoDefaults = async () => {
  try {
    const count = await Donor.countDocuments();
    if (count === 0) {
      const demoDonors = [
        { name: 'Karthik Raja', mobile: '9876543210', group: 'O+', blood: 'O+', city: 'Chennai', district: 'Chennai', available: true },
        { name: 'Ananya Sharma', mobile: '9876543211', group: 'A+', blood: 'A+', city: 'Coimbatore', district: 'Coimbatore', available: true },
        { name: 'Vijay Kumar', mobile: '9876543212', group: 'B+', blood: 'B+', city: 'Madurai', district: 'Madurai', available: true },
        { name: 'Priya Dharshini', mobile: '9876543213', group: 'O-', blood: 'O-', city: 'Trichy', district: 'Tiruchirappalli', available: true },
        { name: 'Suresh Raina', mobile: '9876543214', group: 'AB-', blood: 'AB-', city: 'Salem', district: 'Salem', available: true }
      ];
      await Donor.insertMany(demoDonors);
      console.log('🌱 Seeded default donors in MongoDB Atlas');
    }
  } catch (err) {
    console.error('Failed to seed MongoDB defaults:', err);
  }
};

// In-memory data store with disk JSON backup
const DATA_FILE = path.join(__dirname, 'data_store.json');

const defaultData = {
  users: [
    {
      id: 1,
      name: 'Karthik Raja',
      mobile: '9876543210',
      password_hash: bcrypt.hashSync('Pass123!', 10),
      role: 'user'
    },
    {
      id: 2,
      name: 'Ananya Sharma',
      mobile: '9876543211',
      password_hash: bcrypt.hashSync('Pass123!', 10),
      role: 'user'
    }
  ],
  donors: [
    {
      id: 1,
      user_id: 1,
      name: 'Karthik Raja',
      group: 'O+',
      blood: 'O+',
      city: 'Chennai',
      district: 'Chennai',
      state: 'Tamil Nadu',
      country: 'India',
      mobile: '9876543210',
      available: true
    },
    {
      id: 2,
      user_id: 2,
      name: 'Ananya Sharma',
      group: 'A+',
      blood: 'A+',
      city: 'Coimbatore',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      country: 'India',
      mobile: '9876543211',
      available: true
    },
    {
      id: 3,
      user_id: 3,
      name: 'Vijay Kumar',
      group: 'B+',
      blood: 'B+',
      city: 'Madurai',
      district: 'Madurai',
      state: 'Tamil Nadu',
      country: 'India',
      mobile: '9876543212',
      available: true
    },
    {
      id: 4,
      user_id: 4,
      name: 'Priya Dharshini',
      group: 'O-',
      blood: 'O-',
      city: 'Trichy',
      district: 'Tiruchirappalli',
      state: 'Tamil Nadu',
      country: 'India',
      mobile: '9876543213',
      available: true
    },
    {
      id: 5,
      user_id: 5,
      name: 'Suresh Raina',
      group: 'AB-',
      blood: 'AB-',
      city: 'Salem',
      district: 'Salem',
      state: 'Tamil Nadu',
      country: 'India',
      mobile: '9876543214',
      available: true
    }
  ],
  requests: [],
  notifications: []
};

let db = { ...defaultData };

const loadData = () => {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      db = JSON.parse(data);
      db.notifications = db.notifications || [];
    } catch (err) {
      console.warn('Failed to load JSON data store, using defaults:', err);
    }
  }
};

const saveData = () => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save JSON data store:', err);
  }
};

loadData();

// Live SSE clients array
let sseClients = [];

const broadcastEvent = async (event) => {
  if (isMongoConnected) {
    try {
      const notifDoc = new NotificationLog(event);
      await notifDoc.save();
    } catch (e) {
      console.warn('Failed to save notification to MongoDB:', e);
    }
  }

  db.notifications.unshift(event);
  if (db.notifications.length > 50) db.notifications.pop();
  saveData();

  sseClients.forEach(client => {
    try {
      client.res.write(`data: ${JSON.stringify(event)}\n\n`);
    } catch (e) {
      console.warn('SSE client write error:', e);
    }
  });
};

// Serve static frontend build if present
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'sevagan-express-backend',
    database: isMongoConnected ? 'MongoDB Atlas' : 'JSON Data Store (data_store.json)'
  });
});

// SSE Stream Endpoint
app.get('/api/events/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  sseClients.push(newClient);

  req.on('close', () => {
    sseClients = sseClients.filter(client => client.id !== clientId);
  });
});

// Notifications Endpoint
app.get('/api/notifications', async (req, res) => {
  if (isMongoConnected) {
    try {
      const notifs = await NotificationLog.find().sort({ _id: -1 }).limit(50);
      return res.json(notifs);
    } catch (e) {
      console.warn('Failed to fetch notifications from Mongo:', e);
    }
  }
  res.json(db.notifications || []);
});

// 2. User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, mobile, password, role = 'user' } = req.body || {};

    if (!mobile || !name || !password) {
      return res.status(400).json({ message: 'Name, mobile, and password are required' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    if (isMongoConnected) {
      const existingMongo = await User.findOne({ mobile });
      if (existingMongo) {
        return res.status(400).json({ message: 'Mobile number already registered' });
      }

      const mongoUser = new User({ name, mobile, password_hash, role });
      await mongoUser.save();

      // Broadcast Signup Event
      broadcastEvent({
        type: 'signup',
        title: '🆕 New User Registered',
        message: `${name} (${mobile}) registered a new account on SEVAGAN.`,
        user: { id: mongoUser._id, name, mobile, role },
        timestamp: new Date().toISOString()
      });

      return res.status(201).json({
        message: 'User registered successfully in MongoDB',
        user: { id: mongoUser._id, name: mongoUser.name, mobile: mongoUser.mobile, role: mongoUser.role }
      });
    }

    // Local JSON Fallback
    const existing = db.users.find(u => u.mobile === mobile);
    if (existing) {
      return res.status(400).json({ message: 'Mobile number already registered' });
    }

    const newUser = {
      id: db.users.length + 1,
      name,
      mobile,
      password_hash,
      role
    };

    db.users.push(newUser);

    broadcastEvent({
      type: 'signup',
      title: '🆕 New User Registered',
      message: `${name} (${mobile}) registered a new account on SEVAGAN.`,
      user: { name, mobile, role },
      timestamp: new Date().toISOString()
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, name: newUser.name, mobile: newUser.mobile, role: newUser.role }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// 3. User Login
app.post('/api/login', async (req, res) => {
  try {
    const { mobile, password } = req.body || {};

    if (isMongoConnected) {
      const user = await User.findOne({ mobile });
      if (user && await bcrypt.compare(password, user.password_hash)) {
        const userPayload = { id: user._id, name: user.name, mobile: user.mobile, role: user.role };

        broadcastEvent({
          type: 'login',
          title: '🔑 User Logged In',
          message: `User ${user.name} (${user.mobile}) just logged into SEVAGAN!`,
          user: userPayload,
          timestamp: new Date().toISOString()
        });

        return res.json({
          message: 'Login successful',
          user: userPayload
        });
      }
      return res.status(401).json({ message: 'Invalid mobile number or password' });
    }

    // Local JSON Fallback
    const user = db.users.find(u => u.mobile === mobile);
    if (user && await bcrypt.compare(password, user.password_hash)) {
      const userPayload = { id: user.id, name: user.name, mobile: user.mobile, role: user.role };

      broadcastEvent({
        type: 'login',
        title: '🔑 User Logged In',
        message: `User ${user.name} (${user.mobile}) just logged into SEVAGAN!`,
        user: userPayload,
        timestamp: new Date().toISOString()
      });

      return res.json({
        message: 'Login successful',
        user: userPayload
      });
    }

    return res.status(401).json({ message: 'Invalid mobile number or password' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// 4. Search / Get Donors
app.get('/api/donors', async (req, res) => {
  const { blood_group, blood, city, district } = req.query;
  const targetGroup = blood_group || blood;

  if (isMongoConnected) {
    try {
      let query = {};
      if (targetGroup) query.blood = targetGroup;
      if (city) query.city = new RegExp(city, 'i');
      if (district) query.district = new RegExp(district, 'i');

      const mongoDonors = await Donor.find(query).sort({ _id: -1 });
      return res.json(mongoDonors);
    } catch (e) {
      console.warn('Mongo donor fetch failed:', e);
    }
  }

  // Local JSON Fallback
  let results = db.donors;
  if (targetGroup) {
    results = results.filter(d => (d.group || d.blood) === targetGroup);
  }
  if (city) {
    results = results.filter(d => d.city && d.city.toLowerCase().includes(city.toLowerCase()));
  }
  if (district) {
    results = results.filter(d => d.district && d.district.toLowerCase().includes(district.toLowerCase()));
  }

  res.json(results);
});

// 5. Register Donor
app.post('/api/donors', async (req, res) => {
  try {
    const { name, mobile, group, blood, city, district, available = true } = req.body || {};
    const bloodGroup = group || blood;

    if (!mobile || !name || !bloodGroup) {
      return res.status(400).json({ message: 'Name, mobile, and blood group are required' });
    }

    if (isMongoConnected) {
      const mongoDonor = new Donor({
        name,
        mobile,
        group: bloodGroup,
        blood: bloodGroup,
        city: city || district || 'Chennai',
        district: district || city || 'Chennai',
        available: available !== false
      });
      await mongoDonor.save();

      return res.status(201).json({
        message: 'Donor registered successfully in MongoDB',
        donor: mongoDonor
      });
    }

    // Local JSON Fallback
    const newDonor = {
      id: db.donors.length + 1,
      name,
      mobile,
      group: bloodGroup,
      blood: bloodGroup,
      city: city || district || 'Chennai',
      district: district || city || 'Chennai',
      available: available !== false
    };

    db.donors.unshift(newDonor);
    saveData();

    return res.status(201).json({
      message: 'Donor registered successfully',
      donor: newDonor
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// 6. Get Emergency Requests
app.get('/api/requests', async (req, res) => {
  if (isMongoConnected) {
    try {
      const mongoReqs = await BloodRequest.find().sort({ _id: -1 });
      return res.json(mongoReqs);
    } catch (e) {
      console.warn('Mongo request fetch failed:', e);
    }
  }

  res.json(db.requests);
});

// 7. Create Emergency Request
app.post('/api/requests', async (req, res) => {
  try {
    const { patient, mobile, blood, units = 1, hospital, city, district } = req.body || {};

    if (!patient || !mobile || !blood || !hospital) {
      return res.status(400).json({ message: 'Patient, mobile, blood group, and hospital are required' });
    }

    if (isMongoConnected) {
      const mongoReq = new BloodRequest({
        patient,
        mobile,
        blood,
        units: parseInt(units, 10),
        hospital,
        city: city || district || '',
        district: district || city || ''
      });
      await mongoReq.save();

      return res.status(201).json({
        message: 'Emergency request broadcasted to MongoDB',
        request: mongoReq
      });
    }

    // Local JSON Fallback
    const newReq = {
      id: db.requests.length + 1,
      patient,
      mobile,
      blood,
      units: parseInt(units, 10),
      hospital,
      city: city || district || '',
      district: district || city || '',
      created_at: new Date().toISOString()
    };

    db.requests.unshift(newReq);
    saveData();

    return res.status(201).json({
      message: 'Emergency request broadcasted',
      request: newReq
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Serve frontend for SPA routing if dist exists
if (fs.existsSync(distPath)) {
  app.get('{*splat}', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Node.js Express server running at http://127.0.0.1:${PORT}`);
});
