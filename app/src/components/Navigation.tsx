import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  scrollTo: (target: string) => void;
}

const navItems = [
  { label: 'Home', target: '#hero' },
  { label: 'About', target: '#about' },
  { label: 'Experience', target: '#resume' },
  { label: 'Skills', target: '#skills' },
  { label: 'Projects', target: '#portfolio' },
  { label: 'Contact', target: '#contact' },
];

const Navigation = ({ scrollTo }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // IntersectionObserver for active section
    const observers: IntersectionObserver[] = [];
    navItems.forEach((item) => {
      const section = document.querySelector(item.target);
      if (section) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(item.target);
              }
            });
          },
          { threshold: 0.3 }
        );
        observer.observe(section);
        observers.push(observer);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const handleNavClick = (target: string) => {
    scrollTo(target);
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 transition-all duration-300"
        style={{
          zIndex: 100,
          height: 64,
          backgroundColor: scrolled ? 'rgba(17, 17, 17, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between" style={{ padding: '0 48px' }}>
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="font-mono-text text-sm tracking-[2px] uppercase font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            THANGNNV
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="transition-colors duration-200"
                style={{
                  color: activeSection === item.target ? 'var(--accent-coral)' : 'var(--text-secondary)',
                  fontSize: 14,
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.target) {
                    e.currentTarget.style.color = 'var(--accent-coral)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.target) {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA button */}
          <a
            href="https://drive.google.com/file/d/18WslqjXZN5bgS1ldUMU-cni_gJTYQiO2/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block transition-all duration-200"
            style={{
              padding: '8px 24px',
              borderRadius: 100,
              border: '1px solid var(--accent-coral)',
              color: 'var(--accent-coral)',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
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
            Download CV
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: 'var(--text-primary)' }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{
            zIndex: 99,
            backgroundColor: 'var(--background)',
          }}
        >
          {navItems.map((item, i) => (
            <button
              key={item.target}
              onClick={() => handleNavClick(item.target)}
              className="font-heading-2 transition-all"
              style={{
                fontSize: 32,
                color: 'var(--text-primary)',
                animation: `fadeInUp 0.4s ease forwards`,
                animationDelay: `${i * 0.05}s`,
                opacity: 0,
              }}
            >
              {item.label}
            </button>
          ))}
          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default Navigation;
