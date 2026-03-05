import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import ScrambledText from '../ui/ScrambledText';
import SplitText from '../ui/SplitText';
import LiquidEther from '../ui/LiquidEther';

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setCount(Math.floor(easeOutQuart * target));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-14 lg:px-28 grid lg:grid-cols-2 gap-24 items-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none -z-10">
        <LiquidEther
          colors={['#0f1d35', '#0077b6', '#060d1f']}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal"
        >
          <div className="w-8 h-px bg-teal" />
          02 / 05 — Nosotros
        </motion.div>
        
        <div className="font-display text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1]">
          <SplitText
            className="inline-block"
            delay={30}
            duration={1}
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
          >
            Más de 15 años transformando el <span className="text-teal font-medium italic">BPO</span> en Colombia
          </SplitText>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg font-light leading-relaxed text-gray-200"
        >
           <ScrambledText 
            className="inline"
            scrambleChars="!@#$%^&*()_+-=[]{}|;:,.<>?/~"
            radius={150}
            duration={0.8}
          >
            Somos un 
          </ScrambledText>
          <em className="italic text-gradient font-medium">BPO</em>
          <ScrambledText 
            className="inline"
            scrambleChars="!@#$%^&*()_+-=[]{}|;:,.<>?/~"
            radius={150}
            duration={0.8}
          >
             de nueva generación, especializado en un ecosistema de soluciones de Contact Center con Inteligencia Artificial. Fusionamos Talento Humano y Agentes Virtuales Autónomos con flujos omnicanal para operaciones de ventas y soporte altamente eficientes.
          </ScrambledText>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-lg font-light leading-relaxed text-gray-200"
        >
          Evolucionamos el <em className="italic text-gradient">BPO</em> tradicional hacia modelos basados en <strong className="text-white font-medium">productividad, datos y autonomía operativa</strong>.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pl-6 border-l-2 border-teal font-display text-2xl italic text-teal"
        >
          Tecnología para crecer, Personas que conectan.
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { val: 15, suffix: '+', label: 'Años de experiencia en el sector BPO' },
          { val: 40, suffix: '%', label: 'Más productividad en agentes' },
          { val: 4, suffix: '', label: 'Idiomas: español, inglés, italiano, francés' },
          { val: 92, suffix: '%', label: 'Consultas resueltas en primera llamada' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-10 border border-white/10 relative overflow-hidden group hover:border-teal/30 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="font-display text-6xl leading-none text-gradient mb-2">
                <Counter target={stat.val} suffix={stat.suffix} />
              </div>
              <div className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-gray-300 mt-4 leading-relaxed">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
