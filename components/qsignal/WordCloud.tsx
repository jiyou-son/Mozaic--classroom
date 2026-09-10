'use client';

import type { Cluster } from './mockData';

type WordCloudProps = {
  clusters: Cluster[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  variant?: 'map' | 'student' | 'compact';
  className?: string;
};

export function WordCloud({
  clusters,
  selectedId,
  onSelect,
  variant = 'map',
  className = '',
}: WordCloudProps) {
  return (
    <div className={`word-cloud word-cloud--${variant} ${className}`}>
      <span className="word-cloud__orb word-cloud__orb--one" aria-hidden="true" />
      <span className="word-cloud__orb word-cloud__orb--two" aria-hidden="true" />
      {clusters.map((cluster) => (
        <button
          aria-pressed={selectedId === cluster.id}
          className={`word-cloud__word word-cloud__word--${cluster.id} word-cloud__word--${cluster.tone} ${selectedId === cluster.id ? 'is-selected' : ''}`}
          key={cluster.id}
          onClick={() => onSelect?.(cluster.id)}
          type="button"
        >
          <span>{cluster.cloudLabel}</span>
          <small>{cluster.count}</small>
        </button>
      ))}
      <span className="word-cloud__label">AI가 유사 질문을 묶었어요</span>
    </div>
  );
}
