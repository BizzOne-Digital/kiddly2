import { Link } from 'react-router-dom'

type KiddlyLogoProps = {
  variant?: 'default' | 'light'
  className?: string
  onClick?: () => void
}

export function KiddlyLogo({ variant = 'default', className = '', onClick }: KiddlyLogoProps) {
  return (
    <Link to="/" className={`kiddly-logo ${className}`} onClick={onClick} aria-label="Kiddly home">
      <img
        src="/kiddly-logo.png"
        alt="Kiddly"
        className={`kiddly-logo__img${variant === 'light' ? ' kiddly-logo__img--light' : ''}`}
        width={168}
        height={56}
        decoding="async"
      />
    </Link>
  )
}
