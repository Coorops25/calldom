import { useRef, useEffect, useState, lazy, Suspense, type MouseEvent } from 'react';
import { motion } from 'motion/react';
const SplitText = lazy(() => import('../ui/SplitText'));
import { useLang } from '../../i18n';

const logoModules = import.meta.glob('../../assets/clients/webp/*.webp', { eager: true }) as Record<string, { default: string }>;

const CLIENTS = Object.entries(logoModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, mod]) => ({
    name: path.split('/').pop()?.replace(/\.\w+$/, '') ?? 'Cliente',
    logo: mod.default,
  }));

const SET_WIDTH = 25;
const BASE_DURATION = 12;

export default function Clients() {
  const { t, lang } = useLang();
  const errRef = useRef<Record<number, boolean>>({});
  const [, forceRender] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const animRef = useRef(0);
  const posRef = useRef(0);
  const speedRef = useRef(1);
  const mouseXRef = useRef(0.5);
  const isMobileRef = useRef(false);
  const [isLight, setIsLight] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const track = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

  const handleErr = (i: number) => {
    errRef.current[i] = true;
    forceRender(n => n + 1);
  };

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light'));
    isMobileRef.current = window.matchMedia('(pointer: coarse)').matches;

    const obs = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light'));
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const baseSpeed = SET_WIDTH / BASE_DURATION;
      const speed = baseSpeed * speedRef.current;

      posRef.current += speed * dt;
      if (posRef.current >= SET_WIDTH) {
        posRef.current -= SET_WIDTH;
      } else if (posRef.current < 0) {
        posRef.current += SET_WIDTH;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${posRef.current}%)`;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!wrapRef.current || isMobileRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    mouseXRef.current = x;
    speedRef.current = 1 + (x - 0.5) * 4;

    const threshold = 200;
    for (let i = 0; i < itemRefs.current.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;
      const elRect = el.getBoundingClientRect();
      const elCenterX = elRect.left + elRect.width / 2;
      const dist = Math.abs(e.clientX - elCenterX);
      const scale = dist < threshold ? 1 + 0.15 * (1 - dist / threshold) : 1;
      el.style.setProperty('--logo-scale', String(scale));
      el.style.transform = `scale(${scale})`;
    }
  };

  return (
    <section id="clients" className="py-24 border-t border-white/10 overflow-hidden">
      <div className="px-6 md:px-14 lg:px-28 flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-6"
          >
            <div className="w-8 h-px bg-teal" />
            {t.clients.label}
          </motion.div>

          <div className="font-display text-[clamp(2rem,3.5vw,3rem)]">
            <Suspense fallback={
              <span className="inline-block opacity-0">
                {t.clients.headingPre} {t.clients.headingEm}
              </span>
            }>
              <SplitText
                key={`clients-heading-${lang}`}
                className="inline-block"
                delay={40}
                duration={1}
                splitType="chars"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
              >
                {t.clients.headingPre} <em className="italic text-teal">{t.clients.headingEm}</em>
              </SplitText>
            </Suspense>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-gray-300"
        >
          {t.clients.sub}
        </motion.div>
      </div>

      <div
        ref={wrapRef}
        className="clients-marquee-wrap relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div className="clients-marquee-fade clients-marquee-fade-l pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10" />
        <div className="clients-marquee-fade clients-marquee-fade-r pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10" />

        <div ref={trackRef} className="clients-marquee flex">
          {track.map(({ name, logo }, i) => (
            <div
              key={`${name}-${i}`}
              ref={el => { itemRefs.current[i] = el; }}
              className="clients-marquee-item shrink-0 flex items-center justify-center px-6 py-8"
              style={errRef.current[i] ? { display: 'none' } : undefined}
            >
              <img
                src={logo}
                alt={name}
                loading="lazy"
                onError={() => handleErr(i)}
                className="object-contain h-14 sm:h-16 w-full max-w-[8.125rem] sm:max-w-[10rem] transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
