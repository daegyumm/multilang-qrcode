import { Link } from 'react-router-dom';
import { content } from '../content';
import { publishedGuides } from '../content/guides';
import type { Locale } from '../content/types';
import { guidePath } from '../lib/paths';
export function HomePage({ locale }: { locale: Locale }) {
  const { ui, guides } = content[locale];
  return <>
    <section className="hero"><div className="hero-copy"><p className="eyebrow">{ui.eyebrow}</p><h1>{ui.headline}</h1>
      <p className="lead">{ui.intro}</p><Link className="primary" to={guidePath(locale,'tasting')}>{guides.tasting.title}<span aria-hidden="true">↗</span></Link>
    </div><div className="cup-art" aria-hidden="true"><span className="orbit"/><span className="cup"/><span className="art-label">MAERYO<br/>SAVOR THE MOMENT</span></div></section>
    <section className="guide-list" aria-labelledby="explore"><div className="section-heading"><h2 id="explore">{ui.explore}</h2><span aria-hidden="true">01 — 02</span></div>
      <div className="cards">{publishedGuides.map((meta, index) => {
        const text = guides[meta.id]!;
        return <Link className="guide-card" key={meta.id} to={guidePath(locale, meta.id)}><span className="card-number">0{index+1}</span><h3>{text.title}</h3>
          <p>{text.summary}</p><span className="card-action">{ui.readGuide}<span aria-hidden="true">↗</span></span></Link>;
      })}</div>
    </section><aside className="staff-note">{ui.askStaff}</aside>
  </>;
}
