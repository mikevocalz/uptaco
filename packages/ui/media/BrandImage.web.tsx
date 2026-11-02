'use client';
import Image from 'next/image';
import type { CSSProperties } from 'react';
export type BrandImageProps = {
  src: string; alt: string; className?: string;
  priority?: boolean; sizes?: string; width?: number; height?: number;
  style?: CSSProperties;
};
export function BrandImage({
  src, alt, className, priority, sizes = '(max-width: 760px) 100vw, 46vw',
  width=1000, height=920, style
}: BrandImageProps) {
  return (
    <Image
      src={src} alt={alt} className={className}
      width={width} height={height} priority={priority} sizes={sizes}
      unoptimized={src.startsWith('https:')}
      style={style}
    />
  );
}
