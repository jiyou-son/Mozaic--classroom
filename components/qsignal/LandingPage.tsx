import {
  ArrowRight,
  BarChart3,
  Check,
  CircleHelp,
  Cloud,
  MessageCircleMore,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import { AppShell } from './AppShell';
import { classSession } from './mockData';

const featureItems = [
  { icon: MessageCircleMore, title: '익명 키워드 제출', description: '한 단어의 막힘도 수업 안으로' },
  { icon: Cloud, title: '실시간 질문 클라우드', description: '흩어진 질문을 한눈에' },
  { icon: UsersRound, title: '나도 궁금해요', description: '말하지 못한 공감을 신호로' },
  { icon: BarChart3, title: '교수자용 혼란도 지도', description: '지금 다뤄야 할 주제를 발견' },
  { icon: Sparkles, title: '수업 후 리포트', description: '다음 설명을 위한 맥락까지' },
];

const signalWords = [
  { label: '라그랑지안', count: 31, className: 'signal-bubble--primary' },
  { label: '일반화좌표', count: 24, className: 'signal-bubble--blue' },
  { label: '구속조건', count: 18, className: 'signal-bubble--mint' },
  { label: '부호 변화', count: 12, className: 'signal-bubble--sand' },
  { label: '에너지보존', count: 10, className: 'signal-bubble--small' },
];

export function LandingPage() {
  return (
    <AppShell active="home">
      <main>
        <section className="landing-hero">
          <div className="landing-hero__glow landing-hero__glow--one" />
          <div className="landing-hero__glow landing-hero__glow--two" />
          <div className="landing-hero__inner">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow__dot" /> LIVE CLASSROOM SIGNAL</div>
              <h1>LLM에게 흩어지는 질문을<br /><em>다시 수업 안으로</em></h1>
              <p>
                QSignal은 학생들의 날것의 헷갈림을 실시간 질문 시그널로 바꾸어<br className="desktop-only" />
                교수자가 수업 중 바로 파악할 수 있도록 돕습니다.
              </p>
              <div className="hero-actions">
                <a className="button button--primary" href="/join">
                  학생으로 참여하기 <ArrowRight size={17} />
                </a>
                <a className="button button--ghost" href="/teacher">
                  교수자 대시보드 보기
                </a>
              </div>
              <div className="hero-trust">
                <span className="hero-trust__avatars" aria-hidden="true">
                  <i>J</i><i>H</i><i>M</i><i>Y</i>
                </span>
                <span><strong>87명</strong>이 지금 이 수업에 함께하고 있어요</span>
              </div>
            </div>

            <div className="signal-preview" aria-label={`${classSession.name}의 실시간 질문 시그널 미리보기`}>
              <div className="signal-preview__chrome">
                <span className="status-dot" />
                <span>LIVE SIGNAL</span>
                <span className="signal-preview__room">{classSession.university}</span>
              </div>
              <div className="signal-preview__head">
                <div>
                  <span className="micro-label">{classSession.name} · {classSession.instructor}</span>
                  <h2>지금 수업에서<br />어디가 헷갈리나요?</h2>
                </div>
                <div className="signal-preview__count"><strong>132</strong><span>개의 신호</span></div>
              </div>
              <div className="signal-board">
                <span className="signal-board__line signal-board__line--a" />
                <span className="signal-board__line signal-board__line--b" />
                {signalWords.map((word) => (
                  <div className={`signal-bubble ${word.className}`} key={word.label}>
                    <strong>{word.label}</strong><small>{word.count}</small>
                  </div>
                ))}
                <div className="signal-board__note"><Sparkles size={13} /> AI가 유사 질문을 묶었어요</div>
              </div>
              <div className="signal-preview__bottom">
                <div><span>가장 빠르게 증가한 주제</span><strong>라그랑지안 접근 <b>↑ 42%</b></strong></div>
                <CircleHelp size={19} />
              </div>
            </div>
          </div>
        </section>

        <section className="intro-band">
          <p>질문을 더 잘 쓰게 만드는 서비스가 아닙니다.</p>
          <h2>말하지 못한 <em>‘막힘’</em>까지, 함께 보이게 합니다.</h2>
          <span>AI는 질문을 고쳐 쓰지 않고, 비슷한 헷갈림을 묶어 수업의 흐름으로 되돌려요.</span>
        </section>

        <section className="demo-section">
          <div className="demo-section__heading">
            <div><span className="section-kicker">TODAY&apos;S DEMO CLASS</span><h2>수업의 빈틈을,<br />실시간으로 채워보세요.</h2></div>
            <a className="text-link" href="/screens">전체 화면 살펴보기 <ArrowRight size={16} /></a>
          </div>
          <div className="demo-class-card">
            <div className="demo-class-card__main">
              <div className="course-chip"><span>09</span><small>SEP<br />2026</small></div>
              <div><span className="micro-label">DEMO SESSION</span><h3>{classSession.name}</h3><p>{classSession.instructor} <span>· {classSession.date}</span></p></div>
            </div>
            <div className="demo-class-card__stats">
              <span>입장 코드 <strong>{classSession.accessCode}</strong></span>
              <span>진행 중 <i className="status-dot" /></span>
            </div>
            <a className="demo-class-card__enter" href="/join">학생 화면으로 입장 <ArrowRight size={18} /></a>
          </div>
        </section>

        <section className="features-section">
          <div className="features-section__title"><span className="section-kicker">HOW QSIGNAL WORKS</span><h2>작은 질문이<br />수업의 다음 장면을 만듭니다.</h2></div>
          <div className="feature-grid">
            {featureItems.map((feature, index) => {
              const Icon = feature.icon;
              return <article className="feature-card" key={feature.title}>
                <span className="feature-card__number">0{index + 1}</span>
                <span className="feature-card__icon"><Icon size={20} /></span>
                <h3>{feature.title}</h3><p>{feature.description}</p>
              </article>;
            })}
          </div>
        </section>

        <section className="landing-cta">
          <div><span className="section-kicker">BETTER TOGETHER</span><h2>질문이 사라지지 않는<br />강의실을 시작하세요.</h2></div>
          <a className="button button--light" href="/teacher">대시보드 미리보기 <ArrowRight size={17} /></a>
          <span className="landing-cta__ornament" aria-hidden="true"><Check size={50} /></span>
        </section>
      </main>
      <footer className="site-footer"><span>QSignal · classroom communication for the LLM era</span><span>AI는 교수자와 학생 사이의 대화를 대신하지 않습니다.</span></footer>
    </AppShell>
  );
}
