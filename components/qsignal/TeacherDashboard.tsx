'use client';

import { useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  BellRing,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  Clock3,
  MessageSquareText,
  Presentation,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import { AppShell } from './AppShell';
import { QuestionCard } from './QuestionCard';
import { StatCard } from './StatCard';
import { WordCloud } from './WordCloud';
import { classSession, clusters, type Cluster } from './mockData';

export function TeacherDashboard() {
  const [selected, setSelected] = useState<Cluster>(clusters[0]);
  const [isDiscussing, setIsDiscussing] = useState(false);

  return (
    <AppShell active="teacher">
      <main className="teacher-page">
        <section className="teacher-topbar">
          <div className="teacher-topbar__course"><span className="teacher-topbar__label">QSIGNAL INSTRUCTOR</span><h1>{classSession.name}</h1><p><i className="status-dot" /> Live Session: <strong>{classSession.sessionCode}</strong></p></div>
          <div className="teacher-topbar__tools"><span className="teacher-topbar__time"><Clock3 size={15} /> 10:32 AM · 수업 진행 중</span><button aria-label="알림" className="icon-button" type="button"><BellRing size={18} /></button><span className="teacher-avatar">KJ</span></div>
        </section>

        <section className="teacher-stats" aria-label="세션 현황">
          <StatCard detail="전체 수강생의 76%" icon={<UsersRound size={19} />} label="참여 학생" tone="mint" value={`${classSession.participants}명`} />
          <StatCard detail="최근 10분 +18" icon={<MessageSquareText size={19} />} label="제출된 질문 · 키워드" tone="blue" value={`${classSession.submissions}개`} />
          <StatCard detail="질문당 평균 1.9회" icon={<CircleGauge size={19} />} label="공감 반응" tone="peach" value={`${classSession.reactions}개`} />
          <article className="teacher-signal-status"><span><i className="status-dot" /> LIVE ANALYSIS</span><strong>학생의 원문을<br />바꾸지 않습니다.</strong><Sparkles size={18} /></article>
        </section>

        <section className="teacher-dashboard-grid">
          <article className="teacher-panel teacher-map-panel">
            <div className="teacher-panel__head"><div><span className="section-kicker">REAL-TIME CLUSTERING</span><h2>Live Stuck Map</h2><p>지금 수업에서 밀집되는 질문의 흐름이에요.</p></div><span className="teacher-panel__live"><i className="status-dot" /> LIVE</span></div>
            <WordCloud clusters={clusters} onSelect={(id) => { setSelected(clusters.find((cluster) => cluster.id === id) ?? clusters[0]); setIsDiscussing(false); }} selectedId={selected.id} />
            <div className="teacher-map-panel__legend"><span><i className="legend-dot legend-dot--teal" /> 이해 방식 · 접근</span><span><i className="legend-dot legend-dot--blue" /> 개념 · 좌표</span><span><i className="legend-dot legend-dot--peach" /> 수식 · 계산</span><p><Sparkles size={14} /> AI가 원문 속 유사한 막힘을 연결했어요</p></div>
          </article>

          <article className="teacher-panel confusion-panel">
            <div className="teacher-panel__head"><div><span className="section-kicker">PRIORITY QUEUE</span><h2>Confusion Ranking</h2></div><BarChart3 size={21} /></div>
            <ol className="ranking-list">
              {clusters.slice(0, 5).map((cluster, index) => <li className={selected.id === cluster.id ? 'is-selected' : ''} key={cluster.id}><button onClick={() => { setSelected(cluster); setIsDiscussing(false); }} type="button"><span className="ranking-list__index">{index + 1}</span><span className="ranking-list__label"><strong>{cluster.label}</strong><small>{cluster.trend ? <em>{cluster.trend}</em> : '누적 신호'}</small></span><b>{cluster.count}건</b><ChevronRight size={15} /></button></li>)}
            </ol>
            <div className="confusion-panel__footer"><span>가장 빠르게 증가한 주제</span><strong>라그랑지안 접근 <em>↑ 42%</em></strong></div>
          </article>

          <article className="teacher-panel selected-panel">
            <div className="selected-panel__head"><div><span className="section-kicker">SELECTED CLUSTER</span><h2>{selected.label}</h2><p><span className={`cluster-tone cluster-tone--${selected.tone}`} /> {selected.count}개의 신호 · 최근 8분 동안 <strong>+9</strong></p></div><span className="selected-panel__tag">학생 원문 <b>{selected.questionCount}</b></span></div>
            <div className="selected-panel__body">
              <div className="selected-panel__raw"><h3>관련 원문 질문</h3><div className="selected-panel__question-list">{selected.rawQuestions.slice(0, 3).map((question, index) => <QuestionCard accent={selected.tone === 'blue' ? 'blue' : 'teal'} compact count={Math.max(7, selected.count - index * 4)} key={question} text={question} />)}</div></div>
              <div className="selected-panel__insight"><div className="ai-summary"><span><Sparkles size={15} /> AI SUMMARY</span><p>{selected.summary}</p></div><div className="action-list"><h3>지금 해볼 설명</h3>{selected.actions.map((action, index) => <p key={action}><b>{String(index + 1).padStart(2, '0')}</b>{action}</p>)}</div><button className={`discuss-button ${isDiscussing ? 'is-active' : ''}`} onClick={() => setIsDiscussing(true)} type="button">{isDiscussing ? <><CheckCircle2 size={17} /> 학생 화면에 현재 다루는 질문으로 표시되었습니다.</> : <><Presentation size={17} /> 이 주제를 지금 다루기 <ArrowUpRight size={16} /></>}</button></div>
            </div>
          </article>

          <article className="teacher-panel feedback-panel">
            <div className="teacher-panel__head"><div><span className="section-kicker">AFTER EXPLANATION</span><h2>설명 후 이해도</h2></div><span className="feedback-panel__updated">방금 업데이트됨</span></div>
            <div className="feedback-panel__content"><div className="feedback-ring"><span><strong>64%</strong><small>이해됐어요</small></span></div><div className="feedback-breakdown"><p><span><i className="feedback-dot feedback-dot--understood" /> 이해됐어요</span><strong>64%</strong></p><p><span><i className="feedback-dot feedback-dot--unsure" /> 아직 헷갈려요</span><strong>36%</strong></p><p><span><i className="feedback-dot feedback-dot--question" /> 추가 질문</span><strong>8개</strong></p></div></div>
            <div className="feedback-panel__prompt">다음 설명 전에 <strong>일반화좌표를 한 번 더 연결</strong>해볼까요?</div>
          </article>
        </section>
      </main>
    </AppShell>
  );
}
