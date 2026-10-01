'use client';

import { Heart, Sparkles, UsersRound, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { Cluster } from './mockData';
import { useI18n } from './i18n';

type ClusterDetailProps = {
  cluster: Cluster;
  reactions?: number;
  onReact?: () => void;
  onClose?: () => void;
  modal?: boolean;
};

export function ClusterDetail({ cluster, reactions = 18, onReact, onClose, modal = false }: ClusterDetailProps) {
  const { isEnglish } = useI18n();
  const content = (
    <section className={`cluster-detail ${modal ? 'cluster-detail--modal' : ''}`} aria-label={isEnglish ? `Questions about ${cluster.cloudLabel}` : `${cluster.cloudLabel}에 관한 질문 목록`}>
      <div className="cluster-detail__head">
        <div>
          {modal ? <DialogTitle>{isEnglish ? `Questions about ${cluster.cloudLabel}` : `${cluster.cloudLabel}에 관한 질문 목록`}</DialogTitle> : <h2>{isEnglish ? `Questions about ${cluster.cloudLabel}` : `${cluster.cloudLabel}에 관한 질문 목록`}</h2>}
        </div>
        {onClose && <button className="icon-button" onClick={onClose} type="button" aria-label="상세 닫기"><X size={19} /></button>}
      </div>
      <div className="cluster-detail__meta">
        <span><UsersRound size={14} /> {isEnglish ? `Students who raised this: ${cluster.studentCount}` : `이 주제를 남긴 학생: ${cluster.studentCount}명`}</span>
        <span>{isEnglish ? `Related questions: ${cluster.questionCount}` : `관련 질문: ${cluster.questionCount}개`}</span>
      </div>
      <div className="cluster-detail__questions">
        {cluster.rawQuestions.map((question, index) => <p key={question}><span>{String(index + 1).padStart(2, '0')}</span>{question}</p>)}
      </div>
      <div className="cluster-detail__note"><Sparkles size={15} /><span>{isEnglish ? 'Original questions stay intact. AI is only used to group similar confusion.' : '질문 원문은 그대로 보존하고, AI는 유사한 헷갈림을 묶는 데만 사용됩니다.'}</span></div>
      {onReact && <button className="button button--primary cluster-detail__react" onClick={onReact} type="button"><Heart size={16} /> {isEnglish ? 'I’m curious too' : '나도 궁금해요'} <b>{reactions}</b></button>}
    </section>
  );

  if (!modal) return content;
  return (
    <Dialog open onOpenChange={(open) => !open && onClose?.()}>
      <DialogContent className="cluster-modal" showCloseButton={false}>
        {content}
      </DialogContent>
    </Dialog>
  );
}
