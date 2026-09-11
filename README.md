# QSignal

**혼자 묻던 질문을 수업의 신호로.**

QSignal은 LLM 시대에 학생들이 혼자 남기던 질문과 헷갈림을 익명 신호로 모아, 수업 중 교수자와 학생이 다시 함께 볼 수 있게 돕는 프런트엔드 프로토타입입니다. 학생의 원문 질문을 고쳐 쓰지 않으며, AI는 유사한 막힘을 묶고 반복되는 질문의 흐름을 보여주는 역할만 합니다.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal (normally `http://localhost:3000`). The prototype uses only local mock data and browser state—there is no authentication, API, database, or LLM connection.

## Screenshot routes

| Route | Recommended use |
| --- | --- |
| `/` | QSignal landing page and role selection |
| `/join` | QR-linked and entry-code student access |
| `/student` | Mobile-style anonymous student submission experience |
| `/teacher` | Desktop instructor live stuck map and question clustering dashboard |
| `/report` | Generated-looking after-class question report |
| `/screens` | Presentation-friendly gallery of five key product scenes |

## Prototype interactions

- Submit a keyword or a raw one-line question on `/student`; it is added locally and shown as a newly submitted signal.
- Join from a QR link or enter the prototype code `DS-2401`; the confirmed entry is stored only in the current browser.
- The same student interaction surface adapts from a phone frame to a tablet panel and a laptop workspace without changing its interactions.
- Use **나도 궁금해요** to increase local empathy counts.
- Select a word in the question cloud to inspect its raw related questions.

The interface is Korean-first, responsive, and designed for a polished 1440px desktop capture alongside a centered mobile student view.
