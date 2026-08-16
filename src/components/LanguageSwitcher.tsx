'use client'

import { usePathname, useRouter } from 'next/navigation'
import styles from '@/modules/navbar/components/Navbar.module.css'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const currentLang = pathname.startsWith('/en') ? 'en' : 'es'
  const nextLang = currentLang === 'es' ? 'en' : 'es'

  const toggleLanguage = () => {
    const newPathname = pathname.replace(`/${currentLang}`, `/${nextLang}`)

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(newPathname, { scroll: false })
      })
    } else {
      router.push(newPathname, { scroll: false })
    }
  }

  return (
    <button
      onClick={toggleLanguage}
      className={styles.themeToggle}
      aria-label="Cambiar idioma"
      type="button"
    >
      <span className={currentLang === 'es' ? styles.active : ''}>
        ES
      </span>
      <span className={currentLang === 'en' ? styles.active : ''}>
        EN
      </span>
    </button>
  )
}