import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "./ui/Button";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 96]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as const },
    },
  };

  return (
    <section ref={sectionRef} className="hero padding-global">
      <motion.div
        className="hero__glow"
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: glowY, opacity: glowOpacity }}
      />
      <motion.div
        className="hero__content container-large"
        variants={container}
        initial="hidden"
        animate="visible"
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p className="eyebrow" variants={item}>
          Consultoria especializada em IA aplicada
        </motion.p>
        <motion.h1 className="heading-h1" variants={item}>
          Impulsionamos negócios através da{" "}
          <span className="text-gradient">inteligência artificial</span>.
        </motion.h1>
        <motion.p className="text-medium text-muted hero__sub" variants={item}>
          Compreendemos profundamente seu negócio para construir soluções
          inteligentes que geram impacto real.
        </motion.p>
        <motion.div className="hero__actions" variants={item}>
          <Button href="#contato" withArrow>
            fale conosco
          </Button>
          <Button href="#como-atuamos" variant="secondary">
            como atuamos
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
