from flask import Flask, jsonify, request, send_from_directory
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from models import db, User, Donor, BloodRequest
from config import Config
import os

dist_folder = 'dist' if os.path.exists('dist') else '.'
app = Flask(__name__, static_folder=dist_folder, static_url_path='')
app.config.from_object(Config)

db.init_app(app)
bcrypt = Bcrypt(app)
CORS(app)

# Initialize database and seed defaults if empty
with app.app_context():
    db.create_all()
    if Donor.query.count() == 0:
        demo_donors = [
            {"name": "Karthik Raja", "mobile": "9876543210", "group": "O+", "city": "Chennai", "district": "Chennai", "state": "Tamil Nadu", "country": "India"},
            {"name": "Ananya Sharma", "mobile": "9876543211", "group": "A+", "city": "Coimbatore", "district": "Coimbatore", "state": "Tamil Nadu", "country": "India"},
            {"name": "Vijay Kumar", "mobile": "9876543212", "group": "B+", "city": "Madurai", "district": "Madurai", "state": "Tamil Nadu", "country": "India"},
            {"name": "Priya Dharshini", "mobile": "9876543213", "group": "O-", "city": "Trichy", "district": "Tiruchirappalli", "state": "Tamil Nadu", "country": "India"},
            {"name": "Suresh Raina", "mobile": "9876543214", "group": "AB-", "city": "Salem", "district": "Salem", "state": "Tamil Nadu", "country": "India"}
        ]
        for demo in demo_donors:
            hashed_pw = bcrypt.generate_password_hash("Pass123!").decode('utf-8')
            u = User(name=demo['name'], mobile=demo['mobile'], password_hash=hashed_pw, role='user')
            db.session.add(u)
            db.session.commit()
            d = Donor(user_id=u.id, blood_group=demo['group'], city=demo['city'], pincode="600001", is_available=True)
            db.session.add(d)
        db.session.commit()

@app.route('/')
def index():
    if os.path.exists('dist/index.html'):
        return send_from_directory('dist', 'index.html')
    return send_from_directory('.', 'index.html')

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "sevagan-backend"}), 200

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json or {}
    try:
        if User.query.filter_by(mobile=data.get('mobile')).first():
            return jsonify({"message": "Mobile number already registered"}), 400
            
        hashed_pw = bcrypt.generate_password_hash(data.get('password', '123456')).decode('utf-8')
        new_user = User(
            name=data.get('name'),
            mobile=data.get('mobile'),
            password_hash=hashed_pw,
            role=data.get('role', 'user')
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({
            "message": "User registered successfully",
            "user": {"id": new_user.id, "name": new_user.name, "mobile": new_user.mobile, "role": new_user.role}
        }), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json or {}
    user = User.query.filter_by(mobile=data.get('mobile')).first()
    if user and bcrypt.check_password_hash(user.password_hash, data.get('password', '')):
        return jsonify({
            "message": "Login successful",
            "user": {"id": user.id, "name": user.name, "mobile": user.mobile, "role": user.role}
        }), 200
    return jsonify({"message": "Invalid mobile number or password"}), 401

@app.route('/api/donors', methods=['GET'])
def search_donors():
    blood_group = request.args.get('blood_group') or request.args.get('blood')
    city = request.args.get('city')
    district = request.args.get('district')
    
    query = Donor.query
    if blood_group:
        query = query.filter_by(blood_group=blood_group)
    if city:
        query = query.filter(Donor.city.ilike(f"%{city}%"))
        
    donors = query.all()
    results = []
    for d in donors:
        user = User.query.get(d.user_id)
        if user:
            results.append({
                "id": d.id,
                "name": user.name,
                "group": d.blood_group,
                "blood": d.blood_group,
                "city": d.city,
                "district": d.city,
                "mobile": user.mobile,
                "available": d.is_available
            })
    return jsonify(results), 200

@app.route('/api/donors', methods=['POST'])
def register_donor():
    data = request.json or {}
    try:
        mobile = data.get('mobile')
        name = data.get('name')
        group = data.get('group') or data.get('blood')
        city = data.get('city') or data.get('district') or 'Chennai'

        user = User.query.filter_by(mobile=mobile).first()
        if not user:
            hashed_pw = bcrypt.generate_password_hash("Pass123!").decode('utf-8')
            user = User(name=name, mobile=mobile, password_hash=hashed_pw, role='user')
            db.session.add(user)
            db.session.commit()

        new_donor = Donor(
            user_id=user.id,
            blood_group=group,
            city=city,
            pincode="600001",
            is_available=data.get('available', True)
        )
        db.session.add(new_donor)
        db.session.commit()

        return jsonify({
            "message": "Donor registered successfully",
            "donor": {
                "id": new_donor.id,
                "name": user.name,
                "group": new_donor.blood_group,
                "blood": new_donor.blood_group,
                "city": new_donor.city,
                "district": new_donor.city,
                "mobile": user.mobile,
                "available": new_donor.is_available
            }
        }), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/api/requests', methods=['GET'])
def get_requests():
    reqs = BloodRequest.query.order_by(BloodRequest.created_at.desc()).all()
    results = []
    for r in reqs:
        results.append({
            "id": r.id,
            "patient": r.patient_name,
            "blood": r.blood_group,
            "units": r.units_required,
            "hospital": r.hospital_name,
            "mobile": r.contact_number,
            "status": r.status,
            "created_at": r.created_at.isoformat()
        })
    return jsonify(results), 200

@app.route('/api/requests', methods=['POST'])
def create_request():
    data = request.json or {}
    try:
        mobile = data.get('mobile')
        patient = data.get('patient')
        blood = data.get('blood')
        units = int(data.get('units', 1))
        hospital = data.get('hospital')

        user = User.query.filter_by(mobile=mobile).first()
        if not user:
            hashed_pw = bcrypt.generate_password_hash("Pass123!").decode('utf-8')
            user = User(name=patient, mobile=mobile, password_hash=hashed_pw, role='user')
            db.session.add(user)
            db.session.commit()

        new_req = BloodRequest(
            requester_id=user.id,
            patient_name=patient,
            blood_group=blood,
            units_required=units,
            hospital_name=hospital,
            contact_number=mobile
        )
        db.session.add(new_req)
        db.session.commit()

        return jsonify({
            "message": "Emergency request created",
            "request": {
                "id": new_req.id,
                "patient": new_req.patient_name,
                "blood": new_req.blood_group,
                "units": new_req.units_required,
                "hospital": new_req.hospital_name,
                "mobile": new_req.contact_number,
                "created_at": new_req.created_at.isoformat()
            }
        }), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ.get('PORT', 5000)))

