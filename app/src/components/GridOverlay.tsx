import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface GridOverlayProps {
  lenisRef: React.RefObject<Lenis | null>;
}

const GridOverlay = ({ lenisRef }: GridOverlayProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const lenis = lenisRef.current;
    if (!lenis) return;

    const handleScroll = ({ velocity }: { velocity: number }) => {
      if (gridRef.current) {
        const opacity = Math.min(0.12, Math.max(0.02, 0.02 + Math.abs(velocity) * 0.003));
        gridRef.current.style.opacity = String(opacity);
      }
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, [lenisRef]);

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  return <div ref={gridRef} className="grid-overlay" />;
};

export default GridOverlay;
