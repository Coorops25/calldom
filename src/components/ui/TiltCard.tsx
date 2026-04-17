import { useRef, useState, type ReactNode, type MouseEvent } from 'react';

interface Props {
  children: ReactNode;
  glowColor?: string;
  className?: string;
}

export default function TiltCard({
  children,
  glowColor = 'rgba(0,180,216,0.28)',
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    setTilt({ x: (0.5 - ny) * 18, y: (nx - 0.5) * 18 });
    setHovered(true);
  };

  const onLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div className="relative select-none h-full" style={{ perspective: '800px' }}>
      {/* Glow layer */}
      <div
        className="absolute inset-0 rounded-2xl blur-2xl pointer-events-none transition-opacity duration-300"
        style={{ background: glowColor, opacity: hovered ? 0.65 : 0.2 }}
      />
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)${hovered ? ' scale3d(1.025,1.025,1.025)' : ' scale3d(1,1,1)'}`,
          transition: hovered ? 'transform 125ms ease-out' : 'transform 650ms ease-out',
          willChange: 'transform',
        }}
        className={`relative h-full ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
