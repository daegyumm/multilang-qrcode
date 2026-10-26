import { locales, type Locale } from '../content/types';
export const storageKey = 'maeryo.locale';
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.some(locale => locale === value);
}
export function readLocale(): Locale | undefined {
  try { const value = localStorage.getItem(storageKey); return isLocale(value) ? value : undefined; }
  catch { return undefined; }
}
export function saveLocale(locale: Locale) {
  try { localStorage.setItem(storageKey, locale); } catch { /* Storage is optional. */ }
}
