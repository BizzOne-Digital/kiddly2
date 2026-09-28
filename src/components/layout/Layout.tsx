import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from './Header'
import { Footer } from './Footer'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import './Layout.css'
import { useScrollToTop } from '../../hooks/useScrollToTop'

export function Layout() {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()
  useScrollToTop()

  return (
    <>
      <Header />
      <main id="main-content" className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
