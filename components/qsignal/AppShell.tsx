import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from './Brand';

type AppShellProps = {
  children: ReactNode;
  active?: 'home' | 'student' | 'teacher' | 'report' | 'screens';
  minimal?: boolean;
};

const navItems = [
  { href: '/join', label: '학생 화면', key: 'student' },
  { href: '/teacher', label: '교수자 대시보드', key: 'teacher' },
  { href: '/report', label: '수업 후 리포트', key: 'report' },
] as const;

export function AppShell({ children, active = 'home', minimal = false }: AppShellProps) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <Brand />
          {!minimal && (
            <nav aria-label="주요 페이지" className="site-nav">
              {navItems.map((item) => (
                <a
                  className={active === item.key ? 'site-nav__link is-active' : 'site-nav__link'}
                  href={item.href}
                  key={item.key}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
          <a className="header-cta" href="/join">
            데모 참여하기 <ArrowUpRight size={15} strokeWidth={2.2} />
          </a>
        </div>
      </header>
      {children}
    </div>
  );
}
