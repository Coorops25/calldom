import { useState, useEffect } from 'react';

function readInitialIsDark(): boolean {
  if (typeof document !== 'undefined') {
    const html = document.documentElement;
    if (html.classList.contains('light')) return false;
  }

  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') !== 'light';
  }

  return true;
}

export function useTheme() {
  const [isDark, setIsDark] = useState(readInitialIsDark);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('light');
    } else {
      html.classList.add('light');
    }
    html.style.colorScheme = isDark ? 'dark' : 'light';
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', isDark ? '#00b4d8' : '#f0f4f8');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggle = () => {
    const newIsDark = !isDark;

    const applyTheme = () => {
      const html = document.documentElement;
      html.classList.toggle('light', !newIsDark);
      html.style.colorScheme = newIsDark ? 'dark' : 'light';
      try { localStorage.setItem('theme', newIsDark ? 'dark' : 'light'); } catch { /* storage unavailable */ }
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', newIsDark ? '#00b4d8' : '#f0f4f8');
      setIsDark(newIsDark);
    };

    // Tell App.tsx to render the CCG Preloader on top. App listens for
    // this event and shows the preloader for ~1.4s, then bumps a key on
    // the homepage tree so all entry animations replay — the user sees
    // a proper "loading" ceremony instead of a half-painted re-render.
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ccg:theme-switch'));
    }
    // Two rAFs to give React a tick to mount the preloader before we
    // kick off the re-render storm that flips the theme.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        applyTheme();
      });
    });
  };

  return { isDark, toggle };
}
