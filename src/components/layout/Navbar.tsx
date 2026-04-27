import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLang } from '../../i18n';

interface Props {
  onNavigate?: (view: string) => void;
}

export default function Navbar({ onNavigate }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const { lang, t, setLanguage } = useLang();

  const labels = {
    goHome: lang === 'en' ? 'Go home' : lang === 'es' ? 'Ir al inicio' : 'Ir para o início',
    languageGroup: lang === 'en' ? 'Select language' : lang === 'es' ? 'Seleccionar idioma' : 'Selecionar idioma',
    themeToggle: lang === 'en' ? 'Toggle theme' : lang === 'es' ? 'Cambiar tema' : 'Mudar tema',
    openMenu: lang === 'en' ? 'Open navigation menu' : lang === 'es' ? 'Abrir menú de navegación' : 'Abrir menu de navegação',
    closeMenu: lang === 'en' ? 'Close navigation menu' : lang === 'es' ? 'Cerrar menú de navegación' : 'Fechar menu de navegação',
    menuDialog: lang === 'en' ? 'Navigation menu' : lang === 'es' ? 'Menú de navegación' : 'Menu de navegação',
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    if (href === '#hero') {
      onNavigate?.('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      onNavigate?.('home');
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-14 py-5 flex items-center justify-between ${
          isScrolled ? 'bg-navy-deep/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        {/* Logo container */}
        <button
          onClick={() => scrollToSection('#hero')}
          className="flex items-center gap-3 group relative z-50"
          aria-label={labels.goHome}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-teal/20 rounded-xl rotate-45 group-hover:rotate-90 transition-transform duration-500" />
            <span className="font-display text-2xl font-bold text-white relative">C</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-wider text-white">CCGrupo</span>
            <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-teal">Smart BPO</span>
          </div>
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex gap-8">
            {t.nav.links.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="font-mono text-label uppercase tracking-[0.2em] text-white hover:text-teal transition-colors relative group pb-1"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-teal transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* Language toggle */}
          <div className="flex items-center gap-1.5 font-mono text-label tracking-[0.1em] select-none" role="group" aria-label={labels.languageGroup}>
            <button
              onClick={() => lang !== 'es' && setLanguage('es')}
              aria-label="Español"
              aria-pressed={lang === 'es'}
              className={`transition-colors ${lang === 'es' ? 'text-teal font-semibold' : 'text-white hover:text-gray-100'}`}
            >
              ES
            </button>
            <span aria-hidden="true" className="text-gray-400">|</span>
            <button
              onClick={() => lang !== 'en' && setLanguage('en')}
              aria-label="English"
              aria-pressed={lang === 'en'}
              className={`transition-colors ${lang === 'en' ? 'text-teal font-semibold' : 'text-white hover:text-gray-100'}`}
            >
              EN
            </button>
            <span aria-hidden="true" className="text-gray-400">|</span>
            <button
              onClick={() => lang !== 'pt' && setLanguage('pt')}
              aria-label="Português"
              aria-pressed={lang === 'pt'}
              className={`transition-colors ${lang === 'pt' ? 'text-teal font-semibold' : 'text-white hover:text-gray-100'}`}
            >
              PT
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label={labels.themeToggle}
            className="w-8 h-8 flex items-center justify-center text-white hover:text-teal transition-colors"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* CTA */}
          <button
            onClick={() => onNavigate?.('contact')}
            className="font-mono text-label uppercase tracking-[0.2em] px-7 py-2.5 border border-teal/40 text-teal hover:bg-teal hover:text-navy-deep hover:border-teal hover:shadow-[0_0_30px_rgba(0,180,216,0.25)] transition-all duration-300"
          >
            {t.nav.contact}
          </button>
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile lang toggle */}
          <div className="flex items-center gap-1 font-mono text-label tracking-[0.1em]" role="group" aria-label={labels.languageGroup}>
            <button
              onClick={() => lang !== 'es' && setLanguage('es')}
              aria-label="Español"
              aria-pressed={lang === 'es'}
              className={`transition-colors ${lang === 'es' ? 'text-teal' : 'text-gray-300'}`}
            >
              ES
            </button>
            <span aria-hidden="true" className="text-gray-400">|</span>
            <button
              onClick={() => lang !== 'en' && setLanguage('en')}
              aria-label="English"
              aria-pressed={lang === 'en'}
              className={`transition-colors ${lang === 'en' ? 'text-teal' : 'text-gray-300'}`}
            >
              EN
            </button>
            <span aria-hidden="true" className="text-gray-400">|</span>
            <button
              onClick={() => lang !== 'pt' && setLanguage('pt')}
              aria-label="Português"
              aria-pressed={lang === 'pt'}
              className={`transition-colors ${lang === 'pt' ? 'text-teal' : 'text-gray-300'}`}
            >
              PT
            </button>
          </div>
          <button
            onClick={toggle}
            aria-label={labels.themeToggle}
            className="text-white hover:text-teal transition-colors p-1"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            aria-label={labels.openMenu}
            aria-expanded={isMobileMenuOpen}
            className="text-white p-1"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={labels.menuDialog}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10001] bg-navy-deep/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8"
          >
            <button
              aria-label={labels.closeMenu}
              className="absolute top-6 right-6 text-white p-2"
              onClick={() => setMobileOpen(false)}
            >
              <X size={32} />
            </button>

            <ul className="flex flex-col items-center w-full max-w-md">
              {t.nav.links.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="w-full border-b border-white/10 first:border-t"
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="w-full flex justify-between items-center py-6 font-display text-3xl text-white hover:text-teal hover:pl-4 transition-all duration-300"
                  >
                    <span>{link.name}</span>
                    <span className="font-mono text-xs tracking-widest text-teal">0{index + 1}</span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <button
                onClick={() => { setMobileOpen(false); onNavigate?.('contact'); }}
                className="font-mono text-xs tracking-[0.25em] uppercase px-10 py-4 bg-gradient-to-br from-teal-dark to-teal text-white hover:shadow-[0_8px_40px_rgba(0,180,216,0.35)] transition-all duration-300"
              >
                {t.nav.contact}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
