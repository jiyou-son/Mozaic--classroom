import { ArrowUpRight, Cloud, FileText, KeyRound, Laptop, QrCode, Sparkles, UserRound } from 'lucide-react';
import { AppShell } from './AppShell';
import { useI18n } from './i18n';

function MiniScreen({ type }: { type: string }) {
  const { isEnglish } = useI18n();
  if (type === 'input') return <div className="mini-screen mini-screen--input"><div className="mini-phone"><div className="mini-phone__top"><b>{isEnglish ? 'Mosaic' : '모자이크'}</b><i /></div><small>{isEnglish ? 'Seoul National University · Data Structures Fundamentals' : '서울대학교 · 자료구조의 기초'}</small><h4>{isEnglish ? <>Where are you<br />stuck?</> : <>지금 어디서<br />막혔나요?</>}</h4><div className="mini-input">{isEnglish ? 'e.g. Why use this method?' : '예: 왜 이 방법을 쓰나요?'}</div><div className="mini-submit">{isEnglish ? 'Submit question' : '질문 남기기'}</div></div></div>;
  if (type === 'access') return <div className="mini-screen mini-screen--access"><div className="mini-screen__chrome"><b>{isEnglish ? 'Mosaic' : '모자이크'}</b><span>{isEnglish ? 'Join' : '입장'}</span></div><div className="mini-access"><div className="mini-access__phone"><QrCode size={25} /><small>{isEnglish ? <>Phone<br />QR join</> : <>휴대폰<br />QR 입장</>}</small></div><div className="mini-access__arrow">→</div><div className="mini-access__code"><KeyRound size={20} /><small>{isEnglish ? 'Entry code' : '입장 코드'}</small><b>DS-2401</b></div></div><p><Laptop size={11} /> {isEnglish ? 'The same view works on laptops and tablets' : '노트북 · 태블릿도 같은 화면으로 참여'}</p></div>;
  if (type === 'cloud') return <div className="mini-screen mini-screen--cloud"><div className="mini-screen__chrome"><b>{isEnglish ? 'Mosaic' : '모자이크'}</b><span>{isEnglish ? 'Live' : '진행 중'}</span></div><h4>{isEnglish ? 'Question mosaic' : '질문 모자이크'}</h4><div className="mini-cloud"><i className="mini-cloud__a">{isEnglish ? 'Lagrangian' : '라그랑지안'} <small>31</small></i><i className="mini-cloud__b">{isEnglish ? 'Coordinates' : '일반화좌표'} <small>24</small></i><i className="mini-cloud__c">{isEnglish ? 'Constraints' : '구속조건'} <small>18</small></i><i className="mini-cloud__d">{isEnglish ? 'Sign changes' : '부호 변화'}</i></div><p><Sparkles size={11} /> {isEnglish ? 'AI grouped similar questions' : 'AI가 유사 질문을 묶었어요'}</p></div>;
  if (type === 'detail') return <div className="mini-screen mini-screen--detail"><div className="mini-detail__bar"><b>×</b></div><h4>{isEnglish ? 'Questions about the Lagrangian' : '라그랑지안에 관한 질문 목록'}</h4><p className="mini-detail__meta">{isEnglish ? 'Students: 18 · Related questions: 6' : '이 주제를 남긴 학생: 18명 · 관련 질문: 6개'}</p><div className="mini-raw"><p>01 <b>{isEnglish ? 'Why introduce the Lagrangian?' : '왜 갑자기 라그랑지안?'}</b></p><p>02 <b>{isEnglish ? 'Couldn’t we use Newton’s laws?' : '뉴턴으로 풀면 안 됨?'}</b></p><p>03 <b>{isEnglish ? 'Where does L = T − V come from?' : 'L=T-V가 왜 나오는지 모르겠음'}</b></p></div><div className="mini-ai"><Sparkles size={12} /> {isEnglish ? 'AI only groups similar confusion' : 'AI는 유사한 헷갈림만 묶어요'}</div></div>;
  return <div className="mini-screen mini-screen--report"><div className="mini-report__hero"><h4>{isEnglish ? 'Post-class question report' : '수업 후 질문 리포트'}</h4><p>{isEnglish ? 'Data Structures Fundamentals · Professor Bohyeong Han' : '자료구조의 기초 · 한보형 교수'}</p></div><div className="mini-report__body"><p><b>{isEnglish ? 'Most resonated concepts TOP 5' : '오늘 가장 많이 헷갈린 개념 TOP 5'}</b></p><ol><li>{isEnglish ? 'Lagrangian approach' : '라그랑지안 접근'} <i>31</i></li><li>{isEnglish ? 'Generalized coordinates' : '일반화좌표'} <i>24</i></li><li>{isEnglish ? 'Constraints' : '구속조건'} <i>18</i></li></ol><div>{isEnglish ? 'Next class suggestion' : '다음 수업 제안'} <b>{isEnglish ? 'Compare Newtonian and Lagrangian methods' : '뉴턴과 라그랑지안 비교'}</b></div></div></div>;
}

export function ScreenshotGallery() {
  const { isEnglish, locale, hrefForLocale } = useI18n();
  const galleryItems = isEnglish ? [
    { title: 'Student input view', href: '/join', type: 'input', icon: UserRound },
    { title: 'Join from any device', href: '/join', type: 'access', icon: Laptop },
    { title: 'Live question mosaic', href: '/join', type: 'cloud', icon: Cloud },
    { title: 'Question detail list', href: '/join?next=%2Fstudent%3Fcluster%3Dlagrangian', type: 'detail', icon: Sparkles },
    { title: 'Post-class report', href: '/report', type: 'report', icon: FileText },
  ] : [
    { title: '학생 입력 화면', href: '/join', type: 'input', icon: UserRound },
    { title: '어디서나 수업 입장', href: '/join', type: 'access', icon: Laptop },
    { title: '실시간 질문 클라우드', href: '/join', type: 'cloud', icon: Cloud },
    { title: '질문 클러스터 상세', href: '/join?next=%2Fstudent%3Fcluster%3Dlagrangian', type: 'detail', icon: Sparkles },
    { title: '수업 후 리포트', href: '/report', type: 'report', icon: FileText },
  ];
  return (
    <AppShell active="screens">
      <main className="gallery-page">
        <section className="gallery-page__head"><div><h1>{isEnglish ? <>Mosaic <em>screen gallery</em></> : <>모자이크 <em>화면 갤러리</em></>}</h1><p>{isEnglish ? 'A scene-by-scene view of the core experience, ready for a presentation.' : '공모전 제출 자료에 바로 쓸 수 있도록, 핵심 경험을 한 장면씩 담았습니다.'}</p></div><div className="gallery-page__badge"><Sparkles size={17} /><span>{isEnglish ? <>5<br /><strong>core scenes</strong></> : <>5개의<br /><strong>핵심 장면</strong></>}</span></div></section>
        <section className="gallery-grid">{galleryItems.map((item) => { const Icon = item.icon; return <a className={`gallery-card gallery-card--${item.type}`} href={hrefForLocale(locale, item.href)} key={item.title}><div aria-hidden="true" className="gallery-card__meta"><Icon size={17} /></div><h2>{item.title}</h2><MiniScreen type={item.type} /><div className="gallery-card__open">{isEnglish ? 'Open live view' : '실제 화면 보기'} <ArrowUpRight size={15} /></div></a>; })}</section>
        <section className="gallery-note"><Sparkles size={17} /><p><strong>{isEnglish ? 'Mosaic’s AI does not replace the conversation.' : '모자이크의 AI는 대화를 대체하지 않습니다.'}</strong> {isEnglish ? 'It preserves students’ original questions and connects them as signals the class can see together.' : '학생의 원문 질문을 그대로 보존하며, 수업 안에서 함께 볼 수 있는 신호로만 연결합니다.'}</p></section>
      </main>
    </AppShell>
  );
}
