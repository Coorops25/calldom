import { motion } from 'motion/react';
import { Brain, BarChart3, Globe2, Settings, Link2, Stethoscope } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';
import SplitText from '../ui/SplitText';

const reasons = [
  {
    icon: Brain,
    title: "IA + Talento Humano",
    desc: "Fusionamos agentes virtuales autónomos con talento humano capacitado para operaciones de máxima eficiencia y empatía."
  },
  {
    icon: BarChart3,
    title: "Decisiones con Datos",
    desc: "Transformamos datos en acciones en tiempo real con Power BI y analítica avanzada para resultados medibles."
  },
  {
    icon: Globe2,
    title: "Alcance Global",
    desc: "Operamos en 4 idiomas con capacidad nearshore para EE.UU. y mercados internacionales desde Bogotá."
  },
  {
    icon: Settings,
    title: "Autonomía Operativa",
    desc: "Modelos basados en productividad y autonomía que superan al BPO tradicional en velocidad y resultados."
  },
  {
    icon: Link2,
    title: "Omnicanalidad Real",
    desc: "WhatsApp, email, SMS, chatbots y voz unificados en una sola plataforma para cero fricción."
  },
  {
    icon: Stethoscope,
    title: "Verticales Especializadas",
    desc: "Expertise en salud, finanzas y telco con soluciones como agendamiento inteligente para IPS y clínicas."
  }
];

export default function Reasons() {
  return (
    <section id="reasons" className="py-20 px-6 md:px-14 lg:px-28">
      <div className="max-w-3xl mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 font-mono text-xs tracking-[0.35em] uppercase text-teal mb-6"
        >
          <div className="w-8 h-px bg-teal" />
          04 / 05 — Diferencial
        </motion.div>
        
        <div className="font-display text-[clamp(2.5rem,4.5vw,4.2rem)] leading-tight">
          <SplitText
            className="inline-block"
            delay={30}
            duration={1}
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
          >
            ¿Por qué elegir a Contact Center <em className="italic text-gradient">Grupo?</em>
          </SplitText>
        </div>
      </div>

      <div className="h-[800px] w-full border border-white/10 rounded-3xl overflow-hidden bg-navy-mid/30 backdrop-blur-sm">
        <ScrollStack 
          itemDistance={50} 
          itemStackDistance={20}
          stackPosition="15%"
          scaleEndPosition="5%"
          itemScale={0.05}
        >
          {reasons.map((reason, i) => (
            <ScrollStackItem key={i} itemClassName="flex flex-col justify-center bg-navy-deep border border-white/10">
              <div className="font-mono text-[0.55rem] tracking-[0.2em] text-teal mb-6">
                0{i + 1}
              </div>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal shrink-0">
                  <reason.icon size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-display text-3xl mb-4 text-white">
                    {reason.title}
                  </h4>
                  <p className="text-lg font-light leading-relaxed text-gray-200 max-w-xl">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
