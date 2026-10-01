'use client';

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
import { classSession, classSessionEn } from './mockData';
import { useI18n } from './i18n';

export function LandingPage() {
  const { isEnglish, locale, hrefForLocale } = useI18n();
  const session = isEnglish ? classSessionEn : classSession;
  const featureItems = isEnglish ? [
    { icon: MessageCircleMore, title: 'Anonymous questions', description: 'Bring even small questions into class' },
    { icon: Cloud, title: 'Live question mosaic', description: 'See scattered questions at a glance' },
    { icon: UsersRound, title: 'I’m curious too', description: 'Turn unspoken agreement into a signal' },
    { icon: BarChart3, title: 'Question flow map', description: 'Discover where questions converge' },
    { icon: Sparkles, title: 'Post-class report', description: 'Carry context into the next explanation' },
  ] : [
    { icon: MessageCircleMore, title: '익명 질문 제출', description: '짧은 질문도 수업 안으로' },
    { icon: Cloud, title: '실시간 질문 모자이크', description: '흩어진 질문을 한눈에' },
    { icon: UsersRound, title: '나도 궁금해요', description: '말하지 못한 공감을 신호로' },
    { icon: BarChart3, title: '질문 흐름 지도', description: '흩어진 질문의 흐름을 발견' },
    { icon: Sparkles, title: '수업 후 리포트', description: '다음 설명을 위한 맥락까지' },
  ];
  const signalWords = isEnglish ? [
    { label: 'Lagrangian', count: 31, className: 'signal-bubble--primary' },
    { label: 'Coordinates', count: 24, className: 'signal-bubble--blue' },
    { label: 'Constraints', count: 18, className: 'signal-bubble--mint' },
    { label: 'Sign changes', count: 12, className: 'signal-bubble--sand' },
    { label: 'Energy', count: 10, className: 'signal-bubble--small' },
  ] : [
    { label: '라그랑지안', count: 31, className: 'signal-bubble--primary' },
    { label: '일반화좌표', count: 24, className: 'signal-bubble--blue' },
    { label: '구속조건', count: 18, className: 'signal-bubble--mint' },
    { label: '부호 변화', count: 12, className: 'signal-bubble--sand' },
    { label: '에너지보존', count: 10, className: 'signal-bubble--small' },
  ];
  return (
    <AppShell active="home">
      <main>
        <section className="landing-hero">
          <div className="landing-hero__glow landing-hero__glow--one" />
          <div className="landing-hero__glow landing-hero__glow--two" />
          <div className="landing-hero__inner">
            <div className="hero-copy">
              <h1>{isEnglish ? <>Questions scattered across LLMs,<br /><em>back into the classroom</em></> : <>LLM에게 흩어지는 질문을<br /><em>다시 수업 안으로</em></>}</h1>
              <p>
                {isEnglish ? <>Mosaic turns students’ unfiltered confusion into a live learning signal<br className="desktop-only" /> that instructors can respond to while teaching.</> : <>모자이크는 학생들의 날것의 헷갈림을 실시간 질문 시그널로 바꾸어<br className="desktop-only" /> 교수자가 수업 중 바로 파악할 수 있도록 돕습니다.</>}
              </p>
              <div className="hero-actions">
                <a className="button button--primary" href={hrefForLocale(locale, '/join')}>
                  {isEnglish ? 'Join as a student' : '학생으로 참여하기'} <ArrowRight size={17} />
                </a>
              </div>
              <div className="hero-trust">
                <span className="hero-trust__avatars" aria-hidden="true">
                  <i>J</i><i>H</i><i>M</i><i>Y</i>
                </span>
                <span>{isEnglish ? <><strong>87 students</strong> are in this class right now</> : <><strong>87명</strong>이 지금 이 수업에 함께하고 있어요</>}</span>
              </div>
            </div>

            <div className="signal-preview" aria-label={isEnglish ? `Live question signal preview for ${session.name}` : `${session.name}의 온라인 질문 시그널 미리보기`}>
              <div className="signal-preview__chrome">
                <span className="status-dot" />
                <span>{isEnglish ? 'ONLINE' : '온라인'}</span>
                <span className="signal-preview__room">{session.university}</span>
              </div>
              <div className="signal-preview__head">
                <div>
                  <span className="micro-label">{session.name} · {session.instructor}</span>
                  <h2>{isEnglish ? <>Where are you<br />getting stuck?</> : <>지금 수업에서<br />어디가 헷갈리나요?</>}</h2>
                </div>
                <div className="signal-preview__count"><strong>132</strong><span>{isEnglish ? 'signals' : '개의 신호'}</span></div>
              </div>
              <div className="signal-board">
                <span className="signal-board__line signal-board__line--a" />
                <span className="signal-board__line signal-board__line--b" />
                {signalWords.map((word) => (
                  <div className={`signal-bubble ${word.className}`} key={word.label}>
                    <strong>{word.label}</strong><small>{word.count}</small>
                  </div>
                ))}
                <div className="signal-board__note"><Sparkles size={13} /> {isEnglish ? 'Questions come together as one mosaic' : '질문이 하나의 모자이크로 모여요'}</div>
              </div>
              <div className="signal-preview__bottom">
                <div><span>{isEnglish ? 'Fastest-rising topic' : '가장 빠르게 증가한 주제'}</span><strong>{isEnglish ? 'The Lagrangian approach' : '라그랑지안 접근'} <b>↑ 42%</b></strong></div>
                <CircleHelp size={19} />
              </div>
            </div>
          </div>
        </section>

        <section className="intro-band">
          <p>{isEnglish ? 'This is not a service that asks students to write better questions.' : '질문을 더 잘 쓰게 만드는 서비스가 아닙니다.'}</p>
          <h2>{isEnglish ? <>It makes even unspoken <em>stuck points</em> visible.</> : <>말하지 못한 <em>‘막힘’</em>까지, 함께 보이게 합니다.</>}</h2>
          <span>{isEnglish ? 'AI does not rewrite questions. It groups similar confusion and returns it to the flow of class.' : 'AI는 질문을 고쳐 쓰지 않고, 비슷한 헷갈림을 묶어 수업의 흐름으로 되돌려요.'}</span>
        </section>

        <section className="demo-section">
          <div className="demo-section__heading">
            <div><h2>{isEnglish ? <>Fill the gaps in a class,<br />in real time.</> : <>수업의 빈틈을,<br />실시간으로 채워보세요.</>}</h2></div>
            <a className="text-link" href={hrefForLocale(locale, '/screens')}>{isEnglish ? 'Explore the full experience' : '전체 화면 살펴보기'} <ArrowRight size={16} /></a>
          </div>
          <div className="demo-class-card">
            <div className="demo-class-card__main">
              <div className="course-chip"><span>09</span><small>SEP<br />2026</small></div>
              <div><h3>{session.name}</h3><p>{session.instructor} <span>· {session.date}</span></p></div>
            </div>
            <div className="demo-class-card__stats">
              <span>{isEnglish ? 'Entry code' : '입장 코드'} <strong>{session.accessCode}</strong></span>
              <span>{isEnglish ? 'Live' : '진행 중'} <i className="status-dot" /></span>
            </div>
            <a className="demo-class-card__enter" href={hrefForLocale(locale, '/join')}>{isEnglish ? 'Open student view' : '학생 화면으로 입장'} <ArrowRight size={18} /></a>
          </div>
        </section>

        <section className="features-section">
          <div className="features-section__title"><h2>{isEnglish ? <>Small questions<br />shape the next moment in class.</> : <>작은 질문이<br />수업의 다음 장면을 만듭니다.</>}</h2></div>
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
          <div><h2>{isEnglish ? <>Start a classroom<br />where questions don’t disappear.</> : <>질문이 사라지지 않는<br />강의실을 시작하세요.</>}</h2></div>
          <a className="button button--light" href={hrefForLocale(locale, '/join')}>{isEnglish ? 'Preview the student view' : '학생 화면 미리보기'} <ArrowRight size={17} /></a>
          <span className="landing-cta__ornament" aria-hidden="true"><Check size={50} /></span>
        </section>
      </main>
      <footer className="site-footer"><span>{isEnglish ? 'Mosaic · scattered questions, one shared class' : '모자이크 · 흩어진 질문이 하나의 수업으로'}</span><span>{isEnglish ? 'AI does not replace the conversation between students and instructors.' : 'AI는 교수자와 학생 사이의 대화를 대신하지 않습니다.'}</span></footer>
    </AppShell>
  );
}
