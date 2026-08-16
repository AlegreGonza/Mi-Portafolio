"use client";

import { useState, useEffect, ReactNode } from "react";
import styles from "./Navbar.module.css";

export function ScrollContainer({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("hero");

    console.log("heroEl encontrado:", heroEl); // 👈 debug

    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("isIntersecting:", entry.isIntersecting, "boundingRect:", entry.boundingClientRect); // 👈 debug
        setIsScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    observer.observe(heroEl);

    return () => observer.disconnect();
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
      {children}
    </header>
  );
}