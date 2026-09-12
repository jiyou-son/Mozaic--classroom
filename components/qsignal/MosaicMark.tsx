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
          d="M12.5 17.25c-.36-4.79 2.8-8.9 6.67-10.17 2.73-.93 4.93.25 6.6.66 3.58-.82 7.69 1.22 9.55 4.33 1.78 2.98.93 6.3-1.1 8.57-1.38 1.5-3.95 2.81-5.86 4.12-2.8 1.96-3.3 4.11-3.3 7.49 0 2.33-1.62 3.98-3.76 3.98-2.44 0-4.05-1.72-3.7-4.11.48-4.36 2.76-8.08 6.56-10.68 2.61-1.79 4.41-3.09 4.32-5.19-.11-2.2-2.22-3.78-4.58-3.6-2.39.22-3.6 1.82-4.15 4.08-.59 2.34-2.69 3.89-4.82 3.63-1.43-.18-2.31-1.38-2.43-3.14Z"
          fill="url(#mosaic-mark-question-fill)"
        />
        <path
          d="M20.5 34.5c2.2-.9 4.25.95 3.97 3.1-.23 1.9-1.94 3.4-3.88 3.28-2.1-.14-2.8-2-1.96-3.85.59-1.31 1.3-2.08 2.37-2.53Z"
          fill="url(#mosaic-mark-question-fill)"
        />
      </g>
    </svg>
  );
}
