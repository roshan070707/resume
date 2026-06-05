import React from 'react';
import Navbar from '../components/Navbar';
import ContactSection from '../components/ContactSection';
import BackgroundEffects from '../components/BackgroundEffects';

const ContactPage = () => {
  return (
    <>
      <BackgroundEffects />
      <Navbar />
      <main style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ContactSection />
      </main>
    </>
  );
};

export default ContactPage;
