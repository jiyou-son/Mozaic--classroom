import { MosaicMark } from './MosaicMark';
import { useI18n } from './i18n';

type BrandProps = {
  inverse?: boolean;
  compact?: boolean;
};

export function Brand({ inverse = false, compact = false }: BrandProps) {
  const { isEnglish, hrefForLocale } = useI18n();
  return (
    <a
      aria-label={isEnglish ? 'Mosaic home' : '모자이크 홈'}
      className={`brand ${inverse ? 'brand--inverse' : ''}`}
      href={hrefForLocale(isEnglish ? 'en' : 'ko', '/')}
    >
      <span className="brand-mark" aria-hidden="true">
        <MosaicMark />
      </span>
      {!compact && (
        <span className="brand-copy">
          <strong>{isEnglish ? 'Mosaic' : '모자이크'}</strong>
          <small>{isEnglish ? 'A classroom where questions come together.' : '흩어진 질문을 함께 읽는 강의실.'}</small>
        </span>
      )}
    </a>
  );
}
