const tiles = [
  { x: 15, y: 8, tone: 'lavender' }, { x: 21, y: 8, tone: 'lavender', glow: true }, { x: 27, y: 8, tone: 'lime', glow: true }, { x: 33, y: 8, tone: 'blue' },
  { x: 9, y: 14, tone: 'indigo' }, { x: 15, y: 14, tone: 'blue' }, { x: 27, y: 14, tone: 'lime', glow: true }, { x: 33, y: 14, tone: 'indigo' },
  { x: 15, y: 20, tone: 'blue' }, { x: 21, y: 20, tone: 'lavender', glow: true }, { x: 27, y: 20, tone: 'indigo' },
  { x: 9, y: 26, tone: 'indigo' }, { x: 15, y: 26, tone: 'blue' }, { x: 27, y: 26, tone: 'blue' }, { x: 33, y: 26, tone: 'indigo' },
  { x: 15, y: 32, tone: 'indigo' }, { x: 21, y: 32, tone: 'lime', glow: true }, { x: 27, y: 32, tone: 'lavender' },
];

export function MosaicMark() {
  return (
    <svg aria-hidden="true" className="mosaic-mark" focusable="false" viewBox="0 0 48 48">
      <defs>
        <filter height="190%" id="mosaic-mark-glow" width="190%" x="-45%" y="-45%">
          <feGaussianBlur result="blur" stdDeviation="1.35" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path className="mosaic-mark__bubble" d="M7.5 5.5h33A4.5 4.5 0 0 1 45 10v25.5a4.5 4.5 0 0 1-4.5 4.5H28l-7.5 3v-3H7.5A4.5 4.5 0 0 1 3 35.5V10a4.5 4.5 0 0 1 4.5-4.5Z" />
      {tiles.map((tile) => (
        <rect
          className={`mosaic-mark__tile mosaic-mark__tile--${tile.tone}`}
          filter={tile.glow ? 'url(#mosaic-mark-glow)' : undefined}
          height="5"
          key={`${tile.x}-${tile.y}`}
          rx="1.8"
          width="5"
          x={tile.x}
          y={tile.y}
        />
      ))}
    </svg>
  );
}
