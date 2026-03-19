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
    serviceModule: {
      servicePrefix:  'Servicio',
      features:       'Características',
      benefits:       'Beneficios Clave',
      productSuite:   'Suite de Productos',
      ourAgents:      'Nuestros Agentes',
      faqLabel:       'Preguntas Frecuentes',
      ctaTitle:       '¿Listo para transformar tu operación?',
      ctaDescPre:     'Agenda una consultoría gratuita y descubre cómo nuestra solución de',
      ctaDescPost:    'puede escalar tu negocio.',
      ctaButton:      'Agendar Demo',
    },
    serviceDetails: {
      '01': {
        longDesc:  'Gestionamos de forma integral cada interacción con tus clientes: desde la primera consulta hasta la posventa. Nuestro equipo bilingüe, respaldado por tecnología omnicanal, convierte cada punto de contacto en una oportunidad de fidelización, reduciendo tiempos de resolución y aumentando la satisfacción.',
        tags:      ['Servicio al Cliente', 'PQR', 'Toma de Pedidos', 'Reservas', 'Mesa de Ayuda', 'Agendamiento Médico'],
        features:  ['Servicio al cliente multicanal (voz, chat, email)', 'Gestión de PQR, PQRSF y quejas', 'Toma de pedidos y reservas', 'Mesa de ayuda técnica y funcional', 'Agendamiento de citas médicas y corporativas', 'Atención posventa y fidelización'],
        benefits:  [{ title: 'Satisfacción Superior', desc: 'NPS y CSAT por encima del promedio del sector gracias a protocolos de atención estructurados.' }, { title: 'Resolución en Primera Llamada', desc: '92% de las consultas resueltas sin necesidad de transferencias ni callbacks.' }, { title: 'Costos Optimizados', desc: 'Reduce hasta un 35% los costos de atención versus un equipo interno.' }],
        faq:       [{ question: '¿En qué idiomas ofrecen el servicio?', answer: 'Operamos en español, inglés, italiano y francés con agentes nativos o bilingües certificados.' }, { question: '¿Cómo gestionan los tiempos de respuesta?', answer: 'Definimos SLAs junto al cliente. Para voz el estándar es atención en menos de 20 segundos, y para canales digitales en menos de 5 minutos.' }, { question: '¿Pueden integrarse con nuestro CRM?', answer: 'Sí. Nos conectamos vía API con Salesforce, HubSpot, Zoho, Zendesk y sistemas propietarios.' }, { question: '¿Cuánto tiempo toma arrancar la operación?', answer: 'El proceso de onboarding toma entre 2 y 4 semanas, incluyendo capacitación, scripting y configuración de plataforma.' }],
      },
      '02': {
        longDesc:  'Construimos y operamos tu máquina de ventas. Desde la captación y priorización de leads de alto valor hasta el cierre y la reactivación, combinamos talento comercial con automatización en CRM para que ninguna oportunidad se pierda.',
        tags:      ['Captación de Leads', 'Inbound', 'Outbound', 'WhatsApp Ventas', 'CRM', 'Seguimiento', 'Reactivación'],
        features:  ['Captación y scoring de leads de alto valor', 'Contactabilidad inbound y outbound', 'Ventas por WhatsApp Business', 'Seguimiento automatizado en CRM hasta el cierre', 'Reactivación de clientes inactivos', 'Reportes de pipeline y conversión en tiempo real'],
        benefits:  [{ title: 'Mayor Conversión', desc: 'Aumenta tu tasa de cierre con procesos de seguimiento estructurados y automatizados.' }, { title: 'Pipeline Automatizado', desc: 'Cada lead es rastreado, calificado y nutrido hasta que está listo para comprar.' }, { title: 'Ciclo de Venta Reducido', desc: 'Disminuye el tiempo promedio de cierre hasta en un 40% con contactabilidad omnicanal.' }],
        faq:       [{ question: '¿Cómo priorizan los leads?', answer: 'Usamos scoring con IA basado en comportamiento, demografía y señales de intención para enfocar el esfuerzo comercial en los prospectos con mayor probabilidad de cierre.' }, { question: '¿Con qué CRM trabajan?', answer: 'Integramos con Salesforce, HubSpot, Zoho CRM, Pipedrive y soluciones a medida vía API REST.' }, { question: '¿Qué canales cubren para ventas?', answer: 'WhatsApp Business, llamadas outbound, email y SMS. El canal se elige según el perfil y preferencia del prospecto.' }, { question: '¿Cuál es el modelo de cobro?', answer: 'Flexible: por gestión (fee mensual), por resultado (comisión sobre venta) o mixto, según el acuerdo con cada cliente.' }],
      },
      '03': {
        longDesc:  'Centralizamos todos los canales de comunicación con tus clientes en una sola interfaz unificada. Voz inbound y outbound, SMS, email, WhatsApp Business API, Meta (Facebook e Instagram), WebChat, chatbot e IVR inteligente operan de forma coordinada para cero fricciones.',
        tags:      ['Voz', 'SMS', 'Email', 'WhatsApp Business', 'Meta', 'WebChat', 'Chatbot', 'IVR'],
        features:  ['Voz inbound y outbound (marcación predictiva)', 'SMS y email masivo', 'WhatsApp Business API', 'Meta: Facebook e Instagram Messenger', 'WebChat y Chatbot con IA', 'IVR inteligente y flujos automatizados', 'Videollamada integrada'],
        benefits:  [{ title: 'Experiencia Unificada', desc: 'El cliente no repite su historia: historial completo disponible en cada canal.' }, { title: 'Mayor Alcance', desc: 'Contacta a tus clientes en el canal que prefieren, en el momento correcto.' }, { title: 'Automatización Inteligente', desc: 'Flujos automáticos que resuelven hasta el 70% de las consultas sin intervención humana.' }],
        faq:       [{ question: '¿Cuántos canales integran simultáneamente?', answer: 'Integramos más de 8 canales en paralelo: voz, WhatsApp, SMS, email, Facebook, Instagram, WebChat y videollamada.' }, { question: '¿Funciona con mi CRM o sistema actual?', answer: 'Sí. La plataforma se conecta vía API con la mayoría de CRM y sistemas de ticketing del mercado.' }, { question: '¿Qué es el IVR inteligente?', answer: 'Es un sistema de respuesta de voz interactiva potenciado por IA que entiende lenguaje natural, no solo teclas, para enrutar y resolver consultas de forma autónoma.' }, { question: '¿Ofrecen reportes unificados?', answer: 'Sí. Dashboard en tiempo real con métricas por canal, agente y campaña, con exportación a Power BI.' }],
      },
      '04': {
        longDesc:  'La Suite AVA es nuestro ecosistema de agentes virtuales autónomos con IA. Cada AVA está diseñado para un rol específico: atención, ventas, voz, leads o redes sociales. Trabajan solos o en conjunto, integrándose a tus canales y sistemas para operar sin interrupciones las 24 horas.',
        tags:      ['IA 24/7', 'WhatsApp', 'Voz IA', 'Leads IA', 'Social IA', 'Autónomo'],
        features:  ['Operación continua 24/7/365 sin pausas', 'Procesamiento de lenguaje natural (NLP) avanzado', 'Integración nativa con WhatsApp, Signal, Telegram y WebChat', 'Escalamiento automático a agente humano en casos complejos', 'Aprendizaje continuo con cada interacción', 'Dashboard de conversaciones y métricas en tiempo real'],
        benefits:  [{ title: 'Disponibilidad Total', desc: 'Atiende miles de conversaciones simultáneas sin tiempos de espera, los 365 días del año.' }, { title: 'Reducción de Costos', desc: 'Automatiza hasta el 80% de las interacciones repetitivas, liberando al equipo humano para tareas de alto valor.' }, { title: 'Experiencia Consistente', desc: 'Cada cliente recibe la misma calidad de atención, sin variaciones por turno o fatiga del agente.' }],
        faq:       [{ question: '¿Qué tan autónomo es realmente el agente?', answer: 'Ejecuta flujos completos: responder, calificar, agendar, notificar y registrar, sin intervención humana. Solo escala cuando detecta situaciones que requieren criterio humano.' }, { question: '¿Puede el AVA escalar a un agente humano?', answer: 'Sí. Detecta automáticamente conversaciones críticas o fuera de su alcance y transfiere con contexto completo al agente humano.' }, { question: '¿Cuánto tiempo toma implementar un AVA?', answer: 'Entre 1 y 3 semanas según la complejidad de los flujos y las integraciones requeridas.' }, { question: '¿Los AVA aprenden con el tiempo?', answer: 'Sí. Con cada conversación el modelo se afina. Además, el equipo de CCGrupo realiza revisiones periódicas para mejorar la precisión y cobertura.' }],
      },
      '05': {
        longDesc:  'Desarrollamos software a la medida que impulsa el crecimiento de tu empresa. Desde CRM y e-commerce hasta portales transaccionales, dashboards en tiempo real y módulos inteligentes con IA. Cada solución está diseñada para integrarse con tus sistemas actuales y escalar con tu negocio.',
        tags:      ['CRM', 'Apps', 'E-commerce', 'Agendamiento', 'Portales', 'Dashboards', 'Capacitación'],
        features:  ['CRM personalizados a medida', 'Aplicaciones web y móviles', 'Diseño y desarrollo de páginas web corporativas', 'E-commerce y soluciones de pago integradas', 'Sistemas de agendamiento y reservas personalizados', 'Portales de clientes y proveedores', 'Intranet corporativa', 'Dashboards ejecutivos y analítica en tiempo real', 'Plataformas de capacitación e-learning', 'Avatares digitales con IA'],
        benefits:  [{ title: 'Tecnología a Medida', desc: 'Soluciones diseñadas específicamente para tu modelo de negocio, no adaptaciones de software genérico.' }, { title: 'Integración Total', desc: 'Conectamos tu nuevo software con los sistemas que ya usas vía API, sin migraciones traumáticas.' }, { title: 'Crecimiento Escalable', desc: 'Arquitectura que crece con tu empresa sin límites de usuarios, módulos ni volumen de datos.' }],
        faq:       [{ question: '¿Con qué tecnologías trabajan?', answer: 'React, Next.js, Node.js, Python, React Native para móvil, y bases de datos relacionales y NoSQL según el proyecto.' }, { question: '¿Cuánto tarda un proyecto típico?', answer: 'Depende del alcance. Un MVP toma entre 4 y 8 semanas; un sistema completo entre 3 y 6 meses con entregas iterativas.' }, { question: '¿Ofrecen mantenimiento y soporte?', answer: 'Sí. Contamos con planes de soporte mensual, actualizaciones de seguridad y evolución del software incluida.' }, { question: '¿Pueden integrarse con sistemas legados?', answer: 'Sí. Desarrollamos conectores y middleware para integrar con SAP, Oracle, sistemas propietarios y cualquier servicio con API.' }],
      },
      '06': {
        longDesc:  'Transformamos datos crudos en decisiones estratégicas. Diseñamos e implementamos dashboards ejecutivos en Power BI o Looker Studio, adaptados a las métricas clave de tu operación BPO o industria. Conectamos tus fuentes de datos, automatizamos reportes y entregamos visibilidad en tiempo real para líderes y equipos.',
        tags:      ['Power BI', 'Looker Studio', 'Dashboards', 'KPIs', 'Reportes', 'Tiempo Real'],
        features:  ['Dashboards ejecutivos en Power BI y Looker Studio', 'Conexión a múltiples fuentes de datos (CRM, ERP, hojas de cálculo, APIs)', 'KPIs de rendimiento por proceso, área y equipo', 'Reportes automatizados con frecuencia configurable', 'Analítica predictiva e identificación de tendencias', 'Seguridad por roles y niveles de acceso'],
        benefits:  [{ title: 'Decisiones Basadas en Datos', desc: 'Elimina la incertidumbre: cada decisión respaldada por métricas reales y actualizadas.' }, { title: 'Visibilidad Total', desc: 'Una sola pantalla que muestra el estado de toda tu operación en tiempo real.' }, { title: 'Mayor Productividad', desc: 'Identifica cuellos de botella y oportunidades de mejora antes de que afecten los resultados.' }],
        faq:       [{ question: '¿Qué fuentes de datos pueden conectar?', answer: 'Conectamos con bases de datos SQL/NoSQL, Google Sheets, Excel, Salesforce, HubSpot, sistemas de call center, APIs REST y más de 100 conectores nativos en Power BI y Looker Studio.' }, { question: '¿Con qué frecuencia se actualizan los datos?', answer: 'Configurable: desde tiempo real (streaming) hasta actualizaciones horarias, diarias o semanales según el caso de uso y la fuente de datos.' }, { question: '¿Necesito licencia de Power BI?', answer: 'Para Power BI recomendamos Power BI Pro o Premium según el número de usuarios. Looker Studio es gratuito. Asesoramos sobre la mejor opción según tu presupuesto y necesidades.' }, { question: '¿Pueden capacitar a nuestro equipo?', answer: 'Sí. Incluimos sesiones de capacitación para que tu equipo pueda leer, filtrar y explorar los dashboards de forma autónoma. También ofrecemos soporte continuo.' }],
      },
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
        { title: 'Gender Equality & Equity Policy',           desc: "CCGrupo's commitments to ensure equal opportunities and equitable treatment with a gender perspective." },
        { title: 'Right to Disconnect Policy',                desc: "Employees' right to disconnect outside working hours and during rest periods." },
      ],
    },
    serviceModule: {
      servicePrefix:  'Service',
      features:       'Features',
      benefits:       'Key Benefits',
      productSuite:   'Product Suite',
      ourAgents:      'Our Agents',
      faqLabel:       'Frequently Asked Questions',
      ctaTitle:       'Ready to transform your operation?',
      ctaDescPre:     'Book a free consultation and discover how our',
      ctaDescPost:    'solution can scale your business.',
      ctaButton:      'Schedule a Demo',
    },
    serviceDetails: {
      '01': {
        longDesc:  'We comprehensively manage every interaction with your customers: from the first inquiry to after-sales service. Our bilingual team, backed by omnichannel technology, turns every touchpoint into a loyalty opportunity, reducing resolution times and increasing satisfaction.',
        tags:      ['Customer Service', 'PQR', 'Order Taking', 'Reservations', 'Help Desk', 'Medical Scheduling'],
        features:  ['Multichannel customer service (voice, chat, email)', 'PQR, PQRSF and complaints management', 'Order taking and reservations', 'Technical and functional help desk', 'Medical and corporate appointment scheduling', 'After-sales support and loyalty programs'],
        benefits:  [{ title: 'Superior Satisfaction', desc: 'NPS and CSAT above industry average thanks to structured service protocols.' }, { title: 'First-Call Resolution', desc: '92% of inquiries resolved without transfers or callbacks.' }, { title: 'Optimized Costs', desc: 'Reduce service costs by up to 35% compared to an in-house team.' }],
        faq:       [{ question: 'What languages do you offer?', answer: 'We operate in Spanish, English, Italian and French with certified native or bilingual agents.' }, { question: 'How do you manage response times?', answer: 'We define SLAs together with the client. For voice the standard is a response in under 20 seconds, and for digital channels in under 5 minutes.' }, { question: 'Can you integrate with our CRM?', answer: 'Yes. We connect via API with Salesforce, HubSpot, Zoho, Zendesk and proprietary systems.' }, { question: 'How long does it take to launch the operation?', answer: 'The onboarding process takes 2 to 4 weeks, including training, scripting and platform configuration.' }],
      },
      '02': {
        longDesc:  "We build and operate your sales engine. From capturing and prioritizing high-value leads to closing and reactivation, we combine commercial talent with CRM automation so no opportunity is missed.",
        tags:      ['Lead Generation', 'Inbound', 'Outbound', 'WhatsApp Sales', 'CRM', 'Follow-up', 'Reactivation'],
        features:  ['High-value lead capture and scoring', 'Inbound and outbound contact capability', 'WhatsApp Business sales', 'Automated CRM follow-up to close', 'Inactive customer reactivation', 'Real-time pipeline and conversion reports'],
        benefits:  [{ title: 'Higher Conversion', desc: 'Boost your close rate with structured and automated follow-up processes.' }, { title: 'Automated Pipeline', desc: 'Every lead is tracked, qualified and nurtured until ready to buy.' }, { title: 'Shorter Sales Cycle', desc: 'Reduce average close time by up to 40% with omnichannel reachability.' }],
        faq:       [{ question: 'How do you prioritize leads?', answer: 'We use AI-powered scoring based on behavior, demographics and intent signals to focus commercial effort on the prospects with the highest close probability.' }, { question: 'Which CRMs do you work with?', answer: 'We integrate with Salesforce, HubSpot, Zoho CRM, Pipedrive and custom solutions via REST API.' }, { question: 'What channels do you cover for sales?', answer: "WhatsApp Business, outbound calls, email and SMS. The channel is chosen based on the prospect's profile and preference." }, { question: 'What is the billing model?', answer: 'Flexible: per management (monthly fee), per result (commission on sale) or mixed, depending on the agreement with each client.' }],
      },
      '03': {
        longDesc:  'We centralize all your customer communication channels in a single unified interface. Inbound and outbound voice, SMS, email, WhatsApp Business API, Meta (Facebook & Instagram), WebChat, AI chatbot and smart IVR operate in a coordinated way for zero friction.',
        tags:      ['Voice', 'SMS', 'Email', 'WhatsApp Business', 'Meta', 'WebChat', 'Chatbot', 'IVR'],
        features:  ['Inbound and outbound voice (predictive dialing)', 'Bulk SMS and email', 'WhatsApp Business API', 'Meta: Facebook & Instagram Messenger', 'WebChat and AI Chatbot', 'Smart IVR and automated flows', 'Integrated video calls'],
        benefits:  [{ title: 'Unified Experience', desc: "Customers never repeat themselves: full history available across every channel." }, { title: 'Greater Reach', desc: 'Contact your customers on the channel they prefer, at the right moment.' }, { title: 'Smart Automation', desc: 'Automated flows that resolve up to 70% of inquiries without human intervention.' }],
        faq:       [{ question: 'How many channels do you integrate simultaneously?', answer: 'We integrate more than 8 channels in parallel: voice, WhatsApp, SMS, email, Facebook, Instagram, WebChat and video calls.' }, { question: 'Does it work with my CRM or current system?', answer: 'Yes. The platform connects via API with most CRMs and ticketing systems on the market.' }, { question: 'What is the smart IVR?', answer: 'It is an AI-powered Interactive Voice Response system that understands natural language — not just key presses — to route and resolve queries autonomously.' }, { question: 'Do you offer unified reports?', answer: 'Yes. Real-time dashboard with metrics by channel, agent and campaign, with export to Power BI.' }],
      },
      '04': {
        longDesc:  'The AVA Suite is our ecosystem of autonomous AI virtual agents. Each AVA is designed for a specific role: support, sales, voice, leads or social media. They work alone or in tandem, integrating with your channels and systems to operate non-stop 24 hours a day.',
        tags:      ['AI 24/7', 'WhatsApp', 'AI Voice', 'AI Leads', 'AI Social', 'Autonomous'],
        features:  ['Continuous 24/7/365 operation with no downtime', 'Advanced Natural Language Processing (NLP)', 'Native integration with WhatsApp, Signal, Telegram and WebChat', 'Automatic escalation to human agent for complex cases', 'Continuous learning from every interaction', 'Real-time conversation dashboard and metrics'],
        benefits:  [{ title: 'Total Availability', desc: 'Handles thousands of simultaneous conversations with no wait times, 365 days a year.' }, { title: 'Cost Reduction', desc: 'Automates up to 80% of repetitive interactions, freeing the human team for high-value tasks.' }, { title: 'Consistent Experience', desc: 'Every customer receives the same quality of service, with no variation due to shift changes or agent fatigue.' }],
        faq:       [{ question: 'How autonomous is the agent really?', answer: 'It executes complete flows: respond, qualify, schedule, notify and record — without human intervention. It only escalates when it detects situations requiring human judgment.' }, { question: 'Can the AVA escalate to a human agent?', answer: 'Yes. It automatically detects critical or out-of-scope conversations and transfers them with full context to a human agent.' }, { question: 'How long does it take to deploy an AVA?', answer: 'Between 1 and 3 weeks depending on flow complexity and required integrations.' }, { question: 'Do AVAs learn over time?', answer: 'Yes. With every conversation the model refines itself. The CCGrupo team also performs periodic reviews to improve accuracy and coverage.' }],
      },
      '05': {
        longDesc:  "We develop custom software that drives your company's growth. From CRM and e-commerce to transactional portals, real-time dashboards and AI-powered smart modules. Every solution is designed to integrate with your existing systems and scale with your business.",
        tags:      ['CRM', 'Apps', 'E-commerce', 'Scheduling', 'Portals', 'Dashboards', 'Training'],
        features:  ['Custom-built CRM systems', 'Web and mobile applications', 'Corporate website design and development', 'E-commerce and integrated payment solutions', 'Custom scheduling and reservation systems', 'Customer and supplier portals', 'Corporate intranet', 'Executive dashboards and real-time analytics', 'E-learning training platforms', 'AI digital avatars'],
        benefits:  [{ title: 'Tailored Technology', desc: 'Solutions designed specifically for your business model, not adaptations of generic software.' }, { title: 'Full Integration', desc: 'We connect your new software with existing systems via API, with no disruptive migrations.' }, { title: 'Scalable Growth', desc: 'Architecture that grows with your company with no limits on users, modules or data volume.' }],
        faq:       [{ question: 'What technologies do you use?', answer: 'React, Next.js, Node.js, Python, React Native for mobile, and both relational and NoSQL databases depending on the project.' }, { question: 'How long does a typical project take?', answer: 'It depends on scope. An MVP takes 4 to 8 weeks; a full system takes 3 to 6 months with iterative deliveries.' }, { question: 'Do you offer maintenance and support?', answer: 'Yes. We have monthly support plans, security updates and software evolution included.' }, { question: 'Can you integrate with legacy systems?', answer: 'Yes. We develop connectors and middleware to integrate with SAP, Oracle, proprietary systems and any service with an API.' }],
      },
      '06': {
        longDesc:  "We transform raw data into strategic decisions. We design and implement executive dashboards in Power BI or Looker Studio, tailored to your BPO operation's or industry's key metrics. We connect your data sources, automate reports and deliver real-time visibility for leaders and teams.",
        tags:      ['Power BI', 'Looker Studio', 'Dashboards', 'KPIs', 'Reports', 'Real Time'],
        features:  ['Executive dashboards in Power BI and Looker Studio', 'Connection to multiple data sources (CRM, ERP, spreadsheets, APIs)', 'Performance KPIs by process, area and team', 'Automated reports with configurable frequency', 'Predictive analytics and trend identification', 'Role-based security and access levels'],
        benefits:  [{ title: 'Data-Driven Decisions', desc: 'Eliminate uncertainty: every decision backed by real, up-to-date metrics.' }, { title: 'Total Visibility', desc: 'A single screen showing the status of your entire operation in real time.' }, { title: 'Higher Productivity', desc: 'Identify bottlenecks and improvement opportunities before they impact results.' }],
        faq:       [{ question: 'What data sources can you connect?', answer: 'We connect with SQL/NoSQL databases, Google Sheets, Excel, Salesforce, HubSpot, call center systems, REST APIs and over 100 native connectors in Power BI and Looker Studio.' }, { question: 'How often is data updated?', answer: 'Configurable: from real time (streaming) to hourly, daily or weekly updates depending on the use case and data source.' }, { question: 'Do I need a Power BI license?', answer: 'For Power BI we recommend Power BI Pro or Premium depending on the number of users. Looker Studio is free. We advise on the best option based on your budget and needs.' }, { question: 'Can you train our team?', answer: 'Yes. We include training sessions so your team can read, filter and explore the dashboards independently. We also offer ongoing support.' }],
      },
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
