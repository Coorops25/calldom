import { motion } from 'motion/react';
import { Link2, Bot, Globe2, Monitor, Palette, type LucideIcon } from 'lucide-react';
import { useLang } from '../../i18n';
import { useTheme } from '../../hooks/useTheme';

const ICONS: LucideIcon[] = [Link2, Bot, Globe2, Monitor, Palette];

export default function Diferencial() {
  const { t } = useLang();
  const { isDark } = useTheme();
  const d = t.diferencial;

  return (
    <section
      id="diferencial"
      className={`py-16 sm:py-20 px-5 sm:px-6 md:px-14 lg:px-28 ${isDark ? 'bg-navy-deep' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 font-mono text-xs tracking-[0.35em] uppercase text-teal"
          >
            <div className="w-8 h-px bg-teal" />
            {d.label}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className={`font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.03em] ${isDark ? 'text-white' : 'text-[#0b1f38]'}`}
          >
            <span className="block">{d.heading}</span>
            <span className="block text-teal">{d.headingHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className={`text-base sm:text-lg leading-relaxed max-w-2xl ${isDark ? 'text-white/55' : 'text-gray-600'}`}
          >
            {d.sub}
          </motion.p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {d.pillars.map((pillar, index) => {
            const Icon = ICONS[index];
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={[
                  'rounded-2xl p-6 flex flex-col gap-4 hover:-translate-y-1 transition-all duration-300',
                  isDark
                    ? 'bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.15]'
                    : 'bg-white border border-gray-100 hover:shadow-md',
                ].join(' ')}
              >
                <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-teal" strokeWidth={1.75} />
                </div>
                <div className="space-y-2">
                  <h3 className={`font-display text-base font-semibold leading-snug ${isDark ? 'text-white' : 'text-[#0b1f38]'}`}>
                    {pillar.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-white/55' : 'text-gray-600'}`}>
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
