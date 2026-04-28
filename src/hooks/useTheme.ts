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

  return { isDark, toggle: () => setIsDark(d => !d) };
}
