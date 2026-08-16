'use client';

import styles from './Navbar.module.css';

interface DesktopMenuProps {
  data: {
    skills: string;
    experience: string;
    education: string;
    contact: string;
  };
}

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  }
};

export function DesktopMenu({ data }: DesktopMenuProps) {
  return (
    <nav className={styles.navLinks}>
      <a href="#education" onClick={(e) => handleNavClick(e, 'education')}>
        {data.education}
      </a>
      <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')}>
        {data.experience}
      </a>
      <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')}>
        {data.skills}
      </a>
      <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>
        {data.contact}
      </a>
    </nav>
  );
}