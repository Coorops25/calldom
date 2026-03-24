import { useEffect, useState } from 'react';

const SECTIONS = ['hero', 'about', 'services', 'reasons', 'sectors', 'clients'];

export default function CornerLabels() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const counter = String(activeIndex + 1).padStart(2, '0') + ' / ' + String(SECTIONS.length).padStart(2, '0');

  return (
    <div className="fixed inset-0 pointer-events-none z-[8000] hidden lg:block">
      {/* Top-right: section counter */}
      <div className="absolute top-8 right-10 font-mono text-[0.45rem] tracking-[0.25em] uppercase text-gray-400 select-none">
        {counter}
      </div>

      {/* Bottom-left: domain */}
      <div className="absolute bottom-8 left-10 font-mono text-[0.45rem] tracking-[0.25em] uppercase text-gray-400 select-none">
        ccgrupo.com.co
      </div>

      {/* Bottom-right: city */}
      <div className="absolute bottom-8 right-10 font-mono text-[0.45rem] tracking-[0.25em] uppercase text-gray-400 select-none">
        Bogotá, Colombia
      </div>
    </div>
  );
}
