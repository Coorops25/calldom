import { motion } from 'motion/react';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-navy-deep flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-6"
      >
        {/* CCG mark */}
        <div className="w-14 h-14 border-2 border-teal rounded-xl flex items-center justify-center">
          <span className="font-mono text-sm font-bold text-teal tracking-wider">CCG</span>
        </div>

        {/* Progress bar */}
        <div className="w-32 h-px bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal to-teal-bright"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
