import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PrismaticGlow from '@/components/PrismaticGlow';
import GridOverlay from '@/components/GridOverlay';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import ResumeSection from '@/sections/ResumeSection';
import SkillsSection from '@/sections/SkillsSection';
import PortfolioSection from '@/sections/PortfolioSection';
import ContactSection from '@/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Handle loading
    const handleReady = () => {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setIsReady(true), 600);
      }, 800);
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(handleReady);
    } else {
      handleReady();
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const scrollTo = (target: string) => {
    lenisRef.current?.scrollTo(target, { offset: -64 });
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <PrismaticGlow />
      <GridOverlay lenisRef={lenisRef} />
      <CustomCursor />
      <Navigation scrollTo={scrollTo} />
      <main>
        <HeroSection isReady={isReady} scrollTo={scrollTo} />
        <AboutSection />
        <ResumeSection />
        <SkillsSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer scrollTo={scrollTo} />
    </>
  );
}

export default App;
