import { Users, TrendingUp, Globe, Bot, Code2, Sparkles, MessageSquare, Mic, Target, Share2, BarChart3 } from 'lucide-react';
import type { ServiceData } from '../types';

// Imágenes: coloca los archivos en public/images/services/
// Nombres esperados:
//   01-customer-experience.jpg
//   02-leads-ventas.jpg
//   03-omnicanalidad.jpg
//   04-agentes-autonomos.jpg
//   05-digital-studio.jpg

export const servicesData: ServiceData[] = [
  {
    id: '01',
    title: 'Customer Experience',
    subtitle: 'CX 360°',
    desc: 'Gestión Integral de Experiencia del Cliente. Operamos como extensión de tu equipo con talento bilingüe, procesos estructurados y tecnología para cada punto de contacto.',
    tags: ['Servicio al Cliente', 'PQR', 'Toma de Pedidos', 'Reservas', 'Mesa de Ayuda', 'Agendamiento Médico'],
    link: 'https://ccgrupo.com.co/customer-experience/',
    icon: Users,
    gradient: 'from-[#071a2c] via-navy-deep to-[#0a1e30]',
    details: {
      heroImage: '/images/services/01-customer-experience.jpg',
      longDesc: 'Gestionamos de forma integral cada interacción con tus clientes: desde la primera consulta hasta la posventa. Nuestro equipo bilingüe, respaldado por tecnología omnicanal, convierte cada punto de contacto en una oportunidad de fidelización, reduciendo tiempos de resolución y aumentando la satisfacción.',
      features: [
        'Servicio al cliente multicanal (voz, chat, email)',
        'Gestión de PQR, PQRSF y quejas',
        'Toma de pedidos y reservas',
        'Mesa de ayuda técnica y funcional',
        'Agendamiento de citas médicas y corporativas',
        'Atención posventa y fidelización',
      ],
      benefits: [
        { title: 'Satisfacción Superior', desc: 'NPS y CSAT por encima del promedio del sector gracias a protocolos de atención estructurados.' },
        { title: 'Resolución en Primera Llamada', desc: '92% de las consultas resueltas sin necesidad de transferencias ni callbacks.' },
        { title: 'Costos Optimizados', desc: 'Reduce hasta un 35% los costos de atención versus un equipo interno.' },
      ],
      faq: [
        { question: '¿En qué idiomas ofrecen el servicio?', answer: 'Operamos en español, inglés, italiano y francés con agentes nativos o bilingües certificados.' },
        { question: '¿Cómo gestionan los tiempos de respuesta?', answer: 'Definimos SLAs junto al cliente. Para voz el estándar es atención en menos de 20 segundos, y para canales digitales en menos de 5 minutos.' },
        { question: '¿Pueden integrarse con nuestro CRM?', answer: 'Sí. Nos conectamos vía API con Salesforce, HubSpot, Zoho, Zendesk y sistemas propietarios.' },
        { question: '¿Cuánto tiempo toma arrancar la operación?', answer: 'El proceso de onboarding toma entre 2 y 4 semanas, incluyendo capacitación, scripting y configuración de plataforma.' },
      ],
    },
  },
  {
    id: '02',
    title: 'Leads & Ventas',
    subtitle: 'Conversión Inteligente',
    desc: 'Convertimos leads en ventas con automatización estratégica. Captamos, calificamos y cerramos oportunidades por WhatsApp, voz y CRM de forma coordinada.',
    tags: ['Captación de Leads', 'Inbound', 'Outbound', 'WhatsApp Ventas', 'CRM', 'Seguimiento', 'Reactivación'],
    link: 'https://ccgrupo.com.co/leads-ventas/',
    icon: TrendingUp,
    gradient: 'from-[#1a0d07] via-navy-deep to-[#2a1408]',
    details: {
      heroImage: '/images/services/02-leads-ventas.jpg',
      longDesc: 'Construimos y operamos tu máquina de ventas. Desde la captación y priorización de leads de alto valor hasta el cierre y la reactivación, combinamos talento comercial con automatización en CRM para que ninguna oportunidad se pierda.',
      features: [
        'Captación y scoring de leads de alto valor',
        'Contactabilidad inbound y outbound',
        'Ventas por WhatsApp Business',
        'Seguimiento automatizado en CRM hasta el cierre',
        'Reactivación de clientes inactivos',
        'Reportes de pipeline y conversión en tiempo real',
      ],
      benefits: [
        { title: 'Mayor Conversión', desc: 'Aumenta tu tasa de cierre con procesos de seguimiento estructurados y automatizados.' },
        { title: 'Pipeline Automatizado', desc: 'Cada lead es rastreado, calificado y nutrido hasta que está listo para comprar.' },
        { title: 'Ciclo de Venta Reducido', desc: 'Disminuye el tiempo promedio de cierre hasta en un 40% con contactabilidad omnicanal.' },
      ],
      faq: [
        { question: '¿Cómo priorizan los leads?', answer: 'Usamos scoring con IA basado en comportamiento, demografía y señales de intención para enfocar el esfuerzo comercial en los prospectos con mayor probabilidad de cierre.' },
        { question: '¿Con qué CRM trabajan?', answer: 'Integramos con Salesforce, HubSpot, Zoho CRM, Pipedrive y soluciones a medida vía API REST.' },
        { question: '¿Qué canales cubren para ventas?', answer: 'WhatsApp Business, llamadas outbound, email y SMS. El canal se elige según el perfil y preferencia del prospecto.' },
        { question: '¿Cuál es el modelo de cobro?', answer: 'Flexible: por gestión (fee mensual), por resultado (comisión sobre venta) o mixto, según el acuerdo con cada cliente.' },
      ],
    },
  },
  {
    id: '03',
    title: 'Omnicanalidad',
    subtitle: 'Conectividad Total',
    desc: 'Unifica todos tus canales de comunicación en una sola plataforma. Voz, WhatsApp, email, chatbot, IVR inteligente y más, todo conectado y automatizado.',
    tags: ['Voz', 'SMS', 'Email', 'WhatsApp Business', 'Meta', 'WebChat', 'Chatbot', 'IVR'],
    link: 'https://ccgrupo.com.co/omnicanalidad/',
    icon: Globe,
    gradient: 'from-[#0d1a1e] via-navy-deep to-[#091a22]',
    details: {
      heroImage: '/images/services/03-omnicanalidad.jpg',
      longDesc: 'Centralizamos todos los canales de comunicación con tus clientes en una sola interfaz unificada. Voz inbound y outbound, SMS, email, WhatsApp Business API, Meta (Facebook e Instagram), WebChat, chatbot e IVR inteligente operan de forma coordinada para cero fricciones.',
      features: [
        'Voz inbound y outbound (marcación predictiva)',
        'SMS y email masivo',
        'WhatsApp Business API',
        'Meta: Facebook e Instagram Messenger',
        'WebChat y Chatbot con IA',
        'IVR inteligente y flujos automatizados',
        'Videollamada integrada',
      ],
      benefits: [
        { title: 'Experiencia Unificada', desc: 'El cliente no repite su historia: historial completo disponible en cada canal.' },
        { title: 'Mayor Alcance', desc: 'Contacta a tus clientes en el canal que prefieren, en el momento correcto.' },
        { title: 'Automatización Inteligente', desc: 'Flujos automáticos que resuelven hasta el 70% de las consultas sin intervención humana.' },
      ],
      faq: [
        { question: '¿Cuántos canales integran simultáneamente?', answer: 'Integramos más de 8 canales en paralelo: voz, WhatsApp, SMS, email, Facebook, Instagram, WebChat y videollamada.' },
        { question: '¿Funciona con mi CRM o sistema actual?', answer: 'Sí. La plataforma se conecta vía API con la mayoría de CRM y sistemas de ticketing del mercado.' },
        { question: '¿Qué es el IVR inteligente?', answer: 'Es un sistema de respuesta de voz interactiva potenciado por IA que entiende lenguaje natural, no solo teclas, para enrutar y resolver consultas de forma autónoma.' },
        { question: '¿Ofrecen reportes unificados?', answer: 'Sí. Dashboard en tiempo real con métricas por canal, agente y campaña, con exportación a Power BI.' },
      ],
    },
  },
  {
    id: '04',
    title: 'Agentes Autónomos',
    subtitle: 'Suite AVA',
    desc: 'Agentes virtuales con IA que trabajan 24/7 sin pausas: atienden, venden, califican leads y gestionan redes sociales de forma completamente autónoma.',
    tags: ['IA 24/7', 'WhatsApp', 'Voz IA', 'Leads IA', 'Social IA', 'Autónomo'],
    link: 'https://ccgrupo.com.co/agentes-autonomos/',
    icon: Bot,
    gradient: 'from-[#0c0f24] via-navy-deep to-[#10162e]',
    subProducts: [
      {
        number: '01',
        name: 'AVA Asistente Virtual',
        tagline: 'Producto Estrella',
        desc: 'Asistente personal autónomo 24/7 que opera por WhatsApp, Signal y Telegram. Ejecuta tareas, responde solicitudes y apoya procesos internos y comerciales sin pausas ni horarios.',
        icon: Sparkles,
      },
      {
        number: '02',
        name: 'AVA Chat',
        desc: 'Atención inteligente en WebChat, WhatsApp y canales chat con IA. Resuelve consultas, gestiona solicitudes y escala a humano cuando es necesario.',
        icon: MessageSquare,
      },
      {
        number: '03',
        name: 'AVA Vox',
        desc: 'Agente de voz con IA para llamadas entrantes y salientes. Habla, entiende y actúa en tiempo real con entonación natural y procesamiento de lenguaje avanzado.',
        icon: Mic,
      },
      {
        number: '04',
        name: 'AVA Leads',
        desc: 'Califica, nutre y da seguimiento automático a prospectos hasta el agendamiento o cierre comercial. Integra con CRM y notifica al equipo humano en el momento justo.',
        icon: Target,
      },
      {
        number: '05',
        name: 'AVA Social',
        desc: 'Agente que gestiona redes sociales respondiendo mensajes, gestionando comentarios y reacciones, actuando como community manager digital 24/7.',
        icon: Share2,
      },
    ],
    details: {
      heroImage: '/images/services/04-agentes-autonomos.jpg',
      longDesc: 'La Suite AVA es nuestro ecosistema de agentes virtuales autónomos con IA. Cada AVA está diseñado para un rol específico: atención, ventas, voz, leads o redes sociales. Trabajan solos o en conjunto, integrándose a tus canales y sistemas para operar sin interrupciones las 24 horas.',
      features: [
        'Operación continua 24/7/365 sin pausas',
        'Procesamiento de lenguaje natural (NLP) avanzado',
        'Integración nativa con WhatsApp, Signal, Telegram y WebChat',
        'Escalamiento automático a agente humano en casos complejos',
        'Aprendizaje continuo con cada interacción',
        'Dashboard de conversaciones y métricas en tiempo real',
      ],
      benefits: [
        { title: 'Disponibilidad Total', desc: 'Atiende miles de conversaciones simultáneas sin tiempos de espera, los 365 días del año.' },
        { title: 'Reducción de Costos', desc: 'Automatiza hasta el 80% de las interacciones repetitivas, liberando al equipo humano para tareas de alto valor.' },
        { title: 'Experiencia Consistente', desc: 'Cada cliente recibe la misma calidad de atención, sin variaciones por turno o fatiga del agente.' },
      ],
      faq: [
        { question: '¿Qué tan autónomo es realmente el agente?', answer: 'Ejecuta flujos completos: responder, calificar, agendar, notificar y registrar, sin intervención humana. Solo escala cuando detecta situaciones que requieren criterio humano.' },
        { question: '¿Puede el AVA escalar a un agente humano?', answer: 'Sí. Detecta automáticamente conversaciones críticas o fuera de su alcance y transfiere con contexto completo al agente humano.' },
        { question: '¿Cuánto tiempo toma implementar un AVA?', answer: 'Entre 1 y 3 semanas según la complejidad de los flujos y las integraciones requeridas.' },
        { question: '¿Los AVA aprenden con el tiempo?', answer: 'Sí. Con cada conversación el modelo se afina. Además, el equipo de CCGrupo realiza revisiones periódicas para mejorar la precisión y cobertura.' },
      ],
    },
  },
  {
    id: '05',
    title: 'Digital Studio',
    subtitle: 'Software a Medida',
    desc: 'Creamos tecnología que se adapta a tu negocio y acelera tus resultados: CRM, apps, e-commerce, portales, dashboards y módulos inteligentes.',
    tags: ['CRM', 'Apps', 'E-commerce', 'Agendamiento', 'Portales', 'Dashboards', 'Capacitación'],
    link: 'https://ccgrupo.com.co/digital-studio/',
    icon: Code2,
    gradient: 'from-[#091a0e] via-navy-deep to-[#0e2416]',
    details: {
      heroImage: '/images/services/05-digital-studio.jpg',
      longDesc: 'Desarrollamos software a la medida que impulsa el crecimiento de tu empresa. Desde CRM y e-commerce hasta portales transaccionales, dashboards en tiempo real y módulos inteligentes con IA. Cada solución está diseñada para integrarse con tus sistemas actuales y escalar con tu negocio.',
      features: [
        'CRM personalizados a medida',
        'Aplicaciones web y móviles',
        'Diseño y desarrollo de páginas web corporativas',
        'E-commerce y soluciones de pago integradas',
        'Sistemas de agendamiento y reservas personalizados',
        'Portales de clientes y proveedores',
        'Intranet corporativa',
        'Dashboards ejecutivos y analítica en tiempo real',
        'Plataformas de capacitación e-learning',
        'Avatares digitales con IA',
      ],
      benefits: [
        { title: 'Tecnología a Medida', desc: 'Soluciones diseñadas específicamente para tu modelo de negocio, no adaptaciones de software genérico.' },
        { title: 'Integración Total', desc: 'Conectamos tu nuevo software con los sistemas que ya usas vía API, sin migraciones traumáticas.' },
        { title: 'Crecimiento Escalable', desc: 'Arquitectura que crece con tu empresa sin límites de usuarios, módulos ni volumen de datos.' },
      ],
      faq: [
        { question: '¿Con qué tecnologías trabajan?', answer: 'React, Next.js, Node.js, Python, React Native para móvil, y bases de datos relacionales y NoSQL según el proyecto.' },
        { question: '¿Cuánto tarda un proyecto típico?', answer: 'Depende del alcance. Un MVP toma entre 4 y 8 semanas; un sistema completo entre 3 y 6 meses con entregas iterativas.' },
        { question: '¿Ofrecen mantenimiento y soporte?', answer: 'Sí. Contamos con planes de soporte mensual, actualizaciones de seguridad y evolución del software incluida.' },
        { question: '¿Pueden integrarse con sistemas legados?', answer: 'Sí. Desarrollamos conectores y middleware para integrar con SAP, Oracle, sistemas propietarios y cualquier servicio con API.' },
      ],
    },
  },
  {
    id: '06',
    title: 'Analítica Avanzada',
    subtitle: 'Power BI & Looker Studio',
    desc: 'Dashboards en tiempo real adaptados a BPO y cualquier industria. Mide rendimiento, identifica oportunidades y toma decisiones basadas en datos reales.',
    tags: ['Power BI', 'Looker Studio', 'Dashboards', 'KPIs', 'Reportes', 'Tiempo Real'],
    link: 'https://ccgrupo.com.co/analitica-avanzada/',
    icon: BarChart3,
    gradient: 'from-[#1a0f1a] via-navy-deep to-[#2a102a]',
    details: {
      heroImage: '/images/services/06-analitica-avanzada.jpg',
      longDesc: 'Transformamos datos crudos en decisiones estratégicas. Diseñamos e implementamos dashboards ejecutivos en Power BI o Looker Studio, adaptados a las métricas clave de tu operación BPO o industria. Conectamos tus fuentes de datos, automatizamos reportes y entregamos visibilidad en tiempo real para líderes y equipos.',
      features: [
        'Dashboards ejecutivos en Power BI y Looker Studio',
        'Conexión a múltiples fuentes de datos (CRM, ERP, hojas de cálculo, APIs)',
        'KPIs de rendimiento por proceso, área y equipo',
        'Reportes automatizados con frecuencia configurable',
        'Analítica predictiva e identificación de tendencias',
        'Seguridad por roles y niveles de acceso',
      ],
      benefits: [
        { title: 'Decisiones Basadas en Datos', desc: 'Elimina la incertidumbre: cada decisión respaldada por métricas reales y actualizadas.' },
        { title: 'Visibilidad Total', desc: 'Una sola pantalla que muestra el estado de toda tu operación en tiempo real.' },
        { title: 'Mayor Productividad', desc: 'Identifica cuellos de botella y oportunidades de mejora antes de que afecten los resultados.' },
      ],
      faq: [
        { question: '¿Qué fuentes de datos pueden conectar?', answer: 'Conectamos con bases de datos SQL/NoSQL, Google Sheets, Excel, Salesforce, HubSpot, sistemas de call center, APIs REST y más de 100 conectores nativos en Power BI y Looker Studio.' },
        { question: '¿Con qué frecuencia se actualizan los datos?', answer: 'Configurable: desde tiempo real (streaming) hasta actualizaciones horarias, diarias o semanales según el caso de uso y la fuente de datos.' },
        { question: '¿Necesito licencia de Power BI?', answer: 'Para Power BI recomendamos Power BI Pro o Premium según el número de usuarios. Looker Studio es gratuito. Asesoramos sobre la mejor opción según tu presupuesto y necesidades.' },
        { question: '¿Pueden capacitar a nuestro equipo?', answer: 'Sí. Incluimos sesiones de capacitación para que tu equipo pueda leer, filtrar y explorar los dashboards de forma autónoma. También ofrecemos soporte continuo.' },
      ],
    },
  },
];

export const getServiceById = (id: string): ServiceData | undefined =>
  servicesData.find(s => s.id === id);
