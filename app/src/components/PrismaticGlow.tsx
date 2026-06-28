import { useEffect, useRef } from 'react';

const PrismaticGlow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef([
    { x: -1000, y: -1000 },
    { x: -1000, y: -1000 },
    { x: -1000, y: -1000 },
  ]);
  const timeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const container = containerRef.current;
    if (!container) return;
    const orbs = container.querySelectorAll<HTMLDivElement>('.glow-orb');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX - 300;
      mousePos.current.y = e.clientY - 300;
    };

    if (!isTouch.current) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const offsets = [
      { x: 0, y: 0 },
      { x: -80, y: -60 },
      { x: 60, y: 80 },
    ];

    const animate = () => {
      timeRef.current += 0.016;

      orbs.forEach((orb, i) => {
        if (isTouch.current) {
          // Lissajous figure-8 pattern for touch devices
          const cx = window.innerWidth / 2 - 300;
          const cy = window.innerHeight / 2 - 300;
          const targetX = cx + Math.sin(timeRef.current * 0.3) * 200;
          const targetY = cy + Math.sin(timeRef.current * 0.5) * 150;
          currentPos.current[i].x += (targetX - currentPos.current[i].x) * 0.02;
          currentPos.current[i].y += (targetY - currentPos.current[i].y) * 0.02;
        } else {
          const targetX = mousePos.current.x + offsets[i].x;
          const targetY = mousePos.current.y + offsets[i].y;
          currentPos.current[i].x += (targetX - currentPos.current[i].x) * 0.08;
          currentPos.current[i].y += (targetY - currentPos.current[i].y) * 0.08;
        }
        orb.style.transform = `translate3d(${currentPos.current[i].x}px, ${currentPos.current[i].y}px, 0)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <div
        className="glow-orb absolute"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 107, 91, 0.18) 0%, transparent 70%)',
          filter: 'blur(100px)',
          willChange: 'transform',
        }}
      />
      <div
        className="glow-orb absolute"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 230, 200, 0.14) 0%, transparent 70%)',
          filter: 'blur(120px)',
          willChange: 'transform',
        }}
      />
      <div
        className="glow-orb absolute"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 148, 58, 0.12) 0%, transparent 70%)',
          filter: 'blur(140px)',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default PrismaticGlow;
