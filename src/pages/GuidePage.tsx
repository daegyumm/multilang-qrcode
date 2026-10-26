import { Link } from 'react-router-dom';
import { content } from '../content';
import type { GuideId, Locale } from '../content/types';
import { guidePath } from '../lib/paths';
export function GuidePage({ locale, id }: { locale: Locale; id: GuideId }) {
  const { ui, guides } = content[locale];
  const guide = guides[id]!;
  return <article className="detail"><Link className="back" to={guidePath(locale)}>← {ui.backToList}</Link>
    <header className="detail-header"><p className="eyebrow">{ui.eyebrow}</p><h1>{guide.title}</h1><p className="lead">{guide.summary}</p></header>
    <section aria-labelledby="steps"><h2 id="steps">{ui.steps}</h2><ol className="steps">{guide.steps.map((step,index) => <li key={step.id}>
      <span className="step-number" aria-hidden="true">0{index+1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol></section>
    <aside className="cautions"><h2>{ui.cautions}</h2><ul>{guide.cautions.map(text => <li key={text}>{text}</li>)}</ul></aside><p className="staff-note">{ui.askStaff}</p>
  </article>;
}
