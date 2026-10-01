'use client';

import { BookOpenCheck, CheckCircle2, FileText, Lightbulb, MessageCircleQuestion, Sparkles, TrendingUp } from 'lucide-react';
import { AppShell } from './AppShell';
import { classSession, classSessionEn, clusters, clustersEn, reportRankings, reportRankingsEn } from './mockData';
import { useI18n } from './i18n';

const repeatedTypesKo = [
  { number: '01', text: '“왜 이 방법을 쓰는가?”에 대한 질문', note: '접근법을 선택하는 이유' },
  { number: '02', text: '수식 전개 중 생략된 단계에 대한 질문', note: '계산 과정의 연결' },
  { number: '03', text: '물리적 의미와 계산 절차의 연결에 대한 질문', note: '개념과 공식의 연결' },
];

export function ReportPage() {
  const { isEnglish } = useI18n();
  const session = isEnglish ? classSessionEn : classSession;
  const reportClusters = isEnglish ? clustersEn : clusters;
  const rankings = isEnglish ? reportRankingsEn : reportRankings;
  const repeatedTypes = isEnglish ? [
    { number: '01', text: 'Questions about why this method is used', note: 'Choosing an approach' },
    { number: '02', text: 'Questions about skipped derivation steps', note: 'Connecting the calculation' },
    { number: '03', text: 'Questions connecting physical meaning and procedure', note: 'Connecting concepts and formulas' },
  ] : repeatedTypesKo;
  return (
    <AppShell active="report">
      <main className="report-page">
        <section className="report-hero">
          <div className="report-hero__inner"><div><h1>{isEnglish ? 'Post-class question report' : '수업 후 질문 리포트'}</h1><p>{session.name} · {session.instructor} · {session.date}</p></div><div className="report-hero__stamp"><FileText size={23} /></div></div>
        </section>

        <section className="report-summary" aria-label={isEnglish ? 'Class summary' : '수업 요약'}><article><span>{isEnglish ? 'Participating students' : '참여 학생'}</span><strong>{session.participants}{isEnglish ? '' : '명'}</strong><small>{isEnglish ? 'Anonymous participation' : '수업 중 익명 참여'}</small></article><article><span>{isEnglish ? 'Question signals collected' : '수집된 질문 신호'}</span><strong>{session.submissions}{isEnglish ? '' : '개'}</strong><small>{isEnglish ? 'Original student questions' : '학생이 남긴 원문 질문'}</small></article><article className="report-summary__note"><Sparkles size={18} /><p>{isEnglish ? <>AI keeps the original wording<br /><strong>and surfaces repeated stuck points.</strong></> : <>AI는 원문을 바꾸지 않고,<br /><strong>반복된 막힘을 발견했어요.</strong></>}</p></article></section>

        <section className="report-layout">
          <article className="report-card report-ranking"><div className="report-card__head"><div><h2>{isEnglish ? <>Most resonated concepts <em>TOP 5</em></> : <>오늘 가장 많이 헷갈린 개념 <em>TOP 5</em></>}</h2></div><TrendingUp size={22} /></div><ol>{rankings.map((name, index) => { const cluster = reportClusters[index]; return <li key={name}><span className="report-ranking__rank">{String(index + 1).padStart(2, '0')}</span><span className="report-ranking__topic"><strong>{name}</strong><small>{index === 0 ? (isEnglish ? 'Rising during class' : '수업 중 급상승') : (isEnglish ? 'Mentioned repeatedly' : '반복적으로 언급됨')}</small></span><b>{cluster.count}{isEnglish ? '' : '건'}</b><i style={{ width: `${Math.max(18, cluster.count * 2.15)}%` }} /></li>; })}</ol></article>

          <article className="report-card report-patterns"><div className="report-card__head"><div><h2>{isEnglish ? <>Recurring<br />question patterns</> : <>반복적으로 등장한<br />질문 유형</>}</h2></div><MessageCircleQuestion size={21} /></div><div className="report-patterns__list">{repeatedTypes.map((item) => <div key={item.number}><b>{item.number}</b><p>{item.text}<small>{item.note}</small></p></div>)}</div></article>

          <article className="report-card report-leftover"><div className="report-card__head"><div><h2>{isEnglish ? 'Questions needing more explanation' : '추가 설명이 필요한 질문'}</h2></div><span className="report-leftover__count">8{isEnglish ? '' : '개'}</span></div><div className="report-leftover__items">{(isEnglish ? ['I can’t connect generalized coordinates to the Lagrangian.', 'Why does a constraint reduce the number of coordinates?', 'If there is friction, can we still use energy conservation?'] : ['“일반화좌표랑 라그랑지안 연결이 안 됨”', '“제약식이 있으면 좌표 수가 왜 줄어드나요?”', '“마찰이 있으면 에너지 보존은 바로 못 쓰는 거죠?”']).map((question, index) => <p key={question}><span>0{index + 1}</span> {question}</p>)}</div><div className="report-leftover__footer"><span><i className="status-dot" /> {isEnglish ? 'Recommended for the next class' : '다음 수업에서 우선 보완 추천'}</span></div></article>

          <article className="report-next"><div><h2>{isEnglish ? <>For the next class,<br /><em>consider revisiting</em></> : <>다음 수업에서<br /><em>보완하면 좋은 내용</em></>}</h2><p>{isEnglish ? 'Before the calculation, build a bridge that helps students understand why this method is being used.' : '계산보다 먼저, 학생들이 ‘왜 이 방법을 쓰는지’를 납득할 수 있는 연결을 만들어 주세요.'}</p></div><ol><li><span>01</span><p>{isEnglish ? <>Compare Newtonian and Lagrangian methods in a <strong>five-minute recap</strong></> : <>뉴턴 방식과 라그랑지안 방식의 비교를 <strong>5분 정도 다시 설명</strong></>}</p></li><li><span>02</span><p>{isEnglish ? <>Explain how to choose generalized coordinates <strong>with an example</strong></> : <>일반화좌표를 선택하는 기준을 <strong>예제와 함께 설명</strong></>}</p></li><li><span>03</span><p>{isEnglish ? <>Show how to build <strong>L = T − V</strong>, one line at a time</> : <><strong>L=T-V를 세우는 과정</strong>을 한 줄씩 보여주기</>}</p></li></ol><span className="report-next__mark"><Lightbulb size={46} /></span></article>

          <article className="report-card review-guide"><div className="report-card__head"><div><h2>{isEnglish ? 'Student review guide' : '학생용 복습 추천'}</h2></div><BookOpenCheck size={22} /></div><div className="review-guide__grid"><div><span>{isEnglish ? 'Key review topics' : '오늘의 핵심 복습 키워드'}</span><p>{(isEnglish ? ['Degrees of freedom', 'Generalized coordinates', 'Lagrangian', 'Constraints'] : ['자유도', '일반화좌표', '라그랑지안', '구속조건']).map((item) => <b key={item}>{item}</b>)}</p></div><div><span>{isEnglish ? 'Helpful material to revisit' : '다시 보면 좋은 자료'}</span><p>{isEnglish ? <>Lecture slides <strong>12–16</strong></> : <>강의자료 <strong>12~16쪽</strong></>}</p></div><div><span>{isEnglish ? 'Before the next class' : '다음 수업 전 확인할 개념'}</span><p>{isEnglish ? 'Coordinate choice and energy expressions' : '좌표 선택과 에너지 표현'}</p></div></div><div className="review-guide__tip"><CheckCircle2 size={16} /> {isEnglish ? 'This guide is based on anonymous question signals collected today.' : '이 가이드는 오늘 수집된 익명 질문 신호를 바탕으로 정리했어요.'}</div></article>
        </section>
      </main>
    </AppShell>
  );
}
