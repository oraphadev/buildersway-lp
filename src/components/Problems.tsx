import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./ui/Reveal";

const PROBLEMS = [
  "Processos excessivamente manuais e baixa produtividade",
  "Equipes sobrecarregadas com atividades repetitivas",
  "Custos operacionais elevados",
  "Ausência de estratégia para adoção de IA",
  "Dificuldade para priorizar iniciativas tecnológicas",
  "Dificuldade em escalar operações",
];

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M4 9.5 7.5 13 14 5.5"
        stroke="#0CC481"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Problems() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-large padding-global">
      <div className="container-large">
        <header className="problems__header">
          <Reveal>
            <p className="eyebrow">O que resolvemos</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-h2">
              Resolvemos problemas de negócio.{" "}
              <span className="text-gradient-ivory">Não problemas tecnológicos.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-medium text-muted">
              Estes são sintomas frequentes. Nosso trabalho é compreender as
              causas — e só então definir a solução.
            </p>
          </Reveal>
        </header>
        <ul className="problems__grid">
          {PROBLEMS.map((problem, index) => (
            <motion.li
              key={problem}
              className="problems__item"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-48px" }}
              transition={{
                duration: 0.5,
                delay: (index % 3) * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <CheckIcon />
              <p>{problem}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
