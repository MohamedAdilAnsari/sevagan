import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPATIBILITY_MAP } from '../data/constants';

export const CompatibilityMatrix = () => {
  const { t } = useApp();
  const [selectedGroup, setSelectedGroup] = useState('O-');

  const groups = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];
  const currentData = COMPATIBILITY_MAP[selectedGroup] || COMPATIBILITY_MAP["O-"];

  const translateTag = (item) => {
    if (item.includes("Universal Donor")) return `${t("compat_everyone")} (${t("badge_legend") || "Universal Donor"})`;
    if (item.includes("Universal Receiver")) return t("compat_everyone_receiver") || "EVERYONE (Universal Receiver)";
    if (item === "EVERYONE") return t("compat_everyone") || "EVERYONE";
    if (item === "O- Only") return t("compat_o_only") || "O- Only";
    return item;
  };

  return (
    <div className="compatibility-widget glass-card">
      <h3 className="widget-title" data-i18n="compat_matrix_title">
        {t('compat_matrix_title')}
      </h3>
      <p className="widget-sub" data-i18n="compat_matrix_sub">
        {t('compat_matrix_sub')}
      </p>

      <div className="compat-groups-grid">
        {groups.map(bg => (
          <button 
            key={bg} 
            className={`compat-btn ${selectedGroup === bg ? 'active' : ''}`}
            onClick={() => setSelectedGroup(bg)}
          >
            {bg}
          </button>
        ))}
      </div>

      <div className="compat-results-wrapper">
        <div className="compat-box">
          <h4 className="compat-box-title" data-i18n="compat_can_donate_to">
            {t('compat_can_donate_to')}
          </h4>
          <div className="compat-tags-container" id="compat-can-give">
            {currentData.give.map(item => (
              <span key={item} className="compat-tag">{translateTag(item)}</span>
            ))}
          </div>
        </div>

        <div className="compat-box">
          <h4 className="compat-box-title" data-i18n="compat_can_receive_from">
            {t('compat_can_receive_from')}
          </h4>
          <div className="compat-tags-container" id="compat-can-receive">
            {currentData.receive.map(item => (
              <span key={item} className="compat-tag">{translateTag(item)}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
