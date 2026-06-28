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
  const name2Ref = useRef<HTMLDivElement>(null);
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

    // Name line 1 - word by word clip-path
    const words1 = name1Ref.current?.querySelectorAll('.hero-word');
    if (words1) {
      tl.fromTo(
        words1,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0 0)', duration: 0.8, ease: 'power4.out', stagger: 0.15 },
        0.2
      );
    }

    // Name line 2
    const words2 = name2Ref.current?.querySelectorAll('.hero-word');
    if (words2) {
      tl.fromTo(
        words2,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0 0)', duration: 0.8, ease: 'power4.out', stagger: 0.15 },
        0.4
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
              BUSINESS ANALYST INTERN
            </div>

            {/* Name Line 1 */}
            <div ref={name1Ref} className="overflow-hidden">
              <div className="font-display text-5xl md:text-7xl lg:text-[100px]" style={{ color: 'var(--text-primary)' }}>
                {['NGUYEN', 'NGOC'].map((word, i) => (
                  <span key={i} className="hero-word inline-block mr-[0.2em]" style={{ clipPath: 'inset(0 0 100% 0)' }}>
                    {word}
                  </span>
                ))}
              </div>
            </div>

            {/* Name Line 2 */}
            <div ref={name2Ref} className="overflow-hidden">
              <div className="font-display text-5xl md:text-7xl lg:text-[100px]" style={{ color: 'var(--text-primary)' }}>
                {['VIET', 'THANG'].map((word, i) => (
                  <span
                    key={i}
                    className="hero-word inline-block mr-[0.2em]"
                    style={{
                      clipPath: 'inset(0 0 100% 0)',
                      textShadow: word === 'THANG' ? '0 0 60px rgba(255, 107, 91, 0.3)' : 'none',
                    }}
                  >
                    {word}
                  </span>
                ))}
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
              <span className="font-serif-italic text-2xl md:text-4xl" style={{ color: 'var(--accent-champagne)' }}>
                Business Analyst Intern
              </span>
            </div>

            {/* Bio */}
            <p
              ref={bioRef}
              className="font-body-large text-base md:text-xl mt-6 mx-auto lg:mx-0 opacity-0"
              style={{ color: 'var(--text-secondary)', maxWidth: 480, lineHeight: 1.6 }}
            >
              Final-year student majoring in Information Technology at the Academy of Cryptography Techniques. Currently building an AI-integrated project management system as a personal project.
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
                  alt="Nguyen Ngoc Viet Thang"
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
