const dictionaries = {
  es: () => import('./es.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  // Si el idioma existe lo carga, sino por defecto usa español
  const loadDictionary = dictionaries[locale as keyof typeof dictionaries] || dictionaries.es;
  return loadDictionary();
}