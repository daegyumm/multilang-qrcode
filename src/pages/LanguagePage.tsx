import { Link, Navigate } from 'react-router-dom';
import { locales } from '../content/types';
import { languageNames } from '../content';
import { readLocale, saveLocale } from '../lib/locale';
import { guidePath } from '../lib/paths';
export function LanguagePage({ id }: { id?: string }) {
  const saved = readLocale();
  if (saved) return <Navigate to={guidePath(saved, id)} replace />;
  return <section className="language-page">
    <p className="eyebrow">WELCOME TO MAERYO</p><h1>매료에 오신 것을<br />환영해요.</h1>
    <p className="lead" lang="en">A little sip. A new discovery.</p>
    <p className="language-prompt">언어를 선택해 주세요 <span lang="en">/ Choose your language</span></p>
    <div className="language-options">{locales.map(locale =>
      <Link key={locale} lang={locale} to={guidePath(locale, id)} onClick={() => saveLocale(locale)}>
        <span>{languageNames[locale]}</span><span aria-hidden="true">↗</span>
      </Link>)}</div><p className="quiet">한국어 · English · 日本語 · 简体中文</p>
  </section>;
}
