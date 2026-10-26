import type { GuideMeta } from './types';
export const guides: GuideMeta[] = [
  { id: 'welcome', order: 1, published: true, stepIds: ['start', 'help'] },
  { id: 'tasting', order: 2, published: true, stepIds: ['check', 'aroma', 'taste'] },
  { id: 'jam', order: 3, published: false, stepIds: [] },
  { id: 'cocktail', order: 4, published: false, stepIds: [] },
  { id: 'canning', order: 5, published: false, stepIds: [] },
];
export const publishedGuides = guides.filter(g => g.published).sort((a,b) => a.order-b.order);
export const findGuide = (id: string) => publishedGuides.find(g => g.id === id);
