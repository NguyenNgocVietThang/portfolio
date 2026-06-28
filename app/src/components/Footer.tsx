import { Github, Facebook, Mail } from 'lucide-react';

interface FooterProps {
  scrollTo: (target: string) => void;
}

const Footer = ({ scrollTo }: FooterProps) => {
  const quickLinks = [
    { label: 'Home', target: '#hero' },
    { label: 'About', target: '#about' },
    { label: 'Experience', target: '#resume' },
    { label: 'Skills', target: '#skills' },
    { label: 'Projects', target: '#portfolio' },
    { label: 'Contact', target: '#contact' },
  ];

  return (
    <footer style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-[1280px] mx-auto" style={{ padding: '48px 48px' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - Brand */}
          <div>
            <div className="font-mono-text text-sm tracking-[2px] uppercase font-medium" style={{ color: 'var(--text-primary)' }}>
              THANGNNV
            </div>
            <div className="font-caption mt-2" style={{ color: 'var(--text-secondary)' }}>
              Business Analyst Intern
            </div>
          </div>

          {/* Column 2 - Quick links */}
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className="text-left transition-colors duration-200 hover:text-[var(--text-primary)]"
                style={{ color: 'var(--text-secondary)', fontSize: 14 }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Column 3 - Contact */}
          <div className="space-y-2">
            <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              thangnnv2003@gmail.com
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              0974 089 295
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href="https://github.com/NguyenNgocVietThang"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-[var(--accent-coral)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.facebook.com/share/15Yynm55Ym/?mibextid=LQQJ4d"
                className="transition-colors duration-200 hover:text-[var(--accent-coral)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Facebook size={18} />
              </a>
              <a
                href="mailto:thangnnv2003@gmail.com"
                className="transition-colors duration-200 hover:text-[var(--accent-coral)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8" style={{ height: 1, backgroundColor: 'var(--border-color)' }} />

        {/* Copyright */}
        <div className="text-center font-caption" style={{ color: 'var(--text-secondary)' }}>
          &copy; 2026 Nguyen Ngoc Viet Thang. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
