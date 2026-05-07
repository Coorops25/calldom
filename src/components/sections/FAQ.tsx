import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { useLang } from '../../i18n';

export default function FAQ() {
  const { t } = useLang();
  const faq = t.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <section
      id="faq"
      className="bg-navy-deep py-16 sm:py-20 px-5 sm:px-6 md:px-14 lg:px-28"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-white/50 mb-6"
        >
          <div className="w-8 h-px bg-white/30" />
          {faq.label}
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.1] tracking-[-0.03em] text-white mb-10"
        >
          {faq.heading}
          <span className="block text-teal">{faq.headingEnd}</span>
        </motion.h2>

        {/* Accordion grid */}
        <div className="grid lg:grid-cols-2 gap-3">
          {faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className={`border rounded-xl overflow-hidden transition-colors duration-200 ${
                  isOpen
                    ? 'border-teal/30'
                    : 'border-white/10 hover:border-teal/30'
                }`}
              >
                {/* Question button */}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-white text-sm"
                >
                  <span>{item.q}</span>
                  <Plus
                    size={18}
                    className="flex-shrink-0 text-teal transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {/* Animated answer panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="text-sm text-white/60 leading-relaxed px-5 pb-5">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
