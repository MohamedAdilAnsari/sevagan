import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QuickSearch } from './QuickSearch';
import { ADJACENT_DISTRICTS, DISTRICTS } from '../data/constants';

export const FindDonorsSection = () => {
  const { t, donors } = useApp();
  const [filter, setFilter] = useState(null);
  const [activeDistrictChip, setActiveDistrictChip] = useState('');
  const [activeBloodChip, setActiveBloodChip] = useState('');

  const quickDistricts = ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tirunelveli"];
  const rareBloodGroups = ["O-", "AB-", "A-", "B-"];

  const handleSearchFilter = (filterParams) => {
    setFilter(filterParams);
  };

  const handleDistrictChipClick = (dist) => {
    if (dist === activeDistrictChip) {
      setActiveDistrictChip('');
      setFilter(prev => prev ? { ...prev, district: '' } : null);
    } else {
      setActiveDistrictChip(dist);
      const distName = dist === 'Trichy' ? 'Tiruchirappalli' : dist;
      setFilter(prev => prev ? { ...prev, district: distName } : { district: distName });
    }
  };

  const handleBloodChipClick = (group) => {
    if (group === activeBloodChip) {
      setActiveBloodChip('');
      setFilter(prev => prev ? { ...prev, blood: '' } : null);
    } else {
      setActiveBloodChip(group);
      setFilter(prev => prev ? { ...prev, blood: group } : { blood: group });
    }
  };

  const handleShowAll = () => {
    setFilter(null);
    setActiveDistrictChip('');
    setActiveBloodChip('');
  };

  // Filter donor list
  let usingConnected = false;
  let filteredDonors = filter ? donors.filter(d => {
    let match = true;
    const donorBlood = d.group || d.blood;
    if (filter.blood && donorBlood !== filter.blood) match = false;
    if (filter.country && d.country && d.country.toLowerCase() !== filter.country.toLowerCase()) match = false;
    if (filter.state && d.state && d.state.toLowerCase() !== filter.state.toLowerCase()) match = false;
    if (filter.district && d.district && d.district.toLowerCase() !== filter.district.toLowerCase()) match = false;
    if (filter.city && d.city && d.city.toLowerCase() !== filter.city.toLowerCase()) match = false;
    if (d.available === false) match = false;
    return match;
  }) : donors.filter(d => d.available !== false);

  // Connected Districts fallback
  if (filter && filter.district && filteredDonors.length === 0) {
    const reqDist = DISTRICTS.find(d => d.toLowerCase() === filter.district.toLowerCase()) || "";
    let nearby = ADJACENT_DISTRICTS[reqDist] || [];
    if (nearby.length === 0) nearby = [...DISTRICTS].sort(() => 0.5 - Math.random()).slice(0, 3);

    filteredDonors = donors.filter(d => {
      const donorBlood = d.group || d.blood;
      if (filter.blood && donorBlood !== filter.blood) return false;
      if (d.available === false) return false;
      return nearby.map(n => n.toLowerCase()).includes((d.district || "").toLowerCase());
    });
    if (filteredDonors.length > 0) usingConnected = true;
  }

  const shareOnWhatsApp = (patientName, hospital, bloodGroup, mobile) => {
    const text = `🚨 *URGENT BLOOD REQUEST - SEVAGAN*%0A%0A*Donor/Patient:* ${patientName}%0A*Blood Group:* ${bloodGroup}%0A*Location:* ${hospital}%0A*Contact:* ${mobile}%0A%0APlease share or contact immediately if available!`;
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="section-container">
      <div className="section-header">
        <h2 className="section-title" data-i18n="find_donors_title">
          {t('find_donors_title')}
        </h2>
      </div>

      <QuickSearch onSearch={handleSearchFilter} prefix="find" />

      {/* Quick District & Rare Radar Chips */}
      <div className="filter-chips-container" style={{ margin: '1.5rem 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-sec)', fontWeight: '600' }} data-i18n="chip_quick_filters">
            {t('chip_quick_filters')}
          </span>
          <button 
            className={`chip ${!activeDistrictChip ? 'active' : ''}`} 
            onClick={handleShowAll}
            data-i18n="chip_all_districts"
          >
            {t('chip_all_districts')}
          </button>
          {quickDistricts.map(dist => (
            <button 
              key={dist} 
              className={`chip ${activeDistrictChip === dist ? 'active' : ''}`}
              onClick={() => handleDistrictChipClick(dist)}
            >
              📍 {dist}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-sec)', fontWeight: '600' }} data-i18n="chip_rare_radar">
            {t('chip_rare_radar')}
          </span>
          {rareBloodGroups.map(bg => (
            <button 
              key={bg}
              className={`chip ${activeBloodChip === bg ? 'active' : ''}`}
              onClick={() => handleBloodChipClick(bg)}
            >
              {bg} {bg === 'O-' ? '(Universal)' : '(Rare)'}
            </button>
          ))}
        </div>
      </div>

      {filter && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button className="btn btn-outline show-all-btn" onClick={handleShowAll} data-i18n="btn_show_all_donors">
            {t('btn_show_all_donors')}
          </button>
        </div>
      )}

      {usingConnected && (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', background: 'rgba(226, 55, 55, 0.1)', borderLeft: '4px solid var(--primary-red)', borderRadius: '8px', color: 'var(--text-main)', fontSize: '0.95rem' }}>
          <strong>Note:</strong> No exact matches in {filter?.district}. Showing donors from connected nearby districts.
        </div>
      )}

      {/* Donors Grid */}
      <div className="donors-grid" id="find-donors-grid">
        {filteredDonors.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 2rem', background: 'var(--card-bg)', border: '1px dashed var(--border-color)', borderRadius: '12px', color: 'var(--text-sec)' }} className="no-donors-msg">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '1rem', opacity: 0.5 }}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}><strong>{t('no_donors_found')}</strong></p>
            <p style={{ fontSize: '0.95rem' }}>
              No matching donors found for <strong>{filter?.blood || 'any group'}</strong> in <strong>{filter?.district || 'any location'}</strong>.
            </p>
          </div>
        ) : (
          filteredDonors.map((donor, idx) => (
            <div className="donor-card card" key={idx}>
              <div className="donor-card-header">
                <div>
                  <h3 className="donor-name">{donor.name}</h3>
                  <div className="donor-location">
                    <i className="fas fa-map-marker-alt"></i> {donor.city ? `${donor.city}, ` : ''}{donor.district || donor.state || donor.country}
                  </div>
                </div>
                <div className="donor-blood-badge">{donor.group || donor.blood}</div>
              </div>

              <div className="donor-status">
                <div className="status-ready">
                  <i className="fas fa-check-circle"></i> {t('ready_to_donate')}
                </div>
              </div>

              <div className="donor-card-actions">
                <a href={`tel:${donor.mobile}`} className="btn btn-primary btn-block">
                  <i className="fas fa-phone-alt"></i> {t('btn_call')} {donor.mobile}
                </a>
                <button 
                  className="btn btn-outline"
                  onClick={() => shareOnWhatsApp(donor.name, donor.district || donor.city, donor.group || donor.blood, donor.mobile)}
                >
                  <i className="fab fa-whatsapp"></i> {t('btn_share')}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
