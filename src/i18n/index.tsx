import { createContext, useContext, useState, type ReactNode } from 'react';
import es from './es';
import en from './en';

export type Lang = 'es' | 'en';

const translations = { es, en };

interface LangContextValue {
  lang: Lang;
  t: typeof es;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'es';
    return (localStorage.getItem('lang') as Lang) ?? 'es';
  });

  const toggleLang = () =>
    setLang(l => {
      const next: Lang = l === 'es' ? 'en' : 'es';
      localStorage.setItem('lang', next);
      return next;
    });

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}