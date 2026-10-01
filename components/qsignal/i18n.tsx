'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'ko' | 'en';

function readLocale(): Locale {
  if (typeof window === 'undefined') return 'ko';
  return new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'ko';
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
    document.documentElement.lang = nextLocale;
  }, []);

  function setLocale(nextLocale: Locale) {
    setLocaleState(nextLocale);
    document.documentElement.lang = nextLocale;
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
