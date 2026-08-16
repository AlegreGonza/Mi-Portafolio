import { Server, Cpu, Wrench, Target } from "lucide-react";
import styles from "./Profile.module.css";

interface ProfileCard {
  title: string;
  description: string;
}

interface ProfileProps {
  data: {
    number: string;
    sectionTitle: string;
    headline: string;
    headlineHighlight: string;
    description: string;
    cards: {
      backend: ProfileCard;
      architecture: ProfileCard;
      tools: ProfileCard;
    };
    focusLabel: string;
    focusText: string;
    ctaButton: string;
  };
}

export default function Profile({ data }: ProfileProps) {
  return (
    <section className="py-16 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className="flex items-center gap-2 mb-2 font-mono text-sm text-neutral-400">
        <span>{data.number}</span>
        <span>/</span>
        <span>{data.sectionTitle}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
        {data.headline}{" "}
        <span className="text-emerald-400">{data.headlineHighlight}</span>
      </h2>
      <p className="text-neutral-300 leading-relaxed text-sm sm:text-base mb-12 max-w-2xl">
        {data.description}
      </p>

      {/* Grilla superior centrada */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Tarjeta 1: Backend */}
        <div className={styles.card}>
          <div>
            <div className={styles.iconWrapperBackend}>
              <Server className={`w-5 h-5 ${styles.backendIcon}`} />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">{data.cards.backend.title}</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{data.cards.backend.description}</p>
          </div>
        </div>

        {/* Tarjeta 2: Architecture */}
        <div className={styles.card}>
          <div>
            <div className={styles.iconWrapperArchitecture}>
              <Cpu className={`w-5 h-5 ${styles.architectureIcon}`} />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">{data.cards.architecture.title}</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{data.cards.architecture.description}</p>
          </div>
        </div>

        {/* Tarjeta 3: Tools */}
        <div className={styles.card}>
          <div>
            <div className={styles.iconWrapperTools}>
              <Wrench className={`w-5 h-5 ${styles.toolsIcon}`} />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">{data.cards.tools.title}</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{data.cards.tools.description}</p>
          </div>
        </div>
      </div>

      {/* Caja de Enfoque inferior alineada al ancho de la grilla */}
      <div>
        <div className={styles.focusContainer}>
          <div className={styles.targetIconWrapper}>
            <Target className={`w-5 h-5 ${styles.targetIcon}`} />
          </div>
          <div>
            <span className="text-xs font-mono text-amber-400/90 uppercase tracking-wider block mb-1">
              {data.focusLabel}
            </span>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {data.focusText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}