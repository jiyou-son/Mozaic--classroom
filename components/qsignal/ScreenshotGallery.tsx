import { ArrowUpRight, Cloud, FileText, MessageSquareText, Sparkles, UserRound } from 'lucide-react';
import { AppShell } from './AppShell';

const galleryItems = [
  { title: '학생 입력 화면', subtitle: 'ANONYMOUS SUBMISSION', href: '/student', type: 'input', icon: UserRound },
  { title: '실시간 질문 클라우드', subtitle: 'LIVE QUESTION CLOUD', href: '/student', type: 'cloud', icon: Cloud },
  { title: '교수자 대시보드', subtitle: 'INSTRUCTOR VIEW', href: '/teacher', type: 'dashboard', icon: MessageSquareText },
  { title: '질문 클러스터 상세', subtitle: 'RAW QUESTION CLUSTER', href: '/student?cluster=lagrangian', type: 'detail', icon: Sparkles },
  { title: '수업 후 리포트', subtitle: 'AFTER-CLASS REPORT', href: '/report', type: 'report', icon: FileText },
];

function MiniScreen({ type }: { type: string }) {
  if (type === 'input') return <div className="mini-screen mini-screen--input"><div className="mini-phone"><div className="mini-phone__top"><b>QSignal</b><i /></div><small>공학수학 2 · 익명 참여 중</small><h4>지금 어디서<br />막혔나요?</h4><div className="mini-tabs"><b>키워드</b><span>한 줄 질문</span></div><div className="mini-input">예: 라그랑지안, 일반화좌표</div><div className="mini-submit">익명으로 올리기</div></div></div>;
  if (type === 'cloud') return <div className="mini-screen mini-screen--cloud"><div className="mini-screen__chrome"><b>QSignal</b><span>LIVE</span></div><h4>현재 많이 올라온 헷갈림</h4><div className="mini-cloud"><i className="mini-cloud__a">라그랑지안 <small>31</small></i><i className="mini-cloud__b">일반화좌표 <small>24</small></i><i className="mini-cloud__c">구속조건 <small>18</small></i><i className="mini-cloud__d">부호 변화</i></div><p><Sparkles size={11} /> AI가 유사 질문을 묶었어요</p></div>;
  if (type === 'dashboard') return <div className="mini-screen mini-screen--dashboard"><div className="mini-screen__chrome"><b>QSignal Instructor</b><span>LIVE</span></div><div className="mini-stats"><i><small>참여 학생</small><b>87</b></i><i><small>질문 신호</small><b>132</b></i><i><small>공감 반응</small><b>246</b></i></div><div className="mini-dashboard__body"><div className="mini-map"><span>라그랑지안</span><i>일반화좌표</i><b>구속조건</b></div><div className="mini-ranks"><p>1 <b>라그랑지안 접근</b><span>31</span></p><p>2 <b>일반화좌표</b><span>24</span></p><p>3 <b>구속조건</b><span>18</span></p></div></div></div>;
  if (type === 'detail') return <div className="mini-screen mini-screen--detail"><div className="mini-detail__bar"><span>QUESTION CLUSTER</span><b>×</b></div><h4>라그랑지안 관련 헷갈림</h4><p className="mini-detail__meta">이 주제를 남긴 학생: 18명 · 관련 질문: 6개</p><div className="mini-raw"><p>01 <b>왜 갑자기 라그랑지안?</b></p><p>02 <b>뉴턴으로 풀면 안 됨?</b></p><p>03 <b>L=T-V가 왜 나오는지 모르겠음</b></p></div><div className="mini-ai"><Sparkles size={12} /> AI는 유사한 헷갈림만 묶어요</div></div>;
  return <div className="mini-screen mini-screen--report"><div className="mini-report__hero"><span>GENERATED AFTER CLASS</span><h4>수업 후 질문 리포트</h4><p>공학수학 2 · 2026.09.09</p></div><div className="mini-report__body"><p><b>오늘 가장 많이 헷갈린 개념 TOP 5</b></p><ol><li>라그랑지안 접근 <i>31</i></li><li>일반화좌표 <i>24</i></li><li>구속조건 <i>18</i></li></ol><div>다음 수업 제안 <b>뉴턴과 라그랑지안 비교</b></div></div></div>;
}

export function ScreenshotGallery() {
  return (
    <AppShell active="screens">
      <main className="gallery-page">
        <section className="gallery-page__head"><div><span className="section-kicker">PRESENTATION READY</span><h1>QSignal <em>화면 갤러리</em></h1><p>공모전 제출 자료에 바로 쓸 수 있도록, 핵심 경험을 한 장면씩 담았습니다.</p></div><div className="gallery-page__badge"><Sparkles size={17} /><span>5개의<br /><strong>핵심 장면</strong></span></div></section>
        <section className="gallery-grid">{galleryItems.map((item, index) => { const Icon = item.icon; return <a className={`gallery-card gallery-card--${item.type}`} href={item.href} key={item.title}><div className="gallery-card__meta"><span>{String(index + 1).padStart(2, '0')} · {item.subtitle}</span><Icon size={17} /></div><h2>{item.title}</h2><MiniScreen type={item.type} /><div className="gallery-card__open">실제 화면 보기 <ArrowUpRight size={15} /></div></a>; })}</section>
        <section className="gallery-note"><Sparkles size={17} /><p><strong>QSignal의 AI는 대화를 대체하지 않습니다.</strong> 학생의 원문 질문을 그대로 보존하며, 수업 안에서 함께 볼 수 있는 신호로만 연결합니다.</p></section>
      </main>
    </AppShell>
  );
}
