import React from 'react';
import Navbar from '../components/Navbar';
import AtsScannerSection from '../components/AtsScannerSection';
import BackgroundEffects from '../components/BackgroundEffects';

const AtsPage = () => {
  return (
    <>
      <BackgroundEffects />
      <Navbar />
      <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
        <AtsScannerSection />
      </main>
    </>
  );
};

export default AtsPage;
