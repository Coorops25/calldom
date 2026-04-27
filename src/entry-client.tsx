import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';

function initGoogleAnalytics() {
  const gaId = import.meta.env.VITE_GA_ID;
  if (!gaId || gaId.length < 6 || typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    wait_for_update: 500,
  });

  const consent = localStorage.getItem('ccg_cookie_consent');
  if (consent === 'accepted') {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', gaId, { anonymize_ip: true });
}

initGoogleAnalytics();

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App initialPath={window.location.pathname} />
  </StrictMode>,
);
