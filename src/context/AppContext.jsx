import React, { createContext, useContext, useState, useEffect } from 'react';
import { i18n, DEFAULT_DONORS } from '../data/constants';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('sevagan_theme') || 'dark');
  
  // Language state
  const [language, setLanguage] = useState(() => localStorage.getItem('sevagan_language') || 'en');

  // Navigation state
  const [activeSection, setActiveSection] = useState('home');

  // User Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('sevagan_logged_in') === 'true');
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sevagan_user')) || null;
    } catch {
      return null;
    }
  });

  // Donors state
  const [donors, setDonors] = useState([]);

  // Emergency Requests state
  const [requests, setRequests] = useState([]);

  // Fetch initial donors & requests from API
  const fetchDonorsFromApi = async () => {
    try {
      const res = await fetch('/api/donors');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setDonors(data);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend API connection failed, fallback to local default donors', err);
    }
    // Fallback to local default donors if API yields empty or fails
    const stored = localStorage.getItem('sevagan_donors');
    if (stored) {
      try { setDonors(JSON.parse(stored)); return; } catch (e) {}
    }
    setDonors(DEFAULT_DONORS);
  };

  const fetchRequestsFromApi = async () => {
    try {
      const res = await fetch('/api/requests');
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setRequests(data);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend API connection failed for requests', err);
    }
    const stored = localStorage.getItem('sevagan_requests');
    if (stored) {
      try { setRequests(JSON.parse(stored)); } catch (e) {}
    }
  };

  // Notifications state
  const [latestNotification, setLatestNotification] = useState(null);
  const [notificationsList, setNotificationsList] = useState([]);

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  useEffect(() => {
    fetchDonorsFromApi();
    fetchRequestsFromApi();
    requestNotificationPermission();

    // Setup Server-Sent Events (SSE) stream for real-time login/signup alerts
    let eventSource;
    try {
      eventSource = new EventSource('/api/events/stream');

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data) {
            setLatestNotification(data);
            setNotificationsList(prev => [data, ...prev]);

            // Trigger Desktop Browser Push Notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(data.title || 'SEVAGAN Alert', {
                body: data.message,
                icon: '/blood-donation.png'
              });
            }
          }
        } catch (e) {
          console.error('Error parsing SSE event data:', e);
        }
      };

      eventSource.onerror = (err) => {
        console.warn('SSE EventSource disconnected or retrying:', err);
      };
    } catch (e) {
      console.warn('SSE not supported or connection error:', e);
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);

  // Modals state
  const [modal, setModal] = useState(null); // 'login', 'signup', 'otp', 'success'
  const [modalData, setModalData] = useState({});

  // Sync theme with DOM body class
  useEffect(() => {
    localStorage.setItem('sevagan_theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  // Sync language with localStorage
  useEffect(() => {
    localStorage.setItem('sevagan_language', language);
  }, [language]);

  // Translation helper
  const t = (key) => {
    const dict = i18n[language] || i18n['en'];
    return dict[key] !== undefined ? dict[key] : (i18n['en'][key] || key);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const changeLanguage = (lang) => {
    if (i18n[lang]) {
      setLanguage(lang);
    }
  };

  const navigateToSection = (sectionId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  const loginUser = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('sevagan_logged_in', 'true');
    localStorage.setItem('sevagan_user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('sevagan_logged_in');
    localStorage.removeItem('sevagan_user');
  };

  const registerDonor = async (donorData) => {
    try {
      const res = await fetch('/api/donors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donorData)
      });
      if (res.ok) {
        const body = await res.json();
        if (body.donor) {
          setDonors(prev => [body.donor, ...prev]);
          return body.donor;
        }
      }
    } catch (err) {
      console.error('Failed to post donor to backend API:', err);
    }
    // Fallback local addition
    setDonors(prev => [donorData, ...prev]);
    localStorage.setItem('sevagan_real_donor_active', 'true');
    return donorData;
  };

  const addEmergencyRequest = async (reqData) => {
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData)
      });
      if (res.ok) {
        const body = await res.json();
        if (body.request) {
          setRequests(prev => [body.request, ...prev]);
          return body.request;
        }
      }
    } catch (err) {
      console.error('Failed to post emergency request to backend API:', err);
    }
    // Fallback local addition
    setRequests(prev => [reqData, ...prev]);
    return reqData;
  };

  const openModal = (modalName, data = {}) => {
    setModalData(data);
    setModal(modalName);
  };

  const closeModal = () => {
    setModal(null);
    setModalData({});
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      language,
      changeLanguage,
      t,
      activeSection,
      navigateToSection,
      isLoggedIn,
      user,
      loginUser,
      logoutUser,
      donors,
      registerDonor,
      requests,
      addEmergencyRequest,
      fetchDonorsFromApi,
      fetchRequestsFromApi,
      latestNotification,
      notificationsList,
      requestNotificationPermission,
      modal,
      modalData,
      openModal,
      closeModal
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

