const tiles = [
  { x: 7, y: 7, tone: 'blue' }, { x: 16, y: 7, tone: 'lime', glow: true }, { x: 25, y: 7, tone: 'blue' }, { x: 34, y: 7, tone: 'violet' },
  { x: 7, y: 16, tone: 'indigo' }, { x: 16, y: 16, tone: 'lavender' }, { x: 25, y: 16, tone: 'lavender' }, { x: 34, y: 16, tone: 'violet' },
  { x: 7, y: 25, tone: 'blue' }, { x: 16, y: 25, tone: 'lavender' }, { x: 25, y: 25, tone: 'indigo' }, { x: 34, y: 25, tone: 'coral', glow: true },
  { x: 7, y: 34, tone: 'lavender' }, { x: 16, y: 34, tone: 'blue' }, { x: 25, y: 34, tone: 'violet' }, { x: 34, y: 34, tone: 'blue' },
];

export function MosaicMark() {
  return (
    <svg aria-hidden="true" className="mosaic-mark" focusable="false" viewBox="0 0 48 48">
      <defs>
        <clipPath id="mosaic-mark-grid-clip">
          {tiles.map((tile) => <rect height="7" key={`clip-${tile.x}-${tile.y}`} rx="2.15" width="7" x={tile.x} y={tile.y} />)}
        </clipPath>
        <linearGradient id="mosaic-mark-question-fill" x1="15" x2="31" y1="9" y2="40">
          <stop stopColor="#f8f5ff" stopOpacity=".74" />
          <stop offset=".58" stopColor="#d9d0ff" stopOpacity=".54" />
          <stop offset="1" stopColor="#bbb0f2" stopOpacity=".42" />
        </linearGradient>
        <filter height="190%" id="mosaic-mark-glow" width="190%" x="-45%" y="-45%">
          <feGaussianBlur result="blur" stdDeviation="1.35" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter height="160%" id="mosaic-mark-question-glow" width="160%" x="-30%" y="-30%">
          <feGaussianBlur result="blur" stdDeviation=".7" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {tiles.map((tile) => (
        <rect
          className={`mosaic-mark__tile mosaic-mark__tile--${tile.tone}`}
          filter={tile.glow ? 'url(#mosaic-mark-glow)' : undefined}
          height="7"
          key={`${tile.x}-${tile.y}`}
          rx="2.15"
          width="7"
          x={tile.x}
          y={tile.y}
        />
      ))}
      <path
        className="mosaic-mark__question"
        clipPath="url(#mosaic-mark-grid-clip)"
        d="M17.5 17.25c0-4.7 3.15-7.65 7.8-7.65 4.45 0 7.55 2.78 7.55 6.93 0 3.37-1.48 5.19-4.35 7.18-2.26 1.57-3.19 2.89-3.19 5.33v1.62h-4.3v-2.15c0-3.25 1.22-5.22 3.87-7.04 2.45-1.66 3.62-2.86 3.62-4.79 0-1.94-1.4-3.26-3.43-3.26-2.47 0-3.72 1.76-3.72 4.42v.53h-4.3Zm3.55 19.45c0-1.85 1.43-3.28 3.37-3.28 1.95 0 3.39 1.43 3.39 3.28 0 1.84-1.44 3.26-3.39 3.26-1.94 0-3.37-1.42-3.37-3.26Z"
        fill="url(#mosaic-mark-question-fill)"
        filter="url(#mosaic-mark-question-glow)"
      />
    </svg>
  );
}
