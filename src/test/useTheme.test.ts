import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../hooks/useTheme';

// Minimal localStorage shim — avoids relying on jsdom's incomplete implementation.
function makeStorage() {
  const store: Record<string, string> = {};
  return {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
  };
}

beforeEach(() => {
  document.documentElement.classList.remove('light');

  const storage = makeStorage();
  vi.stubGlobal('localStorage', storage);

  // Stub rAF to fire synchronously so timing tests are deterministic.
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    cb(performance.now());
    return 0;
  });
});

describe('useTheme', () => {
  it('initialises to dark mode (SSR default)', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.isDark).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('picks up stored light preference after mount', () => {
    localStorage.setItem('theme', 'light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.isDark).toBe(false);
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('toggle switches dark → light and updates DOM + storage', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.isDark).toBe(true);

    act(() => { result.current.toggle(); });

    expect(result.current.isDark).toBe(false);
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('toggle switches light → dark', () => {
    localStorage.setItem('theme', 'light');
    const { result } = renderHook(() => useTheme());

    act(() => { result.current.toggle(); });

    expect(result.current.isDark).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('toggle dispatches ccg:theme-switch event', () => {
    const { result } = renderHook(() => useTheme());
    const spy = vi.fn();
    window.addEventListener('ccg:theme-switch', spy);

    act(() => { result.current.toggle(); });

    expect(spy).toHaveBeenCalledTimes(1);
    window.removeEventListener('ccg:theme-switch', spy);
  });

  it('toggle DOM update completes within 100ms (synchronous rAF stub)', () => {
    const { result } = renderHook(() => useTheme());

    const start = performance.now();
    act(() => { result.current.toggle(); });
    const elapsed = performance.now() - start;

    // With synchronous rAF stubs both frames fire instantly.
    // In production the preloader adds ~1.5s; here we verify only
    // the DOM-flip path (applyThemeToDom) has no accidental blocking work.
    expect(elapsed).toBeLessThan(100);
    expect(result.current.isDark).toBe(false);
  });
});
