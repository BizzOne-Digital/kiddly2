import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import './LandscapeBackdrop.css'

interface LandscapeBackdropProps {
  variant?: 'hero' | 'section' | 'subtle'
}

export function LandscapeBackdrop({ variant = 'section' }: LandscapeBackdropProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <div className={`landscape landscape--${variant}`} aria-hidden="true">
      <motion.div
        className="landscape__sky"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <svg className="landscape__cloud landscape__cloud--1" viewBox="0 0 120 40">
        <ellipse cx="40" cy="25" rx="35" ry="18" fill="white" opacity="0.9" />
        <ellipse cx="70" cy="20" rx="40" ry="22" fill="white" opacity="0.85" />
      </svg>
      <svg className="landscape__cloud landscape__cloud--2" viewBox="0 0 100 36">
        <ellipse cx="35" cy="22" rx="30" ry="16" fill="white" opacity="0.75" />
        <ellipse cx="60" cy="18" rx="32" ry="18" fill="white" opacity="0.7" />
      </svg>
      <svg className="landscape__sun" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="14" fill="var(--color-yellow)" />
        <g stroke="var(--color-yellow)" strokeWidth="3" strokeLinecap="round">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="24"
              y1="4"
              x2="24"
              y2="0"
              transform={`rotate(${deg} 24 24)`}
            />
          ))}
        </g>
      </svg>
      <svg className="landscape__mountains" viewBox="0 0 400 120" preserveAspectRatio="none">
        <path
          d="M0 120 L80 45 L160 90 L240 30 L320 75 L400 50 L400 120 Z"
          fill="#8ecae6"
          opacity="0.5"
        />
        <path
          d="M0 120 L100 70 L200 95 L300 55 L400 85 L400 120 Z"
          fill="#5ba3c9"
          opacity="0.35"
        />
      </svg>
      <svg className="landscape__trees" viewBox="0 0 200 80">
        <polygon points="20,80 20,40 5,40 20,15 35,40 20,40" fill="#4a8f5c" />
        <rect x="17" y="40" width="6" height="20" fill="#6b4f3a" />
        <polygon points="60,80 60,35 42,35 60,8 78,35 60,35" fill="#3d7a52" />
        <rect x="57" y="35" width="6" height="25" fill="#6b4f3a" />
        <polygon points="150,80 150,42 135,42 150,18 165,42 150,42" fill="#5cb88a" />
        <rect x="147" y="42" width="6" height="22" fill="#6b4f3a" />
      </svg>
      <span className="landscape__star landscape__star--1">✦</span>
      <span className="landscape__star landscape__star--2">✦</span>
    </div>
  )
}
