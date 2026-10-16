import { useEffect, useRef, useState } from 'react'

/** Original city footage. Plays automatically on load, with a pause control. */
export default function CityVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(false)
  const [ready, setReady] = useState(false)
  const [inView, setInView] = useState(true)
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState === 'visible')

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    observer.observe(video)
    const sync = () => setPageVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', sync)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (paused || !inView || !pageVisible) video.pause()
    else void video.play().catch(() => {
      // Some browsers block autoplay until the first interaction. Retry then instead of staying paused.
      const retry = () => { if (!video.paused) return; void video.play().catch(() => undefined) }
      for (const type of ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const) window.addEventListener(type, retry, { once: true, passive: true })
    })
  }, [paused, inView, pageVisible])

  return <>
    <img className="hero-cinema__poster" src="/iron-key-nyc-poster.jpg" alt="" aria-hidden="true" fetchPriority="high" />
    <video ref={videoRef} className={`hero-cinema__media${ready ? ' is-ready' : ''}`}
      src="/iron-key-nyc-hero-forward.mp4" autoPlay muted loop playsInline preload="auto"
      poster="/iron-key-nyc-poster.jpg" aria-hidden="true" onPlaying={() => setReady(true)} />
    <div className="hero-cinema__veil" aria-hidden="true" />
    <button className="motion-control hero-motion-control" type="button" onClick={() => setPaused(value => !value)}
      aria-label={paused ? 'Play city background video' : 'Pause city background video'}>
      <span aria-hidden="true">{paused ? '\u25b6' : '\u2161'}</span> {paused ? 'Play video' : 'Pause video'}
    </button>
  </>
}
