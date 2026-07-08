import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import ToolMarquee from '../components/sections/ToolMarquee';
import ChartGallery from '../components/sections/ChartGallery';
import WhatIDo from '../components/sections/WhatIDo';
import CaseStudies from '../components/sections/CaseStudies';
import HowIThink from '../components/sections/HowIThink';
import Skills from '../components/sections/Skills';
import About from '../components/sections/About';
import Process from '../components/sections/Process';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <CaseStudies />
    <HowIThink />
    <ChartGallery />
    <ToolMarquee />
    <WhatIDo />
    <Skills />
    <About />
    <Process />
    <Experience />
    <Contact />
    <Footer />
  </>
);

export default Home;
