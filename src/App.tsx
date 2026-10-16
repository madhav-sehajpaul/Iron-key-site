import { lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Apply from './pages/Apply'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'
import Team from './pages/Team'

const EmergingManagers = lazy(() => import('./pages/EmergingManagers'))
const metadata: Record<string, { title: string; description: string }> = {
  '/': { title: 'Iron Key | Venture Studio & Early-Stage Investing', description: 'Iron Key builds and invests in companies for the on-chain economy. Explore our portfolio, venture partners and emerging-manager program.' },
  '/emerging-managers': { title: 'Emerging Managers | Iron Key', description: 'Develop your investment thesis, choose a first vehicle and build an operating record with Iron Key\'s emerging-manager program.' },
  '/team': { title: 'Team | Iron Key', description: 'Meet Joseph Argiro, founder of Iron Key, and the venture partners who help us evaluate opportunities and build companies.' },
  '/apply': { title: 'Start a Conversation | Iron Key', description: 'Talk to Iron Key about building a company, investing, the emerging-manager program or becoming a venture partner.' },
  '/privacy': { title: 'Privacy | Iron Key', description: 'How Iron Key uses information submitted through this website.' },
  '/terms': { title: 'Terms | Iron Key', description: 'Terms for using the Iron Key website.' },
}

function ScrollAndTitle() {
  const { pathname, hash, search } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const oldHashes: Record<string, string> = { '#firm': '/#studio', '#programme': '/emerging-managers#program', '#method': '/emerging-managers#method', '#vehicles': '/emerging-managers#vehicles', '#record': '/emerging-managers#record', '#people': '/team', '#venture-partners': '/team#venture-partners' }
    if (pathname === '/' && oldHashes[hash]) { navigate(oldHashes[hash], { replace: true }); return }
    let observer: MutationObserver | undefined
    let timer: number | undefined
    let frame: number | undefined
    if (hash) {
      let id = hash.slice(1)
      try { id = decodeURIComponent(id) } catch { /* Leave a malformed bookmark harmless. */ }
      const scroll = () => {
        const target = document.getElementById(id)
        if (!target) return false
        frame = requestAnimationFrame(() => target.scrollIntoView({ behavior: 'auto' }))
        observer?.disconnect()
        if (timer) window.clearTimeout(timer)
        return true
      }
      if (!scroll()) {
        observer = new MutationObserver(scroll)
        observer.observe(document.getElementById('main') ?? document.body, { childList: true, subtree: true })
        timer = window.setTimeout(() => observer?.disconnect(), 6000)
      }
    } else window.scrollTo({ top: 0, behavior: 'instant' })
    return () => { observer?.disconnect(); if (timer) window.clearTimeout(timer); if (frame) cancelAnimationFrame(frame) }
  }, [pathname, hash, navigate])

  useEffect(() => {
    const params = new URLSearchParams(search)
    try {
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
        const value = params.get(key)
        if (value) sessionStorage.setItem(key, value.slice(0, 500))
      }
    } catch { /* The site remains usable when session storage is unavailable. */ }
  }, [search])

  useEffect(() => {
    const page = metadata[pathname] ?? { title: 'Page Not Found | Iron Key', description: 'Return to Iron Key to explore our venture studio, portfolio and emerging-manager program.' }
    document.title = page.title
    const updateMeta = (attribute: 'name' | 'property', name: string, content: string) => {
      let node = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`)
      if (!node) { node = document.createElement('meta'); node.setAttribute(attribute, name); document.head.appendChild(node) }
      node.content = content
    }
    updateMeta('name', 'description', page.description)
    updateMeta('property', 'og:title', page.title)
    updateMeta('property', 'og:description', page.description)
    updateMeta('name', 'twitter:title', page.title)
    updateMeta('name', 'twitter:description', page.description)
    const url = `https://www.ironkeycapital.com${pathname === '/' ? '/' : pathname}`
    updateMeta('property', 'og:url', url)
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    canonical.href = url
  }, [pathname])
  return null
}

export default function App() {
  return <><ScrollAndTitle /><Routes><Route element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="emerging-managers" element={<EmergingManagers />} />
    <Route path="team" element={<Team />} />
    <Route path="apply" element={<Apply />} />
    <Route path="privacy" element={<Legal type="privacy" />} />
    <Route path="terms" element={<Legal type="terms" />} />
    <Route path="program" element={<Navigate to="/emerging-managers" replace />} />
    <Route path="emerging-manager" element={<Navigate to="/emerging-managers" replace />} />
    <Route path="vc-pro" element={<Navigate to="/emerging-managers" replace />} />
    <Route path="air" element={<Navigate to="/emerging-managers" replace />} />
    <Route path="about" element={<Navigate to="/#studio" replace />} />
    <Route path="portfolio" element={<Navigate to="/#portfolio" replace />} />
    <Route path="fish-network" element={<Navigate to="/#fish" replace />} />
    <Route path="guide" element={<Navigate to="/apply" replace />} />
    <Route path="*" element={<NotFound />} />
  </Route></Routes></>
}
