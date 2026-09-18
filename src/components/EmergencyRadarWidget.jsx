import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const EmergencyRadarWidget = () => {
  const { requests, openModal, navigateToSection } = useApp();
  const [activeTab, setActiveTab] = useState('radar'); // 'radar' or 'eligibility'

  // Eligibility Form state
  const [age, setAge] = useState('24');
  const [weight, setWeight] = useState('65');
  const [lastDonatedMonths, setLastDonatedMonths] = useState('4');
  const [eligibilityResult, setEligibilityResult] = useState(null);

  // Live Simulated Radar Matches
  const radarMatches = [
    { id: 'm1', patient: 'R. Rajesh', blood: 'O-', hospital: 'Apollo Hospital, Chennai', distance: '1.8 km', urgency: 'CRITICAL', units: 2, mobile: '9876543210' },
    { id: 'm2', patient: 'K. Sunitha', blood: 'AB-', hospital: 'KMCH, Coimbatore', distance: '3.4 km', urgency: 'URGENT', units: 1, mobile: '9876543211' },
    { id: 'm3', patient: 'M. Anand', blood: 'B-', hospital: 'Rajaji Hospital, Madurai', distance: '4.2 km', urgency: 'URGENT', units: 3, mobile: '9876543212' }
  ];

  const calculateEligibility = (e) => {
    e.preventDefault();
    const numAge = parseInt(age, 10);
    const numWeight = parseInt(weight, 10);
    const numMonths = parseInt(lastDonatedMonths, 10);

    if (numAge < 18 || numAge > 65) {
      setEligibilityResult({ eligible: false, reason: 'Age must be between 18 and 65 years old.' });
    } else if (numWeight < 45) {
      setEligibilityResult({ eligible: false, reason: 'Weight must be at least 45 kg to safely donate blood.' });
    } else if (numMonths < 3) {
      setEligibilityResult({ eligible: false, reason: `You donated ${numMonths} months ago. Minimum 3 months gap required.` });
    } else {
      setEligibilityResult({ eligible: true, message: '🎉 You are 100% Eligible to Donate Blood Today!' });
    }
  };

  return (
    <div className="section-container" style={{ margin: '3rem auto' }}>
      <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
        
        {/* Widget Header & Nav Chips */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
              <span style={{ fontSize: '2rem' }}>📡</span> Live Emergency Match Radar
            </h3>
            <p style={{ color: 'var(--text-sec)', margin: '4px 0 0 0', fontSize: '0.95rem' }}>
              Real-time donor radar scanning nearby emergency requests across Tamil Nadu
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button 
              className={`chip ${activeTab === 'radar' ? 'active' : ''}`}
              onClick={() => setActiveTab('radar')}
            >
              📡 Live Radar Sweep
            </button>
            <button 
              className={`chip ${activeTab === 'eligibility' ? 'active' : ''}`}
              onClick={() => setActiveTab('eligibility')}
            >
              📋 Quick Eligibility Check
            </button>
          </div>
        </div>

        {/* Tab 1: Live Emergency Radar */}
        {activeTab === 'radar' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            
            {/* Left: Animated Radar Sonar Visualizer */}
            <div 
              style={{
                height: '320px',
                borderRadius: '20px',
                background: 'radial-gradient(circle, rgba(230, 57, 70, 0.25) 0%, rgba(15, 23, 42, 0.95) 70%)',
                border: '1px solid rgba(230, 57, 70, 0.4)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              {/* Concentric Circles */}
              {[80, 160, 240].map((size, idx) => (
                <div 
                  key={idx}
                  style={{
                    position: 'absolute',
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    border: '1px dashed rgba(230, 57, 70, 0.4)'
                  }}
                />
              ))}

              {/* Sonar Radar Sweep Line */}
              <div 
                style={{
                  position: 'absolute',
                  width: '240px',
                  height: '240px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, rgba(230, 57, 70, 0.5) 0deg, transparent 60deg)',
                  animation: 'radarSpin 4s linear infinite'
                }}
              />

              {/* Pulsing Radar Pins */}
              <div style={{ position: 'absolute', top: '35%', left: '30%', textAlign: 'center' }}>
                <span className="pulse-dot" style={{ background: '#E63946', width: '12px', height: '12px', display: 'block', borderRadius: '50%' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ffffff', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>O- Chennai</span>
              </div>

              <div style={{ position: 'absolute', top: '60%', left: '65%', textAlign: 'center' }}>
                <span className="pulse-dot" style={{ background: '#F59E0B', width: '12px', height: '12px', display: 'block', borderRadius: '50%' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ffffff', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>AB- Coimbatore</span>
              </div>

              <div style={{ position: 'absolute', top: '25%', left: '70%', textAlign: 'center' }}>
                <span className="pulse-dot" style={{ background: '#10B981', width: '12px', height: '12px', display: 'block', borderRadius: '50%' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ffffff', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>B- Madurai</span>
              </div>

              {/* Center Radar Icon */}
              <div style={{ zIndex: 2, fontSize: '2rem', background: '#E63946', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(230, 57, 70, 0.8)' }}>
                🩸
              </div>
            </div>

            {/* Right: Live Matched Requests */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>Active Emergency Alerts</h4>
                <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 'bold' }}>● Scanning Live</span>
              </div>

              {radarMatches.map((item) => (
                <div 
                  key={item.id}
                  style={{
                    padding: '1rem 1.2rem',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.05)',
                    borderLeft: item.urgency === 'CRITICAL' ? '4px solid #E63946' : '4px solid #F59E0B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="blood-chip" style={{ fontSize: '0.85rem' }}>{item.blood}</span>
                      <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>{item.patient}</strong>
                      <span style={{ fontSize: '0.75rem', background: item.urgency === 'CRITICAL' ? 'rgba(230,57,70,0.2)' : 'rgba(245,158,11,0.2)', color: item.urgency === 'CRITICAL' ? '#E63946' : '#F59E0B', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                        {item.urgency}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-sec)', marginTop: '4px' }}>
                      🏥 {item.hospital} ({item.distance})
                    </div>
                  </div>

                  <button
                    className="btn btn-primary"
                    style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem', minHeight: 'unset', whiteSpace: 'nowrap' }}
                    onClick={() => {
                      alert(`🚨 Connected to emergency contact for ${item.patient} (${item.mobile}). Thank you for responding!`);
                    }}
                  >
                    ⚡ Respond
                  </button>
                </div>
              ))}

              <button 
                className="btn btn-outline btn-block"
                onClick={() => navigateToSection('request-blood')}
                style={{ marginTop: '0.5rem' }}
              >
                + Post Your Emergency Request
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Quick Donor Eligibility Calculator */}
        {activeTab === 'eligibility' && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form onSubmit={calculateEligibility}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Your Age (Years)</label>
                  <input 
                    type="number" 
                    className="search-input" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Weight (Kg)</label>
                  <input 
                    type="number" 
                    className="search-input" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Months Since Last Donation</label>
                  <input 
                    type="number" 
                    className="search-input" 
                    value={lastDonatedMonths}
                    onChange={(e) => setLastDonatedMonths(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Check Eligibility Now
              </button>
            </form>

            {/* Eligibility Result Banner */}
            {eligibilityResult && (
              <div 
                style={{
                  marginTop: '1.5rem',
                  padding: '1.2rem',
                  borderRadius: '16px',
                  background: eligibilityResult.eligible ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  borderLeft: eligibilityResult.eligible ? '4px solid #10B981' : '4px solid #EF4444',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: eligibilityResult.eligible ? '#10B981' : '#EF4444', marginBottom: '0.4rem' }}>
                  {eligibilityResult.eligible ? 'Eligible to Donate! 🎉' : 'Not Eligible Currently ⚠️'}
                </div>
                <div style={{ fontSize: '0.92rem', color: '#ffffff' }}>
                  {eligibilityResult.eligible ? eligibilityResult.message : eligibilityResult.reason}
                </div>

                {eligibilityResult.eligible && (
                  <button 
                    className="btn btn-primary"
                    style={{ marginTop: '1rem', padding: '0.5rem 1.5rem' }}
                    onClick={() => navigateToSection('become-donor')}
                  >
                    Register as Donor Now
                  </button>
                )}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Radar Spin Keyframes Style */}
      <style>{`
        @keyframes radarSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
