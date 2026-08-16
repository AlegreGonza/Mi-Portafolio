import styles from "./Experience.module.css";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
}

interface ExperienceProps {
  data: {
    number: string;
    sectionTitle: string;
    items: ExperienceItem[];
  };
}

export default function Experience({ data }: ExperienceProps) {
  return (
    <section className={styles.section}>
      <div className={styles.breadcrumb}>
        <span>{data.number}</span>
        <span>/</span>
        <span>{data.sectionTitle}</span>
      </div>
      <div className={styles.container}>
        {data.items.map((item, index) => (
          <div key={index} className={styles.itemCard}>
            <div className={styles.itemHeader}>
              <div>
                <h3 className={styles.itemRole}>
                  {item.role} <span className={styles.itemCompany}>@ {item.company}</span>
                </h3>
              </div>
              <span className={styles.itemPeriod}>
                {item.period}
              </span>
            </div>
            <ul className={styles.descriptionList}>
              {item.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}