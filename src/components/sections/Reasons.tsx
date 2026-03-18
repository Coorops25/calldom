import { motion } from 'motion/react';
import { Brain, BarChart3, Globe2, Settings, Link2, Stethoscope } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';
import SplitText from '../ui/SplitText';
import { useLang } from '../../i18n';

const icons = [Brain, BarChart3, Globe2, Settings, Link2, Stethoscope];

export default function Reasons() {
  const { t } = useLang();

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
          {t.reasons.label}
        </motion.div>

        <div className="font-display text-[clamp(2.5rem,4.5vw,4.2rem)] leading-tight">
          <SplitText className="inline-block" delay={30} duration={1} splitType="words" from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }}>
            {t.reasons.headingPre} Contact Center <em className="italic text-gradient">{t.reasons.headingEm}</em>
          </SplitText>
        </div>
      </div>

      <div className="h-[800px] w-full border border-white/10 rounded-3xl overflow-hidden bg-navy-mid/30 backdrop-blur-sm">
        <ScrollStack itemDistance={50} itemStackDistance={20} stackPosition="15%" scaleEndPosition="5%" itemScale={0.05}>
          {t.reasons.items.map((reason, i) => {
            const Icon = icons[i];
            return (
              <ScrollStackItem key={i} itemClassName="flex flex-col justify-center bg-navy-deep border border-white/10">
                <div className="font-mono text-[0.55rem] tracking-[0.2em] text-teal mb-6">0{i + 1}</div>
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal shrink-0">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-display text-3xl mb-4 text-white">{reason.title}</h4>
                    <p className="text-lg font-light leading-relaxed text-gray-200 max-w-xl">{reason.desc}</p>
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </section>
  );
}
