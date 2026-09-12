const tiles = [
  { x: 8, y: 8, tone: 'indigo' }, { x: 16, y: 8, tone: 'lavender' }, { x: 24, y: 8, tone: 'blue' }, { x: 32, y: 8, tone: 'indigo' },
  { x: 8, y: 16, tone: 'lavender' }, { x: 16, y: 16, tone: 'lime', glow: true }, { x: 24, y: 16, tone: 'indigo' }, { x: 32, y: 16, tone: 'lavender' },
  { x: 8, y: 24, tone: 'blue' }, { x: 16, y: 24, tone: 'indigo' }, { x: 24, y: 24, tone: 'lavender' }, { x: 32, y: 24, tone: 'coral', glow: true },
  { x: 8, y: 32, tone: 'indigo' }, { x: 16, y: 32, tone: 'lavender' }, { x: 24, y: 32, tone: 'blue' }, { x: 32, y: 32, tone: 'indigo' },
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
          height="6"
          key={`${tile.x}-${tile.y}`}
          rx="1.8"
          width="6"
          x={tile.x}
          y={tile.y}
        />
      ))}
    </svg>
  );
}
