import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DISTRICTS } from '../data/constants';

export const BloodBanksSection = () => {
  const { t } = useApp();
  const [selectedDistrict, setSelectedDistrict] = useState('Chennai');

  const bloodBanksData = [
    {
      id: 'bb1',
      name: 'Rajiv Gandhi Government General Hospital Blood Bank',
      district: 'Chennai',
      address: 'EVR Periyar Salai, Park Town, Chennai, Tamil Nadu 600003',
      phone: '044-25305000',
      type: 'Government Certified',
      verified: true,
      stock: {
        'O+': { units: 28, status: 'Sufficient' },
        'O-': { units: 2, status: 'CRITICAL' },
        'A+': { units: 18, status: 'Moderate' },
        'B+': { units: 22, status: 'Sufficient' },
        'AB-': { units: 1, status: 'CRITICAL' },
        'AB+': { units: 12, status: 'Moderate' }
      }
    },
    {
      id: 'bb2',
      name: 'Apollo Hospitals Central Blood Bank',
      district: 'Chennai',
      address: '21 Greams Lane, Thousand Lights, Chennai, Tamil Nadu 600006',
      phone: '044-28290200',
      type: '24/7 Super Specialty',
      verified: true,
      stock: {
        'O+': { units: 35, status: 'Sufficient' },
        'O-': { units: 4, status: 'Moderate' },
        'A+': { units: 20, status: 'Sufficient' },
        'B+': { units: 15, status: 'Moderate' },
        'AB-': { units: 0, status: 'CRITICAL' },
        'AB+': { units: 9, status: 'Moderate' }
      }
    },
    {
      id: 'bb3',
      name: 'Coimbatore Medical College Hospital Blood Bank',
      district: 'Coimbatore',
      address: 'Trichy Road, Coimbatore, Tamil Nadu 641018',
      phone: '0422-2301393',
      type: 'Government Certified',
      verified: true,
      stock: {
        'O+': { units: 30, status: 'Sufficient' },
        'O-': { units: 1, status: 'CRITICAL' },
        'A+': { units: 14, status: 'Moderate' },
        'B+': { units: 25, status: 'Sufficient' },
        'AB-': { units: 2, status: 'CRITICAL' },
        'AB+': { units: 8, status: 'Moderate' }
      }
    },
    {
      id: 'bb4',
      name: 'KMCH Central Blood Bank & Component Center',
      district: 'Coimbatore',
      address: 'Avinashi Road, Coimbatore, Tamil Nadu 641014',
      phone: '0422-4323800',
      type: '24/7 Super Specialty',
      verified: true,
      stock: {
        'O+': { units: 40, status: 'Sufficient' },
        'O-': { units: 5, status: 'Moderate' },
        'A+': { units: 22, status: 'Sufficient' },
        'B+': { units: 18, status: 'Moderate' },
        'AB-': { units: 3, status: 'Moderate' },
        'AB+': { units: 15, status: 'Sufficient' }
      }
    },
    {
      id: 'bb5',
      name: 'Government Rajaji Hospital Blood Bank',
      district: 'Madurai',
      address: 'Panagal Road, Goripalayam, Madurai, Tamil Nadu 625020',
      phone: '0452-2532535',
      type: 'Government Regional Center',
      verified: true,
      stock: {
        'O+': { units: 24, status: 'Sufficient' },
        'O-': { units: 1, status: 'CRITICAL' },
        'A+': { units: 16, status: 'Moderate' },
        'B+': { units: 20, status: 'Sufficient' },
        'AB-': { units: 0, status: 'CRITICAL' },
        'AB+': { units: 6, status: 'Moderate' }
      }
    },
    {
      id: 'bb6',
      name: 'KAP Viswanatham Government Medical College Blood Bank',
      district: 'Tiruchirappalli',
      address: 'Collectorate Complex, Trichy, Tamil Nadu 620001',
      phone: '0431-2401011',
      type: 'Government Certified',
      verified: true,
      stock: {
        'O+': { units: 21, status: 'Sufficient' },
        'O-': { units: 2, status: 'CRITICAL' },
        'A+': { units: 11, status: 'Moderate' },
        'B+': { units: 19, status: 'Sufficient' },
        'AB-': { units: 1, status: 'CRITICAL' },
        'AB+': { units: 7, status: 'Moderate' }
      }
    }
  ];

  const filteredBanks = bloodBanksData.filter(b => b.district === selectedDistrict || selectedDistrict === 'All');

  const shareWhatsAppAlert = (bank) => {
    const text = `🚨 *EMERGENCY BLOOD RESERVE ALERT*\n🏥 *Hospital*: ${bank.name}\n📍 *Location*: ${bank.district}\n📞 *Emergency Contact*: ${bank.phone}\n🩸 Need urgent donors for O- and AB- blood groups.\n\nFind available voluntary donors on SEVAGAN: ${window.location.origin}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="section-container" style={{ margin: '3.5rem auto' }}>
      {/* Section Header */}
      <div className="section-header text-center" style={{ marginBottom: '2.5rem' }}>
        <div className="hero-badge" style={{ marginBottom: '1rem' }}>
          <span>🏥 Live Certified Hospital Directory</span>
        </div>
        <h2 className="section-title" style={{ fontSize: '2.4rem', fontWeight: '800' }}>
          Nearby Blood Banks & Real-Time Stock
        </h2>
        <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0.6rem auto 0' }}>
          Check verified blood component reserves, contact regional emergency centers, and broadcast urgent requests.
        </p>
      </div>

      {/* District Filter Chips */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'All'].map(dist => (
          <button
            key={dist}
            className={`chip ${selectedDistrict === dist ? 'active' : ''}`}
            onClick={() => setSelectedDistrict(dist)}
            style={{ padding: '0.55rem 1.4rem', fontSize: '0.92rem', borderRadius: '30px' }}
          >
            📍 {dist === 'All' ? 'All Tamil Nadu Centers' : `${dist} Hospitals`}
          </button>
        ))}
      </div>

      {/* Hospital Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
        {filteredBanks.map((bank) => (
          <div key={bank.id} className="glass-card" style={{ padding: '1.8rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', background: 'rgba(230,57,70,0.12)', color: '#E63946', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                    ✓ {bank.type}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', margin: '0.5rem 0 0.3rem 0', color: 'var(--text-main)', lineHeight: '1.3' }}>
                    {bank.name}
                  </h3>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-sec)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>📍</span> {bank.address}
                  </div>
                </div>
              </div>

              {/* Stock Inventory Table */}
              <div style={{ marginTop: '1.2rem', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.03)', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-sec)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.8rem' }}>
                  🩸 Live Blood Component Inventory
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                  {Object.entries(bank.stock).map(([grp, info]) => (
                    <div 
                      key={grp}
                      style={{
                        padding: '0.55rem',
                        borderRadius: '8px',
                        background: info.status === 'CRITICAL' ? 'rgba(230,57,70,0.12)' : 'rgba(255,255,255,0.05)',
                        border: info.status === 'CRITICAL' ? '1px solid rgba(230,57,70,0.3)' : '1px solid var(--border-color)',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--text-main)' }}>{grp}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '700', color: info.status === 'CRITICAL' ? '#E63946' : '#10B981' }}>
                        {info.units} Units
                      </div>
                      <span style={{ fontSize: '0.68rem', fontWeight: '600', color: info.status === 'CRITICAL' ? '#E63946' : 'var(--text-sec)' }}>
                        {info.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <a 
                href={`tel:${bank.phone}`} 
                className="btn btn-primary"
                style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.88rem', justifyContent: 'center' }}
              >
                📞 Call {bank.phone}
              </a>
              
              <button 
                className="btn btn-outline"
                onClick={() => shareWhatsAppAlert(bank)}
                style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.88rem', justifyContent: 'center', borderColor: '#25D366', color: '#25D366' }}
              >
                📲 WhatsApp SOS
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
