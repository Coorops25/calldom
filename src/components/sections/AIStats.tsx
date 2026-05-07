import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { useLang } from '../../i18n';

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(ease * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AIStats() {
  const { t } = useLang();
  const s = t.aiStats;

  return (
    <section
      id="aiStats"
      className="bg-navy-deep py-16 sm:py-20 px-5 sm:px-6 md:px-14 lg:px-28"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal/70"
          >
            <div className="w-8 h-px bg-teal/50" />
            {s.label}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-white"
          >
            {s.heading}
            <br />
            <span className="text-teal">{s.headingEnd}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-white/50 text-base leading-relaxed"
          >
            {s.sub}
          </motion.p>
        </div>

        {/* Stat cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {s.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative flex flex-col gap-3 p-5 rounded-2xl bg-navy border-t-2 border-teal/40 border border-white/[0.06] overflow-hidden group hover:border-t-teal/70 transition-colors duration-300"
            >
              {/* Subtle gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 font-display text-5xl sm:text-6xl leading-none text-gradient">
                <Counter target={card.num} suffix={card.suffix} />
              </div>

              <p className="relative z-10 text-white/70 text-sm leading-snug flex-1">
                {card.desc}
              </p>

              <div className="relative z-10 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-teal/50">
                {card.src}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-teal/8 border border-teal/20 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
        >
          <div className="shrink-0 w-10 h-10 rounded-xl bg-teal/15 flex items-center justify-center">
            <Zap className="w-5 h-5 text-teal" />
          </div>

          <div className="space-y-1">
            <p className="text-white font-semibold leading-snug">
              {s.bannerText}
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              {s.bannerSub}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
