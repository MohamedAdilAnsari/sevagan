import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const { 
    theme, 
    toggleTheme, 
    language, 
    changeLanguage, 
    t, 
    activeSection, 
    navigateToSection,
    isLoggedIn,
    user,
    logoutUser,
    openModal
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    navigateToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon-pill">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FFFFFF"/>
              <path d="M3.5 12H7L9 7.5L12 16.5L15 10.5L17 13.5H20.5" stroke="#E63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text-brand">SEVAGAN</span>
        </div>

        <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <a className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={() => handleNavClick('home')}>
            {t('nav_home')}
          </a>
          <a className={`nav-link ${activeSection === 'find-donors' ? 'active' : ''}`} onClick={() => handleNavClick('find-donors')}>
            {t('nav_find_donors')}
          </a>
          <a className={`nav-link ${activeSection === 'become-donor' ? 'active' : ''}`} onClick={() => handleNavClick('become-donor')}>
            {t('nav_become_donor')}
          </a>
          <a className={`nav-link ${activeSection === 'request-blood' ? 'active' : ''}`} onClick={() => handleNavClick('request-blood')}>
            {t('nav_request_blood')}
          </a>
          <a className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => handleNavClick('about')}>
            {t('nav_about')}
          </a>
        </nav>

        <div className="header-actions">
          {/* Language Selector */}
          <div className="language-selector">
            <i className="fas fa-globe glob-icon"></i>
            <select 
              id="language-select" 
              className="language-dropdown" 
              value={language} 
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="ta">தமிழ்</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* User Auth Buttons */}
          {isLoggedIn ? (
            <div className="user-profile-menu">
              <button className="btn btn-outline btn-nav-login" onClick={() => handleNavClick('profile')}>
                <i className="fas fa-user-circle"></i>
                {user?.name || 'Profile'}
              </button>
              <button className="btn btn-primary btn-nav-signup" onClick={logoutUser} style={{ marginLeft: '8px' }}>
                {t('btn_logout')}
              </button>
            </div>
          ) : (
            <div className="auth-buttons" style={{ display: 'flex', gap: '0.6rem' }}>
              <button className="btn btn-primary btn-nav-signup" onClick={() => openModal('signup')}>
                <i className="fas fa-user"></i>
                <span>{t('btn_signup')}</span>
              </button>
              <button className="btn btn-outline btn-nav-login" onClick={() => openModal('login')}>
                <i className="fas fa-sign-in-alt"></i>
                <span>{t('btn_login')}</span>
              </button>
            </div>
          )}

          {/* Mobile Toggle */}
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Navigation"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
};
