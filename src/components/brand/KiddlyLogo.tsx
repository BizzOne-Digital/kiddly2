import { Link } from 'react-router-dom'

type KiddlyLogoProps = {
  variant?: 'default' | 'light'
  className?: string
  onClick?: () => void
}

export function KiddlyLogo({ variant = 'default', className = '', onClick }: KiddlyLogoProps) {
  return (
    <Link to="/" className={`kiddly-logo ${className}`} onClick={onClick} aria-label="Kiddly home">
      <picture>
        <source srcSet="/kiddly-logo.webp" type="image/webp" />
        <img
          src="/kiddly-logo.png"
          alt="Kiddly — colorful house logo above the word Kiddly"
          className={`kiddly-logo__img${variant === 'light' ? ' kiddly-logo__img--light' : ''}`}
          width={320}
          height={320}
          decoding="async"
        />
      </picture>
    </Link>
  )
}
