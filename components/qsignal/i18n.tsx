'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'ko' | 'en';

function readLocale(): Locale {
  if (typeof window === 'undefined') return 'ko';
  return new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'ko';
}

function applyDocumentLocale(locale: Locale) {
  document.documentElement.lang = locale;
  document.title = locale === 'en'
    ? 'Mosaic — Questions come together, learning moves forward'
    : '모자이크 — 흩어진 질문이 모여, 모두의 깨달음이 되다';
  document.querySelector('meta[name="description"]')?.setAttribute(
    'content',
    locale === 'en'
      ? 'Mosaic brings students’ hidden questions back into the classroom.'
      : '흩어진 질문이 모여, 모두의 깨달음이 되다. 모자이크는 학생들의 작은 질문 조각을 함께 볼 수 있는 수업의 그림으로 만듭니다.',
  );
}

type I18nValue = {
  locale: Locale;
  isEnglish: boolean;
  setLocale: (nextLocale: Locale) => void;
  hrefForLocale: (nextLocale: Locale, href?: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ko');

  useEffect(() => {
    const nextLocale = readLocale();
    setLocaleState(nextLocale);
    applyDocumentLocale(nextLocale);
  }, []);

  function setLocale(nextLocale: Locale) {
    setLocaleState(nextLocale);
    applyDocumentLocale(nextLocale);
    const params = new URLSearchParams(window.location.search);
    if (nextLocale === 'en') params.set('lang', 'en');
    else params.delete('lang');
    const query = params.toString();
    window.location.assign(`${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
  }

  function hrefForLocale(nextLocale: Locale, href = typeof window === 'undefined' ? '/' : window.location.pathname) {
    if (typeof window === 'undefined') return href;
    const [pathAndQuery, hash = ''] = href.split('#');
    const [path, query = ''] = pathAndQuery.split('?');
    const params = new URLSearchParams(query);
    if (nextLocale === 'en') params.set('lang', 'en');
    else params.delete('lang');
    const encodedQuery = params.toString();
    return `${path}${encodedQuery ? `?${encodedQuery}` : ''}${hash ? `#${hash}` : ''}`;
  }

  const value = useMemo(() => ({ locale, isEnglish: locale === 'en', setLocale, hrefForLocale }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
}
