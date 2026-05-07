import { motion } from 'motion/react';
import { Palette, Zap, TrendingUp } from 'lucide-react';
import { useLang } from '../../i18n';

const stepIcons = [Palette, Zap, TrendingUp];

const stepVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

export default function PostingSection() {
  const { t } = useLang();
  const ps = t.postingSection;

  return (
    <section
      id="posting-section"
      className="bg-[#0A1630] py-16 sm:py-20 px-5 sm:px-6 md:px-14 lg:px-28"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal/60">
            <div className="w-8 h-px bg-teal/60" />
            {ps.label}
          </div>

          {/* Heading */}
          <h2 className="font-display text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.1] tracking-[-0.03em] text-white">
            {ps.heading}
          </h2>

          {/* Paragraph */}
          <p className="text-base leading-relaxed text-white/70">
            {ps.sub}
          </p>

          {/* Capability pills */}
          <div className="flex flex-wrap gap-2">
            {ps.caps.map((cap) => (
              <span
                key={cap}
                className="bg-violet-900/30 text-violet-300 border border-violet-700/40 rounded-full text-xs font-semibold px-3 py-1.5"
              >
                {cap}
              </span>
            ))}
          </div>

          {/* CTA button */}
          <a
            href="https://www.posting.com.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs tracking-[0.2em] uppercase px-6 py-3.5 rounded-xl transition-colors duration-200"
          >
            {ps.cta}
          </a>
        </motion.div>

        {/* RIGHT COLUMN — Formula card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-violet-900/20 border border-violet-700/30 rounded-2xl p-6"
        >
          {/* Card label */}
          <div className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-violet-400/60 mb-5">
            {ps.formula.label}
          </div>

          <div className="space-y-3">
            {ps.formula.steps.map((step, i) => {
              const Icon = stepIcons[i];
              const isLast = i === ps.formula.steps.length - 1;

              return (
                <div key={i}>
                  <motion.div
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stepVariants}
                    className={`flex items-start gap-4 p-4 rounded-xl ${
                      isLast
                        ? 'bg-teal/8 border border-teal/20'
                        : 'bg-violet-900/20'
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex-shrink-0 ${
                        isLast ? 'text-teal' : 'text-violet-400'
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <div
                        className={`font-semibold text-sm mb-0.5 ${
                          isLast ? 'text-teal' : 'text-white'
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-white/60 leading-relaxed">
                        {step.desc}
                      </div>
                    </div>
                  </motion.div>

                  {/* Arrow connector (between steps, not after last) */}
                  {i < ps.formula.steps.length - 1 && (
                    <div
                      className={`text-center text-lg font-bold my-1 ${
                        i === 0 ? 'text-violet-400' : 'text-teal'
                      }`}
                    >
                      ↓
                    </div>
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
