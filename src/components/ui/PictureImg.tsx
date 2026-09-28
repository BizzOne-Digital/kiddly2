type PictureImgProps = {
  /** Full `.jpg` path or base without extension, e.g. `/images/hero-home` */
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  decoding?: 'async' | 'sync' | 'auto'
}

function imagePaths(src: string) {
  if (/\.jpe?g$/i.test(src)) {
    return { jpg: src, webp: src.replace(/\.jpe?g$/i, '.webp') }
  }
  return { jpg: `${src}.jpg`, webp: `${src}.webp` }
}

export function PictureImg({
  src,
  alt,
  className,
  width,
  height,
  loading,
  fetchPriority,
  decoding,
}: PictureImgProps) {
  const { jpg, webp } = imagePaths(src)
  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img
        src={jpg}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
      />
    </picture>
  )
}
