import type { Metadata } from 'next';
import './globals.css';
import './qsignal.css';
import './qsignal-overrides.css';
import './button-fix.css';
import './qsignal-night.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://qsignal-classroom.sonjiyou1905.chatgpt.site'),
  title: '모자이크 — 흩어진 질문이 모여, 모두의 깨달음이 되다',
  description:
    '흩어진 질문이 모여, 모두의 깨달음이 되다. 모자이크는 학생들의 작은 질문 조각을 함께 볼 수 있는 수업의 그림으로 만듭니다.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: '모자이크 — 흩어진 질문이 모여, 모두의 깨달음이 되다',
    description: '흩어진 질문이 모여, 모두의 깨달음이 되다.',
    siteName: '모자이크',
    type: 'website',
    url: '/',
    images: [{ url: '/og.png', width: 1734, height: 907, alt: '모자이크 — 흩어진 질문이 모여, 모두의 깨달음이 되다.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '모자이크 — 흩어진 질문이 모여, 모두의 깨달음이 되다',
    description: '흩어진 질문이 모여, 모두의 깨달음이 되다.',
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
