import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/SectionHeading';
import { ChevronLeft, ChevronRight, Play, Github, FileText, Check, AlertTriangle, ArrowRight, User, Settings, Info } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

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
              <div className="flex gap-3 flex-wrap flex-shrink-0 mt-2 md:mt-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      data-cursor="link"
                      className="flex items-center gap-2 transition-all duration-200"
                      style={{
                        padding: '10px 24px',
                        borderRadius: 100,
                        backgroundColor: 'var(--accent-coral)',
                        color: '#111111',
                        fontSize: 14,
                        fontWeight: 500,
                        border: '1px solid transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--accent-coral)';
                        e.currentTarget.style.borderColor = 'var(--accent-coral)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--accent-coral)';
                        e.currentTarget.style.color = '#111111';
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                    >
                      <FileText size={16} />
                      View BA Documentation
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto border-zinc-800 bg-[#0B0B0B] text-zinc-100 p-6 md:p-8">
                    <DialogHeader className="border-b border-zinc-800 pb-4 mb-6">
                      <DialogTitle className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <FileText className="text-[var(--accent-coral)]" />
                        AI Project Planning &amp; Portfolio Management System
                      </DialogTitle>
                      <DialogDescription className="text-zinc-400 text-sm mt-1">
                        Comprehensive Business Analysis Artifacts (BRD, SRS, Process Models and User Stories) — Authored by Nguyen Ngoc Viet Thang
                      </DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="context" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 bg-[#141414] p-1 border border-zinc-800 rounded-lg mb-6">
                        <TabsTrigger value="context" className="data-[state=active]:bg-[var(--accent-coral)] data-[state=active]:text-[#111111] py-2">Context &amp; Modeling</TabsTrigger>
                        <TabsTrigger value="brd" className="data-[state=active]:bg-[var(--accent-coral)] data-[state=active]:text-[#111111] py-2">BRD</TabsTrigger>
                        <TabsTrigger value="srs" className="data-[state=active]:bg-[var(--accent-coral)] data-[state=active]:text-[#111111] py-2">SRS</TabsTrigger>
                        <TabsTrigger value="stories" className="data-[state=active]:bg-[var(--accent-coral)] data-[state=active]:text-[#111111] py-2">User Stories</TabsTrigger>
                      </TabsList>

                      {/* Tab 1: Context & Process Modeling */}
                      <TabsContent value="context" className="space-y-6 outline-none animate-fade-in">
                        <div className="bg-[#141414] border border-zinc-800 rounded-lg p-5">
                          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <AlertTriangle className="text-amber-500" size={18} />
                            Problem Statement (Key Challenges)
                          </h4>
                          <ul className="space-y-3 text-zinc-400 text-sm">
                            <li className="flex gap-2">
                              <span className="text-[var(--accent-coral)] font-bold">•</span>
                              <span><strong>Manual &amp; High-Error Planning:</strong> Project scheduling and dependency mapping take 2-3 days manually, making them highly prone to scheduling conflicts and calculation errors.</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-[var(--accent-coral)] font-bold">•</span>
                              <span><strong>Resource Overallocation:</strong> Lack of automated leveling leads to worker overload (&gt;8h/day) or inefficient bench time without skill verification.</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-[var(--accent-coral)] font-bold">•</span>
                              <span><strong>Scope Creep &amp; CR Control:</strong> No standardized workflow or automated impact analysis (evaluating timeline and budget) exists before approving Change Requests (CR).</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-[var(--accent-coral)] font-bold">•</span>
                              <span><strong>Information Asymmetry:</strong> Crucial real-time metrics (like CPI, SPI, and EVA) are absent, preventing clear progress dashboards for stakeholders from PMs to Investors.</span>
                            </li>
                          </ul>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* As-Is */}
                          <div className="border border-amber-900/30 bg-[#18120F]/50 rounded-lg p-5">
                            <h4 className="text-base font-semibold text-amber-500 mb-3 flex items-center gap-2">
                              AS-IS Business Process (Current Flow)
                            </h4>
                            <ol className="space-y-3 text-zinc-400 text-sm">
                              <li className="flex gap-2">
                                <span className="bg-amber-950 text-amber-500 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">1</span>
                                <span>PM manually builds the WBS using Excel or MS Project (takes 2-3 days).</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="bg-amber-950 text-amber-500 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">2</span>
                                <span>Tasks are assigned based on intuition, leading to overallocation without alerts.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="bg-amber-950 text-amber-500 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">3</span>
                                <span>Customers request changes via email/chat; PM manually estimates impacts, risking delays.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="bg-amber-950 text-amber-500 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">4</span>
                                <span>Progress and financial reports are aggregated weekly; metrics are delayed and opaque.</span>
                              </li>
                            </ol>
                          </div>

                          {/* To-Be */}
                          <div className="border border-emerald-900/30 bg-[#0F1812]/50 rounded-lg p-5">
                            <h4 className="text-base font-semibold text-emerald-500 mb-3 flex items-center gap-2">
                              TO-BE Business Process (AI-Enabled Flow)
                            </h4>
                            <ol className="space-y-3 text-zinc-400 text-sm">
                              <li className="flex gap-2">
                                <span className="bg-emerald-950 text-emerald-500 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">1</span>
                                <span>AI automatically proposes the WBS &amp; initial Gantt Chart from a prompt (takes 10 mins).</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="bg-emerald-950 text-emerald-500 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">2</span>
                                <span>AI evaluates skills, costs, and leaves, running Resource Leveling to optimize allocation.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="bg-emerald-950 text-emerald-500 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">3</span>
                                <span>Customer submits CR; AI runs impact analysis, PM approves, and system saves baseline snapshot.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="bg-emerald-950 text-emerald-500 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">4</span>
                                <span>CPM algorithm dynamically recalculates critical path; dashboard updates EVA/CPI/SPI in real-time.</span>
                              </li>
                            </ol>
                          </div>
                        </div>
                      </TabsContent>

                      {/* Tab 2: BRD */}
                      <TabsContent value="brd" className="space-y-6 outline-none animate-fade-in">
                        <div className="bg-[#141414] border border-zinc-800 rounded-lg p-6 space-y-6 max-h-[55vh] overflow-y-auto">
                          <div>
                            <h4 className="text-lg font-bold text-white mb-2">1. Project Overview</h4>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                              <strong>Purpose:</strong> Build an intelligent portfolio and project planning management system with core MS Project features, enhanced by AI to automate WBS creation, resource leveling, risk analysis, and Change Request (CR) impact analysis.
                            </p>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                              <strong>Business Objectives:</strong> Reduce WBS generation time by 80% using OpenAI/Gemini; automate resource leveling; standardize multi-step CR workflow with AI impact analysis; provide multi-dimensional dashboards (Gantt, Burndown, EVA).
                            </p>
                          </div>

                          <div className="border-t border-zinc-800 pt-4">
                            <h4 className="text-lg font-bold text-white mb-2">2. Project Scope</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                              <div className="bg-[#1C1C1C] p-3 rounded border border-zinc-800">
                                <span className="text-emerald-500 text-xs font-semibold uppercase">In-Scope</span>
                                <ul className="list-disc list-inside text-zinc-400 text-xs mt-2 space-y-1">
                                  <li>Hierarchical Management: Portfolio &rarr; Project &rarr; Phase &rarr; Task</li>
                                  <li>Automated Critical Path Method (CPM) calculation</li>
                                  <li>AI Integration (SOP-AI-001 to SOP-AI-005)</li>
                                  <li>Change Request (CR) &amp; Approval Workflow</li>
                                  <li>Time Tracking, Worklogs &amp; CPM Recalculation</li>
                                  <li>Project Snapshotting (Versioning) &amp; Rollback</li>
                                  <li>Interactive Gantt Chart, Burndown, CPI/SPI Charts</li>
                                </ul>
                              </div>
                              <div className="bg-[#1C1C1C] p-3 rounded border border-zinc-800">
                                <span className="text-rose-500 text-xs font-semibold uppercase">Out-of-Scope (Phase 1)</span>
                                <ul className="list-disc list-inside text-zinc-400 text-xs mt-2 space-y-1">
                                  <li>Online payment gateways &amp; billing integration</li>
                                  <li>Internal code repository (Git) integration</li>
                                  <li>Internal CI/CD pipeline deployment integration</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-zinc-800 pt-4">
                            <h4 className="text-lg font-bold text-white mb-2">3. Stakeholders &amp; Roles (RBAC Matrix)</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {[
                                { role: 'Admin', desc: 'AI Configuration & System Administration' },
                                { role: 'PM', desc: 'Schedule Approval, CR & Version Management' },
                                { role: 'BA', desc: 'CR Business Review & Verification' },
                                { role: 'PO', desc: 'CR Business Sign-Off & Approval' },
                                { role: 'Member', desc: 'Task Assignment, Daily Worklog Logging' },
                                { role: 'Customer', desc: 'Initiate Change Requests (CR)' },
                                { role: 'Investor', desc: 'Read-only Portfolio Dashboard View' }
                              ].map((r, i) => (
                                <div key={i} className="bg-[#181818] p-3 rounded border border-zinc-800/80">
                                  <span className="text-[var(--accent-coral)] text-xs font-bold block">{r.role}</span>
                                  <span className="text-zinc-500 text-[11px] mt-1 block">{r.desc}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="border-t border-zinc-800 pt-4">
                            <h4 className="text-lg font-bold text-white mb-2">4. Core Business Processes (SOPs)</h4>
                            <div className="space-y-3">
                              <div className="bg-[#1A1A1A] p-3 rounded border border-zinc-800">
                                <strong className="text-zinc-200 text-xs">SOP-AI-001: AI-Powered Project Initiation</strong>
                                <p className="text-zinc-500 text-[11px] mt-1">PM inputs prompt &rarr; AI generates WBS with estimated durations &amp; dependencies &rarr; System renders initial Gantt chart.</p>
                              </div>
                              <div className="bg-[#1A1A1A] p-3 rounded border border-zinc-800">
                                <strong className="text-zinc-200 text-xs">SOP-RM-001: Resource Allocation Process</strong>
                                <p className="text-zinc-500 text-[11px] mt-1">AI recommends candidates based on skill match, cost, and leaves. PM assigns &rarr; System runs Resource Leveling to alert if load &gt;8h/day.</p>
                              </div>
                              <div className="bg-[#1A1A1A] p-3 rounded border border-zinc-800">
                                <strong className="text-zinc-200 text-xs">SOP-CR-001: Change Request Process</strong>
                                <p className="text-zinc-500 text-[11px] mt-1">Customer creates CR &rarr; BA &amp; PO review &rarr; AI runs Impact Analysis &amp; Schedule Optimization &rarr; PM approves &rarr; System saves baseline snapshot and applies changes.</p>
                              </div>
                              <div className="bg-[#1A1A1A] p-3 rounded border border-zinc-800">
                                <strong className="text-zinc-200 text-xs">SOP-PM-002: Time Tracking &amp; CPM Process</strong>
                                <p className="text-zinc-500 text-[11px] mt-1">Members log work hours daily. CPM recalculation (topological sort + forward/backward pass) triggers to identify float days &amp; the Critical Path on the Gantt chart.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      {/* Tab 3: SRS */}
                      <TabsContent value="srs" className="space-y-6 outline-none animate-fade-in">
                        <div className="bg-[#141414] border border-zinc-800 rounded-lg p-6 space-y-6 max-h-[55vh] overflow-y-auto">
                          <div>
                            <h4 className="text-lg font-bold text-white mb-2">1. System Architecture &amp; Tech Stack</h4>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                              The system conforms to a strict Layered Architecture to optimize performance, scalability, and maintainability.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                              <div className="bg-[#1A1A1A] p-3 rounded border border-zinc-800">
                                <span className="text-zinc-500 text-[10px] uppercase font-bold block">Frontend</span>
                                <span className="text-zinc-200 text-xs font-semibold mt-1 block">React 18 + Vite</span>
                                <span className="text-zinc-500 text-[10px] block">TS, Tailwind, Zustand, TanStack Query</span>
                              </div>
                              <div className="bg-[#1A1A1A] p-3 rounded border border-zinc-800">
                                <span className="text-zinc-500 text-[10px] uppercase font-bold block">Backend</span>
                                <span className="text-zinc-200 text-xs font-semibold mt-1 block">FastAPI</span>
                                <span className="text-zinc-500 text-[10px] block">Python 3.11, Pydantic v2</span>
                              </div>
                              <div className="bg-[#1A1A1A] p-3 rounded border border-zinc-800">
                                <span className="text-zinc-500 text-[10px] uppercase font-bold block">Storage &amp; Jobs</span>
                                <span className="text-zinc-200 text-xs font-semibold mt-1 block">Redis + Celery</span>
                                <span className="text-zinc-500 text-[10px] block">Asynchronous jobs, MinIO S3-compatible storage</span>
                              </div>
                              <div className="bg-[#1A1A1A] p-3 rounded border border-zinc-800">
                                <span className="text-zinc-500 text-[10px] uppercase font-bold block">Database &amp; AI</span>
                                <span className="text-zinc-200 text-xs font-semibold mt-1 block">PostgreSQL + AI API</span>
                                <span className="text-zinc-500 text-[10px] block">SQLAlchemy Async, GPT-4o, Gemini Pro</span>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-zinc-800 pt-4">
                            <h4 className="text-lg font-bold text-white mb-2">2. Core Algorithms</h4>
                            <div className="space-y-3">
                              <div className="bg-[#1C1C1C] p-3 rounded border border-zinc-800">
                                <strong className="text-zinc-200 text-xs block">CPM (Critical Path Method)</strong>
                                <span className="text-zinc-400 text-xs mt-1 block">
                                  Upon task changes, topological sort is executed, followed by forward (ES, EF) and backward (LS, LF) passes to calculate float days. Tasks with Float Days = 0 are marked as the Critical Path on the Gantt chart.
                                </span>
                              </div>
                              <div className="bg-[#1C1C1C] p-3 rounded border border-zinc-800">
                                <strong className="text-zinc-200 text-xs block">Resource Leveling Algorithm</strong>
                                <span className="text-zinc-400 text-xs mt-1 block">
                                  Aggregates daily working hours for each resource across all assignments, incorporates leave configurations, and throws warnings on overallocation (&gt;8h/day).
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-zinc-800 pt-4">
                            <h4 className="text-lg font-bold text-white mb-2">3. Key Functional Requirements</h4>
                            <ul className="list-disc list-inside text-zinc-400 text-xs space-y-2 leading-relaxed">
                              <li><strong>Authentication:</strong> JWT-based sessions, bcrypt password hashing, and endpoint-level RBAC check via dependency require_roles().</li>
                              <li><strong>Project &amp; Task Management:</strong> CRUD for Portfolio, Project, Phase, Task, and Subtasks. Supports FS, SS, FF, SF relationships with Lag Days.</li>
                              <li><strong>AI Integration:</strong> Non-blocking asynchronous Celery workers process AI tasks (Project Generation, Impact Analysis, Resource Recommender, Risk Analyzer, Doc Parser).</li>
                              <li><strong>Reporting &amp; Dashboard:</strong> Recharts visualization (Gantt, Burndown, Allocations) and EVA calculations (CPI, SPI, Earned Value).</li>
                              <li><strong>Change Management:</strong> Standardized CR states (Draft &rarr; Submitted &rarr; Under Review &rarr; Approved &rarr; Implemented) with JSON serialization for project rollback.</li>
                            </ul>
                          </div>

                          <div className="border-t border-zinc-800 pt-4">
                            <h4 className="text-lg font-bold text-white mb-2">4. Non-Functional Requirements</h4>
                            <ul className="list-disc list-inside text-zinc-400 text-xs space-y-2 leading-relaxed">
                              <li><strong>Performance:</strong> standard CRUD APIs response time &lt; 200ms; Gantt drag-and-drop CPM recalculations &lt; 500ms.</li>
                              <li><strong>Security:</strong> sensitive configs and AI keys managed strictly via environment variables (.env); full old-value/new-value audit logs.</li>
                              <li><strong>Extensibility:</strong> easily integrate new models (e.g. Llama, Claude) by inheriting from BaseAIProvider without changing core logic.</li>
                            </ul>
                          </div>
                        </div>
                      </TabsContent>

                      {/* Tab 4: User Stories */}
                      <TabsContent value="stories" className="space-y-6 outline-none animate-fade-in">
                        <div className="bg-[#141414] border border-zinc-800 rounded-lg p-5 max-h-[55vh] overflow-y-auto">
                          <h4 className="text-base font-semibold text-white mb-4">Agile User Stories (BA Artifact)</h4>
                          <div className="space-y-3">
                            {[
                              { role: 'Project Manager', prompt: 'I want to input a natural language prompt', goal: 'so that the AI can generate a structured WBS and initial Gantt Chart, reducing kickoff time by 80%.' },
                              { role: 'Project Manager', prompt: 'I want the system to calculate the Critical Path automatically upon task updates', goal: 'so that I can instantly identify tasks causing delays and optimize scheduling.' },
                              { role: 'Project Manager', prompt: 'I want the AI to suggest resource matches based on skills and leaves, and warn me on overallocation', goal: 'so that I can optimize workload distribution and prevent burnout.' },
                              { role: 'Customer', prompt: 'I want to submit Change Requests (CR) through the client portal', goal: 'so that I can easily request adjustments and track their review status.' },
                              { role: 'Project Manager', prompt: 'I want AI to generate an impact analysis report for CRs and auto-save baselines', goal: 'so that I can safely apply or rollback project updates without losing historical data.' },
                              { role: 'Member', prompt: 'I want to track time and log work logs daily against my assigned tasks', goal: 'so that the project metrics and critical path calculation stay updated in real-time.' },
                              { role: 'Investor / Owner', prompt: 'I want a read-only portfolio dashboard showing CPI, SPI, and EVA', goal: 'so that I can monitor the financial and timeline health of the entire project catalog.' }
                            ].map((story, i) => (
                              <div key={i} className="border border-zinc-800/80 bg-[#1A1A1A] p-4 rounded-lg flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-bold text-zinc-300">US_{String(i+1).padStart(2, '0')}</span>
                                  <span className="text-xs font-semibold text-[var(--accent-coral)]">As a {story.role}</span>
                                </div>
                                <div className="text-xs text-zinc-300 pl-2 border-l-2 border-zinc-700">
                                  <p><strong>I want to</strong> {story.prompt}</p>
                                  <p className="mt-1"><strong>So that</strong> {story.goal}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="mt-6 border-t border-zinc-800 pt-4 flex justify-end">
                      <DialogClose asChild>
                        <button
                          className="px-6 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-colors"
                        >
                          Close Documentation
                        </button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>

                <a
                  href="https://github.com/NguyenNgocVietThang/ai-project-management"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="flex items-center gap-2 transition-all duration-200"
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
            </div>

            <p className="font-body text-base mt-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              As the lead Business Analyst, I designed this enterprise-grade system from the ground up. I authored the comprehensive Business Requirements Document (BRD) and Software Requirements Specification (SRS), modeling core SOPs and system architectures. Leveraging AI vibe coding, I independently built the full-stack product (FastAPI, React, Celery, PostgreSQL) to bring these complex business rules to life.
            </p>

            {/* Key Features */}
            <div className="mt-6 flex flex-col gap-3">
              {[
                { title: 'AI-Powered Initialization (SOP-AI-001)', desc: 'Transforms natural language prompts into structured Work Breakdown Structures (WBS) with estimated durations and dependencies.' },
                { title: 'CR Impact Analysis (SOP-CR-001)', desc: 'Multi-step approval workflow where AI evaluates cost, risk, and schedule impact before applying changes.' },
                { title: 'Dynamic Critical Path Method (CPM)', desc: 'Real-time recalculation of ES/EF and LS/LF using topological sorting upon any task changes.' },
                { title: 'Intelligent Resource Leveling', desc: 'Evaluates skill-matching and leave schedules to recommend assignees while preventing >8h/day overallocation.' },
                { title: 'Automated Metrics & Reporting', desc: 'Real-time dashboards calculating Earned Value Analysis (EVA), CPI, and SPI, with MinIO-backed DOCX/XLSX exports.' }
              ].map((feature, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="mt-1 flex-shrink-0" style={{ color: 'var(--accent-coral)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <span className="font-body font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{feature.title}: </span>
                    <span className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>{feature.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { number: '40+', label: 'Database Tables', color: 'var(--accent-coral)' },
                { number: '7', label: 'RBAC Roles', color: 'var(--accent-amber)' },
                { number: '5', label: 'Core AI SOPs', color: 'var(--accent-coral)' },
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
