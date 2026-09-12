'use client';

import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, ChevronRight, CircleHelp, Send, Sparkles, Waves } from 'lucide-react';
import { AppShell } from './AppShell';
import { ClusterDetail } from './ClusterDetail';
import { QuestionCard } from './QuestionCard';
import { WordCloud } from './WordCloud';
import { classSession, clusters, popularQuestions, type Cluster } from './mockData';
import { hasJoinedSession, isValidEntryCode, markSessionJoined } from './sessionAccess';

type Question = (typeof popularQuestions)[number];
type SubmittedSignal = { id: string; text: string };

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

function findClusterForSignal(value: string, source: Cluster[]) {
  const normalized = value.replaceAll(' ', '').toLowerCase();
  return source.find((cluster) => normalized.includes(cluster.cloudLabel.replaceAll(' ', '').toLowerCase())) ?? source[0];
}

export function StudentPage() {
  const [mode, setMode] = useState<'keyword' | 'question'>('keyword');
  const [input, setInput] = useState('');
  const [questions, setQuestions] = useState<Question[]>(popularQuestions);
  const [cloudClusters, setCloudClusters] = useState<Cluster[]>(clusters);
  const [submitted, setSubmitted] = useState<SubmittedSignal[]>([]);
  const [toast, setToast] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);
  const [clusterReactions, setClusterReactions] = useState(initialClusterReactions);
  const [accessReady, setAccessReady] = useState(false);

  const placeholder = mode === 'keyword'
    ? '예: 라그랑지안, 일반화좌표, 부호 변화'
    : '예: 왜 여기서 뉴턴 방식 대신 라그랑지안을 쓰나요?';

  const activeQuestionCount = useMemo(() => questions.reduce((total, question) => total + question.count, 0), [questions]);
  const selectedCluster = selectedClusterId ? cloudClusters.find((cluster) => cluster.id === selectedClusterId) ?? null : null;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
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
    if (requestedCluster && clusters.some((cluster) => cluster.id === requestedCluster)) setSelectedClusterId(requestedCluster);
    setAccessReady(true);
  }, []);

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
    if (mode === 'question') {
      setQuestions((current) => [{ id: `new-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, text: value, count: 1, clusterId: target.id }, ...current]);
    }
    setSubmitted((current) => [{ id: `signal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, text: value }, ...current].slice(0, 3));
    setInput('');
    setToast(true);
    window.setTimeout(() => setToast(false), 3400);
  }

  function incrementQuestion(id: string) {
    setQuestions((current) => current.map((question) => question.id === id ? { ...question, count: question.count + 1 } : question));
  }

  if (!accessReady) {
    return (
      <AppShell active="student">
        <main aria-live="polite" className="student-access-loading"><span className="section-kicker">STUDENT ACCESS</span><p>수업 입장을 확인하고 있어요.</p></main>
      </AppShell>
    );
  }

  return (
    <AppShell active="student">
      <main className="student-page">
        <div className="student-page__intro">
          <span className="section-kicker">STUDENT VIEW</span>
          <h1>궁금한 걸, <em>그대로</em> 남겨요.</h1>
          <p>정리하지 않아도 괜찮아요. 익명으로 남긴 작은 막힘이<br />교수자에게 지금 필요한 설명을 알려줍니다.</p>
          <div className="student-page__legend"><span><i className="status-dot" /> 익명 참여 중</span><span><Sparkles size={13} /> AI는 유사한 질문만 묶어요</span></div>
        </div>

        <section className="student-phone student-device" aria-label="QSignal 학생 참여 화면">
          <div aria-hidden="true" className="student-phone__island"><span /></div>
          <div aria-hidden="true" className="student-device__windowbar"><span className="student-device__window-dots"><i /><i /><i /></span><span className="student-device__window-title">QSignal · {classSession.name}</span><span className="student-device__window-state">학생 참여</span></div>
          <header className="student-phone__header">
            <div><span className="student-phone__brand">QSignal</span><p>{classSession.university}</p></div>
            <span className="student-live-pill"><i className="status-dot" /> LIVE</span>
          </header>
          <div className="student-phone__course">
            <strong>{classSession.name}</strong>
            <small>{classSession.instructor}</small>
          </div>

          <div className="student-device-workspace">
            <div className="student-device-workspace__compose">
              <section className="student-submit">
                <div className="student-submit__heading"><span className="student-submit__icon"><CircleHelp size={19} /></span><div><h2>지금 어디서 막혔나요?</h2><p>한 단어만 남겨도 괜찮아요.</p></div></div>
                <div aria-label="질문 입력 방식" className="input-tabs" role="group">
                  <button aria-pressed={mode === 'keyword'} className={mode === 'keyword' ? 'is-active' : ''} onClick={() => setMode('keyword')} type="button">키워드</button>
                  <button aria-pressed={mode === 'question'} className={mode === 'question' ? 'is-active' : ''} onClick={() => setMode('question')} type="button">한 줄 질문</button>
                </div>
                <form onSubmit={submitSignal}>
                  <label className="sr-only" htmlFor="student-signal">질문 또는 키워드 입력</label>
                  <textarea aria-invalid={inputError} id="student-signal" onChange={(event) => { setInput(event.target.value); setInputError(false); }} placeholder={placeholder} value={input} rows={mode === 'keyword' ? 2 : 3} />
                  {inputError && <p className="student-input-error" role="alert">한 단어나 질문을 먼저 적어주세요.</p>}
                  <button className="student-submit__button" type="submit">{mode === 'keyword' ? '키워드 남기기' : '질문 남기기'} <Send size={15} /></button>
                </form>
              </section>

              {toast && <output aria-live="polite" className="student-toast"><CheckCircle2 size={17} /> 올라갔어요. 비슷한 헷갈림을 남긴 학생이 있어요.</output>}

              {submitted.length > 0 && <section className="new-signals"><div><span>방금 올라온 신호</span><small>전체 질문 공감 {activeQuestionCount}회</small></div><div className="new-signals__chips">{submitted.map((signal) => <span key={signal.id}>{signal.text}</span>)}</div></section>}
            </div>
            <section className="student-cloud-section">
              <div className="student-section-head"><div><span className="section-kicker">LIVE QUESTION CLOUD</span><h2>또 무엇이 궁금한가요?</h2></div><Waves size={19} /></div>
              <WordCloud clusters={cloudClusters} onSelect={setSelectedClusterId} variant="student" />
              <button className="signal-tip" onClick={() => setSelectedClusterId('lagrangian')} type="button"><Sparkles size={14} /> 단어를 누르면 비슷한 원문 질문을 볼 수 있어요 <ChevronRight size={14} /></button>
            </section>

            <section className="student-questions">
              <div className="student-section-head"><div><span className="section-kicker">MOST RESONATED</span><h2>많이 공감한 질문</h2></div><span className="student-questions__total">{questions.length}개</span></div>
              <div className="student-questions__list">
                {questions.map((question, index) => <QuestionCard accent={index % 2 === 0 ? 'teal' : 'blue'} count={question.count} key={question.id} onReact={() => incrementQuestion(question.id)} text={question.text} />)}
              </div>
            </section>
          </div>
          <footer className="student-phone__footer">AI는 질문을 고쳐 쓰지 않습니다. · <strong>학생의 말은 그대로</strong></footer>
        </section>
      </main>
      {selectedCluster && <ClusterDetail cluster={selectedCluster} modal onClose={() => setSelectedClusterId(null)} onReact={() => setClusterReactions((current) => ({ ...current, [selectedCluster.id]: (current[selectedCluster.id] ?? 0) + 1 }))} reactions={clusterReactions[selectedCluster.id] ?? 0} />}
    </AppShell>
  );
}
