import { lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../../i18n';

const LiquidEther = lazy(() => import('../ui/LiquidEther'));

interface Props {
  onNavigate?: (view: string) => void;
}

export default function CTA({ onNavigate }: Props) {
  const { t } = useLang();
  const ctaCopy = t.cta;

  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 sm:py-40 lg:py-56 px-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.12),transparent_42%),linear-gradient(180deg,rgba(13,25,64,0.92),rgba(13,25,64,1))] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Suspense fallback={null}>
          <LiquidEther
            colors={['#023e8a', '#0077b6', '#0096c7']}
            mouseForce={20} cursorSize={100} isViscous viscous={30}
            iterationsViscous={32} iterationsPoisson={32} resolution={0.5}
            isBounce={false} autoDemo autoSpeed={0.5} autoIntensity={2.2}
            takeoverDuration={0.25} autoResumeDelay={3000} autoRampDuration={0.6}
          />
        </Suspense>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-sm text-teal mb-8"
        >
          {ctaCopy.label}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl font-display text-[clamp(2.7rem,6.8vw,6.4rem)] leading-[0.95] tracking-[-0.04em] text-white text-balance mb-8"
        >
          {ctaCopy.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg font-light leading-relaxed text-gray-200 max-w-lg mx-auto mb-12"
        >
          {ctaCopy.desc}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onClick={() => onNavigate?.('contact')}
          className="group relative inline-flex w-full max-w-[22rem] sm:w-auto sm:max-w-none mx-auto items-center justify-center gap-4 font-mono text-[0.7rem] tracking-[0.25em] uppercase px-8 sm:px-14 py-5 bg-gradient-to-br from-teal-dark to-teal text-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_50px_rgba(0,180,216,0.4)]"
        >
          <span className="relative z-10">{t.cta.cta}</span>
          <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-gradient-to-br from-teal to-teal-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </div>
    </section>
  );
}
