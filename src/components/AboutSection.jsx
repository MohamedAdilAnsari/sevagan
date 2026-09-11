import React from 'react';
import { useApp } from '../context/AppContext';

export const AboutSection = () => {
  const { t } = useApp();

  return (
    <div className="section-container">
      {/* Hero Banner */}
      <div className="glass-card text-center" style={{ padding: '3.5rem 2rem', marginBottom: '3rem', background: 'linear-gradient(135deg, rgba(226, 55, 55, 0.12) 0%, rgba(20, 20, 20, 0.4) 100%)' }}>
        <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }} data-i18n="about_hero_title">
          {t('about_hero_title')}
        </h2>
        <p className="section-subtitle" style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.7' }} data-i18n="about_hero_sub">
          {t('about_hero_sub')}
        </p>
      </div>

      {/* Mission, Vision, Commitment Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="glass-card card" style={{ padding: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary-red)' }}>🎯</div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }} data-i18n="our_mission_title">
            {t('our_mission_title')}
          </h3>
          <p style={{ color: 'var(--text-sec)', lineHeight: '1.6' }} data-i18n="our_mission_desc">
            {t('our_mission_desc')}
          </p>
        </div>

        <div className="glass-card card" style={{ padding: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary-red)' }}>👁️</div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }} data-i18n="our_vision_title">
            {t('our_vision_title')}
          </h3>
          <p style={{ color: 'var(--text-sec)', lineHeight: '1.6' }} data-i18n="our_vision_desc">
            {t('our_vision_desc')}
          </p>
        </div>

        <div className="glass-card card" style={{ padding: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary-red)' }}>🤝</div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }} data-i18n="our_commitment_title">
            {t('our_commitment_title')}
          </h3>
          <p style={{ color: 'var(--text-sec)', lineHeight: '1.6' }} data-i18n="our_commitment_desc">
            {t('our_commitment_desc')}
          </p>
        </div>
      </div>

      {/* Why Choose SEVAGAN List */}
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }} data-i18n="why_choose_title">
          {t('why_choose_title')}
        </h3>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.05rem' }}>
            <span style={{ color: 'var(--primary-red)', fontWeight: 'bold' }}>✔</span>
            <span data-i18n="why_item_1">{t('why_item_1')}</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.05rem' }}>
            <span style={{ color: 'var(--primary-red)', fontWeight: 'bold' }}>✔</span>
            <span data-i18n="why_item_2">{t('why_item_2')}</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.05rem' }}>
            <span style={{ color: 'var(--primary-red)', fontWeight: 'bold' }}>✔</span>
            <span data-i18n="why_item_3">{t('why_item_3')}</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.05rem' }}>
            <span style={{ color: 'var(--primary-red)', fontWeight: 'bold' }}>✔</span>
            <span data-i18n="why_item_4">{t('why_item_4')}</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.05rem' }}>
            <span style={{ color: 'var(--primary-red)', fontWeight: 'bold' }}>✔</span>
            <span data-i18n="why_item_5">{t('why_item_5')}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
