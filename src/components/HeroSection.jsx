import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BLOOD_GROUPS, 
  DISTRICTS 
} from '../data/constants';
import { HeroBloodDropFill } from './HeroBloodDropFill';
import { CompatibilityMatrix } from './CompatibilityMatrix';
import { EmergencyRadarWidget } from './EmergencyRadarWidget';
import { HallOfFame } from './HallOfFame';

export const HeroSection = () => {
  const { t, navigateToSection, donors, openModal } = useApp();
  const [selectedBlood, setSelectedBlood] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigateToSection('find-donors');
  };

  return (
    <div className="hero-section-wrapper">
      <div className="section-container hero-container">
        {/* Main 2-Column Grid */}
        <div className="hero-grid">
          {/* Left Column: Headline & Content */}
          <div className="hero-left">
            {/* Tag Badge */}
            <div className="hero-badge">
              <span className="badge-drop-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#E63946" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </span>
              <span>{t('hero_badge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-main-title">
              {t('hero_title_1')} <br />
              <span className="text-red-highlight">{t('hero_title_2')}</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-description">
              {t('hero_description')}
            </p>

            {/* Action Buttons */}
            <div className="hero-cta-group">
              <button 
                className="btn btn-primary hero-btn-primary"
                onClick={() => navigateToSection('find-donors')}
              >
                <i className="fas fa-search"></i>
                <span>{t('hero_btn_find')}</span>
                <i className="fas fa-arrow-right arrow-icon"></i>
              </button>

              <button 
                className="btn btn-outline hero-btn-secondary"
                onClick={() => navigateToSection('become-donor')}
              >
                <i className="far fa-heart"></i>
                <span>{t('hero_btn_become')}</span>
              </button>
            </div>

            {/* 3 Feature Highlights */}
            <div className="hero-features-row">
              <div className="hero-feature-item">
                <span className="feature-icon text-red">⚡</span>
                <div className="feature-text-group">
                  <span className="feature-title">{t('hero_feat_fast_title')}</span>
                  <span className="feature-sub">{t('hero_feat_fast_sub')}</span>
                </div>
              </div>

              <div className="hero-feature-item">
                <span className="feature-icon text-red">🛡️</span>
                <div className="feature-text-group">
                  <span className="feature-title">{t('hero_feat_safe_title')}</span>
                  <span className="feature-sub">{t('hero_feat_safe_sub')}</span>
                </div>
              </div>

              <div className="hero-feature-item">
                <span className="feature-icon text-red">👥</span>
                <div className="feature-text-group">
                  <span className="feature-title">{t('hero_feat_community_title')}</span>
                  <span className="feature-sub">{t('hero_feat_community_sub')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Donation Image Container */}
          <div className="hero-right">
            <HeroBloodDropFill />
          </div>
        </div>

        {/* Floating Bottom Quick Search Bar */}
        <div className="hero-floating-search-card">
          <div className="search-card-left-info">
            <div className="search-card-icon-circle">
              <span className="card-blood-drop">🩸</span>
            </div>
            <div className="search-card-text">
              <h3 className="card-title">{t('quick_search_title')}</h3>
              <p className="card-subtitle">{t('quick_search_sub')}</p>
            </div>
          </div>

          <form className="search-card-fields-form" onSubmit={handleSearchSubmit}>
            {/* Field 1: Blood Group */}
            <div className="card-field-group">
              <span className="field-icon">🩸</span>
              <div className="field-select-wrapper">
                <label className="field-label">{t('lbl_blood_group')}</label>
                <select 
                  className="card-select-input" 
                  value={selectedBlood} 
                  onChange={(e) => setSelectedBlood(e.target.value)}
                >
                  <option value="">{t('ph_blood_group')}</option>
                  {BLOOD_GROUPS.map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field 2: Location */}
            <div className="card-field-group">
              <span className="field-icon">📍</span>
              <div className="field-select-wrapper">
                <label className="field-label">{t('lbl_location')}</label>
                <select 
                  className="card-select-input" 
                  value={selectedLocation} 
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">{t('ph_select_district')}</option>
                  {DISTRICTS.map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary card-search-btn">
              <i className="fas fa-search"></i>
              <span>{t('btn_search')}</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>

      {/* Red Wave Divider with Heartbeat ECG Line */}
      <div className="hero-red-wave-divider">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="wave-svg">
          <path d="M0 40 Q 360 120 720 40 T 1440 40 V 120 H 0 Z" fill="#990D1C" />
          <path d="M0 50 Q 360 125 720 50 T 1440 50 V 120 H 0 Z" fill="#D31D2E" />
          <path d="M0 60 Q 360 130 720 60 T 1440 60 V 120 H 0 Z" fill="#E63946" />
        </svg>

        {/* Exact Match Centered ECG Line with Outlined Heart */}
        <div className="ecg-pulse-overlay">
          <div className="ecg-exact-container">
            <svg className="ecg-exact-svg" viewBox="0 0 600 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Base Red Line & Outlined Heart Path */}
              <g className="ecg-base-group" stroke="#FF2E4D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Left ECG Wave */}
                <path d="M0 35 L170 35 C175 35, 180 32, 185 32 C190 32, 193 35, 196 35 L200 48 L212 10 L224 55 L236 30 L242 38 L250 35 L260 35" />
                
                {/* Center Outlined Heart */}
                <path 
                  className="ecg-exact-heart"
                  d="M300 52 C285 40, 268 28, 274 18 C280 8, 292 10, 300 18 C308 10, 320 8, 326 18 C332 28, 315 40, 300 52 Z" 
                  fill="none" 
                  stroke="#FF2E4D" 
                  strokeWidth="2.5" 
                />
                
                {/* Right ECG Wave */}
                <path d="M340 35 L350 35 L358 38 L364 30 L376 55 L388 10 L400 48 L404 35 C407 35, 410 32, 415 32 C420 32, 425 35, 430 35 L600 35" />
              </g>

              {/* Bright Running Neon Pulse Beam Overlay */}
              <g className="ecg-beam-group" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path className="ecg-running-beam-path" d="M0 35 L170 35 C175 35, 180 32, 185 32 C190 32, 193 35, 196 35 L200 48 L212 10 L224 55 L236 30 L242 38 L250 35 L260 35 M300 52 C285 40, 268 28, 274 18 C280 8, 292 10, 300 18 C308 10, 320 8, 326 18 C332 28, 315 40, 300 52 Z M340 35 L350 35 L358 38 L364 30 L376 55 L388 10 L400 48 L404 35 C407 35, 410 32, 415 32 C420 32, 425 35, 430 35 L600 35" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Matrix, Emergency Radar & Hall of Fame below Wave */}
      <div className="section-container">
        <div style={{ marginTop: '3rem' }}>
          <CompatibilityMatrix />
        </div>
        <div style={{ marginTop: '3rem' }}>
          <EmergencyRadarWidget />
        </div>
        <div style={{ marginTop: '4rem' }}>
          <HallOfFame />
        </div>
      </div>
    </div>
  );
};
