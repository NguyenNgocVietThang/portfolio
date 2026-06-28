import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

type FilterType = 'all' | 'education' | 'project' | 'certificate';

interface TimelineEntry {
  id: string;
  category: FilterType;
  date: string;
  title: string;
  organization: string;
  description: string;
  tags?: string[];
}

const entries: TimelineEntry[] = [
  {
    id: '1',
    category: 'education',
    date: '2022 - 2027',
    title: 'Bachelor of Information Technology',
    organization: 'Academy of Cryptography Techniques (ACTVN)',
    description: 'Currently pursuing a Bachelor\'s degree at the Academy of Cryptography Techniques. Relevant coursework: Software Project Management, Systems Analysis and Design, Database Management, Software Engineering. Expected graduation: 2027.',
  },
  {
    id: '2',
    category: 'project',
    date: '2025',
    title: 'AI Project Management System',
    organization: 'Personal Project - Full-stack Web App',
    description: 'Building an AI-integrated project and portfolio management system. Role: Business Analyst — responsible for all BRD, SRS, 32-table ERD, BPMN, Use Cases, and RBAC matrix with 7 roles/33 permissions. Technologies: FastAPI, React 18, PostgreSQL, OpenAI GPT-4o, Gemini Pro.',
    tags: ['FastAPI', 'React', 'PostgreSQL', 'AI'],
  },
  {
    id: '3',
    category: 'certificate',
    date: '2025',
    title: 'Business Analysis Fundamentals',
    organization: 'BA Competency Certificate',
    description: 'Completed a foundational course on Business Analysis, covering: requirement elicitation techniques, As-Is/To-Be analysis, Use Case modeling, and project scope management.',
  },
];

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'education', label: 'Education' },
  { key: 'project', label: 'Projects' },
  { key: 'certificate', label: 'Certificates' },
];

const ResumeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const filteredEntries = activeFilter === 'all' ? entries : entries.filter((e) => e.category === activeFilter);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Timeline line draw animation
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Initial entrance for all items
    entries.forEach((entry) => {
      const el = itemRefs.current.get(entry.id);
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, rotationX: 45, y: 100 },
          {
            opacity: 1,
            rotationX: 0,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && sectionRef.current?.contains(st.trigger as Element)) {
          st.kill();
        }
      });
    };
  }, []);

  const handleFilter = (filter: FilterType) => {
    if (filter === activeFilter) return;
    setActiveFilter(filter);

    // Animate filter change
    const allItems = Array.from(itemRefs.current.values());

    gsap.to(allItems, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        // State will update and re-render with filtered items
        requestAnimationFrame(() => {
          const visibleItems = filteredEntries
            .map((e) => itemRefs.current.get(e.id))
            .filter(Boolean) as HTMLDivElement[];

          gsap.fromTo(
            visibleItems,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', stagger: 0.08 }
          );
        });
      },
    });
  };

  const getDotColor = (category: FilterType) => {
    switch (category) {
      case 'education':
        return 'var(--accent-coral)';
      case 'project':
        return 'var(--accent-amber)';
      case 'certificate':
        return 'var(--accent-champagne)';
      default:
        return 'var(--accent-coral)';
    }
  };

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="relative"
      style={{ padding: '120px 48px', backgroundColor: 'var(--surface)' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <SectionHeading number="02" title="EXPERIENCE" subtitle="Professional development journey" />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => handleFilter(f.key)}
              className="transition-all duration-200"
              style={{
                padding: '10px 24px',
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 500,
                border: activeFilter === f.key ? '1px solid var(--accent-coral)' : '1px solid var(--border-color)',
                backgroundColor: activeFilter === f.key ? 'var(--accent-coral)' : 'transparent',
                color: activeFilter === f.key ? '#111111' : 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== f.key) {
                  e.currentTarget.style.borderColor = 'var(--border-active)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== f.key) {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mt-16" style={{ perspective: '1000px' }}>
          {/* Vertical line - hidden on mobile */}
          <div
            ref={lineRef}
            className="absolute hidden md:block"
            style={{
              left: '30%',
              top: 0,
              bottom: 0,
              width: 1,
              backgroundColor: 'var(--border-color)',
              transformOrigin: 'top',
            }}
          />

          {/* Timeline entries */}
          <div className="space-y-12">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(entry.id, el);
                }}
                className="relative grid grid-cols-1 md:grid-cols-[30%_1fr] gap-4 md:gap-8 items-start"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Left - Date and dot */}
                <div className="flex md:flex-row-reverse items-center gap-4 md:pr-8">
                  <div className="font-caption whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
                    {entry.date}
                  </div>
                  {/* Dot on timeline */}
                  <div
                    className="hidden md:block relative z-10 flex-shrink-0"
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: getDotColor(entry.category),
                      boxShadow: `0 0 8px ${getDotColor(entry.category)}`,
                    }}
                  />
                </div>

                {/* Right - Content card */}
                <div
                  className="transition-all duration-300 hover:border-[var(--border-active)]"
                  style={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 12,
                    padding: 32,
                  }}
                >
                  <h3 className="font-heading-3 text-xl md:text-[22px]" style={{ color: 'var(--text-primary)' }}>
                    {entry.title}
                  </h3>
                  <div className="font-body text-sm font-medium mt-1" style={{ color: 'var(--accent-champagne)' }}>
                    {entry.organization}
                  </div>
                  <p className="font-body text-[15px] mt-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {entry.description}
                  </p>
                  {entry.tags && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {entry.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="font-mono-text text-[11px]"
                          style={{
                            padding: '4px 12px',
                            borderRadius: 100,
                            backgroundColor: 'rgba(255,107,91,0.1)',
                            color: 'var(--accent-coral)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
