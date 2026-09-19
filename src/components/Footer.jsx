import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer = () => {
  const { t, navigateToSection } = useApp();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo-section" style={{ marginBottom: '1rem' }}>
            <div className="logo-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E23737"/>
              </svg>
            </div>
            <span className="logo-text">SEVAGAN</span>
          </div>
          <p className="footer-desc" data-i18n="footer_sub">
            {t('footer_sub')}
          </p>
        </div>

        <div className="footer-links-column">
          <h4 className="footer-title" data-i18n="footer_links_title">
            {t('footer_links_title')}
          </h4>
          <ul className="footer-links">
            <li><a onClick={() => navigateToSection('home')} data-i18n="nav_home">{t('nav_home')}</a></li>
            <li><a onClick={() => navigateToSection('find-donors')} data-i18n="nav_find_donors">{t('nav_find_donors')}</a></li>
            <li><a onClick={() => navigateToSection('become-donor')} data-i18n="nav_become_donor">{t('nav_become_donor')}</a></li>
            <li><a onClick={() => navigateToSection('request-blood')} data-i18n="nav_request_blood">{t('nav_request_blood')}</a></li>
            <li><a onClick={() => navigateToSection('blood-banks')}>🏥 Blood Banks & Reserves</a></li>
            <li><a onClick={() => navigateToSection('camps')}>📅 Donation Drives & Camps</a></li>
            <li><a onClick={() => navigateToSection('about')} data-i18n="nav_about">{t('nav_about')}</a></li>
          </ul>
        </div>

        <div className="footer-social-column">
          <h4 className="footer-title">Connect With Us</h4>
          <div className="social-icons" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a href="#" className="social-btn"><i className="fab fa-whatsapp"></i></a>
            <a href="#" className="social-btn"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social-btn"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-btn"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p data-i18n="footer_copyright">
          {t('footer_copyright')}
        </p>
      </div>
    </footer>
  );
};
