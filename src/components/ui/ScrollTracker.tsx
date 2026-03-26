import { useEffect, useState } from 'react';
import { useLang } from '../../i18n';

const SECTIONS = [
  { id: 'hero' },
  { id: 'about' },
  { id: 'services' },
  { id: 'reasons' },
  { id: 'sectors' },
  { id: 'clients' },
];

export default function ScrollTracker() {
  const [active, setActive] = useState(0);
  const { t, lang } = useLang();

  // Nav labels + sector label
  const labels = [
    ...t.nav.links.map(l => l.name),
    t.nav.links[2]?.name ?? (lang === 'en' ? 'Sectors' : 'Sectores'), // fallback placeholder at index 4 (sectors)
  ];
  // Rebuild to match SECTIONS order (insert sectors between reasons and clients)
  const sectionLabels = [
    labels[0], // inicio/home
    labels[1], // nosotros/about
    labels[2], // servicios/services
    labels[3], // diferencial/reasons
    t.sectors?.label ?? (lang === 'en' ? 'Sectors' : 'Sectores'),
    labels[4], // clientes/clients
  ];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(index);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed left-10 top-1/2 -translate-y-1/2 z-[9000] hidden lg:flex flex-col items-center gap-2">
      <span className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-gray-300 [writing-mode:vertical-lr] rotate-180 mb-3 select-none">
        {lang === 'en' ? 'scroll' : 'desplazar'}
      </span>
      {SECTIONS.map(({ id }, index) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`group relative w-2 h-2 rounded-full border transition-all duration-400 ${
            active === index
              ? 'border-teal bg-teal shadow-[0_0_12px_rgba(0,180,216,0.4)]'
              : 'border-gray-300 bg-transparent hover:border-teal/50'
          }`}
        >
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 font-mono text-[0.5rem] tracking-[0.1em] uppercase text-teal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {sectionLabels[index]}
          </span>
        </button>
      ))}
    </div>
  );
}
