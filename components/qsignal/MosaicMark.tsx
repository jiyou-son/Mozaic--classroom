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
      <g
        className="mosaic-mark__question"
        clipPath="url(#mosaic-mark-grid-clip)"
        filter="url(#mosaic-mark-question-glow)"
      >
        <path
          d="M14.6 16.8c-.45-3.7 1.98-6.9 4.62-8.18 2.04-.99 3.88-.42 5.53.08 2.37-.6 4.95.66 6.57 2.5 1.72 1.93 2.54 4.55 1.86 6.84-.5 2.14-2.64 3.78-4.98 5.51-2.76 2.05-3.64 4.1-3.54 7.3.08 1.49-1.09 2.75-2.71 2.81-1.87.09-3.08-1.21-2.93-3.04.32-4.08 2.22-6.86 5.83-9.38 2.29-1.6 3.69-3.02 3.75-4.97.12-1.82-1.6-3.27-3.71-3.57-2.01-.25-3.54.84-4.15 2.82-.6 1.95-2.06 3.55-3.87 3.78-1.4.17-2.04-1.02-2.27-2.5Z"
          fill="url(#mosaic-mark-question-fill)"
        />
        <path
          d="M21.2 35.15c1.8-.71 3.48.88 3.25 2.61-.21 1.79-1.8 3.26-3.53 3.14-1.92-.14-2.48-1.88-1.82-3.45.45-1.13.98-1.85 2.1-2.3Z"
          fill="url(#mosaic-mark-question-fill)"
        />
      </g>
    </svg>
  );
}
