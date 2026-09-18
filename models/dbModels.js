import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// Donor Schema
const donorSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  group: { type: String, required: true },
  blood: { type: String, required: true },
  city: { type: String, default: 'Chennai' },
  district: { type: String, default: 'Chennai' },
  state: { type: String, default: 'Tamil Nadu' },
  country: { type: String, default: 'India' },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Blood Request Schema
const bloodRequestSchema = new mongoose.Schema({
  patient: { type: String, required: true },
  mobile: { type: String, required: true },
  blood: { type: String, required: true },
  units: { type: Number, default: 1 },
  hospital: { type: String, required: true },
  city: { type: String, default: '' },
  district: { type: String, default: '' },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

// Notification Log Schema
const notificationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  user: { type: Object },
  timestamp: { type: String, default: () => new Date().toISOString() }
});

export const User = mongoose.model('User', userSchema);
export const Donor = mongoose.model('Donor', donorSchema);
export const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);
export const NotificationLog = mongoose.model('NotificationLog', notificationSchema);
