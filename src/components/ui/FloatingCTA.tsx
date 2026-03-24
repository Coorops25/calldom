import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLang } from '../../i18n';

interface Props {
  onNavigate?: (view: string) => void;
}

export default function FloatingCTA({ onNavigate }: Props) {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-8 z-[9500]"
        >
          <button
            onClick={() => onNavigate?.('contact')}
            className="flex items-center gap-3 font-mono text-[0.55rem] tracking-[0.2em] uppercase px-6 py-3 bg-gradient-to-br from-teal-dark to-teal text-white shadow-[0_8px_32px_rgba(0,180,216,0.3)] hover:shadow-[0_12px_44px_rgba(0,180,216,0.45)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <span className="w-2 h-2 bg-teal-bright rounded-full animate-pulse shrink-0" />
            {t.nav.contact}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
