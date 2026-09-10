type BrandProps = {
  inverse?: boolean;
  compact?: boolean;
};

export function Brand({ inverse = false, compact = false }: BrandProps) {
  return (
    <a
      aria-label="QSignal 홈"
      className={`brand ${inverse ? 'brand--inverse' : ''}`}
      href="/"
    >
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-mark__ring" />
        <span className="brand-mark__pulse" />
      </span>
      {!compact && (
        <span className="brand-copy">
          <strong>QSignal</strong>
          <small>혼자 묻던 질문을 수업의 신호로.</small>
        </span>
      )}
    </a>
  );
}
