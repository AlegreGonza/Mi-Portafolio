```markdown
# 🚀 Portfolio Personal - Full Stack & Software Architecture

> Aplicación web personal desarrollada con **Next.js (App Router)** y **TypeScript**, diseñada con un enfoque modular, escalable y limpio. Este proyecto refleja una mentalidad de ingeniería de sistemas y backend, priorizando la separación de responsabilidades, la seguridad y la mantenibilidad por encima de la sobrecarga visual o el acoplamiento de clases.

---

## 🏗️ Arquitectura y Decisiones de Diseño

El proyecto está estructurado bajo un patrón modular estricto donde cada sección de la interfaz vive de manera independiente:

* **Arquitectura por Módulos (`src/modules/`):** Cada componente funcional (Hero, Educación, Experiencia, Habilidades, Contacto, Navbar) cuenta con su propia carpeta contenedora, encapsulando su lógica y sus estilos específicos.
* **Estilos Limpios (CSS Modules):** Se evita el uso de clases kilométricas o dependencias de frameworks de utilidad masiva en el JSX. Se emplean **CSS Modules** (`*.module.css`) para aislar los selectores en tiempo de compilación, eliminando conflictos de especificidad y manteniendo el marcado semántico y legible.
* **Internacionalización (i18n):** Implementación nativa de soporte multi-idioma mediante diccionarios JSON locales procesados dinámicamente.
* **Tipado Estricto:** Uso extensivo de **TypeScript** para asegurar contratos de datos sólidos en componentes, props y configuraciones, previniendo errores en tiempo de ejecución.
* **Calidad de Código:** Configuración estricta de **ESLint** para mantener estándares profesionales de desarrollo y evitar código obsoleto o deprecado.

---

## 🛠️ Stack Tecnológico

* **Framework:** Next.js 15+ (App Router)
* **Lenguaje:** TypeScript
* **Estilos:** CSS Modules + CSS Tradicional para animaciones globales y layouts base.
* **Iconografía:** Lucide React
* **Control de Calidad:** ESLint

---

## 📂 Estructura del Proyecto

src/
├── app/
│   └── [lng]/               # Rutas dinámicas internacionalizadas
├── components/              # Componentes globales de soporte (Transiciones, UI helpers)
├── i18n/                    # Configuración y diccionarios de traducción (JSON)
└── modules/                 # Módulos desacoplados de la aplicación
    ├── contact/             # Módulo de contacto y enlaces profesionales
    ├── education/           # Sección académica e historial de formación
    ├── experience/          # Experiencia profesional y laboral
    ├── hero/                # Sección principal de presentación
    ├── logo/                # Componente de identidad visual
    ├── navbar/              # Barra de navegación (Menús desktop y móvil)
    ├── profile/             # Resumen de perfil y enfoque profesional
    └── skills/              # Grilla de tecnologías y habilidades técnicas

```

---

## ⚙️ Puesta en Marcha (Instalación y Desarrollo)

Si deseas clonar y ejecutar este repositorio en tu entorno local, sigue estos pasos:

1. **Clonar el repositorio:**

```bash
git clone https://github.com/AlegreGonza/Portafolio.git
cd Mi-Portafolio

```

2. **Instalar dependencias:**

```bash
npm install

```

3. **Ejecutar el servidor de desarrollo:**

```bash
npm run dev

```

4. **Abrir en el navegador:** Accede a [http://localhost:3000](http://localhost:3000) para ver la aplicación en funcionamiento.

---

## 🌐 Demo en vivo

---

## 📄 Licencia

Este proyecto es de uso personal. Si querés reutilizar partes del código, mencioná la fuente.

```

```
