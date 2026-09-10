import type { ReactNode } from 'react';

type StatCardProps = {
  label: string;
  value: string | number;
  detail?: string;
  icon?: ReactNode;
  tone?: 'navy' | 'mint' | 'blue' | 'peach';
};

export function StatCard({ label, value, detail, icon, tone = 'navy' }: StatCardProps) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <div className="stat-card__icon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
    </article>
  );
}
