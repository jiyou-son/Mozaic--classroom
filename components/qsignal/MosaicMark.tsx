const tilePositions = [5.5, 13.4, 21.3, 29.2, 37.1];
const tileTones = [
  ['blue', 'indigo', 'lime', 'blue', 'violet'],
  ['violet', 'blue', 'lime', 'lavender', 'indigo'],
  ['indigo', 'lavender', 'lime', 'blue', 'violet'],
  ['blue', 'indigo', 'blue', 'lavender', 'indigo'],
  ['lavender', 'blue', 'lime', 'violet', 'blue'],
] as const;

const tiles = tileTones.flatMap((row, rowIndex) => row.map((tone, columnIndex) => ({
  x: tilePositions[columnIndex],
  y: tilePositions[rowIndex],
  tone,
  glow: tone === 'lime',
})));

export function MosaicMark() {
  return (
    <svg aria-hidden="true" className="mosaic-mark" focusable="false" viewBox="0 0 48 48">
      <defs>
        <filter height="190%" id="mosaic-mark-glow" width="190%" x="-45%" y="-45%">
          <feGaussianBlur result="blur" stdDeviation="1.35" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {tiles.map((tile) => (
        <rect
          className={`mosaic-mark__tile mosaic-mark__tile--${tile.tone}`}
          filter={tile.glow ? 'url(#mosaic-mark-glow)' : undefined}
          height="6.4"
          key={`${tile.x}-${tile.y}`}
          rx="2.3"
          width="6.4"
          x={tile.x}
          y={tile.y}
        />
      ))}
    </svg>
  );
}
