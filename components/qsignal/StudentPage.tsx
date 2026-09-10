'use client';

import { FormEvent, useMemo, useState } from 'react';
import { CheckCircle2, ChevronRight, CircleHelp, Send, Sparkles, Waves } from 'lucide-react';
import { AppShell } from './AppShell';
import { ClusterDetail } from './ClusterDetail';
import { QuestionCard } from './QuestionCard';
import { WordCloud } from './WordCloud';
import { clusters, popularQuestions, type Cluster } from './mockData';

type Question = (typeof popularQuestions)[number];

export function StudentPage() {
  const [mode, setMode] = useState<'keyword' | 'question'>('keyword');
  const [input, setInput] = useState('');
  const [questions, setQuestions] = useState<Question[]>(popularQuestions);
  const [submitted, setSubmitted] = useState<string[]>([]);
  const [toast, setToast] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [clusterReactions, setClusterReactions] = useState(18);

  const placeholder = mode === 'keyword'
    ? '예: 라그랑지안, 일반화좌표, 부호 변화'
    : '예: 왜 여기서 뉴턴 방식 대신 라그랑지안을 쓰나요?';

  const activeQuestionCount = useMemo(() => questions.reduce((total, question) => total + question.count, 0), [questions]);

  function submitSignal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = input.trim();
    if (!value) return;
    if (mode === 'question') {
      setQuestions((current) => [{ id: `new-${Date.now()}`, text: value, count: 1, clusterId: 'lagrangian' }, ...current]);
    }
    setSubmitted((current) => [value, ...current].slice(0, 3));
    setInput('');
    setToast(true);
    window.setTimeout(() => setToast(false), 3400);
  }

  function incrementQuestion(id: string) {
    setQuestions((current) => current.map((question) => question.id === id ? { ...question, count: question.count + 1 } : question));
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

        <section className="student-phone" aria-label="QSignal 학생 참여 화면">
          <div className="student-phone__island"><span /></div>
          <header className="student-phone__header">
            <div><span className="student-phone__brand">QSignal</span><p>공학수학 2</p></div>
            <span className="student-live-pill"><i className="status-dot" /> LIVE</span>
          </header>
          <div className="student-phone__course">
            <span>오늘 수업</span>
            <strong>라그랑지안과 일반화좌표</strong>
            <small>익명 참여 중 · MATH2401</small>
          </div>

          <section className="student-submit">
            <div className="student-submit__heading"><span className="student-submit__icon"><CircleHelp size={19} /></span><div><h2>지금 어디서 막혔나요?</h2><p>한 단어만 남겨도 괜찮아요.</p></div></div>
            <div className="input-tabs" role="tablist" aria-label="질문 입력 방식">
              <button aria-selected={mode === 'keyword'} className={mode === 'keyword' ? 'is-active' : ''} onClick={() => setMode('keyword')} role="tab" type="button">키워드</button>
              <button aria-selected={mode === 'question'} className={mode === 'question' ? 'is-active' : ''} onClick={() => setMode('question')} role="tab" type="button">한 줄 질문</button>
            </div>
            <form onSubmit={submitSignal}>
              <label className="sr-only" htmlFor="student-signal">질문 또는 키워드 입력</label>
              <textarea id="student-signal" onChange={(event) => setInput(event.target.value)} placeholder={placeholder} value={input} rows={mode === 'keyword' ? 2 : 3} />
              <button className="student-submit__button" type="submit">익명으로 올리기 <Send size={15} /></button>
            </form>
          </section>

          {toast && <output aria-live="polite" className="student-toast"><CheckCircle2 size={17} /> 올라갔어요. 비슷한 헷갈림을 남긴 학생이 있어요.</output>}

          {submitted.length > 0 && <section className="new-signals"><div><span>방금 올라온 신호</span><small>{activeQuestionCount}개의 공감</small></div><div className="new-signals__chips">{submitted.map((signal) => <span key={signal}>{signal}</span>)}</div></section>}

          <section className="student-cloud-section">
            <div className="student-section-head"><div><span className="section-kicker">LIVE QUESTION CLOUD</span><h2>현재 많이 올라온 헷갈림</h2></div><Waves size={19} /></div>
            <WordCloud clusters={clusters} onSelect={(id) => setSelectedCluster(clusters.find((cluster) => cluster.id === id) ?? null)} variant="student" />
            <button className="signal-tip" onClick={() => setSelectedCluster(clusters[0])} type="button"><Sparkles size={14} /> 단어를 누르면 비슷한 원문 질문을 볼 수 있어요 <ChevronRight size={14} /></button>
          </section>

          <section className="student-questions">
            <div className="student-section-head"><div><span className="section-kicker">MOST RESONATED</span><h2>많이 공감한 질문</h2></div><span className="student-questions__total">{questions.length}개</span></div>
            <div className="student-questions__list">
              {questions.map((question, index) => <QuestionCard accent={index % 2 === 0 ? 'teal' : 'blue'} count={question.count} key={question.id} onReact={() => incrementQuestion(question.id)} text={question.text} />)}
            </div>
          </section>
          <footer className="student-phone__footer">AI는 질문을 고쳐 쓰지 않습니다. · <strong>학생의 말은 그대로</strong></footer>
        </section>
      </main>
      {selectedCluster && <ClusterDetail cluster={selectedCluster} modal onClose={() => setSelectedCluster(null)} onReact={() => setClusterReactions((count) => count + 1)} reactions={clusterReactions} />}
    </AppShell>
  );
}
