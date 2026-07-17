import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface HeroSectionProps {
  isReady: boolean;
  scrollTo: (target: string) => void;
}

const HeroSection = ({ isReady, scrollTo }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const name1Ref = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isReady || !sectionRef.current) return;

    const tl = gsap.timeline();

    // Caption fade in
    tl.fromTo(
      captionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0
    );

    // Name typing effect
    const chars = name1Ref.current?.querySelectorAll('.hero-char');
    if (chars) {
      tl.fromTo(
        chars,
        { opacity: 0 },
        { opacity: 1, duration: 0.05, stagger: 0.05, ease: 'steps(1)' },
        0.2
      );
    }

    // Blinking cursor
    const cursor = name1Ref.current?.querySelector('.hero-cursor');
    if (cursor) {
      tl.fromTo(
        cursor,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, repeat: -1, yoyo: true, ease: 'steps(1)' },
        0
      );
    }

    // Horizontal rule
    tl.fromTo(
      ruleRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'power3.out', transformOrigin: 'left' },
      0.6
    );

    // Title
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0.7
    );

    // Bio
    tl.fromTo(
      bioRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0.9
    );

    // CTA buttons
    const ctas = ctaRef.current?.querySelectorAll('button');
    if (ctas) {
      tl.fromTo(
        ctas,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 },
        1.1
      );
    }

    // Portrait circle
    tl.fromTo(
      portraitRef.current,
      { opacity: 0, scale: 0.8, rotation: -10 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.4)' },
      0.3
    );

    return () => {
      tl.kill();
    };
  }, [isReady]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center"
      style={{ padding: '0 48px' }}
    >
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-0">
          {/* Left column - Text */}
          <div className="w-full lg:w-[55%] text-center lg:text-left">
            {/* Caption */}
            <div ref={captionRef} className="font-caption mb-6 opacity-0" style={{ color: 'var(--accent-coral)', letterSpacing: 3 }}>
              BUSINESS ANALYST
            </div>

            {/* Name */}
            <div ref={name1Ref} className="overflow-hidden mb-2">
              <div className="font-heading text-[6vw] sm:text-[32px] md:text-[42px] lg:text-[48px] xl:text-[54px] tracking-tight whitespace-nowrap" style={{ color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {"Nguyễn Ngọc Việt Thắng".split('').map((char, i) => (
                  <span key={i} className="hero-char inline-block" style={{ opacity: 0 }}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
                <span className="hero-cursor inline-block w-[3px] sm:w-[4px] h-[0.9em] bg-[var(--accent-coral)] ml-1 align-middle opacity-0" />
              </div>
            </div>

            {/* Horizontal rule */}
            <div
              ref={ruleRef}
              className="mx-auto lg:mx-0 my-8"
              style={{ width: 60, height: 1, backgroundColor: 'var(--accent-coral)', transformOrigin: 'left' }}
            />

            {/* Title */}
            <div ref={titleRef} className="opacity-0">
              <span className="font-sans text-2xl md:text-4xl" style={{ color: 'var(--accent-champagne)', fontFamily: 'var(--font-sans)' }}>
                Business Analyst
              </span>
            </div>

            {/* Bio */}
            <p
              ref={bioRef}
              className="font-body-large text-base md:text-xl mt-6 mx-auto lg:mx-0 opacity-0"
              style={{ color: '#ffffff', maxWidth: 480, lineHeight: 1.6 }}
            >
              Final-year Information Technology student at the Academy of Cryptography Techniques with a GPA of 3.21/4.0. Currently building an AI-integrated Project Management System — a full-stack web application as a personal project to showcase end-to-end BA skills: requirements engineering, process design, system architecture documentation, and AI-driven process automation.
            </p>

            {/* CTA buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center lg:justify-start mt-10">
              <button
                onClick={() => scrollTo('#portfolio')}
                className="transition-all duration-200"
                style={{
                  padding: '14px 32px',
                  borderRadius: 100,
                  backgroundColor: 'var(--accent-coral)',
                  color: '#111111',
                  fontSize: 14,
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.1)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo('#contact')}
                className="transition-all duration-200"
                style={{
                  padding: '14px 32px',
                  borderRadius: 100,
                  border: '1px solid var(--border-active)',
                  color: 'var(--text-primary)',
                  fontSize: 14,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-champagne)';
                  e.currentTarget.style.color = 'var(--accent-champagne)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-active)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Right column - Portrait */}
          <div className="w-full lg:w-[45%] flex justify-center">
            <div ref={portraitRef} className="relative opacity-0" style={{ width: 280, height: 280 }}>
              {/* Background orb */}
              <div
                className="absolute"
                style={{
                  width: 500,
                  height: 500,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,107,91,0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  animation: 'pulse-orb 4s ease-in-out infinite',
                  zIndex: 0,
                }}
              />
              {/* Portrait circle */}
              <div
                className="portrait-circle relative"
                style={{
                  width: 280,
                  height: 280,
                  animation: 'float 6s ease-in-out infinite',
                  zIndex: 1,
                }}
              >
                <img
                  src="/assets/portrait.jpg"
                  alt="Nguyễn Ngọc Việt Thắng"
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '50%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
