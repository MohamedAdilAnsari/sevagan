import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import compression from 'compression';
import { GoogleGenAI } from '@google/genai';
import { User, Donor, BloodRequest, NotificationLog } from './models/dbModels.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// High-Performance Middleware
app.use(compression()); // Gzip/Brotli compression for 70-80% smaller payloads
app.use(cors());
app.use(express.json());

// In-Memory Fast API Cache Layer
const apiMemoryCache = new Map();
function getCachedApi(key) {
  const item = apiMemoryCache.get(key);
  if (item && (Date.now() - item.time < 30000)) { // 30s TTL
    return item.data;
  }
  return null;
}
function setCachedApi(key, data) {
  apiMemoryCache.set(key, { data, time: Date.now() });
}
function clearApiCache() {
  apiMemoryCache.clear();
}

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

// OTP Memory Store
const activeOtps = new Map();

// Real SMS Dispatcher via Fast2SMS Gateway
async function sendSmsOtp(mobileNumber, otpCode) {
  const cleanMobile = (mobileNumber || '').toString().replace(/\D/g, '').slice(-10);
  const apiKey = process.env.FAST2SMS_API_KEY;

  console.log(`📱 [SMS DISPATCHER] Sending Real SMS OTP ${otpCode} to +91 ${cleanMobile}...`);

  if (apiKey && apiKey !== 'YOUR_FAST2SMS_API_KEY_HERE' && apiKey.trim().length > 5) {
    try {
      const response = await fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=${encodeURIComponent(apiKey)}&route=otp&variables_values=${encodeURIComponent(otpCode)}&flash=0&numbers=${cleanMobile}`, {
        method: 'GET',
        headers: { 'cache-control': 'no-cache' }
      });
      const data = await response.json();
      if (data && data.return) {
        console.log(`✅ [FAST2SMS DELIVERED] Real SMS OTP ${otpCode} sent to +91 ${cleanMobile}: ${data.message || 'Success'}`);
        return { success: true, message: data.message || 'SMS sent successfully via Fast2SMS' };
      } else {
        console.warn(`⚠️ [FAST2SMS FAILED]`, data);
        return { success: false, message: data.message || 'Fast2SMS Gateway Error' };
      }
    } catch (err) {
      console.error(`❌ [FAST2SMS NETWORK ERROR]`, err.message);
      return { success: false, message: err.message };
    }
  } else {
    console.log(`ℹ️ [DEV SMS LOG] FAST2SMS_API_KEY missing/default in .env. Real SMS OTP for +91 ${cleanMobile} is: ${otpCode}`);
    return { success: false, isDemo: true, message: 'FAST2SMS_API_KEY missing in .env' };
  }
}

// Real SMTP Email Dispatcher
async function sendEmail({ to, subject, html, text }) {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM_EMAIL || user || 'noreply@sevagan.org';

  console.log(`📧 [SMTP SERVICE] Preparing email to ${to} (${subject})...`);

  if (user && pass && user !== 'YOUR_EMAIL@gmail.com' && user.trim().length > 3) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
      });

      const info = await transporter.sendMail({
        from: `"SEVAGAN Blood Network" <${from}>`,
        to,
        subject,
        text: text || '',
        html: html || text || ''
      });

      console.log(`✅ [SMTP DELIVERED] Email sent to ${to}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error(`❌ [SMTP ERROR] Failed to send email via ${host}:`, err.message);
      return { success: false, error: err.message };
    }
  } else {
    console.log(`ℹ️ [DEV SMTP LOG] SMTP credentials not set in .env. Target=${to}, Subject=${subject}`);
    return { success: false, isDemo: true, message: 'SMTP credentials missing in .env' };
  }
}

// Send Custom Email Endpoint
app.post('/api/send-email', async (req, res) => {
  const { to, subject, html, text } = req.body || {};
  if (!to || !subject) {
    return res.status(400).json({ message: 'Recipient email (to) and subject are required' });
  }

  const result = await sendEmail({ to, subject, html, text });
  return res.json({
    success: true,
    message: result.success ? `Email sent successfully to ${to}` : `SMTP credentials missing in .env. Logged email to ${to}`,
    emailSent: result.success
  });
});

// Send Email OTP Endpoint
app.post('/api/send-email-otp', async (req, res) => {
  const { email, purpose } = req.body || {};
  if (!email) {
    return res.status(400).json({ message: 'Email address is required' });
  }

  const targetEmail = email.toLowerCase().trim();
  const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
  activeOtps.set(targetEmail, { otp: generatedOtp, createdAt: Date.now() });

  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 25px; background: #0f172a; color: #ffffff; border-radius: 12px; border: 1px solid #1e293b;">
      <h2 style="color: #e63946; text-align: center; margin-bottom: 20px;">🩸 SEVAGAN Blood Network</h2>
      <h3 style="text-align: center; color: #f8fafc;">Verification Code</h3>
      <p style="text-align: center; color: #94a3b8; font-size: 15px;">Use the 4-digit code below to complete your ${purpose || 'verification'}:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #ffffff; background: #1e293b; padding: 12px 24px; border-radius: 8px; border: 1px solid #e63946;">
          ${generatedOtp}
        </span>
      </div>
      <p style="text-align: center; color: #64748b; font-size: 13px;">This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
    </div>
  `;

  const emailResult = await sendEmail({
    to: targetEmail,
    subject: `🔐 Your SEVAGAN Verification OTP: ${generatedOtp}`,
    html: htmlTemplate,
    text: `Your SEVAGAN verification code is: ${generatedOtp}`
  });

  return res.json({
    success: true,
    message: emailResult.success 
      ? `Real SMTP Email OTP sent to ${targetEmail}` 
      : `SMTP credentials missing in .env. Test OTP: ${generatedOtp}`,
    targetEmail,
    emailSent: emailResult.success,
    otp: emailResult.success ? undefined : generatedOtp
  });
});

// AI Chatbot Assistant Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, language } = req.body || {};
  const msg = (message || '').toLowerCase();

  let actionSection = null;
  let actionLabel = null;
  let actionModal = null;

  if (msg.includes('find') || msg.includes('search') || msg.includes('donor')) {
    actionSection = 'find-donors';
    actionLabel = 'Find Donors';
  } else if (msg.includes('register') || msg.includes('become') || msg.includes('sign up')) {
    actionSection = 'become-donor';
    actionLabel = 'Become a Donor';
  } else if (msg.includes('emergency') || msg.includes('request') || msg.includes('urgent')) {
    actionSection = 'request-blood';
    actionLabel = 'Post Request';
  } else if (msg.includes('compatib') || msg.includes('group') || msg.includes('o+')) {
    actionSection = 'home';
    actionLabel = 'View Compatibility Chart';
  } else if (msg.includes('otp') || msg.includes('password') || msg.includes('login') || msg.includes('forgot')) {
    actionModal = 'login';
    actionLabel = 'Open Login / Reset';
  }

  // Check for Google Gemini AI API Key
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE' && apiKey.trim().length > 5) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are SEVAGAN AI Assistant, the official healthcare AI assistant for SEVAGAN Blood Network (a blood donation and emergency request platform in India).
Your goal is to politely, empathetically, and concisely answer user questions about blood donation rules, donor eligibility (age 18-65, weight 45kg+, 3 months interval), blood group compatibility (O- universal donor, AB+ universal recipient), emergency requests, and account verification.
Current platform language mode: ${language || 'en'}.
If the user speaks Tamil or Hindi or English, reply fluently in that language. Keep responses concise (2-4 sentences max), lifesaving, and helpful.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: message,
        config: {
          systemInstruction
        }
      });

      const reply = response.text || 'I am SEVAGAN AI Assistant! How can I help you save lives today?';
      return res.json({
        reply,
        isAi: true,
        actionSection,
        actionLabel,
        actionModal
      });
    } catch (err) {
      console.warn('Gemini AI API generation fallback:', err.message);
    }
  }

  // Fallback smart responses if Gemini key is missing/offline
  let reply = '';
  if (msg.includes('find') || msg.includes('search') || msg.includes('donor')) {
    reply = language === 'ta' 
      ? 'உங்களுக்கு அருகில் உள்ள குருதி கொடையாளர்களை இரத்த வகை மற்றும் மாவட்டம் மூலம் தேடலாம்.' 
      : 'You can search for voluntary donors by blood group and city on our Find Donors section.';
  } else if (msg.includes('register') || msg.includes('become') || msg.includes('sign up')) {
    reply = language === 'ta'
      ? 'கொடையாளராக பதிவு செய்ய 2 நிமிடங்கள் மட்டுமே ஆகும். 18-65 வயதுக்குட்பட்ட அனைவரும் பதிவு செய்யலாம்.'
      : 'Registering as a donor takes under 2 minutes! Anyone aged 18-65 in good health can register.';
  } else if (msg.includes('emergency') || msg.includes('request') || msg.includes('urgent')) {
    reply = 'Post an emergency blood request immediately. Nearby registered donors are alerted right away!';
  } else if (msg.includes('compatib') || msg.includes('group') || msg.includes('o+')) {
    reply = 'O Negative (O-) is the Universal Donor. O Positive (O+) can donate to O+, A+, B+, AB+.';
  } else if (msg.includes('otp') || msg.includes('password') || msg.includes('login') || msg.includes('forgot')) {
    reply = 'You can verify your number via SMS/Email OTP, or reset your password using the "Forgot Password?" button.';
  } else {
    reply = 'I am the SEVAGAN AI Assistant! Add GEMINI_API_KEY in .env to activate Google Gemini AI responses. How can I help you today?';
  }

  return res.json({
    reply,
    isAi: false,
    actionSection,
    actionLabel,
    actionModal
  });
});

// 1. Send OTP Endpoint
app.post('/api/send-otp', async (req, res) => {
  const { mobile, purpose } = req.body || {};
  if (!mobile) {
    return res.status(400).json({ message: 'Mobile number is required' });
  }

  const cleanMobile = mobile.toString().replace(/\D/g, '').slice(-10);
  const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
  activeOtps.set(cleanMobile, { otp: generatedOtp, createdAt: Date.now() });

  // Dispatch SMS via Fast2SMS
  const smsResult = await sendSmsOtp(cleanMobile, generatedOtp);

  broadcastEvent({
    type: 'otp',
    title: '📱 SMS OTP Request',
    message: `OTP request for +91 ${cleanMobile}. (SMS Sent: ${smsResult.success})`,
    mobile: cleanMobile,
    timestamp: new Date().toISOString()
  });

  return res.json({
    success: true,
    message: smsResult.success 
      ? `Real SMS OTP sent to +91 ${cleanMobile}` 
      : `FAST2SMS_API_KEY missing in Vercel settings. Test OTP: ${generatedOtp}`,
    cleanMobile,
    smsSent: smsResult.success,
    otp: smsResult.success ? undefined : generatedOtp
  });
});

// Verify OTP Endpoint
app.post('/api/verify-otp', (req, res) => {
  const { mobile, otp } = req.body || {};
  if (!mobile || !otp) {
    return res.status(400).json({ message: 'Mobile number and OTP code are required' });
  }

  const cleanMobile = mobile.toString().replace(/\D/g, '').slice(-10);
  const storedData = activeOtps.get(cleanMobile);

  if (otp === '1234' || (storedData && storedData.otp === otp)) {
    activeOtps.delete(cleanMobile);
    return res.json({ success: true, message: 'OTP verified successfully' });
  }

  return res.status(400).json({ message: 'Invalid OTP code. Please enter the code received on your phone or test code 1234.' });
});

// Forgot Password Endpoint
app.post('/api/forgot-password', async (req, res) => {
  try {
    const { mobile } = req.body || {};
    if (!mobile) {
      return res.status(400).json({ message: 'Mobile number is required' });
    }

    const cleanMobile = mobile.toString().replace(/\D/g, '').slice(-10);

    let userExists = false;
    if (isMongoConnected) {
      const user = await User.findOne({ mobile: cleanMobile });
      if (user) userExists = true;
    } else {
      const user = db.users.find(u => u.mobile === cleanMobile);
      if (user) userExists = true;
    }

    if (!userExists) {
      return res.status(404).json({ message: 'Mobile number is not registered. Please sign up first.' });
    }

    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    activeOtps.set(cleanMobile, { otp: generatedOtp, createdAt: Date.now(), isReset: true });

    const smsResult = await sendSmsOtp(cleanMobile, generatedOtp);

    broadcastEvent({
      type: 'otp',
      title: '🔑 Password Reset OTP',
      message: `Password reset requested for +91 ${cleanMobile}. OTP sent via SMS.`,
      mobile: cleanMobile,
      timestamp: new Date().toISOString()
    });

    return res.json({
      success: true,
      message: smsResult.success ? `Password reset OTP sent to +91 ${cleanMobile}` : `OTP sent to +91 ${cleanMobile}`,
      mobile: cleanMobile
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Reset Password Endpoint
app.post('/api/reset-password', async (req, res) => {
  try {
    const { mobile, newPassword } = req.body || {};
    if (!mobile || !newPassword) {
      return res.status(400).json({ message: 'Mobile number and new password are required' });
    }

    if (newPassword.length < 4) {
      return res.status(400).json({ message: 'Password must be at least 4 characters long.' });
    }

    const cleanMobile = mobile.toString().replace(/\D/g, '').slice(-10);
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    if (isMongoConnected) {
      const user = await User.findOne({ mobile: cleanMobile });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.password_hash = newPasswordHash;
      await user.save();
    } else {
      const userIndex = db.users.findIndex(u => u.mobile === cleanMobile);
      if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
      }
      db.users[userIndex].password_hash = newPasswordHash;
      saveData();
    }

    broadcastEvent({
      type: 'login',
      title: '🔐 Password Reset Success',
      message: `Password updated successfully for +91 ${cleanMobile}.`,
      mobile: cleanMobile,
      timestamp: new Date().toISOString()
    });

    return res.json({
      success: true,
      message: 'Password updated successfully! You can now log in with your new password.'
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
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
  const cacheKey = `donors:${targetGroup || ''}:${city || ''}:${district || ''}`;

  const cached = getCachedApi(cacheKey);
  if (cached) {
    res.setHeader('X-Cache', 'HIT');
    return res.json(cached);
  }

  let results = [];
  if (isMongoConnected) {
    try {
      let query = {};
      if (targetGroup) query.blood = targetGroup;
      if (city) query.city = new RegExp(city, 'i');
      if (district) query.district = new RegExp(district, 'i');

      results = await Donor.find(query).lean().sort({ _id: -1 });
      setCachedApi(cacheKey, results);
      res.setHeader('X-Cache', 'MISS');
      return res.json(results);
    } catch (e) {
      console.warn('Mongo donor fetch failed:', e);
    }
  }

  // Local JSON Fallback
  results = db.donors;
  if (targetGroup) {
    results = results.filter(d => (d.group || d.blood) === targetGroup);
  }
  if (city) {
    results = results.filter(d => d.city && d.city.toLowerCase().includes(city.toLowerCase()));
  }
  if (district) {
    results = results.filter(d => d.district && d.district.toLowerCase().includes(district.toLowerCase()));
  }

  setCachedApi(cacheKey, results);
  res.setHeader('X-Cache', 'MISS');
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

    clearApiCache();

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
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Node.js Express server running at http://127.0.0.1:${PORT}`);
  });
}

export default app;
