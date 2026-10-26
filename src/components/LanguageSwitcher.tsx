import { Link } from 'react-router-dom';
import { locales, type Locale } from '../content/types';
import { content, languageNames } from '../content';
import { guidePath } from '../lib/paths';
import { saveLocale } from '../lib/locale';
export function LanguageSwitcher({ locale, id }: { locale: Locale; id?: string }) {
  return <nav className="languages" aria-label={content[locale].ui.chooseLanguage}>
    {locales.map(language => <Link key={language} lang={language}
      to={guidePath(language, id)} aria-current={language === locale ? 'page' : undefined}
      onClick={() => saveLocale(language)}>{languageNames[language]}</Link>)}
  </nav>;
}
