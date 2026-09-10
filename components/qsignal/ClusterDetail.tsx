'use client';

import { Heart, Sparkles, UsersRound, X } from 'lucide-react';
import type { Cluster } from './mockData';

type ClusterDetailProps = {
  cluster: Cluster;
  reactions?: number;
  onReact?: () => void;
  onClose?: () => void;
  modal?: boolean;
};

export function ClusterDetail({ cluster, reactions = 18, onReact, onClose, modal = false }: ClusterDetailProps) {
  const content = (
    <section className={`cluster-detail ${modal ? 'cluster-detail--modal' : ''}`} aria-label={`${cluster.label} 상세`}>
      <div className="cluster-detail__head">
        <div>
          <span className="section-kicker">QUESTION CLUSTER</span>
          <h2>{cluster.cloudLabel} 관련 헷갈림</h2>
        </div>
        {onClose && <button className="icon-button" onClick={onClose} type="button" aria-label="상세 닫기"><X size={19} /></button>}
      </div>
      <div className="cluster-detail__meta">
        <span><UsersRound size={14} /> 이 주제를 남긴 학생: {reactions}명</span>
        <span>관련 질문: {cluster.questionCount}개</span>
      </div>
      <div className="cluster-detail__questions">
        {cluster.rawQuestions.map((question, index) => <p key={question}><span>{String(index + 1).padStart(2, '0')}</span>{question}</p>)}
      </div>
      <div className="cluster-detail__note"><Sparkles size={15} /><span>질문 원문은 그대로 보존하고, AI는 유사한 헷갈림을 묶는 데만 사용됩니다.</span></div>
      {onReact && <button className="button button--primary cluster-detail__react" onClick={onReact} type="button"><Heart size={16} /> 나도 궁금해요 <b>{reactions}</b></button>}
    </section>
  );

  if (!modal) return content;
  return <div className="cluster-modal__backdrop" role="presentation"><div className="cluster-modal" role="dialog" aria-modal="true" aria-label={`${cluster.label} 상세`}>{content}</div></div>;
}
