import { BookOpenCheck, CheckCircle2, FileText, Lightbulb, MessageCircleQuestion, Sparkles, TrendingUp } from 'lucide-react';
import { AppShell } from './AppShell';
import { classSession, clusters, reportRankings } from './mockData';

const repeatedTypes = [
  { number: '01', text: '“왜 이 방법을 쓰는가?”에 대한 질문', note: '접근법을 선택하는 이유' },
  { number: '02', text: '수식 전개 중 생략된 단계에 대한 질문', note: '계산 과정의 연결' },
  { number: '03', text: '물리적 의미와 계산 절차의 연결에 대한 질문', note: '개념과 공식의 연결' },
];

export function ReportPage() {
  return (
    <AppShell active="report">
      <main className="report-page">
        <section className="report-hero">
          <div className="report-hero__inner"><div><h1>수업 후 질문 리포트</h1><p>{classSession.name} · {classSession.instructor} · {classSession.date}</p></div><div className="report-hero__stamp"><FileText size={23} /></div></div>
        </section>

        <section className="report-summary" aria-label="수업 요약"><article><span>참여 학생</span><strong>{classSession.participants}명</strong><small>수업 중 익명 참여</small></article><article><span>수집된 질문 신호</span><strong>{classSession.submissions}개</strong><small>학생이 남긴 원문 질문</small></article><article><span>설명 후 이해됐어요</span><strong>64%</strong><small>학생 피드백 기준</small></article><article className="report-summary__note"><Sparkles size={18} /><p>AI는 원문을 바꾸지 않고,<br /><strong>반복된 막힘을 발견했어요.</strong></p></article></section>

        <section className="report-layout">
          <article className="report-card report-ranking"><div className="report-card__head"><div><h2>오늘 가장 많이 헷갈린 개념 <em>TOP 5</em></h2></div><TrendingUp size={22} /></div><ol>{reportRankings.map((name, index) => { const cluster = clusters[index]; return <li key={name}><span className="report-ranking__rank">{String(index + 1).padStart(2, '0')}</span><span className="report-ranking__topic"><strong>{name}</strong><small>{index === 0 ? '수업 중 급상승' : '반복적으로 언급됨'}</small></span><b>{cluster.count}건</b><i style={{ width: `${Math.max(18, cluster.count * 2.15)}%` }} /></li>; })}</ol></article>

          <article className="report-card report-patterns"><div className="report-card__head"><div><h2>반복적으로 등장한<br />질문 유형</h2></div><MessageCircleQuestion size={21} /></div><div className="report-patterns__list">{repeatedTypes.map((item) => <div key={item.number}><b>{item.number}</b><p>{item.text}<small>{item.note}</small></p></div>)}</div></article>

          <article className="report-card report-leftover"><div className="report-card__head"><div><h2>설명 후에도 남은 질문</h2></div><span className="report-leftover__count">8개</span></div><div className="report-leftover__items"><p><span>01</span> “일반화좌표랑 라그랑지안 연결이 안 됨”</p><p><span>02</span> “제약식이 있으면 좌표 수가 왜 줄어드나요?”</p><p><span>03</span> “마찰이 있으면 에너지 보존은 바로 못 쓰는 거죠?”</p></div><div className="report-leftover__footer"><span><i className="status-dot" /> 다음 수업에서 우선 보완 추천</span></div></article>

          <article className="report-next"><div><h2>다음 수업에서<br /><em>보완하면 좋은 내용</em></h2><p>계산보다 먼저, 학생들이 ‘왜 이 방법을 쓰는지’를 납득할 수 있는 연결을 만들어 주세요.</p></div><ol><li><span>01</span><p>뉴턴 방식과 라그랑지안 방식의 비교를 <strong>5분 정도 다시 설명</strong></p></li><li><span>02</span><p>일반화좌표를 선택하는 기준을 <strong>예제와 함께 설명</strong></p></li><li><span>03</span><p><strong>L=T-V를 세우는 과정</strong>을 한 줄씩 보여주기</p></li></ol><span className="report-next__mark"><Lightbulb size={46} /></span></article>

          <article className="report-card review-guide"><div className="report-card__head"><div><h2>학생용 복습 추천</h2></div><BookOpenCheck size={22} /></div><div className="review-guide__grid"><div><span>오늘의 핵심 복습 키워드</span><p><b>자유도</b><b>일반화좌표</b><b>라그랑지안</b><b>구속조건</b></p></div><div><span>다시 보면 좋은 자료</span><p>강의자료 <strong>12~16쪽</strong></p></div><div><span>다음 수업 전 확인할 개념</span><p>좌표 선택과 에너지 표현</p></div></div><div className="review-guide__tip"><CheckCircle2 size={16} /> 이 가이드는 오늘 수집된 익명 질문 신호를 바탕으로 정리했어요.</div></article>
        </section>
      </main>
    </AppShell>
  );
}
