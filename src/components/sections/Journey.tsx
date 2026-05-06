import { motion } from 'motion/react';
import { Paintbrush, Megaphone, Layers, MessageSquare, BarChart3, Code2 } from 'lucide-react';
import { useLang } from '../../i18n';
import { useTheme } from '../../hooks/useTheme';

const STEP_ICONS = [Paintbrush, Megaphone, Layers, MessageSquare, BarChart3, Code2];

type ZoneType = 'posting' | 'joint' | 'ccg';

function getZone(brand: string): ZoneType {
  if (brand === 'Posting') return 'posting';
  if (brand === 'CCG + Posting') return 'joint';
  return 'ccg';
}

interface ZoneStyles {
  accentBar: string;
  badge: string;
  iconBox: string;
  iconColor: string;
  connector: string;
}

const ZONE_STYLES: Record<ZoneType, ZoneStyles> = {
  posting: {
    accentBar: 'bg-violet-500',
    badge: 'bg-violet-500/15 text-violet-300 border border-violet-500/25',
    iconBox: 'bg-violet-500/15',
    iconColor: 'text-violet-300',
    connector: 'bg-violet-500/40',
  },
  joint: {
    accentBar: 'bg-gradient-to-r from-violet-500 to-teal',
    badge: 'bg-gradient-to-r from-violet-500/15 to-teal/15 text-violet-200 border border-violet-400/25',
    iconBox: 'bg-gradient-to-br from-violet-500/15 to-teal/15',
    iconColor: 'text-violet-200',
    connector: 'bg-gradient-to-r from-violet-500/40 to-teal/40',
  },
  ccg: {
    accentBar: 'bg-teal',
    badge: 'bg-teal/15 text-teal border border-teal/25',
    iconBox: 'bg-teal/15',
    iconColor: 'text-teal',
    connector: 'bg-teal/40',
  },
};

const LIGHT_ZONE_STYLES: Record<ZoneType, ZoneStyles> = {
  posting: {
    accentBar: 'bg-violet-500',
    badge: 'bg-violet-50 text-violet-700 border border-violet-200',
    iconBox: 'bg-violet-50',
    iconColor: 'text-violet-600',
    connector: 'bg-violet-300/50',
  },
  joint: {
    accentBar: 'bg-gradient-to-r from-violet-500 to-teal',
    badge: 'bg-gradient-to-r from-violet-50 to-cyan-50 text-violet-700 border border-violet-200/60',
    iconBox: 'bg-gradient-to-br from-violet-50 to-cyan-50',
    iconColor: 'text-violet-600',
    connector: 'bg-gradient-to-r from-violet-300/50 to-teal/40',
  },
  ccg: {
    accentBar: 'bg-teal',
    badge: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
    iconBox: 'bg-cyan-50',
    iconColor: 'text-teal',
    connector: 'bg-teal/30',
  },
};

export default function Journey() {
  const { t } = useLang();
  const { isDark } = useTheme();
  const s = t.journey;

  const zoneStyles = isDark ? ZONE_STYLES : LIGHT_ZONE_STYLES;

  return (
    <section
      id="journey"
      className="journey-section bg-navy-deep py-20 sm:py-28 px-5 sm:px-6 md:px-14 lg:px-28"
    >
      <div className="max-w-7xl mx-auto space-y-14">

        {/* ── Header ── */}
        <div className="space-y-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal/80"
          >
            <div className="w-8 h-px bg-teal/60 shrink-0" />
            {s.label}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
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
            transition={{ duration: 0.4, delay: 0.14 }}
            className="text-white/55 text-base leading-relaxed"
          >
            {s.sub}
          </motion.p>
        </div>

        {/* ── Connecting flow line (lg only) ── */}
        <div className="hidden lg:block relative h-0">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-violet-500/30 via-teal/30 to-teal/10 pointer-events-none" />
        </div>

        {/* ── Steps grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4"
        >
          {s.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            const zone = getZone(step.brand);
            const styles = zoneStyles[zone];
            const stepNum = String(i + 1).padStart(2, '0');

            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
                }}
                className={[
                  'relative flex flex-col gap-3 p-4 rounded-2xl overflow-hidden',
                  'transition-all duration-300 group',
                  isDark
                    ? 'bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.15]'
                    : 'bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200',
                ].join(' ')}
              >
                {/* Top accent bar */}
                <div className={`absolute inset-x-0 top-0 h-[3px] ${styles.accentBar}`} />

                {/* Step number watermark */}
                <span
                  className="absolute top-3 right-3 font-mono text-[3.5rem] font-light leading-none select-none pointer-events-none"
                  style={{ opacity: isDark ? 0.07 : 0.06, color: isDark ? '#fff' : '#060d1f' }}
                >
                  {stepNum}
                </span>

                {/* Brand badge */}
                <div className="flex items-center gap-2 mt-1">
                  <span className={`font-mono text-[0.6rem] tracking-wide px-2 py-0.5 rounded-full whitespace-nowrap ${styles.badge}`}>
                    {step.brand}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${styles.iconBox}`}>
                  <Icon className={`w-4 h-4 ${styles.iconColor}`} />
                </div>

                {/* Title */}
                <p className="font-display text-sm sm:text-base font-semibold text-white leading-snug">
                  {step.title}
                </p>

                {/* Desc */}
                <p className="font-mono text-[0.65rem] tracking-wide text-white/50 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Result strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={[
            'rounded-2xl px-6 py-5',
            isDark
              ? 'bg-gradient-to-r from-teal/10 via-transparent to-violet-500/10 border border-white/[0.08]'
              : 'bg-gradient-to-r from-cyan-50 via-white to-violet-50 border border-gray-100 shadow-sm',
          ].join(' ')}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {s.result.map((item, i) => {
              const isLast = i === s.result.length - 1;
              const isBeforeLast = i === s.result.length - 2;
              return (
                <div key={i} className="flex items-center gap-x-3">
                  <span
                    className={[
                      'font-display text-base sm:text-lg font-semibold leading-snug',
                      isLast
                        ? 'text-teal drop-shadow-[0_0_8px_rgba(0,180,216,0.5)]'
                        : 'text-white',
                    ].join(' ')}
                  >
                    {item}
                  </span>
                  {!isLast && (
                    <span className="text-teal font-bold text-lg shrink-0 leading-none">
                      {isBeforeLast ? '=' : '+'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
