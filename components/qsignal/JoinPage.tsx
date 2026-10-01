'use client';

import { type FormEvent, useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, KeyRound, Laptop, QrCode, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppShell } from './AppShell';
import { classSession, classSessionEn } from './mockData';
import { MosaicMark } from './MosaicMark';
import { extractEntryCode, getSafeStudentPath, isValidEntryCode, markSessionJoined } from './sessionAccess';
import { useI18n } from './i18n';

type EntryStatus = 'idle' | 'error' | 'success';

export function JoinPage() {
  const { isEnglish, hrefForLocale } = useI18n();
  const session = isEnglish ? classSessionEn : classSession;
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<EntryStatus>('idle');
  const [message, setMessage] = useState('');
  const [nextPath, setNextPath] = useState('/student');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const target = hrefForLocale(isEnglish ? 'en' : 'ko', getSafeStudentPath(params.get('next')));
    const scannedCode = params.get('code');
    setNextPath(target);

    if (!scannedCode) return;

    setCode(extractEntryCode(scannedCode));
    if (!isValidEntryCode(scannedCode)) {
      setStatus('error');
      setMessage(isEnglish ? 'We could not read the entry code from this QR. Please enter the code provided by the instructor.' : 'QR의 입장 코드를 확인할 수 없어요. 교수자가 안내한 코드를 직접 입력해 주세요.');
      return;
    }

    markSessionJoined();
    setStatus('success');
    setMessage(isEnglish ? 'Class found via QR. Taking you to the student view.' : 'QR로 수업을 찾았어요. 참여 화면으로 이동합니다.');
    const redirectTimer = window.setTimeout(() => window.location.assign(target), 650);
    return () => window.clearTimeout(redirectTimer);
  }, []);

  function submitEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidEntryCode(code)) {
      setStatus('error');
      setMessage(isEnglish ? 'That entry code does not match. Please check it, including the hyphen.' : '입장 코드가 맞지 않아요. 하이픈을 포함해 다시 확인해 주세요.');
      return;
    }

    markSessionJoined();
    setStatus('success');
    setMessage(isEnglish ? 'Entry code confirmed. Taking you to the student view.' : '입장 코드가 확인됐어요. 참여 화면으로 이동합니다.');
    window.setTimeout(() => window.location.assign(nextPath), 450);
  }

  return (
    <AppShell active="student">
      <main className="join-page">
        <div className="join-page__intro">
          <h1>{isEnglish ? <>Join the <em>same class</em>, anywhere.</> : <>어디서든, <em>같은 수업</em>에 참여하세요.</>}</h1>
          <p>{isEnglish ? 'Scan a QR code on your phone, or enter the class code directly on a laptop, tablet, or any device without a camera.' : '휴대폰은 QR로 빠르게, 카메라가 없거나 노트북·태블릿을 쓰는 경우에는 입장 코드로 바로 참여할 수 있어요.'}</p>
          <div className="join-page__device-list" aria-label={isEnglish ? 'Supported devices' : '지원 기기'}>
            <span><Smartphone size={15} /> {isEnglish ? 'Phone · QR' : '휴대폰 QR'}</span>
            <span><Laptop size={15} /> {isEnglish ? 'Laptop · tablet · code' : '노트북·태블릿 코드'}</span>
          </div>
        </div>

        <section className="join-card" aria-labelledby="join-title">
          <div className="join-card__course">
            <div className="join-card__course-copy">
              <span className="join-card__university">{session.university}</span>
              <h2 id="join-title">{session.name}</h2>
              <p className="join-card__instructor">{session.instructor}</p>
            </div>
            <span aria-hidden="true" className="join-card__mark"><MosaicMark /></span>
          </div>

          <div className="join-methods">
            <article className="join-method join-method--qr">
              <span className="join-method__icon"><QrCode size={21} /></span>
              <div>
                <h3>{isEnglish ? 'Join by QR on your phone' : '휴대폰은 QR로 입장'}</h3>
                <p>{isEnglish ? 'Scan the QR code on the instructor’s screen with your phone camera to open the student view.' : '교수자 화면의 QR을 휴대폰 기본 카메라로 스캔하면, 이 수업의 참여 화면이 바로 열려요.'}</p>
              </div>
            </article>

              <div className="join-methods__divider" aria-hidden="true"><span>{isEnglish ? 'or' : '또는'}</span></div>

            <form className="join-code-form" onSubmit={submitEntry}>
              <span className="join-method__icon join-method__icon--code"><KeyRound size={20} /></span>
              <div className="join-code-form__copy">
                <h3>{isEnglish ? 'Join with an entry code' : '입장 코드로 참여'}</h3>
                <p id="entry-code-help">{isEnglish ? 'On a device without a camera, enter the code provided by the instructor.' : '카메라를 사용할 수 없는 기기에서는 교수자가 안내한 코드를 입력해 주세요.'}</p>
              </div>
              <label className="sr-only" htmlFor="entry-code">{isEnglish ? 'Entry code' : '입장 코드'}</label>
              <div className="join-code-form__fields">
                <Input
                  aria-describedby="entry-code-help entry-code-demo"
                  aria-invalid={status === 'error'}
                  autoCapitalize="characters"
                  className="join-code-input"
                  id="entry-code"
                  inputMode="text"
                  onChange={(event) => {
                    setCode(event.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder={isEnglish ? 'e.g. DS-2401' : '예: DS-2401'}
                  spellCheck={false}
                  value={code}
                />
                <Button className="join-code-submit" disabled={status === 'success'} type="submit">
                  {isEnglish ? 'Join class' : '입장하기'} <ArrowRight size={16} />
                </Button>
              </div>
              <div className="join-code-demo" id="entry-code-demo"><span>{isEnglish ? 'Prototype entry code' : '프로토타입 입장 코드'}</span><strong>{session.accessCode}</strong></div>
            </form>
          </div>

          <p aria-live="polite" className={`join-status ${status === 'success' ? 'is-success' : ''} ${status === 'error' ? 'is-error' : ''}`}>
            {status === 'success' && <CheckCircle2 size={16} />}
            {message || (isEnglish ? 'The entry code is stored briefly in this browser. No account is required.' : '입장 코드는 이 브라우저에만 잠시 저장되며, 별도 가입은 필요하지 않아요.')}
          </p>
        </section>
      </main>
    </AppShell>
  );
}
