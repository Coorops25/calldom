import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import es from '../src/i18n/es';
import en from '../src/i18n/en';
import pt from '../src/i18n/pt';
import { servicesData } from '../src/data/services';

type Lang = 'es' | 'en' | 'pt';

const translations = { es, en, pt } as const;
const langMeta: Record<Lang, { htmlLang: string; locale: string; siteTitle: string }> = {
  es: { htmlLang: 'es', locale: 'es_DO', siteTitle: 'CallDom del Caribe | BPO del Caribe - CX, Ventas, IA y Digital Studio' },
  en: { htmlLang: 'en', locale: 'en_US', siteTitle: 'CallDom del Caribe | Caribbean BPO - CX, Sales, AI and Digital Studio' },
  pt: { htmlLang: 'pt', locale: 'pt_BR', siteTitle: 'CallDom del Caribe | BPO do Caribe - CX, Vendas, IA e Digital Studio' },
};

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function toUrl(route: string): string {
  const normalized = route === '/' ? '/' : route.startsWith('/') ? route : `/${route}`;
  return `https://calldomdelcaribe.com${normalized}`;
}

function prefixForLang(lang: Lang): string {
  return lang === 'es' ? '' : `/${lang}`;
}

function servicePath(lang: Lang, id: string): string {
  return `${prefixForLang(lang)}/servicio/${id}` || `/servicio/${id}`;
}

function homePath(lang: Lang): string {
  return prefixForLang(lang) || '/';
}

function contactPath(lang: Lang): string {
  return `${prefixForLang(lang)}/contacto` || '/contacto';
}

function privacyPath(lang: Lang): string {
  return `${prefixForLang(lang)}/politicas-privacidad` || '/politicas-privacidad';
}

function replaceTag(html: string, pattern: RegExp, replacement: string): string {
  return html.replace(pattern, replacement);
}

function buildTemplate(baseHtml: string, opts: {
  lang: Lang;
  title: string;
  description: string;
  route: string;
  body: string;
  alternates?: Array<{ hreflang: string; href: string }>;
}): string {
  let html = baseHtml;
  const { htmlLang, locale } = langMeta[opts.lang];

  html = replaceTag(html, /<html lang="[^"]*">/, `<html lang="${htmlLang}">`);
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(opts.title)}</title>`);
  html = replaceTag(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(opts.description)}" />`);
  html = replaceTag(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(opts.title)}" />`);
  html = replaceTag(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(opts.description)}" />`);
  html = replaceTag(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${toUrl(opts.route)}" />`);
  html = replaceTag(html, /<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${locale}" />`);
  html = replaceTag(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeHtml(opts.title)}" />`);
  html = replaceTag(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeHtml(opts.description)}" />`);
  html = replaceTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${toUrl(opts.route)}" />`);
  html = html.replace(/<link rel="alternate"[^>]+>\s*/g, '');

  const alternates = opts.alternates ?? [];
  const hreflangTags = alternates.map((link) => `    <link rel="alternate" href="${link.href}" hreflang="${link.hreflang}" />`).join('\n');
  if (hreflangTags) {
    html = html.replace(/(\s*<!--.*?Hreflang.*?-->[\s\S]*?)(\s*<!--.*?Schema\.org: Organization.*?-->)/i, `$1${hreflangTags}\n\n$2`);
  }

  html = html.replace(/<div id="root">\s*<\/div>/, `<div id="root">\n${opts.body}\n    </div>`);
  return html;
}

function shell(content: string): string {
  return [
    '    <main style="max-width:1120px;margin:0 auto;padding:48px 24px 80px;font-family:Arial,sans-serif;color:#0f172a;line-height:1.65">',
    content,
    '    </main>',
  ].join('\n');
}

function section(title: string, body: string): string {
  return `      <section style="margin-bottom:32px"><h2 style="font-size:28px;line-height:1.15;margin:0 0 12px">${escapeHtml(title)}</h2>${body}</section>`;
}

function paragraph(text: string): string {
  return `<p style="margin:0 0 12px;font-size:18px;color:#334155">${escapeHtml(text)}</p>`;
}

function list(items: string[]): string {
  return `<ul style="margin:0;padding-left:20px;color:#334155">${items.map((item) => `<li style="margin:0 0 8px">${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function renderHome(lang: Lang): string {
  const t = translations[lang];
  const services = Object.entries(t.services.items).map(([id, svc]) => {
    const service = servicesData.find((item) => item.id === id);
    return `
      <article style="padding:20px;border:1px solid #cbd5e1;border-radius:16px;margin:0 0 16px">
        <h3 style="margin:0 0 6px;font-size:22px">${escapeHtml(svc.title)}</h3>
        <p style="margin:0 0 8px;color:#0f766e;font-weight:700">${escapeHtml(svc.subtitle)}</p>
        <p style="margin:0;color:#334155">${escapeHtml(svc.desc)}</p>
        <p style="margin:12px 0 0;color:#475569">Ruta: ${escapeHtml(service?.link ?? servicePath(lang, id))}</p>
      </article>`;
  }).join('');

  const reasons = t.reasons.items.slice(0, 3).map((item) => `<li style="margin-bottom:10px"><strong>${escapeHtml(item.title)}:</strong> ${escapeHtml(item.desc)}</li>`).join('');

  const sectors = t.sectors.items.map((sector) => `
    <article style="padding:18px;border:1px solid #e2e8f0;border-radius:14px;margin:0 0 12px">
      <h3 style="margin:0 0 6px">${escapeHtml(sector.name)}</h3>
      <p style="margin:0 0 8px;color:#334155">${escapeHtml(sector.desc)}</p>
      <p style="margin:0;color:#475569">${escapeHtml(sector.detail)}</p>
    </article>`).join('');

  return shell(`
      <header style="padding:24px 0 36px;border-bottom:1px solid #e2e8f0;margin-bottom:36px">
        <p style="margin:0 0 8px;letter-spacing:.18em;text-transform:uppercase;color:#0f766e;font-size:12px">${escapeHtml(t.hero.badge)}</p>
        <h1 style="font-size:clamp(42px,7vw,84px);line-height:1.02;margin:0 0 18px">${escapeHtml(t.hero.line1)}<br />${escapeHtml(t.hero.line2)}<br />${escapeHtml(t.hero.line3a)} ${escapeHtml(t.hero.line3b)}</h1>
        <p style="max-width:760px;font-size:20px;color:#334155;margin:0 0 16px">${escapeHtml(t.hero.desc)}</p>
        <p style="margin:0;color:#64748b">${escapeHtml(t.cta.desc)}</p>
      </header>
      ${section(lang === 'en' ? 'About' : lang === 'pt' ? 'Sobre' : 'Nosotros', paragraph(t.about.desc) + list(t.about.stats))}
      ${section(lang === 'en' ? 'Services' : lang === 'pt' ? 'Serviços' : 'Servicios', services)}
      ${section(lang === 'en' ? 'Why us' : lang === 'pt' ? 'Diferencial' : 'Diferencial', `<ul style="margin:0;padding-left:20px">${reasons}</ul>`)}
      ${section(t.sectors.label, paragraph(t.sectors.sub) + sectors)}
      ${section(t.footer.contactTitle, `
        <p style="margin:0 0 8px">${escapeHtml('Calle 2 No.23 Edificio Neris Aracena, El Millón, Santo Domingo RD 10111')}</p>
        <p style="margin:0 0 8px">${escapeHtml('info@calldomdelcaribe.com')}</p>
        <p style="margin:0">${escapeHtml('+1 (829) 987-1507')}</p>
      `)}
  `);
}

function renderService(lang: Lang, id: string): string {
  const t = translations[lang];
  const service = servicesData.find((item) => item.id === id);
  const detail = t.serviceDetails[id as keyof typeof t.serviceDetails] as Record<string, any>;
  if (!service || !detail) return shell(paragraph('Not found'));

  const title = service.title.replaceAll('â€"', '–');
  const benefits = (detail.benefits ?? []).map((item) => `<li style="margin-bottom:10px"><strong>${escapeHtml(item.title)}:</strong> ${escapeHtml(item.desc)}</li>`).join('');
  const features = (detail.features ?? []).map((item) => `<li style="margin-bottom:8px">${escapeHtml(item)}</li>`).join('');
  const faqs = (detail.faq ?? []).map((item) => `
    <details style="margin:0 0 12px;padding:14px 16px;border:1px solid #cbd5e1;border-radius:12px">
      <summary style="cursor:pointer;font-weight:700">${escapeHtml(item.question)}</summary>
      <p style="margin:10px 0 0;color:#334155">${escapeHtml(item.answer)}</p>
    </details>`).join('');

  const baseBlock = t.serviceModule.baseBlock.pillars.map((pillar) => `<li style="margin-bottom:10px"><strong>${escapeHtml(pillar.title)}:</strong> ${escapeHtml(pillar.desc)}</li>`).join('');

  return shell(`
      <header style="padding:24px 0 36px;border-bottom:1px solid #e2e8f0;margin-bottom:36px">
        <p style="margin:0 0 8px;letter-spacing:.18em;text-transform:uppercase;color:#0f766e;font-size:12px">${escapeHtml(t.serviceModule.servicePrefix)} ${escapeHtml(service.id)}</p>
        <h1 style="font-size:clamp(38px,6vw,72px);line-height:1.05;margin:0 0 10px">${escapeHtml(title)}</h1>
        <p style="margin:0 0 12px;font-size:20px;color:#0f766e;font-weight:700">${escapeHtml(service.subtitle ?? '')}</p>
        <p style="max-width:840px;font-size:18px;color:#334155;margin:0">${escapeHtml(detail.longDesc ?? '')}</p>
      </header>
      ${section(lang === 'en' ? 'Features' : lang === 'pt' ? 'Características' : 'Características', list(detail.features ?? []))}
      ${section(lang === 'en' ? 'Benefits' : lang === 'pt' ? 'Benefícios' : 'Beneficios Clave', `<ul style="margin:0;padding-left:20px">${benefits}</ul>`)}
      ${section(lang === 'en' ? 'What we do' : lang === 'pt' ? 'O que fazemos' : '¿Qué hacemos?', paragraph(detail.whatWeDoDesc ?? '') + list(detail.whatWeDoBoxes?.map((box) => box.title) ?? []))}
      ${section(lang === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes', faqs)}
      ${section(lang === 'en' ? 'Unified service foundation' : 'Base unificada de servicios', `<ul style="margin:0;padding-left:20px">${baseBlock}</ul>`)}
      ${section(lang === 'en' ? 'Contact' : lang === 'pt' ? 'Contato' : 'Contacto', paragraph(t.contact.commercial))}
  `);
}

function renderContact(lang: Lang): string {
  const t = translations[lang];
  return shell(`
      <header style="padding:24px 0 36px;border-bottom:1px solid #e2e8f0;margin-bottom:36px">
        <p style="margin:0 0 8px;letter-spacing:.18em;text-transform:uppercase;color:#0f766e;font-size:12px">${escapeHtml(t.contact.label)}</p>
        <h1 style="font-size:clamp(38px,6vw,72px);line-height:1.05;margin:0 0 10px">${escapeHtml(t.contact.headingPre)} <span style="color:#0f766e">${escapeHtml(t.contact.headingEm)}</span></h1>
        <p style="max-width:760px;font-size:18px;color:#334155;margin:0">${escapeHtml(t.contact.desc)}</p>
      </header>
      ${section(lang === 'en' ? 'Contact details' : lang === 'pt' ? 'Contato' : 'Contacto', list([
        `${t.contact.infoLabels.location}: ${t.contact.infoSubs.location}`,
        `${t.contact.infoLabels.email}: info@calldomdelcaribe.com`,
        `${t.contact.infoLabels.phone}: +1 (829) 987-1507`,
        `${t.contact.infoLabels.schedule}: ${t.contact.infoSubs.schedule}`,
      ]))}
      ${section(lang === 'en' ? 'Service of interest' : 'Servicio de interés', list(Object.values(t.services.items).map((svc) => svc.title)))}
      ${section(lang === 'en' ? 'Commercial demo' : 'Demo comercial', paragraph(t.contact.commercial))}
  `);
}

function renderPrivacy(lang: Lang): string {
  const t = translations[lang];
  return shell(`
      <header style="padding:24px 0 36px;border-bottom:1px solid #e2e8f0;margin-bottom:36px">
        <p style="margin:0 0 8px;letter-spacing:.18em;text-transform:uppercase;color:#0f766e;font-size:12px">${escapeHtml(t.privacy.label)}</p>
        <h1 style="font-size:clamp(38px,6vw,72px);line-height:1.05;margin:0 0 10px">${escapeHtml(t.privacy.heading)}</h1>
        <p style="max-width:860px;font-size:18px;color:#334155;margin:0">${escapeHtml(t.privacy.desc)}</p>
      </header>
      ${section(t.privacy.title, paragraph(t.privacy.intro))}
      ${section(lang === 'en' ? 'Policy sections' : 'Secciones de la política', t.privacy.sections.map((item) => `<article style="margin:0 0 16px;padding:16px;border:1px solid #e2e8f0;border-radius:12px"><h3 style="margin:0 0 8px">${escapeHtml(item.title)}</h3><p style="margin:0;color:#334155">${escapeHtml(item.content)}</p></article>`).join(''))}
      ${section(t.privacy.heading, t.privacy.policies.map((item, index) => `<article style="margin:0 0 14px;padding:14px 16px;border:1px solid #e2e8f0;border-radius:12px"><h3 style="margin:0 0 6px">${index + 1}. ${escapeHtml(item.title)}</h3><p style="margin:0;color:#334155">${escapeHtml(item.desc)}</p></article>`).join(''))}
      ${section(lang === 'en' ? 'Contact' : lang === 'pt' ? 'Contato' : 'Contacto', paragraph(t.privacy.contact))}
  `);
}

function pageAlternates(route: string, _lang: Lang): Array<{ hreflang: string; href: string }> {
  if (route === '/') {
    return [
      { hreflang: 'es-do', href: 'https://calldomdelcaribe.com/' },
      { hreflang: 'en', href: 'https://calldomdelcaribe.com/en' },
      { hreflang: 'pt', href: 'https://calldomdelcaribe.com/pt' },
      { hreflang: 'x-default', href: 'https://calldomdelcaribe.com/' },
    ];
  }

  const home = route.split('/').filter(Boolean).slice(1).join('/');
  if (home === '') {
    return [
      { hreflang: 'es-do', href: 'https://calldomdelcaribe.com/' },
      { hreflang: 'en', href: 'https://calldomdelcaribe.com/en' },
      { hreflang: 'pt', href: 'https://calldomdelcaribe.com/pt' },
      { hreflang: 'x-default', href: 'https://calldomdelcaribe.com/' },
    ];
  }

  if (home.startsWith('servicio/')) {
    const id = home.split('/')[1];
    return [
      { hreflang: 'es-do', href: `https://calldomdelcaribe.com/servicio/${id}` },
      { hreflang: 'en', href: `https://calldomdelcaribe.com/en/servicio/${id}` },
      { hreflang: 'x-default', href: `https://calldomdelcaribe.com/servicio/${id}` },
    ];
  }

  return [];
}

async function writePage(baseHtml: string, route: string, lang: Lang, title: string, description: string, body: string): Promise<void> {
  const alternates = pageAlternates(route, lang);
  const html = buildTemplate(baseHtml, { lang, title, description, route, body, alternates });
  const segments = route === '/' ? [] : route.replace(/^\//, '').split('/');
  const outPath = path.join(DIST, ...segments, 'index.html');
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, html, 'utf8');
}

async function main() {
  const baseHtml = await readFile(path.join(DIST, 'index.html'), 'utf8');
  const pages: Array<{ route: string; lang: Lang; title: string; description: string; body: string }> = [];

  for (const lang of ['es', 'en', 'pt'] as const) {
    const t = translations[lang];
    pages.push({
      route: homePath(lang),
      lang,
      title: langMeta[lang].siteTitle,
      description: t.hero.desc,
      body: renderHome(lang),
    });

    for (const id of ['01', '02', '03', '04', '05']) {
      if (lang === 'pt') continue;
      const service = servicesData.find((item) => item.id === id);
      const detail = t.serviceDetails[id as keyof typeof t.serviceDetails] as Record<string, any>;
      if (!service || !detail) continue;
      pages.push({
        route: servicePath(lang, id),
        lang,
        title: `${service.title} | CallDom del Caribe`,
        description: detail.longDesc ?? '',
        body: renderService(lang, id),
      });
    }

    pages.push({
      route: contactPath(lang),
      lang,
      title: `${t.contact.label} | CallDom del Caribe`,
      description: t.contact.desc,
      body: renderContact(lang),
    });

    pages.push({
      route: privacyPath(lang),
      lang,
      title: `${t.privacy.heading} | CallDom del Caribe`,
      description: t.privacy.desc,
      body: renderPrivacy(lang),
    });
  }

  for (const page of pages) {
    await writePage(baseHtml, page.route, page.lang, page.title, page.description, page.body);
  }

  console.log(`✓ Prerendered ${pages.length} pages`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
