import type { Metadata } from 'next';
import './globals.css';
import './qsignal.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://qsignal-classroom.sonjiyou1905.chatgpt.site'),
  title: 'QSignal — 혼자 묻던 질문을 수업의 신호로',
  description:
    '학생들의 날것의 헷갈림을 실시간 질문 시그널로 바꾸는 강의실 커뮤니케이션 프로토타입',
  openGraph: {
    title: 'QSignal — 혼자 묻던 질문을 수업의 신호로',
    description: 'LLM에게 흩어지는 질문을 다시 수업 안으로.',
    siteName: 'QSignal',
    type: 'website',
    url: '/',
    images: [{ url: '/og.png', width: 1672, height: 941, alt: 'QSignal — 혼자 묻던 질문을 수업의 신호로.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QSignal — 혼자 묻던 질문을 수업의 신호로',
    description: 'LLM에게 흩어지는 질문을 다시 수업 안으로.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
