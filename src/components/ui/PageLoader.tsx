import { useState, type CSSProperties } from 'react';
import { motion } from 'motion/react';
import { BRAND_ASSETS } from '../../config/branding';

const LOGO_TRIM_FRAME_STYLE: CSSProperties = {
  aspectRatio: '892 / 170',
};

const LOGO_TRIM_IMAGE_STYLE: CSSProperties = {
  height: '635.294%',
  left: '-10.538%',
  maxWidth: 'none',
  objectFit: 'fill',
  position: 'absolute',
  top: '-268.235%',
  width: '121.076%',
};

export default function PageLoader() {
  const [logoSrc, setLogoSrc] = useState(BRAND_ASSETS.loaderLogo);
  const [showFallbackMark, setShowFallbackMark] = useState(false);

  return (
    <div className="fixed inset-0 z-[9999] bg-navy-deep flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-6"
      >
        {!showFallbackMark ? (
          <span
            className="relative h-11 w-[14.4375rem] overflow-hidden sm:h-12 sm:w-[15.75rem] md:h-14 md:w-[18.375rem]"
            style={LOGO_TRIM_FRAME_STYLE}
          >
            <img
              src={logoSrc}
              alt="CallDom del Caribe"
              width={1080}
              height={1080}
              decoding="async"
              style={LOGO_TRIM_IMAGE_STYLE}
              onError={() => {
                if (logoSrc !== BRAND_ASSETS.legacyLogo) {
                  setLogoSrc(BRAND_ASSETS.legacyLogo);
                  return;
                }
                setShowFallbackMark(true);
              }}
            />
          </span>
        ) : (
          <div className="flex h-14 w-[11.8125rem] items-center justify-center rounded-2xl border-2 border-teal sm:w-[13.125rem] md:w-[14.4375rem]">
            <span className="font-mono text-3xl md:text-4xl font-bold text-teal tracking-wider">CDM</span>
          </div>
        )}

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
