import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

export const LoginNotificationBanner = () => {
  const { latestNotification } = useApp();
  const [activeAlert, setActiveAlert] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Play audio chime using Web Audio API (no external file dependency needed!)
  const playNotificationSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {
      console.warn('Audio chime failed:', e);
    }
  };

  useEffect(() => {
    if (latestNotification) {
      setActiveAlert(latestNotification);
      setIsVisible(true);
      playNotificationSound();

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [latestNotification]);

  if (!activeAlert || !isVisible) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        minWidth: '320px',
        maxWidth: '420px',
        background: 'rgba(20, 20, 30, 0.92)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(230, 57, 70, 0.4)',
        borderRadius: '16px',
        boxShadow: '0 12px 40px rgba(230, 57, 70, 0.25), 0 4px 12px rgba(0, 0, 0, 0.5)',
        padding: '1.2rem 1.5rem',
        color: '#FFFFFF',
        animation: 'slideUpFade 0.4s ease-out',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem'
      }}
    >
      <div 
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #E63946, #D62828)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          flexShrink: 0,
          boxShadow: '0 4px 12px rgba(230, 57, 70, 0.4)'
        }}
      >
        🔔
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
          <strong style={{ fontSize: '1rem', color: '#FFD166', fontWeight: '600' }}>
            {activeAlert.title || 'User Activity Alert'}
          </strong>
          <button 
            onClick={() => setIsVisible(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '1.2rem',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '2px 6px'
            }}
          >
            &times;
          </button>
        </div>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', lineHeight: '1.4' }}>
          {activeAlert.message}
        </p>
        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginTop: '0.4rem' }}>
          {new Date(activeAlert.timestamp || Date.now()).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};
