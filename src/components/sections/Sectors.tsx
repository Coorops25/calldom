import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  HeartPulse, Landmark, ShoppingBag, Building2, GraduationCap, Truck,
  X, CheckCircle2, TrendingUp, ArrowRight,
} from 'lucide-react';
import { useLang } from '../../i18n';

const ICONS = [HeartPulse, Landmark, ShoppingBag, Building2, GraduationCap, Truck];

type SectorItem = {
  name: string;
  desc: string;
  detail: string;
  challenges: string[];
  solutions: string[];
  kpis: { label: string; value: string }[];
};

export default function Sectors() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t, lang } = useLang();
  const s = t.sectors;
  const viewMoreLabel = lang === 'en' ? 'See more' : 'Ver más';

  const [active, setActive] = useState<(SectorItem & { index: number }) | null>(null);

  const open = (item: SectorItem, index: number) => setActive({ ...item, index });
  const close = () => setActive(null);

  return (
    <>
      <section id="sectors" ref={ref} className="relative py-32 px-6 md:px-14 lg:px-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-teal/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-6">
              <div className="w-8 h-px bg-teal" />
              {s.label}
            </div>
            <h2 className="font-display text-3xl md:text-5xl leading-tight text-white mb-4">
              {s.heading}
            </h2>
            <p className="text-gray-300 font-light text-base max-w-2xl leading-relaxed">
              {s.sub}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {s.items.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  onClick={() => open(item, i)}
                  className="group relative p-8 md:p-10 border border-white/10 hover:border-teal/40 bg-white/[0.02] hover:bg-teal/[0.05] rounded-2xl transition-all duration-300 text-left cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-xl border border-white/10 group-hover:border-teal/40 bg-white/[0.03] group-hover:bg-teal/10 flex items-center justify-center mb-7 transition-all duration-300">
                    <Icon size={24} className="text-gray-400 group-hover:text-teal transition-colors duration-300" />
                  </div>

                  <div className="font-mono text-label tracking-[0.25em] uppercase text-teal/50 mb-3 group-hover:text-teal transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <h3 className="font-mono text-base uppercase tracking-widest text-white mb-3 group-hover:text-teal transition-colors duration-300">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 font-light text-base leading-relaxed mb-7">
                    {item.desc}
                  </p>

                  <div className="flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase text-teal/0 group-hover:text-teal transition-all duration-300">
                    <span>{viewMoreLabel}</span>
                    <ArrowRight size={12} />
                  </div>

                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-teal to-transparent group-hover:w-full transition-all duration-500 rounded-b-2xl" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={close}
              className="fixed inset-0 z-[9800] bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[9900] flex items-center justify-center p-3 sm:p-6 md:p-10 pointer-events-none"
            >
              <div
                className="pointer-events-auto relative w-full max-w-2xl max-h-[85svh] sm:max-h-[92vh] overflow-y-auto
                           bg-navy-deep/80 backdrop-blur-2xl
                           border border-white/[0.12]
                           rounded-2xl md:rounded-3xl
                           shadow-[0_32px_80px_rgba(0,0,0,0.6)]
                           ring-1 ring-white/[0.06]"
                onClick={e => e.stopPropagation()}
              >
                {/* Sticky close button */}
                <div className="sticky top-0 z-10 flex justify-end px-4 pt-4 md:px-6 md:pt-5 pointer-events-none">
                  <button
                    onClick={close}
                    className="pointer-events-auto w-9 h-9 rounded-xl border border-white/10 bg-navy-deep/60 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all duration-200"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="px-5 pb-8 -mt-2 sm:px-8 md:px-10 md:pb-10">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-7">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl border border-teal/30 bg-teal/10 flex items-center justify-center shrink-0">
                      {(() => { const Icon = ICONS[active.index]; return <Icon size={24} className="text-teal" />; })()}
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-label tracking-[0.25em] uppercase text-teal mb-2">
                        {String(active.index + 1).padStart(2, '0')} — {s.label}
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
                        {active.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-300 font-light text-base leading-relaxed mb-8 border-l-2 border-teal/40 pl-4">
                    {active.detail}
                  </p>

                  {/* KPIs */}
                  <div className="grid grid-cols-3 gap-2 md:gap-3 mb-8">
                    {active.kpis.map((kpi, i) => (
                      <div key={i} className="p-3 md:p-5 border border-white/10 rounded-xl bg-white/[0.04] text-center">
                        <div className="font-mono text-lg md:text-2xl font-bold text-teal mb-1 truncate">{kpi.value}</div>
                        <div className="font-mono text-xs tracking-[0.1em] uppercase text-gray-400 leading-tight">{kpi.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Challenges / Solutions */}
                  <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                    <div>
                      <div className="flex items-center gap-3 font-mono text-label tracking-[0.2em] uppercase text-gray-400 mb-4">
                        <TrendingUp size={13} className="text-teal shrink-0" />
                        {s.challenges}
                      </div>
                      <ul className="space-y-3">
                        {active.challenges.map((c, i) => (
                          <li key={i} className="flex items-start gap-3 text-base text-gray-300 font-light">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 font-mono text-label tracking-[0.2em] uppercase text-gray-400 mb-4">
                        <CheckCircle2 size={13} className="text-teal shrink-0" />
                        {s.solutions}
                      </div>
                      <ul className="space-y-3">
                        {active.solutions.map((sol, i) => (
                          <li key={i} className="flex items-start gap-3 text-base text-gray-300 font-light">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                            {sol}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
