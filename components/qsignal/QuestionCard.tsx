'use client';

import { Heart, MessageCircle } from 'lucide-react';

type QuestionCardProps = {
  text: string;
  count: number;
  onReact?: () => void;
  reacted?: boolean;
  accent?: string;
  compact?: boolean;
};

export function QuestionCard({ text, count, onReact, reacted = false, accent = 'lime', compact = false }: QuestionCardProps) {
  return (
    <article className={`question-card question-card--${accent} ${compact ? 'question-card--compact' : ''}`}>
      <span className="question-card__quote">“</span>
      <p><span className="question-card__highlight">{text}</span></p>
      <div className="question-card__footer">
        <span><MessageCircle size={13} /> 익명 질문</span>
        {onReact ? (
          <button aria-pressed={reacted} className={`empathy-button${reacted ? ' is-reacted' : ''}`} onClick={onReact} type="button">
            <Heart fill={reacted ? 'currentColor' : 'none'} size={13} /> 나도 궁금해요 <b>{count}</b>
          </button>
        ) : (
          <span className="question-card__count"><Heart size={13} /> {count}</span>
        )}
      </div>
    </article>
  );
}
