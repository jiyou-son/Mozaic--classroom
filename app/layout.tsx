import type { Metadata } from 'next';
import './globals.css';
import './qsignal.css';
import './qsignal-overrides.css';
import './button-fix.css';
import './qsignal-night.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://qsignal-classroom.sonjiyou1905.chatgpt.site'),
  title: '모자이크 — 흩어진 질문이 하나의 수업으로',
  description:
    '학생들의 작은 질문 조각을 모아, 함께 볼 수 있는 수업의 그림으로 만드는 강의실 소통 프로토타입',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: '모자이크 — 흩어진 질문이 하나의 수업으로',
    description: '학생들의 작은 질문 조각을 함께 볼 수 있는 수업의 그림으로.',
    siteName: '모자이크',
    type: 'website',
    url: '/',
    images: [{ url: '/og.png', width: 1734, height: 907, alt: '모자이크 — 흩어진 질문이 하나의 수업으로.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '모자이크 — 흩어진 질문이 하나의 수업으로',
    description: '학생들의 작은 질문 조각을 함께 볼 수 있는 수업의 그림으로.',
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
