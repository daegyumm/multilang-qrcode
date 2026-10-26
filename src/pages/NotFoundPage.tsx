import { Link } from 'react-router-dom';
import { content } from '../content';
import type { Locale } from '../content/types';
export function NotFoundPage({ locale = 'ko' }: { locale?: Locale }) {
  return <section className="empty"><p className="eyebrow">404</p><h1>{content[locale].ui.notFound}</h1><Link className="primary" to={`/${locale}`}>{content[locale].ui.home}</Link></section>;
}
