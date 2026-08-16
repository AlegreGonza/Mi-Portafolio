import styles from './Hero.module.css';

interface HeroProps {
  dict: {
    greeting: string;
    name: string;
    role: string;
    projectsButton: string;
    cvButton: string;
  };
}

export default function Hero({ dict }: HeroProps) {
  return (
    <section id="hero" className={styles.hero}>
      {/* Contenido principal */}
      <div className={styles.content}>
        <p className={styles.greeting}>{dict.greeting}</p>
        
        <h1 className={styles.title}>
          {dict.name}
        </h1>
        
        <p className={styles.role}>
          {dict.role}
        </p>

        {/* Contenedor de botones */}
        <div className={styles.actions}>
          <a
            href="https://github.com/AlegreGonza"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryButton}
          >
            {dict.projectsButton}
          </a>

          <a
            href="/Alegre-Gonzalo-cv.pdf"
            download="Alegre-Gonzalo-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryButton}
          >
            {dict.cvButton}
          </a>
        </div>
      </div>
    </section>
  );
}