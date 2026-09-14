# 모자이크

**혼자 묻던 질문을 수업의 신호로.**

모자이크는 LLM 시대에 학생들이 혼자 남기던 질문과 헷갈림을 익명 신호로 모아, 수업 중 교수자와 학생이 다시 함께 볼 수 있게 돕는 프런트엔드 프로토타입입니다. 학생의 원문 질문을 고쳐 쓰지 않으며, AI는 유사한 막힘을 묶고 반복되는 질문의 흐름을 보여주는 역할만 합니다.

Mosaic is a front-end prototype that turns the questions and points of confusion students often keep to themselves in the LLM era into anonymous classroom signals. It brings those signals back into the classroom so instructors and students can examine them together. The original wording of each question is preserved; AI is used only to group similar points of confusion and reveal recurring question patterns.

## 제작 과정

본 프로토타입은 OpenAI Codex를 활용해 React·TypeScript 기반의 인터페이스를 구현하고, 생성형 이미지 도구로 서비스 흐름을 설명하는 스토리보드를 제작했습니다. 문제 정의, 핵심 기능 설계, 익명 질문 흐름, 질문 모자이크 구조와 최종 사용자 경험에 대한 판단은 팀이 직접 수행했습니다.

This prototype was built with OpenAI Codex as an implementation aid for the React and TypeScript interface, and generative image tools were used to create a storyboard explaining the service flow. The team directly led the problem definition, core feature design, anonymous-question flow, question mosaic structure, and final user-experience decisions.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal (normally `http://localhost:3000`). The prototype uses only local mock data and browser state—there is no authentication, API, database, or LLM connection.

## Screenshot routes

| Route | Recommended use |
| --- | --- |
| `/` | 모자이크 랜딩 페이지 및 역할 선택 |
| `/join` | QR-linked and entry-code student access |
| `/student` | Mobile-style anonymous student submission experience |
| `/report` | Generated-looking after-class question report |
| `/screens` | Presentation-friendly gallery of five key product scenes |

## Prototype interactions

- Submit a raw one-line question on `/student`; it is added locally and shown as a newly submitted signal.
- Join from a QR link or enter the prototype code `DS-2401`; the confirmed entry is stored only in the current browser.
- The same student interaction surface adapts from a phone frame to a tablet panel and a laptop workspace without changing its interactions.
- Use **나도 궁금해요** to increase local empathy counts.
- Select a word in the question cloud to inspect its raw related questions.

The interface is Korean-first, responsive, and designed for a polished 1440px desktop capture alongside a centered mobile student view.
