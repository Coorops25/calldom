import { useEffect, useState, type CSSProperties, type ImgHTMLAttributes, type ReactNode } from 'react';
import { BRAND_ASSETS } from '../../config/branding';

type ThemedLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> & {
  fallback?: ReactNode;
  trimWhitespace?: boolean;
};

const LOGO_TRIM_FRAME_STYLE: CSSProperties = {
  aspectRatio: '908 / 244',
  display: 'inline-block',
  flexShrink: 0,
  overflow: 'hidden',
  position: 'relative',
  verticalAlign: 'middle',
};

const LOGO_TRIM_IMAGE_STYLE: CSSProperties = {
  height: '442.623%',
  left: '-9.471%',
  maxWidth: 'none',
  objectFit: 'fill',
  position: 'absolute',
  top: '-171.311%',
  width: '118.943%',
};

export default function ThemedLogo({
  fallback = null,
  alt = 'CallDom del Caribe Logo',
  className,
  style,
  trimWhitespace = false,
  ...imgProps
}: ThemedLogoProps) {
  const readInitialIsLight = () => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('light');
    }
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'light';
    }
    return false;
  };

  const [isLightTheme, setIsLightTheme] = useState<boolean>(readInitialIsLight);
  const [src, setSrc] = useState<string>(() => (readInitialIsLight() ? BRAND_ASSETS.logoLight : BRAND_ASSETS.logoDark));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const html = document.documentElement;
    const updateTheme = () => setIsLightTheme(html.classList.contains('light'));
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setSrc(isLightTheme ? BRAND_ASSETS.logoLight : BRAND_ASSETS.logoDark);
    setFailed(false);
  }, [isLightTheme]);

  const handleError = () => {
    if (src !== BRAND_ASSETS.legacyLogo) {
      setSrc(BRAND_ASSETS.legacyLogo);
      return;
    }
    setFailed(true);
  };

  if (failed) return <>{fallback}</>;

  if (!trimWhitespace) {
    return <img {...imgProps} className={className} style={style} src={src} alt={alt} onError={handleError} />;
  }

  return (
    <span className={className} style={{ ...LOGO_TRIM_FRAME_STYLE, ...style }}>
      <img
        {...imgProps}
        src={src}
        alt={alt}
        onError={handleError}
        style={LOGO_TRIM_IMAGE_STYLE}
      />
    </span>
  );
}
