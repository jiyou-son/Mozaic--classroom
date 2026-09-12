import { MosaicMark } from './MosaicMark';

type BrandProps = {
  inverse?: boolean;
  compact?: boolean;
};

export function Brand({ inverse = false, compact = false }: BrandProps) {
  return (
    <a
      aria-label="모자이크 홈"
      className={`brand ${inverse ? 'brand--inverse' : ''}`}
      href="/"
    >
      <span className="brand-mark" aria-hidden="true">
        <MosaicMark />
      </span>
      {!compact && (
        <span className="brand-copy">
          <strong>모자이크</strong>
          <small>흩어진 질문을 함께 읽는 강의실.</small>
        </span>
      )}
    </a>
  );
}
