import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import CaseStudies from '../components/sections/CaseStudies';
import Process from '../components/sections/Process';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <CaseStudies />
    <Process />
    <Experience />
    <Contact />
    <Footer />
  </>
);

export default Home;
