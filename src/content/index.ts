import ko from './locales/ko.json';
import en from './locales/en.json';
import ja from './locales/ja.json';
import zhHans from './locales/zh-Hans.json';
import type { Locale, LocaleContent } from './types';
export const content: Record<Locale, LocaleContent> = { ko, en, ja, 'zh-Hans': zhHans };
export const languageNames: Record<Locale, string> = { ko: '한국어', en: 'English', ja: '日本語', 'zh-Hans': '简体中文' };
