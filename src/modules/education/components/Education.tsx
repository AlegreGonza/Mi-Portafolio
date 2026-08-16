import styles from "./Education.module.css";

interface EducationItem {
  title: string;
  institution: string;
  description: string;
  status: string;
}

interface EducationProps {
  data: {
    number: string;
    sectionTitle: string;
    items: EducationItem[];
  };
}

export default function Education({ data }: EducationProps) {
  return (
    <section className={styles.section}>
      <div className={styles.breadcrumb}>
        <span>{data.number}</span>
        <span>/</span>
        <span>{data.sectionTitle}</span>
      </div>
      <div className={styles.container}>
        {data.items.map((item, index) => {
          const isInProgress = item.status.toLowerCase().includes("curso");
          return (
            <div key={index} className={styles.itemCard}>
              <div className={styles.itemHeader}>
                <div>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemInstitution}>{item.institution}</p>
                </div>
                <span className={isInProgress ? styles.statusInProgress : styles.statusCompleted}>
                  {item.status}
                </span>
              </div>
              {item.description && (
                <p className={styles.itemDescription}>
                  {item.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}