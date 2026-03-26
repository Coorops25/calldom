import { useEffect, useState, type ImgHTMLAttributes, type ReactNode } from 'react';
import { BRAND_ASSETS } from '../../config/branding';

type ThemedLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> & {
  fallback?: ReactNode;
};

function getIsLightTheme() {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('light');
}

export default function ThemedLogo({
  fallback = null,
  alt = 'CCGrupo Logo',
  ...imgProps
}: ThemedLogoProps) {
  const [isLightTheme, setIsLightTheme] = useState<boolean>(() => getIsLightTheme());
  const [src, setSrc] = useState<string>(() =>
    getIsLightTheme() ? BRAND_ASSETS.logoLight : BRAND_ASSETS.logoDark
  );
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

  return <img {...imgProps} src={src} alt={alt} onError={handleError} />;
}
