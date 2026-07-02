import { motion } from "motion/react";
import { Button } from "./ui/Button";

function Logomark() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6 24V8l10 8-10 8Z" fill="#0CC481" />
      <path d="M16 24V8l10 8-10 8Z" fill="#EDECE4" opacity="0.85" />
    </svg>
  );
}

export function Nav() {
  return (
    <motion.header
      className="nav"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="padding-global">
        <nav className="nav__inner container-large" aria-label="Navegação principal">
          <a href="#" className="nav__logo">
            <Logomark />
            BuildersWay
          </a>
          <ul className="nav__links">
            <li>
              <a href="#como-atuamos">Como atuamos</a>
            </li>
            <li>
              <a href="#principios">Princípios</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
          <Button href="#contato" small withArrow>
            fale conosco
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}
