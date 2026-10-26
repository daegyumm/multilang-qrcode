export const locales = ['ko', 'en', 'ja', 'zh-Hans'] as const;
export type Locale = typeof locales[number];
export const guideIds = ['welcome', 'tasting', 'jam', 'cocktail', 'canning'] as const;
export type GuideId = typeof guideIds[number];
export interface GuideMeta { id: GuideId; order: number; published: boolean; stepIds: string[] }
export interface GuideText { title: string; summary: string; steps: { id: string; title: string; body: string }[]; cautions: string[] }
export interface LocaleContent {
  ui: { home: string; chooseLanguage: string; backToList: string; notFound: string; askStaff: string; eyebrow: string; headline: string; intro: string; explore: string; steps: string; cautions: string; readGuide: string; footer: string };
  guides: Record<'welcome' | 'tasting', GuideText> & Partial<Record<GuideId, GuideText>>;
}
