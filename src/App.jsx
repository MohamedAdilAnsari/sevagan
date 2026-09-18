import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { BloodWavesCanvas } from './components/BloodWavesCanvas';
import { SosTickerBar } from './components/SosTickerBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FindDonorsSection } from './components/FindDonorsSection';
import { BecomeDonorSection } from './components/BecomeDonorSection';
import { RequestBloodSection } from './components/RequestBloodSection';
import { AboutSection } from './components/AboutSection';
import { ProfileSection } from './components/ProfileSection';
import { Modals } from './components/Modals';
import { LoginNotificationBanner } from './components/LoginNotificationBanner';
import { Footer } from './components/Footer';

const MainContent = () => {
  const { activeSection } = useApp();

  return (
    <main className="main-content">
      {activeSection === 'home' && <HeroSection />}
      {activeSection === 'find-donors' && <FindDonorsSection />}
      {activeSection === 'become-donor' && <BecomeDonorSection />}
      {activeSection === 'request-blood' && <RequestBloodSection />}
      {activeSection === 'about' && <AboutSection />}
      {activeSection === 'profile' && <ProfileSection />}
      {activeSection === 'requests' && <RequestBloodSection />}
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <BloodWavesCanvas />
        <SosTickerBar />
        <Navbar />
        <MainContent />
        <Modals />
        <LoginNotificationBanner />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
