import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const [cursorState, setCursorState] = useState<'default' | 'link' | 'project'>('default');

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      if (targetEl.closest('[data-cursor="project"]')) {
        setCursorState('project');
      } else if (targetEl.closest('a, button, [role="button"], input, textarea, select')) {
        setCursorState('link');
      } else {
        setCursorState('default');
      }
    };

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  const size = cursorState === 'project' ? 56 : cursorState === 'link' ? 40 : 12;
  const bg = cursorState === 'project' ? 'var(--accent-coral)' : cursorState === 'link' ? 'rgba(255,107,91,0.2)' : 'transparent';

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        zIndex: 9999,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        width: size,
        height: size,
        borderRadius: cursorState === 'project' ? 28 : '50%',
        border: cursorState === 'default' ? '1px solid var(--accent-coral)' : 'none',
        backgroundColor: bg,
        transition: 'width 0.3s ease, height 0.3s ease, border-radius 0.3s ease, background-color 0.3s ease, border 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#111111',
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      {cursorState === 'project' && 'Xem'}
    </div>
  );
};

export default CustomCursor;
