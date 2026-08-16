"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

interface MobileMenuProps {
  data: {
    skills: string;
    experience: string;
    education: string;
    contact: string;
  };
}

export function MobileMenu({ data }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.mobileWrapper}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={styles.menuButton}
        aria-label="Toggle menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>

      {isOpen && (
        <nav className={styles.mobileMenu} onClick={() => setIsOpen(false)}>
          <Link href="#skills">{data.skills}</Link>
          <Link href="#experience">{data.experience}</Link>
          <Link href="#education">{data.education}</Link>
          <Link href="#contact">{data.contact}</Link>
        </nav>
      )}
    </div>
  );
}