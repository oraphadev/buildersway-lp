import {
  motion,
  transform,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type ReactNode } from "react";

const LINES: ReactNode[] = [
  <>O mercado evolui em velocidade crescente. Novas tecnologias surgem constantemente e processos tornam-se obsoletos.</>,
  <>A maioria das empresas sabe que precisa evoluir. <strong>Poucas sabem exatamente como.</strong></>,
  <>Existe excesso de informação técnica — e escassez de direcionamento estratégico.</>,
  <>
    <span className="narrative__closing">
      A BuildersWay existe para preencher essa lacuna.
    </span>
  </>,
];

type StoryLineProps = {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: ReactNode;
};

function StoryLine({ progress, index, total, children }: StoryLineProps) {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const fadeInEnd = start + step * 0.35;
  const fadeOutStart = end - step * 0.2;

  // Transforms baseados em função para forçar o caminho JS do Motion:
  // dentro de position:sticky, a compilação para ScrollTimeline nativa
  // calcula ranges incorretos e as linhas se sobrepõem.
  const mapOpacity = transform(
    isFirst
      ? [start, fadeOutStart, end]
      : isLast
        ? [start, fadeInEnd, 1]
        : [start, fadeInEnd, fadeOutStart, end],
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0],
  );

  const mapY = transform(
    isFirst
      ? [start, fadeOutStart, end]
      : isLast
        ? [start, fadeInEnd]
        : [start, fadeInEnd, fadeOutStart, end],
    isFirst ? [0, 0, -56] : isLast ? [56, 0] : [56, 0, 0, -56],
  );

  const opacity = useTransform(progress, (value) => mapOpacity(value));
  const y = useTransform(progress, (value) => mapY(value));

  return (
    <motion.p className="narrative-sticky__line" style={{ opacity, y }}>
      {children}
    </motion.p>
  );
}

export function PainNarrative() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  if (reduceMotion) {
    return (
      <section className="section-large padding-global">
        <div className="narrative container-medium">
          {LINES.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="narrative-sticky">
      <div className="narrative-sticky__viewport padding-global">
        <div className="narrative-sticky__stage container-medium">
          {LINES.map((line, index) => (
            <StoryLine
              key={index}
              progress={scrollYProgress}
              index={index}
              total={LINES.length}
            >
              {line}
            </StoryLine>
          ))}
        </div>
      </div>
    </section>
  );
}
