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
          d="M16.7 17.2C16.7 12.1 20.1 9.4 24.7 9.4c4.9 0 8.5 2.8 8.5 7.2 0 3.4-1.9 5.2-4.6 7.1-3.1 2.1-4.5 4.1-4.5 7.4"
          fill="none"
          stroke="url(#mosaic-mark-question-fill)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5.5"
        />
        <circle cx="24.1" cy="37.1" fill="url(#mosaic-mark-question-fill)" r="3.15" />
      </g>
    </svg>
  );
}
