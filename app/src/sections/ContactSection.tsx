import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/SectionHeading';
import { Mail, Phone, MapPin, Github, Facebook, Send, Check, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!sectionRef.current) return;

    // Liquid glass cards entrance
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.contact-card');
      gsap.fromTo(
        cards,
        { opacity: 0, rotationX: 45, y: 80 },
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
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }

    // Form entrance
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, rotationX: 45, y: 80 },
        {
          opacity: 1,
          rotationX: 0,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Form fields stagger
      const fields = formRef.current.querySelectorAll('.form-field');
      gsap.fromTo(
        fields,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.06,
          delay: 0.5,
          scrollTrigger: {
            trigger: formRef.current,
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

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your full name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Please enter your message';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState('loading');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field !== 'subject' && errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputStyle = {
    width: '100%',
    height: 52,
    padding: '0 20px',
    backgroundColor: 'rgba(245,240,235,0.04)',
    border: '1px solid var(--border-color)',
    borderRadius: 10,
    color: 'var(--text-primary)',
    fontSize: 16,
    fontFamily: 'var(--font-sans)',
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const focusStyle = {
    borderColor: 'var(--accent-coral)',
    boxShadow: '0 0 0 3px rgba(255,107,91,0.1)',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative"
      style={{ padding: '120px 48px' }}
    >
      {/* Background orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          bottom: '20%',
          right: '10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,91,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-[1280px] mx-auto relative" style={{ zIndex: 2 }}>
        <SectionHeading number="05" title="CONTACT" subtitle="Let's get in touch" />

        <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-16 mt-20" style={{ perspective: '1000px' }}>
          {/* Left column - Contact info */}
          <div ref={cardsRef}>
            <div className="font-caption mb-10" style={{ color: 'var(--accent-coral)' }}>
              CONTACT INFO
            </div>

            <div className="space-y-4">
              {/* Email card */}
              <a
                href="mailto:thangnnv2003@gmail.com"
                className="contact-card liquid-glass block transition-transform duration-200 hover:scale-[1.02]"
                style={{ padding: 24, borderRadius: 12, textDecoration: 'none' }}
                data-cursor="link"
              >
                <div className="relative" style={{ zIndex: 2 }}>
                  <div className="flex items-center gap-3 mb-2">
                    <Mail size={20} style={{ color: 'var(--accent-coral)' }} />
                    <span className="font-caption" style={{ color: 'var(--text-secondary)' }}>Email</span>
                  </div>
                  <div className="font-body text-base" style={{ color: 'var(--text-primary)' }}>
                    thangnnv2003@gmail.com
                  </div>
                </div>
              </a>

              {/* Phone card */}
              <a
                href="tel:0974089295"
                className="contact-card liquid-glass block transition-transform duration-200 hover:scale-[1.02]"
                style={{ padding: 24, borderRadius: 12, textDecoration: 'none' }}
                data-cursor="link"
              >
                <div className="relative" style={{ zIndex: 2 }}>
                  <div className="flex items-center gap-3 mb-2">
                    <Phone size={20} style={{ color: 'var(--accent-coral)' }} />
                    <span className="font-caption" style={{ color: 'var(--text-secondary)' }}>Phone</span>
                  </div>
                  <div className="font-body text-base" style={{ color: 'var(--text-primary)' }}>
                    0974 089 295
                  </div>
                </div>
              </a>

              {/* Location card */}
              <div className="contact-card liquid-glass" style={{ padding: 24, borderRadius: 12 }}>
                <div className="relative" style={{ zIndex: 2 }}>
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin size={20} style={{ color: 'var(--accent-coral)' }} />
                    <span className="font-caption" style={{ color: 'var(--text-secondary)' }}>Location</span>
                  </div>
                  <div className="font-body text-base" style={{ color: 'var(--text-primary)' }}>
                    Hanoi, Vietnam
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-10">
              <div className="font-caption mb-4" style={{ color: 'var(--text-secondary)' }}>
                Social media
              </div>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: 'https://github.com/NguyenNgocVietThang' },
                  { icon: Facebook, href: 'https://www.facebook.com/share/15Yynm55Ym/?mibextid=LQQJ4d' },
                  { icon: Mail, href: 'mailto:thangnnv2003@gmail.com' },
                ].map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all duration-200"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-secondary)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-coral)';
                        e.currentTarget.style.color = 'var(--accent-coral)';
                        e.currentTarget.style.backgroundColor = 'rgba(255,107,91,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column - Contact form */}
          <div
            ref={formRef}
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 16,
              padding: 48,
              transformStyle: 'preserve-3d',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="form-field">
                <label className="font-caption block mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-color)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.name && (
                  <div className="font-caption mt-1" style={{ color: 'var(--accent-coral)' }}>
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="form-field">
                <label className="font-caption block mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-color)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.email && (
                  <div className="font-caption mt-1" style={{ color: 'var(--accent-coral)' }}>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Subject */}
              <div className="form-field">
                <label className="font-caption block mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-color)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Message */}
              <div className="form-field">
                <label className="font-caption block mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Message
                </label>
                <textarea
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  style={{
                    ...inputStyle,
                    height: 'auto',
                    minHeight: 160,
                    padding: '16px 20px',
                    resize: 'vertical',
                  }}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-color)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.message && (
                  <div className="font-caption mt-1" style={{ color: 'var(--accent-coral)' }}>
                    {errors.message}
                  </div>
                )}
              </div>

              {/* Submit button */}
              <div className="form-field">
                <button
                  type="submit"
                  disabled={formState === 'loading' || formState === 'success'}
                  className="w-full flex items-center justify-center gap-2 transition-all duration-200"
                  style={{
                    height: 56,
                    borderRadius: 12,
                    border: 'none',
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: 'var(--font-sans)',
                    cursor: formState === 'loading' || formState === 'success' ? 'default' : 'pointer',
                    backgroundColor:
                      formState === 'success'
                        ? '#4CAF50'
                        : formState === 'loading'
                          ? 'var(--accent-coral)'
                          : 'var(--accent-coral)',
                    color: formState === 'success' ? 'white' : '#111111',
                    opacity: formState === 'loading' ? 0.8 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (formState === 'idle') {
                      e.currentTarget.style.filter = 'brightness(1.1)';
                      e.currentTarget.style.transform = 'scale(1.01)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onMouseDown={(e) => {
                    if (formState === 'idle') e.currentTarget.style.transform = 'scale(0.98)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {formState === 'loading' && <Loader2 size={18} className="animate-spin" />}
                  {formState === 'success' && <Check size={18} />}
                  {formState === 'idle' && <Send size={18} />}
                  {formState === 'loading' && 'Sending...'}
                  {formState === 'success' && 'Sent successfully!'}
                  {formState === 'idle' && 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
