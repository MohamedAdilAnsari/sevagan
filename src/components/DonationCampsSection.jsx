import React, { useState } from 'react';

export const DonationCampsSection = () => {
  const [camps, setCamps] = useState([
    {
      id: 'c1',
      title: 'Mega Voluntary Blood Donation Camp 2026',
      organizer: 'Rotary Club of Chennai Central & SEVAGAN',
      date: 'Sunday, October 12, 2026',
      time: '08:00 AM - 02:00 PM',
      venue: 'Anna Auditorium, Anna University Campus, Guindy, Chennai',
      targetUnits: 250,
      rsvps: 142,
      userRsvped: false,
      contact: '9876543210'
    },
    {
      id: 'c2',
      title: 'Coimbatore Youth Blood Drive & Health Camp',
      organizer: 'Red Cross Society Coimbatore',
      date: 'Saturday, October 18, 2026',
      time: '09:00 AM - 03:00 PM',
      venue: 'VOC Park Grounds, Gandhipuram, Coimbatore',
      targetUnits: 180,
      rsvps: 98,
      userRsvped: false,
      contact: '9876543211'
    },
    {
      id: 'c3',
      title: 'Madurai Lifesavers Blood Mobile Drive',
      organizer: 'Lions Club International Madurai',
      date: 'Sunday, October 26, 2026',
      time: '08:30 AM - 01:30 PM',
      venue: 'Tamukkam Grounds, Goripalayam, Madurai',
      targetUnits: 200,
      rsvps: 115,
      userRsvped: false,
      contact: '9876543212'
    }
  ]);

  const toggleRsvp = (id) => {
    setCamps(prev => prev.map(camp => {
      if (camp.id === id) {
        const newRsvped = !camp.userRsvped;
        return {
          ...camp,
          userRsvped: newRsvped,
          rsvps: newRsvped ? camp.rsvps + 1 : camp.rsvps - 1
        };
      }
      return camp;
    }));
  };

  const addToGoogleCalendar = (camp) => {
    const title = encodeURIComponent(`🩸 ${camp.title}`);
    const details = encodeURIComponent(`Organized by ${camp.organizer} at ${camp.venue}. Emergency Contact: ${camp.contact}`);
    const location = encodeURIComponent(camp.venue);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  return (
    <section className="section-container" style={{ margin: '4rem auto' }}>
      {/* Section Header */}
      <div className="section-header text-center" style={{ marginBottom: '2.5rem' }}>
        <div className="hero-badge" style={{ marginBottom: '1rem' }}>
          <span>📅 Upcoming Community Blood Drives</span>
        </div>
        <h2 className="section-title" style={{ fontSize: '2.4rem', fontWeight: '800' }}>
          Voluntary Donation Camps & Events
        </h2>
        <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0.6rem auto 0' }}>
          Join local blood drives, pledge your support, and help save lives together in a safe environment.
        </p>
      </div>

      {/* Camps List Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {camps.map((camp) => (
          <div 
            key={camp.id} 
            className="glass-card" 
            style={{ 
              padding: '2rem', 
              borderRadius: '24px', 
              display: 'flex', 
              flexDirection: 'column', 
              justify: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top Date Ribbon */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '800', background: 'linear-gradient(135deg, #E63946, #C5221F)', color: '#FFFFFF', padding: '0.35rem 0.9rem', borderRadius: '30px', boxShadow: '0 4px 12px rgba(230,57,70,0.3)' }}>
                🗓️ {camp.date}
              </span>

              <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 'bold', background: 'rgba(16,185,129,0.12)', padding: '0.25rem 0.7rem', borderRadius: '20px' }}>
                👥 {camp.rsvps} Donors Pledged
              </span>
            </div>

            {/* Camp Content */}
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.4rem', lineHeight: '1.3' }}>
                {camp.title}
              </h3>
              <div style={{ fontSize: '0.88rem', color: 'var(--primary-red)', fontWeight: '700', marginBottom: '1rem' }}>
                🏢 {camp.organizer}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-sec)', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.03)', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <div>⏰ <strong>Time:</strong> {camp.time}</div>
                <div>📍 <strong>Venue:</strong> {camp.venue}</div>
                <div>🎯 <strong>Target Collection:</strong> {camp.targetUnits} Blood Units</div>
              </div>
            </div>

            {/* Camp Actions */}
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button 
                className={`btn ${camp.userRsvped ? 'btn-outline' : 'btn-primary'}`}
                onClick={() => toggleRsvp(camp.id)}
                style={{ 
                  flex: 1, 
                  padding: '0.75rem', 
                  fontSize: '0.9rem', 
                  justifyContent: 'center',
                  borderColor: camp.userRsvped ? '#10B981' : undefined,
                  color: camp.userRsvped ? '#10B981' : undefined
                }}
              >
                {camp.userRsvped ? '✓ Attending Pledged' : '✋ I Will Attend'}
              </button>

              <button 
                className="btn btn-outline"
                onClick={() => addToGoogleCalendar(camp)}
                style={{ padding: '0.75rem', fontSize: '0.9rem', justifyContent: 'center' }}
                title="Add to Google Calendar"
              >
                📅 Calendar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
