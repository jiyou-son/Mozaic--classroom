'use client';

import { Heart, MessageCircle } from 'lucide-react';

type QuestionCardProps = {
  text: string;
  count: number;
  onReact?: () => void;
  accent?: string;
  compact?: boolean;
};

export function QuestionCard({ text, count, onReact, accent = 'teal', compact = false }: QuestionCardProps) {
  return (
    <article className={`question-card question-card--${accent} ${compact ? 'question-card--compact' : ''}`}>
      <span className="question-card__quote">“</span>
      <p>{text}</p>
      <div className="question-card__footer">
        <span><MessageCircle size={13} /> 익명 질문</span>
        {onReact ? (
          <button className="empathy-button" onClick={onReact} type="button">
            <Heart size={13} /> 나도 궁금해요 <b>{count}</b>
          </button>
        ) : (
          <span className="question-card__count"><Heart size={13} /> {count}</span>
        )}
      </div>
    </article>
  );
}
