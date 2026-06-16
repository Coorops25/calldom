import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  HeartPulse, Landmark, ShoppingBag, Truck, Building2, GraduationCap,
  Plane, PawPrint, Utensils, Car, Users, Sparkles,
  X, CheckCircle2, TrendingUp, ArrowRight,
} from 'lucide-react';
import { useLang } from '../../i18n';

const ICONS = [HeartPulse, Landmark, ShoppingBag, Truck, Building2, GraduationCap, Plane, PawPrint, Utensils, Car, Users, Sparkles];

// 360° / 38s ≈ 9.47 deg/s — matches the previous CSS animation cadence.
const AUTO_SPEED = 360 / 38;
// px → deg: tuned so a slow horizontal drag rotates the wheel one step.
const DRAG_SENSITIVITY = 0.5;
// Movement above this threshold (px) counts as a drag, not a tap.
const TAP_THRESHOLD = 5;

type SectorItem = {
  name: string;
  desc: string;
  detail: string;
  challenges: string[];
  solutions: string[];
  kpis: { label: string; value: string }[];
};

interface Props {
  onModalOpenChange?: (open: boolean) => void;
  onNavigate?: (view: string) => void;
}

export default function Sectors({ onModalOpenChange, onNavigate }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLang();
  const s = t.sectors;
  const viewMoreLabel = t.common.viewMore;

  const [active, setActive] = useState<(SectorItem & { index: number }) | null>(null);

  const open = (item: SectorItem, index: number) => setActive({ ...item, index });
  const close = () => setActive(null);

  // ── Carousel rotation (auto-spin + click-and-drag) ───────────────────
  // We drive the rotation via rAF so users can grab the carousel and
  // turn it manually. CSS keyframes were too rigid to interrupt cleanly.
  const innerRef        = useRef<HTMLDivElement>(null);
  const rotationRef     = useRef(0);
  const isDraggingRef   = useRef(false);
  const isHoveringRef   = useRef(false);
  const dragStartRef    = useRef<{ x: number; rot: number; moved: boolean } | null>(null);

  useEffect(() => {
    let raf = 0;
    let lastT = performance.now();
    const tick = (t: number) => {
      const dt = (t - lastT) / 1000;
      lastT = t;
      if (!isDraggingRef.current && !isHoveringRef.current) {
        rotationRef.current += AUTO_SPEED * dt;
      }
      if (innerRef.current) {
        innerRef.current.style.setProperty('--rotation', `${rotationRef.current}deg`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // We attach pointermove/up to `window` (instead of using setPointerCapture
  // on the wrap) so the native `click` event still bubbles to the card —
  // pointer capture would redirect events and break the popup.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || !dragStartRef.current) return;
      const dx = e.clientX - dragStartRef.current.x;
      if (Math.abs(dx) > TAP_THRESHOLD) dragStartRef.current.moved = true;
      rotationRef.current = dragStartRef.current.rot + dx * DRAG_SENSITIVITY;
    };
    const onUp = () => {
      isDraggingRef.current = false;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only left button / primary pointer
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, rot: rotationRef.current, moved: false };
  };

  const handleCardActivate = (item: SectorItem, idx: number) => {
    // Suppress the click if the user actually dragged the carousel.
    if (dragStartRef.current?.moved) {
      dragStartRef.current = null;
      return;
    }
    dragStartRef.current = null;
    open(item, idx);
  };

  // ── Mobile sectors carousel: click-and-drag horizontal scroll ───────
  // Native touch swipe works for free (overflow-x: auto); these handlers
  // add desktop mouse click-drag and suppress the click that follows a drag.
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const mobileDragRef   = useRef<{ startX: number; startScroll: number; moved: boolean } | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const drag = mobileDragRef.current;
      const el = mobileScrollRef.current;
      if (!drag || !el) return;
      const dx = e.clientX - drag.startX;
      if (Math.abs(dx) > TAP_THRESHOLD) drag.moved = true;
      el.scrollLeft = drag.startScroll - dx;
    };
    const onUp = () => {
      // keep .moved flag long enough for the click handler to see it
      const drag = mobileDragRef.current;
      if (drag) setTimeout(() => { mobileDragRef.current = null; }, 30);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  const onMobilePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const el = mobileScrollRef.current;
    if (!el) return;
    mobileDragRef.current = {
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
  };

  const handleMobileCardClick = (item: SectorItem, idx: number) => {
    if (mobileDragRef.current?.moved) return;
    open(item, idx);
  };

  useEffect(() => {
    onModalOpenChange?.(!!active);
  }, [active, onModalOpenChange]);

  useEffect(() => {
    if (!active) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [active]);

  return (
    <>
      <section id="sectores" ref={ref} className="relative py-14 sm:py-20 px-5 sm:px-6 md:px-14 lg:px-28 overflow-hidden bg-transparent">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-teal/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-6">
              <div className="w-8 h-px bg-teal" />
              {s.label}
            </div>
            <h2 className="font-display text-3xl md:text-5xl leading-tight text-white mb-3 sm:mb-4">
              {s.heading}
            </h2>
            <p className="text-gray-300 font-light text-base max-w-2xl leading-relaxed">
              {s.sub}
            </p>
          </motion.div>

          {/* ── 3D carousel (desktop only) — clickable to open + draggable to spin ── */}
          <div className="hidden lg:block h-[440px] w-full mb-0 select-none overflow-visible">
            <div
              className="sectors-carousel-wrap sectors-carousel-draggable"
              onPointerDown={onPointerDown}
            >
              <div
                ref={innerRef}
                className="sectors-carousel-inner"
                style={{ '--quantity': ICONS.length, '--rotation': '0deg' } as React.CSSProperties}
              >
                {ICONS.map((Icon, i) => {
                  const hue = Math.round((i / ICONS.length) * 60); // 0-60° sweep within teal range
                  const r = Math.round(0   + hue * 0.4);
                  const g = Math.round(180 - hue * 0.8);
                  const b = Math.round(216 + hue * 0.5);
                  const item = s.items[i % s.items.length];
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleCardActivate(item, i % s.items.length)}
                      onMouseEnter={() => { isHoveringRef.current = true; }}
                      onMouseLeave={() => { isHoveringRef.current = false; }}
                      onDragStart={(e) => e.preventDefault()}
                      aria-label={item?.name}
                      className="sectors-carousel-card"
                      style={{ '--index': i, '--color-card': `${r}, ${g}, ${b}` } as React.CSSProperties}
                    >
                      <div className="sectors-carousel-face">
                        <span className="font-mono text-[0.6rem] tracking-[0.3em] text-white/45">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <Icon size={38} className="text-white/85" strokeWidth={1.4} />
                        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white text-center px-2 leading-tight line-clamp-2">
                          {item?.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile/tablet: horizontal carousel — drag with mouse or swipe with finger */}
          <div
            ref={mobileScrollRef}
            onPointerDown={onMobilePointerDown}
            className="sectors-mobile-scroller lg:hidden overflow-x-auto overflow-y-hidden pb-3 cursor-grab active:cursor-grabbing select-none"
          >
            <div className="flex gap-3 sm:gap-4 w-max">
              {s.items.map((item, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleMobileCardClick(item, i)}
                    onDragStart={(e) => e.preventDefault()}
                    className="group relative shrink-0 w-64 sm:w-72 p-5 sm:p-6 border border-white/10 hover:border-teal/40 bg-white/[0.02] hover:bg-teal/[0.05] rounded-2xl transition-colors duration-300 text-left cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl border border-white/10 group-hover:border-teal/40 bg-white/[0.03] group-hover:bg-teal/10 flex items-center justify-center mb-4 transition-all duration-300">
                      <Icon size={22} className="text-gray-400 group-hover:text-teal transition-colors duration-300" />
                    </div>

                    <div className="font-mono text-label tracking-[0.25em] uppercase text-teal/50 mb-2 group-hover:text-teal transition-colors duration-300">
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <h3 className="font-mono text-sm uppercase tracking-widest text-white mb-2 group-hover:text-teal transition-colors duration-300">
                      {item.name}
                    </h3>

                    <p className="text-gray-400 font-light text-sm leading-relaxed mb-3 line-clamp-3">
                      {item.desc}
                    </p>

                    <div className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.15em] uppercase text-teal">
                      <span>{viewMoreLabel}</span>
                      <ArrowRight size={11} />
                    </div>

                    <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-teal to-transparent group-hover:w-full transition-all duration-500 rounded-b-2xl" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={close}
              className="fixed inset-0 z-[9800] bg-slate-950/70 backdrop-blur-md"
            />

            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[9900] flex items-end sm:items-center justify-center p-3 sm:p-6 md:p-10 pointer-events-none"
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={`sector-modal-title-${active.index}`}
                className="sector-modal-panel pointer-events-auto relative w-[min(100%,56rem)] sm:w-[min(92vw,56rem)]
                           max-h-[calc(100dvh-1rem)] sm:max-h-[min(90vh,52rem)] overflow-y-auto overscroll-contain
                           rounded-t-[1.75rem] sm:rounded-[2.25rem]
                           border border-white/12 bg-[#0D1940]/95 backdrop-blur-2xl
                           shadow-[0_24px_100px_rgba(0,0,0,0.65)] sm:shadow-[0_36px_120px_rgba(0,0,0,0.72)]"
                onClick={e => e.stopPropagation()}
              >
                <div className="relative z-10 flex justify-center pt-3 pb-1 sm:hidden">
                  <div className="w-10 h-1 rounded-full bg-white/20" />
                </div>

                <div className="relative z-10 px-5 sm:px-10 md:px-14 py-6 sm:py-10 pb-8 sm:pb-10">
                  <button
                    type="button"
                    onClick={close}
                    aria-label={t.common.close}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-xl border border-white/10 bg-white/[0.08] backdrop-blur-md flex items-center justify-center text-white hover:text-teal hover:border-teal/30 transition-all duration-200 z-20"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-10 pr-12 sm:pr-12 min-w-0">
                    <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-2xl border border-teal/30 bg-teal/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                      {(() => {
                        const Icon = ICONS[active.index];
                        return <Icon size={24} className="text-teal sm:!w-7 sm:!h-7" />;
                      })()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[0.6rem] sm:text-[0.65rem] tracking-[0.25em] uppercase text-teal mb-1.5 sm:mb-2">
                        {String(active.index + 1).padStart(2, '0')} — {s.label}
                      </div>
                      <h3
                        id={`sector-modal-title-${active.index}`}
                        className="font-display text-[1.65rem] sm:text-4xl md:text-5xl text-white leading-tight break-words"
                      >
                        {active.name}
                      </h3>
                    </div>
                  </div>

                  <p className="max-w-3xl text-white/92 font-light text-[0.95rem] sm:text-lg leading-relaxed mb-8 sm:mb-12 border-l-2 border-teal/40 pl-4 sm:pl-6 break-words">
                    {active.detail}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
                    {active.kpis.map((kpi, i) => (
                      <div key={i} className="p-4 sm:p-6 border border-white/10 rounded-2xl bg-white/[0.06] backdrop-blur-sm text-center">
                        <div className="font-mono text-2xl sm:text-3xl font-bold text-teal mb-1">{kpi.value}</div>
                        <div className="font-mono text-[0.6rem] sm:text-xs tracking-[0.1em] uppercase text-white/60 leading-tight">{kpi.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[0.6rem] sm:text-[0.65rem] tracking-[0.25em] uppercase text-white/50 mb-4 sm:mb-6">
                        <TrendingUp size={14} className="text-teal shrink-0" />
                        {s.challenges}
                      </div>
                      <ul className="space-y-3 sm:space-y-4">
                        {active.challenges.map((c, i) => (
                          <li key={i} className="flex items-start gap-3 text-[0.9rem] sm:text-base text-white/90 font-light">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[0.6rem] sm:text-[0.65rem] tracking-[0.25em] uppercase text-white/50 mb-4 sm:mb-6">
                        <CheckCircle2 size={14} className="text-teal shrink-0" />
                        {s.solutions}
                      </div>
                      <ul className="space-y-3 sm:space-y-4">
                        {active.challenges.map((c, i) => (
                          <li key={i} className="flex items-start gap-3 text-[0.9rem] sm:text-base text-white/90 font-light">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                            {active.solutions[i] || c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* ── CTA: lleva al formulario con el sector pre-seleccionado ── */}
                  <div className="mt-8 sm:mt-14 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                    <div className="min-w-0">
                      <p className="font-mono text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] uppercase text-teal/70 mb-2">
                        {s.label} — {active.name}
                      </p>
                      <p className="font-display text-[1.05rem] sm:text-xl text-white leading-snug max-w-md">
                        {s.ctaPrompt}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        try { sessionStorage.setItem('calldom.prefillSector', active.name); } catch { /* ignore */ }
                        close();
                        onNavigate?.('contact');
                      }}
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 font-mono text-[0.65rem] tracking-[0.25em] uppercase px-7 py-4 bg-gradient-to-br from-teal-dark to-teal text-white rounded-xl shadow-[0_8px_30px_rgba(0,180,216,0.25)] hover:shadow-[0_14px_40px_rgba(0,180,216,0.4)] hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
                    >
                      <span>{s.cta}</span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
