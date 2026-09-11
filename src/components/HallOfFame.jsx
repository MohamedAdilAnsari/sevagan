import React from 'react';
import { useApp } from '../context/AppContext';

export const HallOfFame = () => {
  const { t } = useApp();

  const leaders = [
    { rank: "🥇 #1", name: "Dr. K. Vignesh", district: "Chennai", group: "O-", saved: "18 Lives", badge: t("badge_legend"), badgeClass: "badge-legend" },
    { rank: "🥈 #2", name: "S. Anitha", district: "Coimbatore", group: "AB-", saved: "14 Lives", badge: t("badge_gold_hero"), badgeClass: "badge-hero" },
    { rank: "🥉 #3", name: "M. Karthik", district: "Madurai", group: "B-", saved: "11 Lives", badge: t("badge_guardian"), badgeClass: "badge-guardian" },
    { rank: "#4", name: "R. Dhanush", district: "Salem", group: "A-", saved: "9 Lives", badge: t("badge_guardian"), badgeClass: "badge-guardian" },
    { rank: "#5", name: "P. Meena", district: "Tiruchirappalli", group: "O+", saved: "8 Lives", badge: t("badge_guardian"), badgeClass: "badge-guardian" }
  ];

  return (
    <div className="leaderboard-section glass-card">
      <div className="leaderboard-header">
        <h3 className="widget-title" data-i18n="leaderboard_title">
          {t('leaderboard_title')}
        </h3>
        <p className="widget-sub" data-i18n="leaderboard_sub">
          {t('leaderboard_sub')}
        </p>
      </div>

      <div className="table-responsive">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th data-i18n="th_rank">{t('th_rank')}</th>
              <th data-i18n="th_donor_name">{t('th_donor_name')}</th>
              <th data-i18n="th_district">{t('th_district')}</th>
              <th data-i18n="th_blood_group">{t('th_blood_group')}</th>
              <th data-i18n="th_lives_saved">{t('th_lives_saved')}</th>
              <th data-i18n="th_badge">{t('th_badge')}</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((l, idx) => (
              <tr key={idx}>
                <td className="rank-cell">{l.rank}</td>
                <td><strong>{l.name}</strong></td>
                <td>{l.district}</td>
                <td><span className="blood-chip">{l.group}</span></td>
                <td><span className="lives-saved-count">{l.saved}</span></td>
                <td><span className={`badge-tag ${l.badgeClass}`}>{l.badge}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
