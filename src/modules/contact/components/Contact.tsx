import { Code2, Briefcase, Globe, Mail } from "lucide-react";
import styles from "./Contact.module.css";

interface ContactProps {
  data: {
    number: string;
    sectionTitle: string;
    badge: string;
    title: string;
    subtitle: string;
    links: Record<string, {
      label: string;
      value: string;
      url: string;
    }>;
  };
}

const getContactIcon = (key: string) => {
  switch (key) {
    case "email":
    case "mail":
    case "message":
      return <Mail size={18} />;
    case "code":
    case "github":
      return <Code2 size={18} />;
    case "portfolio":
    case "experience":
    case "work":
    case "linkedin":
      return <Briefcase size={18} />;
    default:
      return <Globe size={18} />;
  }
};

export default function Contact({ data }: ContactProps) {
  const filteredLinks = Object.entries(data.links).filter(
    ([key]) => key.toLowerCase() !== "whatsapp"
  );

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>✦ {data.badge}</span>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.subtitle}>{data.subtitle}</p>
      </div>
      <div className={styles.linksList}>
        {filteredLinks.map(([key, link]) => (
          <a key={key} href={link.url} target={key === "email" ? undefined : "_blank"} rel={key === "email" ? undefined : "noopener noreferrer"} className={styles.linkRow}>
            <span className={styles.iconWrapper}>{getContactIcon(key)}</span>
            <span className={styles.linkText}>
              <span className={styles.linkLabel}>{link.label}</span>
              <span className={styles.linkValue}>{link.value}</span>
            </span>
            <span className={styles.arrow}>›</span>
          </a>
        ))}
      </div>
    </section>
  );
}