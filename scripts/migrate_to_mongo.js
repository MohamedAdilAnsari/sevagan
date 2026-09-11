import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { User, Donor, BloodRequest, NotificationLog } from '../models/dbModels.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '..', 'data_store.json');

async function migrate() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI is missing in .env file!');
    process.exit(1);
  }

  console.log('⏳ Connecting to MongoDB Atlas...');
  await mongoose.connect(uri);
  console.log('✅ Connected!');

  if (!fs.existsSync(DATA_FILE)) {
    console.error('❌ data_store.json not found!');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

  if (data.users && data.users.length > 0) {
    console.log(`📤 Migrating ${data.users.length} users...`);
    for (const u of data.users) {
      await User.updateOne(
        { mobile: u.mobile },
        { $setOnInsert: { name: u.name, mobile: u.mobile, password_hash: u.password_hash, role: u.role || 'user' } },
        { upsert: true }
      );
    }
  }

  if (data.donors && data.donors.length > 0) {
    console.log(`📤 Migrating ${data.donors.length} donors...`);
    for (const d of data.donors) {
      await Donor.updateOne(
        { mobile: d.mobile },
        { $setOnInsert: { name: d.name, mobile: d.mobile, group: d.group || d.blood, blood: d.blood || d.group, city: d.city, district: d.district, available: d.available } },
        { upsert: true }
      );
    }
  }

  if (data.requests && data.requests.length > 0) {
    console.log(`📤 Migrating ${data.requests.length} blood requests...`);
    for (const r of data.requests) {
      await BloodRequest.create({
        patient: r.patient,
        mobile: r.mobile,
        blood: r.blood,
        units: r.units || 1,
        hospital: r.hospital,
        city: r.city,
        district: r.district
      });
    }
  }

  console.log('🎉 Data migration to MongoDB Atlas completed successfully!');
  await mongoose.disconnect();
  process.exit(0);
}

migrate().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
