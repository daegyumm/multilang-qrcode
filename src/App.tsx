import { useEffect } from 'react';
import { HashRouter, Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { content } from './content';
import { findGuide } from './content/guides';
import { isLocale, readLocale, saveLocale } from './lib/locale';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { LanguagePage } from './pages/LanguagePage';
import { HomePage } from './pages/HomePage';
import { GuidePage } from './pages/GuidePage';
import { NotFoundPage } from './pages/NotFoundPage';
function Entry() {
  const { id } = useParams();
  return id && !findGuide(id) ? <NotFoundPage locale={readLocale()} /> : <LanguagePage id={id} />;
}
function Localized({ detail = false }: { detail?: boolean }) {
  const { locale, id } = useParams();
  if (!isLocale(locale)) return <NotFoundPage locale={readLocale()} />;
  if (!detail) return <HomePage locale={locale} />;
  const guide = id ? findGuide(id) : undefined;
  return guide ? <GuidePage locale={locale} id={guide.id} /> : <NotFoundPage locale={locale} />;
}
function Shell() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);
  const explicit = segments[0];
  const locale = isLocale(explicit) ? explicit : (readLocale() ?? 'ko');
  const isLocalized = isLocale(explicit);
  const id = segments[1] === 'guide' ? segments[2] : undefined;
  const title = id && findGuide(id) ? content[locale].guides[findGuide(id)!.id]?.title : undefined;
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `${title ?? content[locale].ui.eyebrow} | MAERYO`;
    if (isLocalized) saveLocale(locale);
    window.scrollTo(0, 0);
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname, locale, title, isLocalized]);
  return <div className="shell"><header className="site-header"><Link className="brand" to={isLocalized ? `/${locale}` : '/'} aria-label="MAERYO"><span>매료</span><small>MAERYO</small></Link><span className="header-note">BREWERY EXPERIENCE</span></header>
    {isLocalized && <LanguageSwitcher locale={locale} id={id} />}
    <main id="main" tabIndex={-1}><Routes>
      <Route path="/" element={<Entry />} /><Route path="/guide/:id" element={<Entry />} />
      <Route path="/:locale" element={<Localized />} /><Route path="/:locale/guide/:id" element={<Localized detail />} />
      <Route path="*" element={<NotFoundPage locale={locale} />} />
    </Routes></main><footer><span>MAERYO</span><p>{content[locale].ui.footer}</p></footer></div>;
}
export default function App() { return <HashRouter><Shell /></HashRouter>; }
