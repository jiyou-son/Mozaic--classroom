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
          d="M14.9 16.45C14.9 10.98 19.14 8.05 24.25 8.05c5.55 0 9.78 3.08 9.78 8.03 0 4.11-2.25 6.32-5.38 8.36-2.86 1.86-4.17 4.12-4.17 7.31 0 1.58-1.18 2.71-2.7 2.71s-2.62-1.22-2.62-2.77c0-4.56 1.85-7.85 5.82-10.46 2.38-1.56 3.6-2.9 3.6-4.89 0-2.34-1.94-3.98-4.62-3.98-2.94 0-4.82 1.83-4.82 4.36 0 1.72-.86 2.84-2.23 2.84-1.25 0-2.01-1.11-2.01-2.81Z"
          fill="url(#mosaic-mark-question-fill)"
        />
        <path
          d="M21.55 34.8c1.78 0 3.15 1.43 3.03 3.14-.12 1.78-1.51 3.16-3.22 3.16-1.66 0-2.87-1.29-2.73-2.99.15-1.78 1.14-3.31 2.92-3.31Z"
          fill="url(#mosaic-mark-question-fill)"
        />
      </g>
    </svg>
  );
}
