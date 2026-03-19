import { motion } from 'motion/react';
import { useTheme } from '../../hooks/useTheme';

export default function BackgroundEffects() {
  const { isDark } = useTheme();

  return (
    <>
      {/* Grain Effect */}
      <div className="fixed inset-[-100%] w-[300%] h-[300%] pointer-events-none z-[40] opacity-[0.03] animate-grain bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E')]"></div>

      {/* Glow Orb — top right */}
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 80, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed -top-[10%] -right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(0,180,216,0.15), transparent 70%)'
            : 'radial-gradient(circle, rgba(0,119,182,0.2), transparent 65%)',
          opacity: isDark ? 0.3 : 0.5,
          filter: 'blur(120px)',
        }}
      />

      {/* Glow Orb — bottom left */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed bottom-[20%] -left-[8%] w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(0,119,182,0.1), transparent 70%)'
            : 'radial-gradient(circle, rgba(0,150,199,0.16), transparent 65%)',
          opacity: isDark ? 0.2 : 0.4,
          filter: 'blur(120px)',
        }}
      />
    </>
  );
}
