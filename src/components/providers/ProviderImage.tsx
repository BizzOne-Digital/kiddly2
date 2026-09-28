import { useState } from 'react'

const FALLBACK =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="#d4eef9" width="400" height="300"/><text x="50%" y="50%" text-anchor="middle" fill="#1e3a5f" font-family="sans-serif" font-size="18">Childcare photo</text></svg>`,
  )

interface ProviderImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}

export function ProviderImage({ src, alt, className, loading = 'lazy' }: ProviderImageProps) {
  const [current, setCurrent] = useState(src)

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => setCurrent(FALLBACK)}
    />
  )
}
