import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const HallOfFame = () => {
  const { t, donors, openModal } = useApp();
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHero, setSelectedHero] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Default Hall of Fame Champions
  const defaultChampions = [
    { id: 'h1', name: "Dr. K. Vignesh", district: "Chennai", group: "O-", donations: 18, saved: 54, badge: "👑 Legend", badgeClass: "badge-legend" },
    { id: 'h2', name: "S. Anitha", district: "Coimbatore", group: "AB-", donations: 14, saved: 42, badge: "🌟 Gold Hero", badgeClass: "badge-hero" },
    { id: 'h3', name: "M. Karthik", district: "Madurai", group: "B-", donations: 11, saved: 33, badge: "⚡ Guardian", badgeClass: "badge-guardian" },
    { id: 'h4', name: "R. Dhanush", district: "Salem", group: "A-", saved: 27, donations: 9, badge: "⚡ Guardian", badgeClass: "badge-guardian" },
    { id: 'h5', name: "P. Meena", district: "Tiruchirappalli", group: "O+", donations: 8, saved: 24, badge: "🛡️ Life Saver", badgeClass: "badge-guardian" },
    { id: 'h6', name: "A. Mohamed Adil", district: "Chennai", group: "B+", donations: 7, saved: 21, badge: "🛡️ Life Saver", badgeClass: "badge-guardian" },
    { id: 'h7', name: "K. Priya", district: "Erode", group: "A+", donations: 6, saved: 18, badge: "🛡️ Life Saver", badgeClass: "badge-guardian" },
    { id: 'h8', name: "V. Suresh", district: "Tirunelveli", group: "O-", donations: 6, saved: 18, badge: "🛡️ Life Saver", badgeClass: "badge-guardian" },
    { id: 'h9', name: "D. Jayakumar", district: "Vellore", group: "AB+", donations: 5, saved: 15, badge: "🛡️ Life Saver", badgeClass: "badge-guardian" },
    { id: 'h10', name: "N. Lakshmi", district: "Thanjavur", group: "B+", donations: 5, saved: 15, badge: "🛡️ Life Saver", badgeClass: "badge-guardian" }
  ];

  // Merge real registered donors into leaderboard
  const realDonorsFormatted = (donors || []).map((d, index) => {
    const donationsCount = 3 + (index % 5);
    return {
      id: `real-${d.id || index}`,
      name: d.name || 'Anonymous Hero',
      district: d.city || d.district || 'Chennai',
      group: d.group || d.blood || 'O+',
      donations: donationsCount,
      saved: donationsCount * 3,
      badge: donationsCount >= 10 ? "👑 Legend" : donationsCount >= 7 ? "🌟 Gold Hero" : "🛡️ Life Saver",
      badgeClass: donationsCount >= 10 ? "badge-legend" : donationsCount >= 7 ? "badge-hero" : "badge-guardian",
      isRealUser: true
    };
  });

  // Combine and sort by lives saved descending
  const allLeaders = [...defaultChampions, ...realDonorsFormatted]
    .sort((a, b) => b.saved - a.saved);

  // Filter leaders based on category & search query
  const filteredLeaders = allLeaders.filter(hero => {
    const matchesSearch = 
      hero.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hero.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hero.group.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterCategory === 'rare') {
      return ['O-', 'AB-', 'B-', 'A-'].includes(hero.group);
    }
    if (filterCategory === 'legends') {
      return hero.saved >= 30;
    }
    return true;
  });

  const displayedLeaders = showAll ? filteredLeaders : filteredLeaders.slice(0, 7);

  const totalLivesSaved = allLeaders.reduce((sum, h) => sum + h.saved, 0);
  const totalDonations = allLeaders.reduce((sum, h) => sum + h.donations, 0);

  return (
    <div className="leaderboard-section glass-card" style={{ padding: '2rem' }}>
      {/* Header & Stats Banner */}
      <div className="leaderboard-header text-center" style={{ marginBottom: '2rem' }}>
        <h3 className="section-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          🏆 Life Savers Hall of Fame
        </h3>
        <p className="section-subtitle" style={{ fontSize: '1.05rem', color: 'var(--text-sec)' }}>
          Honoring our top voluntary community donors for their lifesaving contributions
        </p>

        {/* Quick Impact Counter Badges */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1.5rem', 
            margin: '1.8rem 0 1rem 0',
            flexWrap: 'wrap'
          }}
        >
          <div className="glass-card" style={{ padding: '0.8rem 1.6rem', textAlign: 'center', minWidth: '160px' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>{totalLivesSaved}+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-sec)' }}>Lives Saved</div>
          </div>
          <div className="glass-card" style={{ padding: '0.8rem 1.6rem', textAlign: 'center', minWidth: '160px' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#10B981' }}>{totalDonations}+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-sec)' }}>Total Donations</div>
          </div>
          <div className="glass-card" style={{ padding: '0.8rem 1.6rem', textAlign: 'center', minWidth: '160px' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#F59E0B' }}>{allLeaders.length}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-sec)' }}>Community Heroes</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: '1rem', 
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button 
            className={`chip ${filterCategory === 'all' ? 'active' : ''}`}
            onClick={() => setFilterCategory('all')}
          >
            🏆 All Champions
          </button>
          <button 
            className={`chip ${filterCategory === 'rare' ? 'active' : ''}`}
            onClick={() => setFilterCategory('rare')}
          >
            🩸 Rare Blood Donors
          </button>
          <button 
            className={`chip ${filterCategory === 'legends' ? 'active' : ''}`}
            onClick={() => setFilterCategory('legends')}
          >
            👑 Legends (30+ Lives)
          </button>
        </div>

        <div style={{ minWidth: '260px', flex: 1, maxWidth: '350px' }}>
          <input 
            type="text"
            className="search-input"
            placeholder="🔍 Search donor, city, or group..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '0.6rem 1rem', fontSize: '0.9rem' }}
          />
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="table-responsive">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>RANK</th>
              <th>DONOR NAME</th>
              <th>LOCATION</th>
              <th>BLOOD GROUP</th>
              <th>DONATIONS</th>
              <th>LIVES SAVED</th>
              <th>HONOR BADGE</th>
            </tr>
          </thead>
          <tbody>
            {displayedLeaders.map((hero, idx) => {
              const rankDisplay = idx === 0 ? '🥇 #1' : idx === 1 ? '🥈 #2' : idx === 2 ? '🥉 #3' : `#${idx + 1}`;
              return (
                <tr 
                  key={hero.id}
                  onClick={() => setSelectedHero(hero)}
                  style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                >
                  <td className="rank-cell" style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>
                    {rankDisplay}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong>{hero.name}</strong>
                      {hero.isRealUser && (
                        <span 
                          style={{
                            fontSize: '0.7rem',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            background: 'rgba(16,185,129,0.2)',
                            color: '#10B981',
                            fontWeight: 'bold'
                          }}
                        >
                          VERIFIED
                        </span>
                      )}
                    </div>
                  </td>
                  <td>{hero.district}</td>
                  <td>
                    <span className="blood-chip" style={{ fontWeight: 'bold' }}>
                      {hero.group}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: 'var(--text-main)' }}>{hero.donations} Times</strong>
                  </td>
                  <td>
                    <span className="lives-saved-count" style={{ fontWeight: 'bold', color: '#10B981' }}>
                      ❤️ {hero.saved} Lives
                    </span>
                  </td>
                  <td>
                    <span className={`badge-tag ${hero.badgeClass}`}>
                      {hero.badge}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Read More / Show Less Toggle Button */}
      {filteredLeaders.length > 7 && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button 
            className="btn btn-outline"
            onClick={() => setShowAll(prev => !prev)}
            style={{
              padding: '0.65rem 1.8rem',
              fontSize: '0.92rem',
              borderRadius: '30px',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              background: 'rgba(255, 255, 255, 0.05)'
            }}
          >
            <span>{showAll ? 'Show Less' : `Read More (${filteredLeaders.length - 7} More Champions)`}</span>
            <span>{showAll ? '▲' : '▼'}</span>
          </button>
        </div>
      )}

      {/* Mini Hero Certificate Popup */}
      {selectedHero && (
        <div className="modal-overlay active" onClick={() => setSelectedHero(null)}>
          <div className="modal-content glass-card text-center" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
            <button className="modal-close-btn" onClick={() => setSelectedHero(null)}>&times;</button>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏅</div>
            <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.3rem' }}>{selectedHero.name}</h3>
            <p style={{ color: 'var(--text-sec)', marginBottom: '1.5rem' }}>
              Registered Lifesaver from <strong>{selectedHero.district}</strong>
            </p>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                padding: '1.2rem',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.05)',
                marginBottom: '1.5rem'
              }}
            >
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-sec)' }}>Blood Group</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>{selectedHero.group}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-sec)' }}>Lives Saved</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#10B981' }}>{selectedHero.saved} Lives</div>
              </div>
            </div>

            <span className={`badge-tag ${selectedHero.badgeClass}`} style={{ fontSize: '1rem', padding: '0.5rem 1.2rem' }}>
              {selectedHero.badge}
            </span>

            <button 
              className="btn btn-primary btn-block" 
              style={{ marginTop: '1.8rem' }}
              onClick={() => {
                alert(`❤️ You sent a Thank You message to ${selectedHero.name}!`);
                setSelectedHero(null);
              }}
            >
              ❤️ Send Thank You Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
