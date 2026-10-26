import { afterEach, describe, expect, it, vi } from 'vitest';
import { isLocale, readLocale, saveLocale } from '../lib/locale';
afterEach(() => vi.unstubAllGlobals());
describe('language preferences', () => {
  it('rejects invalid and unsupported locale values', () => {
    for (const value of ['zh', 'fr', '', undefined, null]) expect(isLocale(value)).toBe(false);
    expect(isLocale('zh-Hans')).toBe(true);
  });
  it('ignores corrupted stored preferences', () => {
    vi.stubGlobal('localStorage', {getItem: () => 'bad-language'});
    expect(readLocale()).toBeUndefined();
  });
  it('works when storage is blocked', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {throw new Error('Blocked');},
      setItem: () => {throw new Error('Blocked');},
    });
    expect(readLocale()).toBeUndefined();
    expect(() => saveLocale('ja')).not.toThrow();
  });
});
