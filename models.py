import os
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    mobile = db.Column(db.String(15), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default='user') # user, admin
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Donor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    blood_group = db.Column(db.String(5), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    pincode = db.Column(db.String(10), nullable=False)
    is_available = db.Column(db.Boolean, default=True)
    last_donation = db.Column(db.DateTime, nullable=True)

class BloodRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    requester_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    blood_group = db.Column(db.String(5), nullable=False)
    units_required = db.Column(db.Integer, nullable=False)
    hospital_name = db.Column(db.String(200), nullable=False)
    patient_name = db.Column(db.String(100), nullable=False)
    contact_number = db.Column(db.String(15), nullable=False)
    status = db.Column(db.String(20), default='pending') # pending, fulfilled
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
