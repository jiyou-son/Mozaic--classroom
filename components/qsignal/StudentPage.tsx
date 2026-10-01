'use client';

import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, ChevronRight, CircleHelp, Laptop, Send, Smartphone, Sparkles, Tablet, Waves } from 'lucide-react';
import { AppShell } from './AppShell';
import { ClusterDetail } from './ClusterDetail';
import { MosaicMark } from './MosaicMark';
import { QuestionCard } from './QuestionCard';
import { WordCloud } from './WordCloud';
import { classSession, classSessionEn, clusters, clustersEn, popularQuestions, popularQuestionsEn, type Cluster } from './mockData';
import { hasJoinedSession, isValidEntryCode, markSessionJoined } from './sessionAccess';
import { useI18n } from './i18n';

type Question = (typeof popularQuestions)[number] & { reacted?: boolean };
type SubmittedSignal = { id: string; text: string };
type DevicePreview = 'phone' | 'tablet' | 'laptop';

const initialClusterReactions: Record<string, number> = {
  lagrangian: 26,
  coordinate: 17,
  constraint: 12,
  sign: 9,
  energy: 7,
  newton: 5,
  freedom: 6,
  ltv: 14,
};

const questionAccents = ['lime', 'lavender', 'blue', 'coral'] as const;

function findClusterForSignal(value: string, source: Cluster[]) {
  const normalized = value.replaceAll(' ', '').toLowerCase();
  return source.find((cluster) => normalized.includes(cluster.cloudLabel.replaceAll(' ', '').toLowerCase())) ?? source[0];
}

function getViewportDevice(): DevicePreview {
  if (window.innerWidth >= 1200) return 'laptop';
  if (window.innerWidth >= 768) return 'tablet';
  return 'phone';
}

export function StudentPage() {
  const { isEnglish, locale } = useI18n();
  const session = isEnglish ? classSessionEn : classSession;
  const baseClusters = isEnglish ? clustersEn : clusters;
  const baseQuestions = isEnglish ? popularQuestionsEn : popularQuestions;
  const [input, setInput] = useState('');
  const [questions, setQuestions] = useState<Question[]>(baseQuestions);
  const [cloudClusters, setCloudClusters] = useState<Cluster[]>(baseClusters);
  const [submitted, setSubmitted] = useState<SubmittedSignal[]>([]);
  const [toast, setToast] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);
  const [clusterReactions, setClusterReactions] = useState(initialClusterReactions);
  const [accessReady, setAccessReady] = useState(false);
  const [devicePreview, setDevicePreview] = useState<DevicePreview | null>(null);
  const [viewportDevice, setViewportDevice] = useState<DevicePreview>('phone');

  const placeholder = isEnglish ? 'e.g. Why use the Lagrangian instead of Newton’s method here?' : '예: 왜 여기서 뉴턴 방식 대신 라그랑지안을 쓰나요?';

  const activeQuestionCount = useMemo(() => questions.reduce((total, question) => total + question.count, 0), [questions]);
  const selectedCluster = selectedClusterId ? cloudClusters.find((cluster) => cluster.id === selectedClusterId) ?? null : null;
  const activeDevice = devicePreview ?? viewportDevice;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedDevice = params.get('device');
    if (requestedDevice === 'phone' || requestedDevice === 'tablet' || requestedDevice === 'laptop') setDevicePreview(requestedDevice);
    else setDevicePreview(null);
    const entryCode = params.get('code');
    if (entryCode && isValidEntryCode(entryCode)) {
      markSessionJoined();
      params.delete('code');
      const cleanPath = `${window.location.pathname}${params.size ? `?${params.toString()}` : ''}`;
      window.history.replaceState(null, '', cleanPath);
    }

    if (!hasJoinedSession()) {
      const requestedPath = `${window.location.pathname}${window.location.search}`;
      window.location.replace(`/join?next=${encodeURIComponent(requestedPath)}`);
      return;
    }

    const requestedCluster = params.get('cluster');
    if (requestedCluster && baseClusters.some((cluster) => cluster.id === requestedCluster)) setSelectedClusterId(requestedCluster);
    const syncViewportDevice = () => setViewportDevice(getViewportDevice());
    syncViewportDevice();
    window.addEventListener('resize', syncViewportDevice);
    setAccessReady(true);

    return () => window.removeEventListener('resize', syncViewportDevice);
  }, []);

  useEffect(() => {
    setInput('');
    setQuestions(baseQuestions);
    setCloudClusters(baseClusters);
    setSubmitted([]);
    setToast(false);
    setInputError(false);
    setSelectedClusterId(null);
  }, [locale]);

  function submitSignal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = input.trim();
    if (!value) {
      setInputError(true);
      return;
    }

    const target = findClusterForSignal(value, cloudClusters);
    setInputError(false);
    setCloudClusters((current) => current.map((cluster) => cluster.id === target.id ? { ...cluster, count: cluster.count + 1, studentCount: cluster.studentCount + 1 } : cluster));
    setQuestions((current) => [{ id: `new-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, text: value, count: 1, clusterId: target.id }, ...current]);
    setSubmitted((current) => [{ id: `signal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, text: value }, ...current].slice(0, 3));
    setInput('');
    setToast(true);
    window.setTimeout(() => setToast(false), 3400);
  }

  function toggleQuestionReaction(id: string) {
    setQuestions((current) => current.map((question) => {
      if (question.id !== id) return question;
      const reacted = !question.reacted;
      return { ...question, reacted, count: Math.max(0, question.count + (reacted ? 1 : -1)) };
    }));
  }

  function selectDevicePreview(nextDevice: DevicePreview) {
    setDevicePreview(nextDevice);
    const params = new URLSearchParams(window.location.search);
    params.set('device', nextDevice);
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}${window.location.hash}`);
  }

  if (!accessReady) {
    return (
      <AppShell active="student">
        <main aria-live="polite" className="student-access-loading"><p>{isEnglish ? 'Checking your class access…' : '수업 입장을 확인하고 있어요.'}</p></main>
      </AppShell>
    );
  }

  return (
    <AppShell active="student">
      <main className={`student-page${devicePreview ? ` student-page--preview-${devicePreview}` : ''}`}>
        <div aria-label={isEnglish ? 'Presentation device view' : '발표용 기기 화면 전환'} className="student-device-switcher" role="group">
          <span className="student-device-switcher__label">{isEnglish ? 'Device view' : '기기 화면'}</span>
          <button aria-pressed={activeDevice === 'phone'} className={activeDevice === 'phone' ? 'is-active' : ''} onClick={() => selectDevicePreview('phone')} type="button"><Smartphone size={15} /> {isEnglish ? 'Phone' : '휴대폰'}</button>
          <button aria-pressed={activeDevice === 'tablet'} className={activeDevice === 'tablet' ? 'is-active' : ''} onClick={() => selectDevicePreview('tablet')} type="button"><Tablet size={15} /> {isEnglish ? 'Tablet' : '태블릿'}</button>
          <button aria-pressed={activeDevice === 'laptop'} className={activeDevice === 'laptop' ? 'is-active' : ''} onClick={() => selectDevicePreview('laptop')} type="button"><Laptop size={15} /> {isEnglish ? 'Laptop' : '노트북'}</button>
        </div>
        <div className="student-page__intro">
          <h1>{isEnglish ? <>Leave your questions <em>as they are.</em></> : <>궁금한 걸, <em>그대로</em> 남겨요.</>}</h1>
          <p>{isEnglish ? <>You don’t have to organize your thoughts first. An anonymous question<br />helps your instructor see what the class needs next.</> : <>정리하지 않아도 괜찮아요. 익명으로 남긴 작은 막힘이<br />교수자에게 지금 필요한 설명을 알려줍니다.</>}</p>
          <div className="student-page__legend"><span><i className="status-dot" /> {isEnglish ? 'Anonymous participation' : '익명 참여 중'}</span><span><Sparkles size={13} /> {isEnglish ? 'AI only groups similar questions' : 'AI는 유사한 질문만 묶어요'}</span></div>
        </div>

        <section className="student-phone student-device" aria-label={isEnglish ? 'Mosaic student participation view' : '모자이크 학생 참여 화면'}>
          <div aria-hidden="true" className="student-phone__island"><span /></div>
          <div aria-hidden="true" className="student-device__windowbar"><span className="student-device__window-dots"><i /><i /><i /></span><span className="student-device__window-title">Mosaic · {session.name}</span><span className="student-device__window-state">{isEnglish ? 'Student view' : '학생 참여'}</span></div>
          <header className="student-phone__header">
            <div className="student-phone__brand-lockup">
              <span aria-hidden="true" className="student-phone__brand-mark"><MosaicMark /></span>
              <div><span className="student-phone__brand">{isEnglish ? 'Mosaic' : '모자이크'}</span><p>{session.university}</p></div>
            </div>
            <span className="student-live-pill"><i className="status-dot" /> {isEnglish ? 'Class live' : '수업 진행 중'}</span>
          </header>
          <div className="student-phone__course">
            <strong>{session.name}</strong>
            <small>{session.instructor}</small>
          </div>

          <div className="student-device-workspace">
            <div className="student-device-workspace__compose">
              <section className="student-submit">
                <div className="student-submit__heading"><span className="student-submit__icon"><CircleHelp size={19} /></span><div><h2>{isEnglish ? 'Where are you stuck?' : '지금 어디서 막혔나요?'}</h2><p>{isEnglish ? 'A short question is enough.' : '짧은 질문도 괜찮아요.'}</p></div></div>
                <form onSubmit={submitSignal}>
                  <label className="sr-only" htmlFor="student-signal">{isEnglish ? 'Your question' : '질문 입력'}</label>
                  <textarea aria-invalid={inputError} id="student-signal" onChange={(event) => { setInput(event.target.value); setInputError(false); }} placeholder={placeholder} value={input} rows={3} />
                  {inputError && <p className="student-input-error" role="alert">{isEnglish ? 'Please write a question first.' : '질문을 먼저 적어주세요.'}</p>}
                  <button className="student-submit__button" type="submit">{isEnglish ? 'Submit question' : '질문 남기기'} <Send size={15} /></button>
                </form>
              </section>

              {toast && <output aria-live="polite" className="student-toast"><CheckCircle2 size={17} /> {isEnglish ? 'Posted. Other students are wondering about something similar.' : '올라갔어요. 비슷한 헷갈림을 남긴 학생이 있어요.'}</output>}

              {submitted.length > 0 && <section className="new-signals"><div><span>{isEnglish ? 'Just posted' : '방금 올라온 신호'}</span><small>{isEnglish ? `${activeQuestionCount} total reactions` : `전체 질문 공감 ${activeQuestionCount}회`}</small></div><div className="new-signals__chips">{submitted.map((signal) => <span key={signal.id}>{signal.text}</span>)}</div></section>}
            </div>
            <section className="student-cloud-section">
              <div className="student-section-head"><div><h2>{isEnglish ? 'Question mosaic' : '질문 모자이크'}</h2></div><Waves size={19} /></div>
              <WordCloud clusters={cloudClusters} onSelect={setSelectedClusterId} variant="student" />
              <button className="signal-tip" onClick={() => setSelectedClusterId('lagrangian')} type="button"><Sparkles size={14} /> {isEnglish ? 'Select a tile to see the original questions' : '단어를 누르면 비슷한 원문 질문을 볼 수 있어요'} <ChevronRight size={14} /></button>
            </section>

            <section className="student-questions">
              <div className="student-section-head"><div><h2>{isEnglish ? 'Most resonated questions' : '많이 공감한 질문'}</h2></div><span className="student-questions__total">{isEnglish ? `${questions.length} questions` : `${questions.length}개`}</span></div>
              <div className="student-questions__list">
                {questions.map((question, index) => <QuestionCard accent={questionAccents[index % questionAccents.length]} count={question.count} key={question.id} onReact={() => toggleQuestionReaction(question.id)} reacted={question.reacted} text={question.text} />)}
              </div>
            </section>
          </div>
          <footer className="student-phone__footer">{isEnglish ? <>AI does not rewrite questions. · <strong>Students’ words stay intact</strong></> : <>AI는 질문을 고쳐 쓰지 않습니다. · <strong>학생의 말은 그대로</strong></>}</footer>
        </section>
      </main>
      {selectedCluster && <ClusterDetail cluster={selectedCluster} modal onClose={() => setSelectedClusterId(null)} onReact={() => setClusterReactions((current) => ({ ...current, [selectedCluster.id]: (current[selectedCluster.id] ?? 0) + 1 }))} reactions={clusterReactions[selectedCluster.id] ?? 0} />}
    </AppShell>
  );
}
