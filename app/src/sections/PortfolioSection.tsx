import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/SectionHeading';
import { ChevronLeft, ChevronRight, Play, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  type: 'text';
  quote?: string;
  author?: string;
  role?: string;
  avatar?: string;
  videoPoster?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    type: 'text',
    quote: 'Thang has excellent analytical thinking. His ability to document requirements and model processes reaches a professional level.',
    author: 'Nguyen Duc Hieu',
    role: 'University Lecturer',
  },
  {
    id: 2,
    type: 'text',
    quote: 'Thang\'s ability to understand business problems and convert them into technical requirements is very impressive. The BRD and SRS documents he wrote are very detailed and easy to understand.',
    author: 'Nguyen Thi Tram',
    role: 'University Lecturer',
  },

];

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Architecture diagram animation
  useEffect(() => {
    if (!diagramRef.current) return;

    const nodes = diagramRef.current.querySelectorAll('.arch-node');
    const lines = diagramRef.current.querySelectorAll('.arch-line');

    gsap.fromTo(
      nodes,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.5)',
        stagger: 0.1,
        scrollTrigger: {
          trigger: diagramRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );

    gsap.fromTo(
      lines,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: diagramRef.current,
          start: 'top 75%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st: any) => {
        if (st.trigger && sectionRef.current?.contains(st.trigger as Element)) {
          st.kill();
        }
      });
    };
  }, []);

  // Autoplay
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  }, []);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startAutoplay();
  };

  const goNext = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    startAutoplay();
  };

  const goPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    startAutoplay();
  };

  // Touch swipe
  const touchStart = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const techTags = ['FastAPI', 'React 18', 'PostgreSQL', 'OpenAI GPT-4o', 'Gemini Pro', 'Redis', 'Celery', 'Docker'];

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative"
      style={{ padding: '120px 48px', backgroundColor: 'var(--surface)' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <SectionHeading number="04" title="FEATURED PROJECTS" subtitle="AI-integrated project management system" />

        {/* Featured project card */}
        <div
          className="mt-16 overflow-hidden"
          style={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border-color)',
            borderRadius: 16,
          }}
        >
          {/* Architecture diagram */}
          <div
            ref={diagramRef}
            className="relative overflow-hidden hidden md:block"
            style={{ height: 360, backgroundColor: '#0D0D0D' }}
          >
            {/* Center node */}
            <div
              className="arch-node absolute"
              style={{
                width: 200,
                height: 80,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                border: '1px solid var(--accent-coral)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span className="font-mono-text text-sm" style={{ color: 'var(--accent-coral)' }}>
                AI Project Management
              </span>
            </div>

            {/* Surrounding nodes */}
            {[
              { label: 'React', x: '20%', y: '15%' },
              { label: 'FastAPI', x: '70%', y: '15%' },
              { label: 'PostgreSQL', x: '15%', y: '70%' },
              { label: 'OpenAI', x: '75%', y: '70%' },
              { label: 'Redis', x: '5%', y: '40%' },
              { label: 'Celery', x: '85%', y: '40%' },
            ].map((node, i) => (
              <div
                key={i}
                className="arch-node absolute"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  border: '1px solid var(--border-active)',
                  left: node.x,
                  top: node.y,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: `pulse-opacity 3s ease-in-out ${i * 0.3}s infinite`,
                }}
              >
                <span className="font-mono-text text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                  {node.label}
                </span>
              </div>
            ))}

            {/* Connection lines */}
            {[
              { x1: '30%', y1: '25%', x2: '42%', y2: '42%' },
              { x1: '68%', y1: '25%', x2: '58%', y2: '42%' },
              { x1: '22%', y1: '68%', x2: '42%', y2: '58%' },
              { x1: '72%', y1: '68%', x2: '58%', y2: '58%' },
              { x1: '12%', y1: '48%', x2: '38%', y2: '48%' },
              { x1: '82%', y1: '48%', x2: '62%', y2: '48%' },
            ].map((line, i) => (
              <div
                key={i}
                className="arch-line absolute"
                style={{
                  height: 1,
                  backgroundColor: 'rgba(255,107,91,0.3)',
                  left: line.x1,
                  top: line.y1,
                  width: `${Math.abs(parseInt(line.x2) - parseInt(line.x1))}%`,
                  transform: `rotate(${Math.atan2(
                    (parseInt(line.y2) - parseInt(line.y1)) * 3.6,
                    (parseInt(line.x2) - parseInt(line.x1)) * 12.8
                  )}rad)`,
                  transformOrigin: 'left center',
                }}
              />
            ))}

            <style>{`
              @keyframes pulse-opacity {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
              }
            `}</style>
          </div>

          {/* Project info */}
          <div style={{ padding: 48 }}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <h3 className="font-heading-2 text-2xl md:text-[32px]" style={{ color: 'var(--text-primary)' }}>
                AI-Integrated Project Management System
              </h3>
              <a
                href="https://github.com/NguyenNgocVietThang/ai-project-management"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="flex items-center gap-2 transition-all duration-200 flex-shrink-0"
                style={{
                  padding: '10px 24px',
                  borderRadius: 100,
                  border: '1px solid var(--accent-coral)',
                  color: 'var(--accent-coral)',
                  fontSize: 14,
                  fontWeight: 500,
                  width: 'fit-content',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-coral)';
                  e.currentTarget.style.color = '#111111';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--accent-coral)';
                }}
              >
                <Github size={16} />
                View on GitHub
              </a>
            </div>

            <p className="font-body text-base mt-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              A fully functional project and portfolio management platform, integrating AI to support planning, resource allocation, and risk analysis. The project is designed and documented end-to-end like a commercial BA product — from BRD, SRS, ERD to BPMN and RBAC matrix.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { number: '32', label: 'Database tables', color: 'var(--accent-coral)' },
                { number: '7', label: 'RBAC roles', color: 'var(--accent-amber)' },
                { number: '8', label: 'Documents', color: 'var(--accent-coral)' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center py-4"
                  style={{
                    borderLeft: i > 0 ? '1px solid var(--border-color)' : 'none',
                  }}
                >
                  <div className="font-heading-2 text-3xl md:text-4xl" style={{ color: stat.color }}>
                    {stat.number}
                  </div>
                  <div className="font-caption mt-1" style={{ color: 'var(--text-secondary)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {techTags.map((tag, i) => (
                <span
                  key={i}
                  className="font-mono-text text-[11px]"
                  style={{
                    padding: '4px 12px',
                    borderRadius: 100,
                    backgroundColor: 'rgba(212,148,58,0.1)',
                    color: 'var(--accent-amber)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-24">
          <h3 className="font-heading-2 text-3xl md:text-5xl" style={{ color: 'var(--text-primary)' }}>
            TESTIMONIALS
          </h3>
          <p className="font-body-large text-lg mt-3" style={{ color: 'var(--text-secondary)' }}>
            Feedback from colleagues and mentors
          </p>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="relative mt-12 overflow-hidden"
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-600"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                transitionDuration: '0.6s',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="w-full flex-shrink-0" style={{ padding: '0 48px' }}>
                  {t.type === 'text' ? (
                    <div className="max-w-3xl mx-auto">
                      {/* Quote mark */}
                      <div
                        className="font-display text-6xl md:text-[80px] leading-none float-left mr-4"
                        style={{ color: 'var(--accent-coral)' }}
                      >
                        &ldquo;
                      </div>
                      <p
                        className="font-body-large text-lg md:text-xl italic"
                        style={{ color: 'var(--text-primary)', lineHeight: 1.7, minHeight: 120 }}
                      >
                        {t.quote}
                      </p>
                      {/* Author */}
                      <div className="flex items-center gap-4 mt-8 clear-left">
                        <div
                          className="flex-shrink-0"
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            backgroundColor: 'var(--surface)',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 18,
                            fontWeight: 600,
                            color: 'var(--accent-coral)',
                          }}
                        >
                          {t.author?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-body text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {t.author}
                          </div>
                          <div className="font-caption" style={{ color: 'var(--text-secondary)' }}>
                            {t.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Video testimonial */
                    <div className="max-w-3xl mx-auto flex justify-center">
                      <div
                        className="relative w-full"
                        style={{ maxWidth: 720, aspectRatio: '16/9', borderRadius: 12, overflow: 'hidden', backgroundColor: '#0D0D0D' }}
                      >
                        <video
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          poster={t.videoPoster}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                          onEnded={() => setIsPlaying(false)}
                        >
                          <source src="" type="video/mp4" />
                        </video>
                        {!isPlaying && (
                          <button
                            onClick={() => videoRef.current?.play()}
                            className="absolute inset-0 flex items-center justify-center transition-transform duration-200 hover:scale-110"
                            style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                          >
                            <div
                              style={{
                                width: 64,
                                height: 64,
                                borderRadius: '50%',
                                backgroundColor: 'var(--accent-coral)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Play size={24} fill="white" color="white" />
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={goPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-200 hidden md:flex items-center justify-center"
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: '1px solid var(--border-active)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-coral)';
                e.currentTarget.style.color = 'var(--accent-coral)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-active)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-200 hidden md:flex items-center justify-center"
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: '1px solid var(--border-active)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-coral)';
                e.currentTarget.style.color = 'var(--accent-coral)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-active)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <ChevronRight size={20} />
            </button>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className="transition-all duration-200"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: i === currentSlide ? 'var(--accent-coral)' : 'var(--border-color)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
