import React from 'react';
import { useApp } from '../context/AppContext';

export const SosTickerBar = () => {
  const { t, requests, navigateToSection } = useApp();

  const defaultText = t('sos_default_text');

  const liveText = requests.length > 0 
    ? requests.map(r => `🔴 ${r.units || 1} Unit(s) ${r.blood} (${r.patient} - ${r.hospital})`).join(' | ')
    : defaultText;

  return (
    <div className="sos-ticker-bar">
      <span className="sos-tag">{t('sos_live_tag')}</span>
      <div className="sos-ticker-content" onClick={() => navigateToSection('request-blood')} style={{ cursor: 'pointer' }}>
        <div className="sos-ticker-text" id="sos-ticker-text">
          {liveText}
        </div>
      </div>
    </div>
  );
};
