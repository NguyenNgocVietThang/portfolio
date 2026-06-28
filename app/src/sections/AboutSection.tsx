import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/SectionHeading';
import { FileText, Workflow, Code2, Wrench, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 32, label: 'Tables in ERD', color: 'var(--accent-coral)' },
  { number: 8, label: 'SOPs Designed', color: 'var(--accent-amber)' },
  { number: 7, label: 'RBAC Roles', color: 'var(--accent-coral)' },
  { number: 33, label: 'Permissions', color: 'var(--accent-amber)' },
];

const competencies = [
  {
    icon: FileText,
    title: 'Requirements Engineering',
    items: ['BRD — As-Is/To-Be analysis', 'SRS — Functional & Non-Functional', 'Use Case modeling', 'Requirements Traceability Matrix'],
  },
  {
    icon: Workflow,
    title: 'Process & Workflow Design',
    items: ['BPMN 2.0 Multi-lane diagrams', '8 Standard Operating Procedures', 'Change Request & Approval Workflow', '5-step Change Management process'],
  },
  {
    icon: Code2,
    title: 'Technical BA Skills',
    items: ['ERD design — 32-table schema', 'RBAC permission matrix', 'REST API specification', 'CPM algorithm documentation', 'AI integration requirements'],
  },
  {
    icon: Wrench,
    title: 'Tools & Platforms',
    items: ['Draw.io — ERD, Use Case, Sequence', 'Markdown, Word — BRD/SRS', 'GitHub — version tracking', 'Microsoft Project — planning', 'PostgreSQL — database design'],
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Content entrance animation
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, rotationX: 45, y: 100 },
        {
          opacity: 1,
          rotationX: 0,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Stats count-up animation
    if (statsRef.current) {
      const statEls = statsRef.current.querySelectorAll('.stat-item');
      statEls.forEach((el) => {
        const numEl = el.querySelector('.stat-number');
        const target = parseInt(numEl?.getAttribute('data-target') || '0', 10);
        const proxy = { value: 0 };

        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.to(proxy, {
          value: target,
          duration: 1.5,
          ease: 'power2.out',
          snap: { value: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            if (numEl) numEl.textContent = String(Math.round(proxy.value));
          },
        });
      });
    }

    // Competency cards entrance
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.comp-card');
      gsap.fromTo(
        cards,
        { opacity: 0, rotationX: 45, y: 100 },
        {
          opacity: 1,
          rotationX: 0,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st: any) => {
        if (st.trigger && sectionRef.current?.contains(st.trigger as Element)) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative"
      style={{ padding: '120px 48px', perspective: '1000px' }}
    >
      {/* Background orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          top: '10%',
          left: '5%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,148,58,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-[1280px] mx-auto relative" style={{ zIndex: 2 }}>
        <SectionHeading number="01" title="OVERVIEW" subtitle="Future Business Analyst" />

        {/* Content row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mt-16 lg:mt-20">
          {/* Left - Bio */}
          <div ref={contentRef} className="lg:col-span-2" style={{ transformStyle: 'preserve-3d' }}>
            <div className="font-caption mb-6" style={{ color: 'var(--accent-coral)' }}>
              ABOUT ME
            </div>
            <div className="space-y-4">
              <p className="font-body-large text-lg md:text-xl" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Final-year Information Technology student at the Academy of Cryptography Techniques with a GPA of 3.21/4.0. Strong interest in Business Analysis, Software Development Life Cycle (SDLC), and system design.
              </p>
              <p className="font-body-large text-lg md:text-xl" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Experienced in analyzing business requirements through academic projects, creating system models, and documenting software requirements.
              </p>
              <p className="font-body-large text-lg md:text-xl" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Seeking a Business Analyst Intern position to further develop expertise in requirement gathering, process analysis, User Story creation, Use Case modeling, and stakeholder communication.
              </p>
            </div>
            
            <div className="mt-10">
              <div className="font-caption mb-5" style={{ color: 'var(--accent-coral)' }}>
                PERSONAL STRENGTHS
              </div>
              <ul className="space-y-3">
                {[
                  'Good analytical and logical thinking',
                  'Eager to learn and possess a growth mindset',
                  'Detail-oriented and highly responsible',
                  'Effective communication and teamwork',
                  'Problem-solving and critical thinking skills'
                ].map((strength, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} style={{ color: 'var(--accent-amber)', flexShrink: 0, marginTop: 4 }} />
                    <span className="font-body text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>{strength}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 inline-block px-5 py-2.5 rounded-full border transition-colors hover:bg-[var(--surface-hover)]" style={{ borderColor: 'var(--border-active)', backgroundColor: 'var(--surface)' }}>
                <span className="font-body font-medium" style={{ color: 'var(--accent-champagne)' }}>Language:</span>
                <span className="font-body ml-2" style={{ color: 'var(--text-primary)' }}>English B2 Level</span>
              </div>
            </div>
          </div>

          {/* Right - Stats */}
          <div ref={statsRef} className="lg:col-span-3 grid grid-cols-2 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <div
                  className="stat-number font-display text-5xl md:text-6xl lg:text-[64px]"
                  style={{ color: stat.color }}
                  data-target={stat.number}
                >
                  0
                </div>
                <div className="font-body text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competencies row */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20" style={{ perspective: '1000px' }}>
          {competencies.map((comp, i) => {
            const Icon = comp.icon;
            return (
              <div
                key={i}
                className="comp-card group transition-all duration-300"
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 12,
                  padding: 32,
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-active)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,107,91,0.04), var(--surface))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'var(--surface)';
                }}
              >
                <Icon size={24} style={{ color: 'var(--accent-coral)' }} className="mb-4" />
                <h3 className="font-heading-3 text-lg md:text-xl mb-4" style={{ color: 'var(--text-primary)' }}>
                  {comp.title}
                </h3>
                <ul className="space-y-2">
                  {comp.items.map((item, j) => (
                    <li key={j} className="font-body text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
