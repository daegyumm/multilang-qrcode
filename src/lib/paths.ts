import type { Locale } from '../content/types';
export function guidePath(locale: Locale, id?: string) {
  return id ? `/${locale}/guide/${encodeURIComponent(id)}` : `/${locale}`;
}
