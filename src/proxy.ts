import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es'];
const defaultLocale = 'es';

// Función para retornar siempre el idioma por defecto
function getLocale() {
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Verifica si la ruta ya tiene un idioma soportado (ej: /es/... o /en/...)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Si no tiene idioma, redirige al usuario añadiendo el idioma por defecto
  const locale = getLocale();
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Excluye archivos internos, imágenes, api, etc.
    '/((?!api|_next/static|_next/image|favicon.ico|Alegre-Gonzalo-cv.pdf).*)',],
};