import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BLOOD_GROUPS, 
  COUNTRIES, 
  getStatesForCountry, 
  getDistrictsForState, 
  getCitiesForDistrict 
} from '../data/constants';

export const BecomeDonorSection = () => {
  const { t, registerDonor, openModal, navigateToSection } = useApp();

  const [donorFor, setDonorFor] = useState('me'); // 'me' or 'friend'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [group, setGroup] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Tamil Nadu');
  const [district, setDistrict] = useState('Chennai');
  const [city, setCity] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');

  const statesList = getStatesForCountry(country);
  const districtsList = getDistrictsForState(country, state);
  const citiesList = getCitiesForDistrict(country, state, district);

  useEffect(() => {
    const states = getStatesForCountry(country);
    if (states.length > 0) setState(states[0]);
  }, [country]);

  useEffect(() => {
    const districts = getDistrictsForState(country, state);
    if (districts.length > 0) setDistrict(districts[0]);
  }, [country, state]);

  useEffect(() => {
    const cities = getCitiesForDistrict(country, state, district);
    if (cities.length > 0) setCity(cities[0]);
  }, [country, state, district]);

  const handleDobChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setDob(e.target.value);
    if (!isNaN(selectedDate.getTime())) {
      const today = new Date();
      let calculatedAge = today.getFullYear() - selectedDate.getFullYear();
      const m = today.getMonth() - selectedDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < selectedDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge > 0 ? calculatedAge : 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !group || !dob) {
      alert('Please fill out all required fields.');
      return;
    }

    if (age < 18) {
      alert('You must be at least 18 years old to register as a blood donor.');
      return;
    }

    const donorData = {
      name,
      mobile: phone,
      group,
      country,
      state,
      district,
      city,
      dob,
      age,
      available: true
    };

    if (donorFor === 'me') {
      await registerDonor(donorData);
      openModal('success', {
        title: 'Profile Published!',
        message: 'Congratulations! You are now a registered SEVAGAN blood donor.',
        nextAction: () => navigateToSection('profile')
      });
    } else {
      openModal('otp', {
        mobile: phone,
        purpose: 'donor_registration',
        userData: donorData,
        onVerifySuccess: async () => {
          await registerDonor(donorData);
          openModal('success', {
            title: 'Donor Registered!',
            message: 'Your friend has been successfully registered on SEVAGAN Blood Network.',
            nextAction: () => navigateToSection('find-donors')
          });
        }
      });
    }
  };

  return (
    <div className="section-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="section-header text-center">
        <h2 className="section-title" data-i18n="become_donor_title">
          {t('become_donor_title')}
        </h2>
        <p className="section-subtitle" data-i18n="become_donor_sub">
          {t('become_donor_sub')}
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <form onSubmit={handleSubmit}>
          {/* Who is registration for */}
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label" data-i18n="donor_for_label">{t('donor_for_label')}</label>
            <div className="filter-chips-container" style={{ display: 'flex', gap: '1rem' }}>
              <button 
                type="button" 
                className={`chip ${donorFor === 'me' ? 'active' : ''}`}
                onClick={() => setDonorFor('me')}
                data-i18n="chip_myself"
              >
                {t('chip_myself')}
              </button>
              <button 
                type="button" 
                className={`chip ${donorFor === 'friend' ? 'active' : ''}`}
                onClick={() => setDonorFor('friend')}
                data-i18n="chip_myfriend"
              >
                {t('chip_myfriend')}
              </button>
            </div>
          </div>

          <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label" data-i18n="lbl_full_name">{t('lbl_full_name')} *</label>
              <input 
                type="text" 
                className="search-input" 
                placeholder={t('ph_full_name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label className="form-label" data-i18n="lbl_phone_number">{t('lbl_phone_number')} *</label>
              <input 
                type="tel" 
                className="search-input" 
                placeholder={t('ph_phone_number')}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Blood Group */}
            <div className="form-group">
              <label className="form-label" data-i18n="lbl_blood_group">{t('lbl_blood_group')} *</label>
              <select 
                className="search-input"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                required
              >
                <option value="" disabled>{t('ph_blood_group')}</option>
                {BLOOD_GROUPS.map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
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

            {/* DOB */}
            <div className="form-group">
              <label className="form-label" data-i18n="lbl_dob">{t('lbl_dob')}</label>
              <input 
                type="date" 
                className="search-input"
                value={dob}
                onChange={handleDobChange}
                required
              />
            </div>

            {/* Age */}
            <div className="form-group">
              <label className="form-label" data-i18n="lbl_age">{t('lbl_age')}</label>
              <input 
                type="text" 
                className="search-input"
                value={age ? `${age} Years Old` : ''}
                readOnly
                disabled
              />
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 3rem', fontSize: '1.1rem' }} data-i18n="btn_register_donor">
              {t('btn_register_donor')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
