"use client";

import { useState } from "react";
import styles from "./Skills.module.css";
import { getSkillIcon } from "./skillIcons";

interface SkillsProps {
  data: {
    number: string;
    sectionTitle: string;
    badge: string;
    title: string;
    subtitle: string;
    categories: {
      backend: string;
      frontend: string;
      tools: string;
      [key: string]: string;
    };
    list: {
      backend: string[];
      frontend: string[];
      tools: string[];
      [key: string]: string[];
    };
  };
}

// Colores de marca aproximados por tecnología
const skillColors: Record<string, string> = {
  java: "#f89820",
  "spring boot": "#6db33f",
  react: "#61dafb",
  javascript: "#f0db4f",
  mysql: "#4479a1",
  html5: "#e34f26",
  css3: "#2965f1",
  git: "#f05032",
  github: "#e5e7eb",
  vite: "#a855f7",
  maven: "#c71a36",
  postman: "#ff6c37",
  "rest apis": "#34d399",
};

function getSkillColor(skill: string): string {
  return skillColors[skill.toLowerCase()] || "#34d399";
}

// Nivel aproximado (0-100) para la barra
const skillLevels: Record<string, number> = {
  java: 85,
  "spring boot": 80,
  mysql: 75,
  "rest apis": 80,
  react: 70,
  javascript: 75,
};

function getSkillLevel(skill: string): number {
  return skillLevels[skill.toLowerCase()] ?? 65;
}

export default function Skills({ data }: SkillsProps) {
  const categoryKeys = Object.keys(data.categories);
  const [activeTab, setActiveTab] = useState(categoryKeys[0]);

  const allSkills = categoryKeys.flatMap((key) => data.list[key] || []);
  const activeSkills = data.list[activeTab] || [];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>✦ {data.badge}</span>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.subtitle}>{data.subtitle}</p>
      </div>

      {/* Fila de chips con todas las skills */}
      <div className={styles.pillsRow}>
        {allSkills.map((skill, idx) => {
          const color = getSkillColor(skill);
          return (
            <span
              key={idx}
              className={styles.pill}
              style={{
                borderColor: `${color}55`,
                background: `${color}15`,
                color: color,
              }}
            >
              {getSkillIcon(skill)}
              {skill}
            </span>
          );
        })}
      </div>

      {/* Tabs de categorías */}
      <div className={styles.tabs}>
        {categoryKeys.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`${styles.tab} ${activeTab === key ? styles.tabActive : ""}`}
          >
            {data.categories[key]}
          </button>
        ))}
      </div>

      {/* Cards con barra de nivel */}
      <div className={styles.grid}>
        {activeSkills.map((skill, idx) => {
          const color = getSkillColor(skill);
          const level = getSkillLevel(skill);
          return (
            <div key={idx} className={styles.itemCard}>
              <div className={styles.itemHeader}>
                <span className={styles.itemIcon} style={{ color }}>
                  {getSkillIcon(skill)}
                </span>
                <span className={styles.itemName}>{skill}</span>
              </div>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${level}%`,
                    background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}