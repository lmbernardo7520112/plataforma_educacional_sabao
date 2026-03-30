import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Versions from './components/Versions';
import Stack from './components/Stack';
import Impact from './components/Impact';
import Footer from './components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <About />
      <Journey />
      <Versions />
      <Stack />
      <Impact />
      <Footer />
    </div>
  );
};

export default LandingPage;
