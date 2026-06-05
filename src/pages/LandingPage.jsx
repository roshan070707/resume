import React from 'react';
import BackgroundEffects from '../components/BackgroundEffects';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';
import TemplateShowcase from '../components/TemplateShowcase';
import DashboardShowcase from '../components/DashboardShowcase';
import TrustSection from '../components/TrustSection';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      <BackgroundEffects />
      <Navbar />
      <main>
        <Hero />
        <FeaturesSection />
        <TemplateShowcase />
        <DashboardShowcase />
        <TrustSection />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
