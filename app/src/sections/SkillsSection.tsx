import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  percentage: number;
  color: string;
}

const professionalSkills: Skill[] = [
  { name: 'Requirements Engineering (BRD/SRS)', percentage: 90, color: 'var(--accent-coral)' },
  { name: 'Process Modeling (BPMN/SOP)', percentage: 85, color: 'var(--accent-coral)' },
  { name: 'Database Design (ERD/PostgreSQL)', percentage: 80, color: 'var(--accent-coral)' },
  { name: 'System Architecture Documentation', percentage: 78, color: 'var(--accent-coral)' },
  { name: 'API Specification (REST)', percentage: 75, color: 'var(--accent-coral)' },
  { name: 'AI Integration Requirements', percentage: 70, color: 'var(--accent-coral)' },
];

const techSkills: Skill[] = [
  { name: 'Draw.io / Diagramming', percentage: 95, color: 'var(--accent-amber)' },
  { name: 'Markdown / Technical Writing', percentage: 90, color: 'var(--accent-amber)' },
  { name: 'FastAPI / Python', percentage: 82, color: 'var(--accent-amber)' },
  { name: 'React / TypeScript', percentage: 75, color: 'var(--accent-amber)' },
  { name: 'PostgreSQL / SQL', percentage: 85, color: 'var(--accent-amber)' },
  { name: 'Git / GitHub', percentage: 88, color: 'var(--accent-amber)' },
];

const otherTools = [
  'Microsoft Project',
  'Docker',
  'Redis',
  'Celery',
  'MinIO',
  'JWT + RBAC',
  'Alembic',
  'OpenAI API',
  'Gemini Pro',
  'Vite',
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !skillsRef.current) return;

    // Animate skill items and progress bars
    const skillItems = skillsRef.current.querySelectorAll('.skill-item');
    skillItems.forEach((item) => {
      const fill = item.querySelector('.progress-fill') as HTMLElement;
      const glow = item.querySelector('.progress-glow') as HTMLElement;
      const target = parseInt(item.getAttribute('data-percentage') || '0', 10);

      // Item entrance
      gsap.fromTo(
        item,
        { opacity: 0, rotationX: 45, y: 60 },
        {
          opacity: 1,
          rotationX: 0,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Progress bar fill
      if (fill) {
        gsap.fromTo(
          fill,
          { width: '0%' },
          {
            width: `${target}%`,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // Glow dot follows the bar
      if (glow) {
        gsap.fromTo(
          glow,
          { left: '0%', opacity: 0.6 },
          {
            left: `${target}%`,
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    });

    // Tool tags fade in
    if (toolsRef.current) {
      const tags = toolsRef.current.querySelectorAll('.tool-tag');
      gsap.fromTo(
        tags,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.04,
          scrollTrigger: {
            trigger: toolsRef.current,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
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
      id="skills"
      ref={sectionRef}
      className="relative"
      style={{ padding: '120px 48px' }}
    >
      {/* Background orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: '20%',
          right: '10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,91,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-[1280px] mx-auto relative" style={{ zIndex: 2 }}>
        <SectionHeading number="03" title="SKILLS" subtitle="Professional and technical capabilities" />

        {/* Skills grid */}
        <div ref={skillsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-20" style={{ perspective: '1000px' }}>
          {/* Left column - Professional Skills */}
          <div>
            <div className="font-caption mb-10" style={{ color: 'var(--accent-coral)' }}>
              PROFESSIONAL SKILLS
            </div>
            <div className="space-y-8">
              {professionalSkills.map((skill, i) => (
                <div
                  key={i}
                  className="skill-item"
                  data-percentage={skill.percentage}
                  data-color={skill.color}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-heading-3 text-base md:text-lg" style={{ color: 'var(--text-primary)' }}>
                      {skill.name}
                    </span>
                    <span className="font-mono-text text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="relative" style={{ height: 6, borderRadius: 3, backgroundColor: 'var(--progress-track)' }}>
                    <div
                      className="progress-fill absolute top-0 left-0 h-full"
                      style={{
                        width: 0,
                        borderRadius: 3,
                        backgroundColor: skill.color,
                      }}
                    />
                    {/* Glow dot at leading edge */}
                    <div
                      className="progress-glow absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: skill.color,
                        filter: 'blur(3px)',
                        opacity: 0,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Tech Skills */}
          <div>
            <div className="font-caption mb-10" style={{ color: 'var(--accent-coral)' }}>
              TECHNOLOGIES
            </div>
            <div className="space-y-8">
              {techSkills.map((skill, i) => (
                <div
                  key={i}
                  className="skill-item"
                  data-percentage={skill.percentage}
                  data-color={skill.color}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-heading-3 text-base md:text-lg" style={{ color: 'var(--text-primary)' }}>
                      {skill.name}
                    </span>
                    <span className="font-mono-text text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="relative" style={{ height: 6, borderRadius: 3, backgroundColor: 'var(--progress-track)' }}>
                    <div
                      className="progress-fill absolute top-0 left-0 h-full"
                      style={{
                        width: 0,
                        borderRadius: 3,
                        backgroundColor: skill.color,
                      }}
                    />
                    <div
                      className="progress-glow absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: skill.color,
                        filter: 'blur(3px)',
                        opacity: 0,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional tools */}
        <div ref={toolsRef} className="mt-16">
          <div className="font-caption mb-6" style={{ color: 'var(--accent-coral)' }}>
            OTHER TECHNOLOGIES
          </div>
          <div className="flex flex-wrap gap-3">
            {otherTools.map((tool, i) => (
              <span
                key={i}
                className="tool-tag font-mono-text text-[13px] transition-all duration-200 cursor-default"
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  backgroundColor: 'rgba(212,148,58,0.1)',
                  border: '1px solid rgba(212,148,58,0.2)',
                  color: 'var(--accent-amber)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(212,148,58,0.2)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(212,148,58,0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
