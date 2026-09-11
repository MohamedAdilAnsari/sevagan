import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BLOOD_GROUPS, 
  COUNTRIES, 
  getStatesForCountry, 
  getDistrictsForState, 
  getCitiesForDistrict 
} from '../data/constants';

export const RequestBloodSection = () => {
  const { t, requests, addEmergencyRequest, openModal, navigateToSection } = useApp();

  const [patient, setPatient] = useState('');
  const [blood, setBlood] = useState('');
  const [units, setUnits] = useState('1');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Tamil Nadu');
  const [district, setDistrict] = useState('Chennai');
  const [city, setCity] = useState('');
  const [hospital, setHospital] = useState('');
  const [mobile, setMobile] = useState('');

  const statesList = getStatesForCountry(country);
  const districtsList = getDistrictsForState(country, state);
  const citiesList = getCitiesForDistrict(country, state, district);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patient || !blood || !hospital || !mobile) {
      alert('Please complete all required emergency request fields.');
      return;
    }

    const reqData = {
      patient,
      blood,
      units,
      country,
      state,
      district,
      city,
      hospital,
      mobile,
      timestamp: new Date().toISOString()
    };

    openModal('otp', {
      mobile,
      purpose: 'blood_request',
      userData: reqData,
      onVerifySuccess: async () => {
        await addEmergencyRequest(reqData);
        openModal('success', {
          title: 'Request Broadcasted!',
          message: 'Emergency request has been broadcasted to all nearby voluntary donors.',
          nextAction: () => navigateToSection('requests')
        });
      }
    });
  };

  const shareOnWhatsApp = (req) => {
    const text = `🚨 *URGENT BLOOD REQUEST - SEVAGAN*%0A%0A*Patient/Hospital:* ${req.patient}%0A*Blood Group Needed:* ${req.blood} (${req.units || 1} Units)%0A*Location:* ${req.hospital}, ${req.city || req.district || ''}%0A*Contact:* ${req.mobile}%0A%0APlease share or contact immediately if available!`;
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="section-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="section-header text-center">
        <h2 className="section-title" data-i18n="request_blood_title">
          {t('request_blood_title')}
        </h2>
        <p className="section-subtitle" data-i18n="request_blood_sub">
          {t('request_blood_sub')}
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '3rem' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Patient Name */}
            <div className="form-group">
              <label className="form-label" data-i18n="lbl_patient_name">{t('lbl_patient_name')} *</label>
              <input 
                type="text" 
                className="search-input" 
                placeholder={t('ph_patient_name')}
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                required
              />
            </div>

            {/* Blood Group */}
            <div className="form-group">
              <label className="form-label" data-i18n="lbl_blood_group">{t('lbl_blood_group')} *</label>
              <select 
                className="search-input"
                value={blood}
                onChange={(e) => setBlood(e.target.value)}
                required
              >
                <option value="" disabled>{t('ph_blood_group')}</option>
                {BLOOD_GROUPS.map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            {/* Units Needed */}
            <div className="form-group">
              <label className="form-label" data-i18n="lbl_units_needed">{t('lbl_units_needed')} *</label>
              <input 
                type="number" 
                className="search-input" 
                min="1" 
                max="20"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                required
              />
            </div>

            {/* Contact Mobile */}
            <div className="form-group">
              <label className="form-label" data-i18n="lbl_phone_number">{t('lbl_phone_number')} *</label>
              <input 
                type="tel" 
                className="search-input" 
                placeholder={t('ph_phone_number')}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

            {/* Country */}
            <div className="form-group">
              <label className="form-label" data-i18n="ph_select_country">{t('ph_select_country')}</label>
              <select 
                className="search-input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* State */}
            <div className="form-group">
              <label className="form-label" data-i18n="ph_select_state">{t('ph_select_state')}</label>
              <select 
                className="search-input"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                {statesList.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="form-group">
              <label className="form-label" data-i18n="ph_select_district">{t('ph_select_district')}</label>
              <select 
                className="search-input"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                {districtsList.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="form-group">
              <label className="form-label" data-i18n="ph_select_city">{t('ph_select_city')}</label>
              <select 
                className="search-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {citiesList.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Hospital Address */}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label" data-i18n="lbl_hospital_address">{t('lbl_hospital_address')} *</label>
              <textarea 
                className="search-input" 
                rows="3"
                placeholder="Full Hospital Address, Room Number, Landmark..."
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.9rem 3rem', fontSize: '1.1rem' }} data-i18n="btn_submit_request">
              <i className="fas fa-broadcast-tower" style={{ marginRight: '8px' }}></i>
              {t('btn_submit_request')}
            </button>
          </div>
        </form>
      </div>

      {/* Emergency Requests Board */}
      <div className="section-header text-center" style={{ marginTop: '3rem' }}>
        <h3 className="section-title">🩸 Emergency Blood Requests Board</h3>
        <p className="section-subtitle">Live broadcast requests from patients and hospitals in urgent need.</p>
      </div>

      <div className="donors-grid" style={{ marginTop: '1.5rem' }}>
        {requests.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem 2rem', background: 'var(--card-bg)', border: '1px dashed var(--border-color)', borderRadius: '12px', color: 'var(--text-sec)' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}><strong>No Active Emergency Requests</strong></p>
            <p style={{ fontSize: '0.95rem' }}>No blood requests have been posted yet. When someone submits a request, it will appear here.</p>
          </div>
        ) : (
          requests.map((req, idx) => (
            <div className="donor-card card" key={idx} style={{ borderLeft: '4px solid var(--primary-red)' }}>
              <div className="donor-card-header">
                <div>
                  <h3 className="donor-name">{req.patient}</h3>
                  <div className="donor-location">
                    <i className="fas fa-hospital"></i> {req.hospital}
                  </div>
                </div>
                <div className="donor-blood-badge">{req.blood} ({req.units || 1} U)</div>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-sec)', margin: '1rem 0' }}>
                📍 {req.city ? `${req.city}, ` : ''}{req.district || req.state || req.country}
              </div>

              <div className="donor-card-actions">
                <a href={`tel:${req.mobile}`} className="btn btn-primary btn-block">
                  <i className="fas fa-phone-alt"></i> Call {req.mobile}
                </a>
                <button className="btn btn-outline" onClick={() => shareOnWhatsApp(req)}>
                  <i className="fab fa-whatsapp"></i> Share
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
