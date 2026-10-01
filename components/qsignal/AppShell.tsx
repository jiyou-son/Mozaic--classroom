'use client';

import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from './Brand';
import { useI18n } from './i18n';

type AppShellProps = {
  children: ReactNode;
  active?: 'home' | 'student' | 'report' | 'screens';
  minimal?: boolean;
};

export function AppShell({ children, active = 'home', minimal = false }: AppShellProps) {
  const { isEnglish, locale, setLocale, hrefForLocale } = useI18n();
  const navItems = [
    { href: '/join', label: isEnglish ? 'Student view' : '학생 화면', key: 'student' },
    { href: '/report', label: isEnglish ? 'Class report' : '수업 후 리포트', key: 'report' },
  ] as const;

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <Brand />
          {!minimal && (
            <nav aria-label={isEnglish ? 'Primary pages' : '주요 페이지'} className="site-nav">
              {navItems.map((item) => (
                <a
                  className={active === item.key ? 'site-nav__link is-active' : 'site-nav__link'}
                  href={hrefForLocale(locale, item.href)}
                  key={item.key}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
          <div className="site-header__actions">
            <div aria-label={isEnglish ? 'Language' : '언어'} className="language-switcher" role="group">
              <button className={locale === 'ko' ? 'is-active' : ''} onClick={() => setLocale('ko')} type="button">한국어</button>
              <button className={locale === 'en' ? 'is-active' : ''} onClick={() => setLocale('en')} type="button">EN</button>
            </div>
            <a className="header-cta" href={hrefForLocale(locale, '/join')}>
              {isEnglish ? 'Try the demo' : '데모 참여하기'} <ArrowUpRight size={15} strokeWidth={2.2} />
            </a>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
