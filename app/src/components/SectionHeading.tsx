import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle: string;
}

const SectionHeading = ({ number, title, subtitle }: SectionHeadingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return;

    // Clip-path reveal for title words
    const words = titleRef.current.querySelectorAll('.clip-word');
    gsap.fromTo(
      words,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0 0)',
        duration: 1.0,
        ease: 'power4.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Fade in number and subtitle
    const els = containerRef.current.querySelectorAll('.fade-in');
    gsap.fromTo(
      els,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current) st.kill();
      });
    };
  }, [title]);

  const titleWords = title.split(' ');

  return (
    <div ref={containerRef} className="mb-12 md:mb-16">
      <div className="fade-in font-mono-text text-[13px] mb-4" style={{ color: 'var(--accent-coral)' }}>
        {number}
      </div>
      <div className="flex items-end gap-6">
        <h2 ref={titleRef} className="font-heading text-4xl md:text-6xl lg:text-[72px]" style={{ color: 'var(--text-primary)' }}>
          {titleWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
              <span className="clip-word inline-block">{word}</span>
            </span>
          ))}
        </h2>
        <div className="hidden md:block fade-in mb-3" style={{ width: 120, height: 1, backgroundColor: 'var(--border-color)' }} />
      </div>
      <p className="fade-in font-serif-italic text-xl md:text-2xl mt-4" style={{ color: 'var(--accent-champagne)' }}>
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeading;
