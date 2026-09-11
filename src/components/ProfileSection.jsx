import React from 'react';
import { useApp } from '../context/AppContext';

export const ProfileSection = () => {
  const { t, isLoggedIn, user, donors, requests, openModal, navigateToSection } = useApp();

  if (!isLoggedIn) {
    return (
      <div className="section-container text-center" style={{ padding: '4rem 1rem' }}>
        <div className="glass-card" style={{ maxWidth: '550px', margin: '0 auto', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--primary-red)' }}>🔐</div>
          <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
            User Account Required
          </h2>
          <p style={{ color: 'var(--text-sec)', marginBottom: '2rem', lineHeight: '1.6' }}>
            Please login or create an account to view and manage your donor profile, contribution stats, and emergency requests.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-outline" onClick={() => openModal('login')}>
              {t('btn_login')}
            </button>
            <button className="btn btn-primary" onClick={() => openModal('signup')}>
              {t('btn_signup')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="section-header">
        <h2 className="section-title">
          User Command Profile
        </h2>
        <p className="section-subtitle">
          Manage your personal contribution, availability status, and emergency requests on SEVAGAN.
        </p>
      </div>

      {/* User Info Card */}
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-red), #B41414)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.3rem' }}>{user?.name || 'SEVAGAN User'}</h3>
              <p style={{ color: 'var(--text-sec)', fontSize: '0.95rem' }}>
                <i className="fas fa-phone-alt" style={{ marginRight: '6px' }}></i> {user?.mobile || '+91 9999999999'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span className="badge-tag badge-legend" style={{ fontSize: '0.95rem', padding: '0.5rem 1rem' }}>
              VERIFIED DONOR
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-card card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>1</div>
          <div style={{ color: 'var(--text-sec)', fontSize: '0.9rem', marginTop: '0.3rem' }}>Active Profile</div>
        </div>

        <div className="glass-card card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>{donors.length}</div>
          <div style={{ color: 'var(--text-sec)', fontSize: '0.9rem', marginTop: '0.3rem' }}>Community Donors</div>
        </div>

        <div className="glass-card card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>{requests.length}</div>
          <div style={{ color: 'var(--text-sec)', fontSize: '0.9rem', marginTop: '0.3rem' }}>Broadcast Requests</div>
        </div>
      </div>

      {/* Central Command Admin Dashboard */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>
          Central Command Admin Dashboard
        </h3>
        <p style={{ color: 'var(--text-sec)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Real-time system overview of platform registered voluntary blood donors.
        </p>

        <div className="table-responsive">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Donor Name</th>
                <th>Country</th>
                <th>District / Location</th>
                <th>Blood Group</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((d, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td><strong>{d.name}</strong></td>
                  <td>{d.country || 'India'}</td>
                  <td>{d.city ? `${d.city}, ` : ''}{d.district || d.state}</td>
                  <td><span className="blood-chip">{d.group || d.blood}</span></td>
                  <td>
                    <span style={{ color: '#10B981', fontWeight: 'bold', fontSize: '0.85rem' }}>
                      <i className="fas fa-check-circle"></i> ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
