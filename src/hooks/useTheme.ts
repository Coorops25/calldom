import { useState, useEffect } from 'react';

// Always start dark to match SSR prerender output.
// The effect below applies the real user preference after hydration,
// preventing React error #418 (hydration mismatch for light-mode users).
const SSR_DEFAULT = true;

function applyThemeToDom(dark: boolean) {
  const html = document.documentElement;
  html.classList.toggle('light', !dark);
  html.style.colorScheme = dark ? 'dark' : 'light';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#00b4d8' : '#f0f4f8');
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { /* storage unavailable */ }
}

export function useTheme() {
  const [isDark, setIsDark] = useState(SSR_DEFAULT);

  // After hydration, sync to real user preference without causing a mismatch.
  useEffect(() => {
    const preferred = document.documentElement.classList.contains('light')
      ? false
      : localStorage.getItem('theme') !== 'light';
    applyThemeToDom(preferred);
    setIsDark(preferred);
  }, []);

  const toggle = () => {
    const newIsDark = !isDark;
    window.dispatchEvent(new CustomEvent('ccg:theme-switch'));
    // Two rAFs give React a tick to mount the preloader before the re-render.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        applyThemeToDom(newIsDark);
        setIsDark(newIsDark);
      });
    });
  };

  return { isDark, toggle };
}
