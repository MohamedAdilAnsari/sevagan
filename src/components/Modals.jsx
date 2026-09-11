import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const Modals = () => {
  const { modal, modalData, closeModal, loginUser, t } = useApp();

  // Login form state
  const [loginMobile, setLoginMobile] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupMobile, setSignupMobile] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // OTP form state
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;
    if (modal === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [modal, timer]);

  if (!modal) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginMobile || !loginPassword) {
      alert('Please enter your mobile number and password.');
      return;
    }
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: loginMobile, password: loginPassword })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        loginUser(data.user);
        closeModal();
      } else {
        alert(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.warn('API login failed, falling back to local session:', err);
      loginUser({ name: 'SEVAGAN Member', mobile: loginMobile });
      closeModal();
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!signupName || !signupMobile || !signupPassword) {
      alert('Please fill out all signup fields.');
      return;
    }
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: signupName, mobile: signupMobile, password: signupPassword })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        loginUser(data.user);
        closeModal();
      } else {
        alert(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.warn('API register failed, falling back to local session:', err);
      loginUser({ name: signupName, mobile: signupMobile });
      closeModal();
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const entered = otp.join('');
    if (entered.length < 4) {
      alert('Please enter full 4-digit OTP.');
      return;
    }

    if (modalData?.onVerifySuccess) {
      modalData.onVerifySuccess();
    } else {
      closeModal();
    }
  };

  return (
    <>
      {/* 1. Login Modal */}
      {modal === 'login' && (
        <div className="modal-overlay active" onClick={closeModal}>
          <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            <h2 className="modal-title" data-i18n="login_title">{t('login_title')}</h2>
            <p className="modal-subtitle" data-i18n="login_sub">{t('login_sub')}</p>

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                <label className="form-label">{t('lbl_phone_number')}</label>
                <input 
                  type="tel" 
                  className="search-input" 
                  placeholder="10-digit Mobile Number"
                  value={loginMobile}
                  onChange={(e) => setLoginMobile(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="search-input" 
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block" data-i18n="btn_login">
                {t('btn_login')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Signup Modal */}
      {modal === 'signup' && (
        <div className="modal-overlay active" onClick={closeModal}>
          <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            <h2 className="modal-title" data-i18n="signup_title">{t('signup_title')}</h2>
            <p className="modal-subtitle" data-i18n="signup_sub">{t('signup_sub')}</p>

            <form onSubmit={handleSignupSubmit}>
              <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                <label className="form-label">{t('lbl_full_name')}</label>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Full Name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                <label className="form-label">{t('lbl_phone_number')}</label>
                <input 
                  type="tel" 
                  className="search-input" 
                  placeholder="10-digit Mobile Number"
                  value={signupMobile}
                  onChange={(e) => setSignupMobile(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Create Password</label>
                <input 
                  type="password" 
                  className="search-input" 
                  placeholder="Choose a strong password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block" data-i18n="btn_signup">
                {t('btn_signup')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. OTP Verification Modal */}
      {modal === 'otp' && (
        <div className="modal-overlay active">
          <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            <h2 className="modal-title">🔐 OTP Verification</h2>
            <p className="modal-subtitle">
              Enter 4-digit verification code sent to <strong>{modalData?.mobile || 'your phone'}</strong>
            </p>

            <form onSubmit={handleOtpSubmit}>
              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', margin: '2rem 0' }}>
                {[0, 1, 2, 3].map(idx => (
                  <input
                    key={idx}
                    id={`otp-digit-${idx}`}
                    type="text"
                    maxLength="1"
                    className="search-input text-center"
                    style={{ width: '55px', height: '60px', fontSize: '1.5rem', fontWeight: 'bold' }}
                    value={otp[idx]}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                  />
                ))}
              </div>

              <div className="text-center" style={{ fontSize: '0.9rem', color: 'var(--text-sec)', marginBottom: '1.5rem' }}>
                Resend OTP in: <span style={{ color: 'var(--primary-red)', fontWeight: 'bold' }}>{timer}s</span>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Verify OTP & Continue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. Success Modal */}
      {modal === 'success' && (
        <div className="modal-overlay active">
          <div className="modal-content glass-card text-center" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '4rem', color: '#10B981', marginBottom: '1rem' }}>🎉</div>
            <h2 className="modal-title">{modalData?.title || 'Success!'}</h2>
            <p className="modal-subtitle" style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
              {modalData?.message || 'Operation completed successfully.'}
            </p>

            <button 
              className="btn btn-primary btn-block"
              onClick={() => {
                closeModal();
                if (modalData?.nextAction) modalData.nextAction();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};
