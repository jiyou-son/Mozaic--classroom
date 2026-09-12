import { ArrowUpRight, Cloud, FileText, KeyRound, Laptop, QrCode, Sparkles, UserRound } from 'lucide-react';
import { AppShell } from './AppShell';

const galleryItems = [
  { title: '학생 입력 화면', href: '/join', type: 'input', icon: UserRound },
  { title: '어디서나 수업 입장', href: '/join', type: 'access', icon: Laptop },
  { title: '실시간 질문 클라우드', href: '/join', type: 'cloud', icon: Cloud },
  { title: '질문 클러스터 상세', href: '/join?next=%2Fstudent%3Fcluster%3Dlagrangian', type: 'detail', icon: Sparkles },
  { title: '수업 후 리포트', href: '/report', type: 'report', icon: FileText },
];

function MiniScreen({ type }: { type: string }) {
  if (type === 'input') return <div className="mini-screen mini-screen--input"><div className="mini-phone"><div className="mini-phone__top"><b>모자이크</b><i /></div><small>서울대학교 · 자료구조의 기초</small><h4>지금 어디서<br />막혔나요?</h4><div className="mini-input">예: 왜 이 방법을 쓰나요?</div><div className="mini-submit">질문 남기기</div></div></div>;
  if (type === 'access') return <div className="mini-screen mini-screen--access"><div className="mini-screen__chrome"><b>모자이크</b><span>입장</span></div><div className="mini-access"><div className="mini-access__phone"><QrCode size={25} /><small>휴대폰<br />QR 입장</small></div><div className="mini-access__arrow">→</div><div className="mini-access__code"><KeyRound size={20} /><small>입장 코드</small><b>DS-2401</b></div></div><p><Laptop size={11} /> 노트북 · 태블릿도 같은 화면으로 참여</p></div>;
  if (type === 'cloud') return <div className="mini-screen mini-screen--cloud"><div className="mini-screen__chrome"><b>모자이크</b><span>진행 중</span></div><h4>또 무엇이 궁금한가요?</h4><div className="mini-cloud"><i className="mini-cloud__a">라그랑지안 <small>31</small></i><i className="mini-cloud__b">일반화좌표 <small>24</small></i><i className="mini-cloud__c">구속조건 <small>18</small></i><i className="mini-cloud__d">부호 변화</i></div><p><Sparkles size={11} /> AI가 유사 질문을 묶었어요</p></div>;
  if (type === 'detail') return <div className="mini-screen mini-screen--detail"><div className="mini-detail__bar"><b>×</b></div><h4>라그랑지안 관련 헷갈림</h4><p className="mini-detail__meta">이 주제를 남긴 학생: 18명 · 관련 질문: 6개</p><div className="mini-raw"><p>01 <b>왜 갑자기 라그랑지안?</b></p><p>02 <b>뉴턴으로 풀면 안 됨?</b></p><p>03 <b>L=T-V가 왜 나오는지 모르겠음</b></p></div><div className="mini-ai"><Sparkles size={12} /> AI는 유사한 헷갈림만 묶어요</div></div>;
  return <div className="mini-screen mini-screen--report"><div className="mini-report__hero"><h4>수업 후 질문 리포트</h4><p>자료구조의 기초 · 한보형 교수</p></div><div className="mini-report__body"><p><b>오늘 가장 많이 헷갈린 개념 TOP 5</b></p><ol><li>라그랑지안 접근 <i>31</i></li><li>일반화좌표 <i>24</i></li><li>구속조건 <i>18</i></li></ol><div>다음 수업 제안 <b>뉴턴과 라그랑지안 비교</b></div></div></div>;
}

export function ScreenshotGallery() {
  return (
    <AppShell active="screens">
      <main className="gallery-page">
        <section className="gallery-page__head"><div><h1>모자이크 <em>화면 갤러리</em></h1><p>공모전 제출 자료에 바로 쓸 수 있도록, 핵심 경험을 한 장면씩 담았습니다.</p></div><div className="gallery-page__badge"><Sparkles size={17} /><span>5개의<br /><strong>핵심 장면</strong></span></div></section>
        <section className="gallery-grid">{galleryItems.map((item) => { const Icon = item.icon; return <a className={`gallery-card gallery-card--${item.type}`} href={item.href} key={item.title}><div aria-hidden="true" className="gallery-card__meta"><Icon size={17} /></div><h2>{item.title}</h2><MiniScreen type={item.type} /><div className="gallery-card__open">실제 화면 보기 <ArrowUpRight size={15} /></div></a>; })}</section>
        <section className="gallery-note"><Sparkles size={17} /><p><strong>모자이크의 AI는 대화를 대체하지 않습니다.</strong> 학생의 원문 질문을 그대로 보존하며, 수업 안에서 함께 볼 수 있는 신호로만 연결합니다.</p></section>
      </main>
    </AppShell>
  );
}
