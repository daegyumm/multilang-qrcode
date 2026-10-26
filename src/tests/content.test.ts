import { describe, expect, it } from 'vitest';
import { content } from '../content';
import { guides, publishedGuides } from '../content/guides';
import { locales } from '../content/types';
describe('published content contract', () => {
  it('has unique stable guide identifiers and ordering', () => {
    expect(new Set(guides.map(g => g.id)).size).toBe(guides.length);
    expect(new Set(guides.map(g => g.order)).size).toBe(guides.length);
  });
  for (const locale of locales) {
    it(`${locale} has all UI keys and complete published steps`, () => {
      const translated = content[locale];
      expect(Object.keys(translated.ui).sort()).toEqual(Object.keys(content.ko.ui).sort());
      for (const value of Object.values(translated.ui)) expect(value.trim()).not.toBe('');
      for (const meta of publishedGuides) {
        const guide = translated.guides[meta.id];
        expect(guide).toBeDefined();
        if (!guide) throw new Error(`Missing ${locale}/${meta.id}`);
        expect(guide.title.trim()).not.toBe('');
        expect(guide.summary.trim()).not.toBe('');
        expect(guide.steps.map(s => s.id)).toEqual(meta.stepIds);
        expect(new Set(meta.stepIds).size).toBe(meta.stepIds.length);
        expect(guide.steps.length).toBeGreaterThan(0);
        expect(guide.cautions.length).toBeGreaterThan(0);
        for (const step of guide.steps) {
          expect(step.title.trim()).not.toBe('');
          expect(step.body.trim()).not.toBe('');
        }
        for (const warning of guide.cautions) expect(warning.trim()).not.toBe('');
      }
    });
  }
});
