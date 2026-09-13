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
  const rankedClusters = [...clusters].sort((a, b) => b.count - a.count);

  return (
    <div aria-label="오늘의 질문 모자이크" className={`word-cloud word-cloud--${variant} ${className}`} role="group">
      <span className="word-cloud__orb word-cloud__orb--one" aria-hidden="true" />
      <span className="word-cloud__orb word-cloud__orb--two" aria-hidden="true" />
      {rankedClusters.map((cluster, index) => (
        <button
          aria-label={`${cluster.cloudLabel}, 질문 ${cluster.count}개. 원문 질문 보기`}
          aria-pressed={selectedId === cluster.id}
          className={`word-cloud__tile word-cloud__tile--rank-${index + 1} word-cloud__word word-cloud__word--${cluster.id} word-cloud__word--${cluster.tone} ${selectedId === cluster.id ? 'is-selected' : ''}`}
          key={cluster.id}
          onClick={() => onSelect?.(cluster.id)}
          type="button"
        >
          <span>{cluster.cloudLabel}</span>
          <small>{cluster.count}</small>
        </button>
      ))}
      <span className="word-cloud__label">비슷한 궁금증이 하나의 모자이크가 돼요</span>
    </div>
  );
}
