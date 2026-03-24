import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useLang } from '../../i18n';

export default function Sectors() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLang();
  const s = t.sectors;

  return (
    <section id="sectors" ref={ref} className="relative py-32 px-6 md:px-14 lg:px-28 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-teal/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
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

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {s.items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative p-8 border border-white/10 hover:border-teal/30 bg-white/[0.02] hover:bg-teal/[0.04] rounded-2xl transition-all duration-400 cursor-default"
            >
              {/* Index */}
              <div className="font-mono text-[0.45rem] tracking-[0.3em] uppercase text-teal/60 mb-4 group-hover:text-teal transition-colors duration-300">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Name */}
              <h3 className="font-mono text-sm uppercase tracking-widest text-white mb-3 group-hover:text-teal transition-colors duration-300">
                {item.name}
              </h3>

              {/* Desc */}
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-teal to-transparent group-hover:w-full transition-all duration-500 rounded-b-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
