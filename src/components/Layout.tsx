import { Suspense, useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { socialLinks } from '../data/firm'

const navigation = [
  { href: '/#studio', label: 'Venture Studio' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/emerging-managers', label: 'Emerging Managers' },
  { href: '/team', label: 'Team' },
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const lightHeader = location.pathname === '/privacy' || location.pathname === '/terms'

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', sync, { passive: true })
    sync()
    return () => window.removeEventListener('scroll', sync)
  }, [])
  useEffect(() => setOpen(false), [location])
  useEffect(() => {
    if (!open) return
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = headerRef.current?.querySelector<HTMLAnchorElement>('#mobile-nav a')
    first?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuRef.current?.focus()
      }
      if (event.key !== 'Tab') return
      const items = Array.from(headerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []).filter(el => el.offsetParent !== null)
      const firstItem = items[0]
      const lastItem = items[items.length - 1]
      if (event.shiftKey && document.activeElement === firstItem) { event.preventDefault(); lastItem?.focus() }
      else if (!event.shiftKey && document.activeElement === lastItem) { event.preventDefault(); firstItem?.focus() }
    }
    const onResize = () => { if (window.innerWidth > 1200) setOpen(false) }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = oldOverflow
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const links = navigation.map(item => <Link key={item.href} to={item.href} onClick={() => setOpen(false)}
    aria-current={location.pathname + location.hash === item.href ? (item.href.includes('#') ? 'location' : 'page') : undefined}>{item.label}</Link>)

  return <div className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <header ref={headerRef} className={`site-header ${scrolled || open ? 'is-scrolled' : ''} ${lightHeader && !scrolled && !open ? 'on-light' : ''}`}>
      <Link className="wordmark" to="/" aria-label="Iron Key home" onClick={() => setOpen(false)}><img className="key-logo" src="/iron-key-mark.svg" alt="" aria-hidden="true" /><span>Iron Key</span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{links}</nav>
      <Link className="header-cta" to="/apply">Start a conversation <span aria-hidden="true">&#8599;</span></Link>
      <button ref={menuRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(value => !value)}><span /><span /></button>
      {open && <div className="mobile-nav" id="mobile-nav"><nav aria-label="Mobile navigation">{links}<Link to="/apply" onClick={() => setOpen(false)}>Start a conversation</Link></nav></div>}
    </header>
    <main id="main" tabIndex={-1} inert={open}>
      <Suspense fallback={<div className="route-loading" role="status">Loading page...</div>}><Outlet /></Suspense>
    </main>
    <footer className="site-footer" id="site-footer" inert={open}>
      <div className="footer-grid">
        <div className="footer-intro"><Link className="wordmark footer-wordmark" to="/"><img className="key-logo" src="/iron-key-mark.svg" alt="" aria-hidden="true" /><span>Iron Key</span></Link><p>Building and investing in the on-chain economy.</p></div>
        <nav aria-label="Explore Iron Key"><h2>Explore</h2><Link to="/#studio">Venture Studio</Link><Link to="/#portfolio">Portfolio</Link><Link to="/emerging-managers">Emerging Managers</Link></nav>
        <nav aria-label="Iron Key team"><h2>Team</h2><Link to="/team">Our team</Link><Link to="/team#joseph-argiro">Joseph Argiro</Link><Link to="/team#venture-partners">Venture partners</Link></nav>
        <nav aria-label="Connect with Iron Key"><h2>Connect</h2><Link to="/apply">Start a conversation</Link><a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span className="sr-only">(opens in a new tab)</span></a><a href={socialLinks.x} target="_blank" rel="noopener noreferrer">X / Twitter <span className="sr-only">(opens in a new tab)</span></a></nav>
      </div>
      <div className="footer-bottom"><p>Nothing on this site is investment, legal or tax advice, an offer of securities, or a promise of results.</p><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><span>&copy; {new Date().getFullYear()} Iron Key Ventures LLC</span></div></div>
    </footer>
  </div>
}
