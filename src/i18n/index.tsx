import { createContext, useContext, useState, type ReactNode } from 'react';

type Lang = 'es' | 'en';

const translations = {
  es: {
    back: 'Volver',
    nav: {
      links: [
        { name: 'Inicio',      href: '#hero' },
        { name: 'Nosotros',    href: '#about' },
        { name: 'Servicios',   href: '#services' },
        { name: 'Diferencial', href: '#reasons' },
        { name: 'Clientes',    href: '#clients' },
      ],
      contact: 'Contacto',
    },
    hero: {
      badge:  'BPO de Nueva Generación — Desde 2011',
      line1:  'Tecnología para',
      line2:  'crecer,',
      line3a: 'Personas que',
      line3b: 'conectan',
      desc:   'Transformamos la experiencia del cliente fusionando talento humano con agentes virtuales autónomos, flujos omnicanal e inteligencia artificial.',
      cta1:   'Comenzar ahora',
      cta2:   'Ver servicios',
      scroll: 'Scroll',
    },
    about: {
      label:       '02 / 05 — Nosotros',
      headingPre:  'Más de 15 años transformando el',
      headingPost: 'en Colombia',
      descPre:     'Somos un',
      descPost:    'de nueva generación, especializado en un ecosistema de soluciones de Contact Center con Inteligencia Artificial. Fusionamos Talento Humano y Agentes Virtuales Autónomos con flujos omnicanal para operaciones de ventas y soporte altamente eficientes.',
      evoPre:      'Evolucionamos el',
      evoMid:      'tradicional hacia modelos basados en',
      evoStrong:   'productividad, datos y autonomía operativa',
      quote:       'Tecnología para crecer, Personas que conectan.',
      stats: [
        'Años de experiencia en el sector BPO',
        'Más productividad en agentes',
        'Idiomas: español, inglés, italiano, francés',
        'Consultas resueltas en primera llamada',
      ],
    },
    marquee: {
      items: ['Automatización', 'Contact Center', 'Omnicanalidad', 'Agentes Autónomos', 'Power BI', 'Inteligencia Artificial', 'Mensajes Masivos', 'BPO Inteligente'],
    },
    services: {
      label:   '03 / 05 — Servicios',
      explore: 'Explorar',
      items: {
        '01': { title: 'Customer Experience', subtitle: 'CX 360°', desc: 'Gestión Integral de Experiencia del Cliente. Operamos como extensión de tu equipo con talento bilingüe, procesos estructurados y tecnología para cada punto de contacto.' },
        '02': { title: 'Leads & Ventas', subtitle: 'Conversión Inteligente', desc: 'Convertimos leads en ventas con automatización estratégica. Captamos, calificamos y cerramos oportunidades por WhatsApp, voz y CRM de forma coordinada.' },
        '03': { title: 'Omnicanalidad', subtitle: 'Conectividad Total', desc: 'Unifica todos tus canales de comunicación en una sola plataforma. Voz, WhatsApp, email, chatbot, IVR inteligente y más, todo conectado y automatizado.' },
        '04': { title: 'Agentes Autónomos', subtitle: 'Suite AVA', desc: 'Agentes virtuales con IA que trabajan 24/7 sin pausas: atienden, venden, califican leads y gestionan redes sociales de forma completamente autónoma.' },
        '05': { title: 'Digital Studio', subtitle: 'Software a Medida', desc: 'Creamos tecnología que se adapta a tu negocio y acelera tus resultados: CRM, apps, e-commerce, portales, dashboards y módulos inteligentes.' },
        '06': { title: 'Analítica Avanzada', subtitle: 'Power BI & Looker Studio', desc: 'Dashboards en tiempo real adaptados a BPO y cualquier industria. Mide rendimiento, identifica oportunidades y toma decisiones basadas en datos reales.' },
      },
    },
    reasons: {
      label:      '04 / 05 — Diferencial',
      headingPre: '¿Por qué elegir a Contact Center',
      headingEm:  'Grupo?',
      items: [
        { title: 'IA + Talento Humano',        desc: 'Fusionamos agentes virtuales autónomos con talento humano capacitado para operaciones de máxima eficiencia y empatía.' },
        { title: 'Decisiones con Datos',        desc: 'Transformamos datos en acciones en tiempo real con Power BI y analítica avanzada para resultados medibles.' },
        { title: 'Alcance Global',              desc: 'Operamos en 4 idiomas con capacidad nearshore para EE.UU. y mercados internacionales desde Bogotá.' },
        { title: 'Autonomía Operativa',         desc: 'Modelos basados en productividad y autonomía que superan al BPO tradicional en velocidad y resultados.' },
        { title: 'Omnicanalidad Real',          desc: 'WhatsApp, email, SMS, chatbots y voz unificados en una sola plataforma para cero fricción.' },
        { title: 'Verticales Especializadas',   desc: 'Expertise en salud, finanzas y telco con soluciones como agendamiento inteligente para IPS y clínicas.' },
      ],
    },
    clients: {
      label:      '05 / 05 — Clientes',
      headingPre: 'Nuestros',
      headingEm:  'Clientes',
      sub:        'Clientes satisfechos a nivel global',
    },
    cta: {
      label:       '¿Listo para transformar tu operación?',
      headingPre:  'Hablemos del',
      headingEm:   'futuro',
      headingPost: 'de tu empresa',
      desc:        'Descubre cómo nuestro ecosistema de soluciones puede impulsar tu negocio con inteligencia artificial y talento humano.',
      button:      'Agendar Reunión',
    },
    footer: {
      desc:          'BPO de nueva generación. Ecosistema de soluciones de Contact Center con IA. Más de 15 años transformando operaciones.',
      servicesTitle: 'Servicios',
      companyTitle:  'Empresa',
      contactTitle:  'Contacto',
      serviceLinks:  ['Automatización', 'Contact Center', 'Omnicanalidad', 'Mensajes Masivos', 'Agentes Autónomos'],
      companyLinks:  ['Nosotros', 'Contacto', 'Posting'],
      copyright:     '© 2025 Contact Center Grupo S.A.S.',
      privacy:       'Políticas de Privacidad',
      location:      'Bogotá, Colombia',
    },
    contact: {
      label:      '— Contacto',
      headingPre: 'Hablemos de tu',
      headingEm:  'próximo proyecto',
      desc:       'Cuéntanos qué necesitas y un especialista de nuestro equipo se pondrá en contacto contigo en menos de 24 horas.',
      infoLabels: { location: 'Ubicación', email: 'Email', phone: 'Teléfono', schedule: 'Horario' },
      infoSubs:   { email: 'Respondemos en menos de 24 h', phone: 'Lunes a viernes, 8 am – 6 pm', schedule: 'Zona horaria Colombia (COT)', location: 'Bogotá, Colombia' },
      commercial: 'Con más de 15 años operando en el mercado BPO colombiano, CCGrupo es el aliado estratégico que convierte cada interacción en resultados medibles. Presencia activa en Bogotá, Medellín y Cali, con capacidad para escalar operaciones a nivel nacional e internacional. Nuestras soluciones combinan talento humano especializado, tecnología de punta e inteligencia artificial para que tu empresa crezca sin límites.',
      fields: {
        nombre:       'Nombre completo',
        empresa:      'Empresa',
        email:        'Correo electrónico',
        telefono:     'Teléfono / WhatsApp',
        servicio:     'Servicio de interés',
        mensaje:      'Cuéntanos sobre tu proyecto',
        selectPh:     'Selecciona una solución…',
        messagePh:    'Describe brevemente tu operación, el reto que enfrentas y qué esperas de nosotros…',
        submit:       'Enviar mensaje',
        sending:      'Enviando…',
        privacyNote:  'Tu información es confidencial y nunca será compartida con terceros.',
      },
      errors: {
        nombre:   'Ingresa tu nombre completo.',
        empresa:  'Ingresa el nombre de tu empresa.',
        email:    'Ingresa un correo electrónico válido.',
        telefono: 'Ingresa un número de contacto.',
        servicio: 'Selecciona el servicio de tu interés.',
        mensaje:  'Cuéntanos un poco más (mínimo 20 caracteres).',
      },
      success: {
        title: 'Mensaje enviado',
        pre:   'Gracias por contactarnos,',
        post:  '. Un especialista revisará tu solicitud y te responderá en las próximas 24 horas.',
        again: 'Enviar otro mensaje',
      },
    },
    privacy: {
      label:      'Transparencia y Cumplimiento',
      heading:    'Políticas de Privacidad',
      desc:       'Nuestro compromiso con la transparencia, el bienestar y la protección de la información de nuestros colaboradores y clientes.',
      modalLabel: 'Política',
      viewDoc:    'Ver documento →',
      policies: [
        { title: 'Política de Acoso Laboral',                              desc: 'Lineamientos para prevenir, corregir y sancionar el acoso laboral en el entorno de trabajo.' },
        { title: 'Política SG-SST',                                        desc: 'Sistema de Gestión de Seguridad y Salud en el Trabajo: compromisos y directrices para un entorno seguro.' },
        { title: 'Política de Alcohol y Otros',                            desc: 'Normas sobre el consumo de alcohol, sustancias psicoactivas y tabaco en el ambiente laboral.' },
        { title: 'Política de Acoso Sexual',                               desc: 'Mecanismos de prevención y atención del acoso sexual en el lugar de trabajo.' },
        { title: 'Política de Teletrabajo',                                desc: 'Condiciones, derechos y obligaciones para el desarrollo del trabajo remoto.' },
        { title: 'Política de Igualdad y Equidad Laboral con Enfoque de Género', desc: 'Compromisos de CCGrupo para garantizar igualdad de oportunidades y trato equitativo con perspectiva de género.' },
        { title: 'Política de Desconexión Laboral',                        desc: 'Derecho de los colaboradores a desconectarse fuera del horario laboral y en períodos de descanso.' },
      ],
    },
  },

  /* ─── English ─────────────────────────────────── */
  en: {
    back: 'Back',
    nav: {
      links: [
        { name: 'Home',      href: '#hero' },
        { name: 'About',     href: '#about' },
        { name: 'Services',  href: '#services' },
        { name: 'Advantage', href: '#reasons' },
        { name: 'Clients',   href: '#clients' },
      ],
      contact: 'Contact',
    },
    hero: {
      badge:  'Next-Gen BPO — Since 2011',
      line1:  'Technology to',
      line2:  'grow,',
      line3a: 'People who',
      line3b: 'connect',
      desc:   'We transform the customer experience by fusing human talent with autonomous virtual agents, omnichannel flows and artificial intelligence.',
      cta1:   'Get started',
      cta2:   'View services',
      scroll: 'Scroll',
    },
    about: {
      label:       '02 / 05 — About',
      headingPre:  'Over 15 years transforming',
      headingPost: 'in Colombia',
      descPre:     'We are a next-gen',
      descPost:    'specialized in a Contact Center solutions ecosystem with Artificial Intelligence. We combine Human Talent and Autonomous Virtual Agents with omnichannel flows for highly efficient sales and support operations.',
      evoPre:      'We evolve traditional',
      evoMid:      'toward models based on',
      evoStrong:   'productivity, data and operational autonomy',
      quote:       'Technology to grow, People who connect.',
      stats: [
        'Years of experience in the BPO sector',
        'More agent productivity',
        'Languages: Spanish, English, Italian, French',
        'Queries resolved on first call',
      ],
    },
    marquee: {
      items: ['Automation', 'Contact Center', 'Omnichannel', 'Autonomous Agents', 'Power BI', 'Artificial Intelligence', 'Mass Messaging', 'Smart BPO'],
    },
    services: {
      label:   '03 / 05 — Services',
      explore: 'Explore',
      items: {
        '01': { title: 'Customer Experience', subtitle: 'CX 360°', desc: 'End-to-end Customer Experience Management. We operate as an extension of your team with bilingual talent, structured processes and technology at every touchpoint.' },
        '02': { title: 'Leads & Sales', subtitle: 'Smart Conversion', desc: 'We convert leads into sales with strategic automation. We capture, qualify and close opportunities via WhatsApp, voice and CRM in a coordinated way.' },
        '03': { title: 'Omnichannel', subtitle: 'Total Connectivity', desc: 'Unify all your communication channels in one platform. Voice, WhatsApp, email, chatbot, smart IVR and more — all connected and automated.' },
        '04': { title: 'Autonomous Agents', subtitle: 'AVA Suite', desc: 'AI virtual agents working 24/7 non-stop: they attend, sell, qualify leads and manage social media completely autonomously.' },
        '05': { title: 'Digital Studio', subtitle: 'Custom Software', desc: 'We create technology tailored to your business that accelerates results: CRM, apps, e-commerce, portals, dashboards and smart modules.' },
        '06': { title: 'Advanced Analytics', subtitle: 'Power BI & Looker Studio', desc: 'Real-time dashboards built for BPO and any industry. Measure performance, identify opportunities and make decisions based on real data.' },
      },
    },
    reasons: {
      label:      '04 / 05 — Advantage',
      headingPre: 'Why Choose Contact Center',
      headingEm:  'Grupo?',
      items: [
        { title: 'AI + Human Talent',       desc: 'We merge autonomous virtual agents with trained human talent for maximum efficiency and empathy.' },
        { title: 'Data-Driven Decisions',   desc: 'We turn data into real-time actions with Power BI and advanced analytics for measurable results.' },
        { title: 'Global Reach',            desc: 'We operate in 4 languages with nearshore capacity for the U.S. and international markets from Bogotá.' },
        { title: 'Operational Autonomy',    desc: 'Productivity and autonomy models that outperform traditional BPO in speed and results.' },
        { title: 'True Omnichannel',        desc: 'WhatsApp, email, SMS, chatbots and voice unified in a single platform for zero friction.' },
        { title: 'Specialized Verticals',   desc: 'Expertise in healthcare, finance and telco with smart scheduling solutions for clinics and IPS.' },
      ],
    },
    clients: {
      label:      '05 / 05 — Clients',
      headingPre: 'Our',
      headingEm:  'Clients',
      sub:        'Satisfied clients worldwide',
    },
    cta: {
      label:       'Ready to transform your operation?',
      headingPre:  "Let's talk about the",
      headingEm:   'future',
      headingPost: 'of your company',
      desc:        'Discover how our solution ecosystem can boost your business with artificial intelligence and human talent.',
      button:      'Schedule a Meeting',
    },
    footer: {
      desc:          'Next-generation BPO. Contact Center solutions ecosystem with AI. Over 15 years transforming operations.',
      servicesTitle: 'Services',
      companyTitle:  'Company',
      contactTitle:  'Contact',
      serviceLinks:  ['Automation', 'Contact Center', 'Omnichannel', 'Mass Messaging', 'Autonomous Agents'],
      companyLinks:  ['About', 'Contact', 'Careers'],
      copyright:     '© 2025 Contact Center Grupo S.A.S.',
      privacy:       'Privacy Policies',
      location:      'Bogotá, Colombia',
    },
    contact: {
      label:      '— Contact',
      headingPre: "Let's talk about your",
      headingEm:  'next project',
      desc:       'Tell us what you need and a specialist from our team will get in touch within 24 hours.',
      infoLabels: { location: 'Location', email: 'Email', phone: 'Phone', schedule: 'Schedule' },
      infoSubs:   { email: 'We respond within 24 h', phone: 'Mon – Fri, 8 am – 6 pm', schedule: 'Colombia Time Zone (COT)', location: 'Bogotá, Colombia' },
      commercial: 'With over 15 years in the Colombian BPO market, CCGrupo is the strategic partner that turns every interaction into measurable results. Active presence in Bogotá, Medellín and Cali, with the capacity to scale operations nationally and internationally. Our solutions combine specialized human talent, cutting-edge technology and artificial intelligence so your business grows without limits.',
      fields: {
        nombre:      'Full name',
        empresa:     'Company',
        email:       'Email address',
        telefono:    'Phone / WhatsApp',
        servicio:    'Service of interest',
        mensaje:     'Tell us about your project',
        selectPh:    'Select a solution…',
        messagePh:   'Briefly describe your operation, the challenge you face and what you expect from us…',
        submit:      'Send message',
        sending:     'Sending…',
        privacyNote: 'Your information is confidential and will never be shared with third parties.',
      },
      errors: {
        nombre:   'Please enter your full name.',
        empresa:  'Please enter your company name.',
        email:    'Please enter a valid email address.',
        telefono: 'Please enter a contact number.',
        servicio: 'Please select a service of interest.',
        mensaje:  'Tell us a bit more (minimum 20 characters).',
      },
      success: {
        title: 'Message sent',
        pre:   'Thank you for contacting us,',
        post:  '. A specialist will review your request and respond within the next 24 hours.',
        again: 'Send another message',
      },
    },
    privacy: {
      label:      'Transparency & Compliance',
      heading:    'Workplace Policies',
      desc:       'Our commitment to transparency, well-being and the protection of information for our employees and clients.',
      modalLabel: 'Policy',
      viewDoc:    'View document →',
      policies: [
        { title: 'Workplace Harassment Policy',               desc: 'Guidelines to prevent, correct and sanction workplace harassment within the organization.' },
        { title: 'Occupational Health & Safety (SG-SST)',     desc: 'Occupational Health and Safety Management System: commitments and guidelines for a safe work environment.' },
        { title: 'Alcohol & Substance Policy',                desc: 'Rules on the consumption of alcohol, psychoactive substances and tobacco in the workplace.' },
        { title: 'Sexual Harassment Policy',                  desc: 'Prevention and response mechanisms for sexual harassment in the workplace.' },
        { title: 'Remote Work Policy',                        desc: 'Conditions, rights and obligations for the development of remote work.' },
        { title: 'Gender Equality & Equity Policy',           desc: 'CCGrupo\'s commitments to ensure equal opportunities and equitable treatment with a gender perspective.' },
        { title: 'Right to Disconnect Policy',                desc: 'Employees\' right to disconnect outside working hours and during rest periods.' },
      ],
    },
  },
};

type Translations = typeof translations.es;

interface LangContextValue {
  lang: Lang;
  t: Translations;
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
