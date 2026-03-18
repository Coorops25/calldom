import { motion } from 'motion/react';
import { useLang } from '../../i18n';

export default function Marquee() {
  const { t } = useLang();
  const items = t.marquee.items;

  return (
    <div className="py-6 border-y border-white/10 bg-white/[0.03] overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{ x: '-50%' }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-8 px-8 whitespace-nowrap">
            <div className="w-1.5 h-1.5 bg-teal rotate-45 shrink-0" />
            <span className="font-mono text-lg tracking-widest uppercase text-gray-200">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
