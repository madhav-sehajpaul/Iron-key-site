import { useEffect, useRef, useState } from 'react'
import NeofundLedgerFigure from './NeofundLedgerFigure'

const layers = [
  { title: 'Mandate', body: 'The intended ownership and field of action: what the manager will own, where they will act and where they will not.' },
  { title: 'Capital', body: 'Commitment, allocation, deployment and returns, connected to the vehicle and the people behind it.' },
  { title: 'Ownership', body: 'The rights, responsibilities and economic interests that define how the organization is held.' },
  { title: 'Decisions', body: 'The reasoning, approvals and exceptions that make the manager\'s judgment observable over time.' },
  { title: 'Reputation', body: 'Observable judgment, communication and operating behavior that can compound into institutional trust.' },
]
const labels = layers.map(layer => layer.title)

export default function NeofundStory() {
  const storyRef = useRef<HTMLDivElement>(null)
  const [scrollIndex, setScrollIndex] = useState(0)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const activeIndex = focusedIndex ?? previewIndex ?? scrollIndex

  useEffect(() => {
    const root = storyRef.current
    if (!root) return
    const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-neofund-layer]'))
    const intersecting = new Set<HTMLElement>()
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const row = entry.target as HTMLElement
        if (entry.isIntersecting) intersecting.add(row)
        else intersecting.delete(row)
      })
      const center = window.innerHeight / 2
      const visible = [...intersecting].sort((a, b) => {
        const ar = a.getBoundingClientRect()
        const br = b.getBoundingClientRect()
        return Math.abs(ar.top + ar.height / 2 - center) - Math.abs(br.top + br.height / 2 - center)
      })[0]
      if (visible) setScrollIndex(Number(visible.dataset.neofundLayer ?? 0))
    }, { rootMargin: '-35% 0px -35% 0px', threshold: [0, 0.01, 0.25, 0.5, 1] })
    rows.forEach(row => observer.observe(row))
    return () => observer.disconnect()
  }, [])

  return <div className="page-frame neofund-story" ref={storyRef}>
    <div className="neofund-copy">
      <h2 id="neofund-heading">What is a Neofund?</h2>
      <div className="neofund-introduction">
        <p>A Neofund is an investment organization that brings its mandate, capital, ownership, decisions and reputation onto connected infrastructure.</p>
        <p>It can start with a first vehicle. As the organization grows, the record stays connected, so people can see how it operates and how decisions are made.</p>
        <p className="neofund-qualification">It's an operating model, not a replacement for the vehicle's legal structure.</p>
      </div>
    </div>
    <div className="neofund-story__sequence">
      <div className="neofund-story__visual-rail">
        <div className="neofund-story__visual">
          <NeofundLedgerFigure activeIndex={activeIndex} labels={labels} onPreviewChange={setPreviewIndex} />
        </div>
      </div>
      <div className="neofund-story__rows">
        {layers.map((layer, index) => <article key={layer.title} data-neofund-layer={index}
          className={activeIndex === index ? 'is-active' : ''}
          onPointerEnter={() => setPreviewIndex(index)} onPointerLeave={() => setPreviewIndex(null)}>
          <span className="neofund-story__number" aria-hidden="true">0{index + 1}</span>
          <div className="neofund-story__content">
            <h3><button type="button" className="layer-choice" aria-pressed={activeIndex === index}
              onClick={() => setFocusedIndex(index)} onFocus={() => setFocusedIndex(index)} onBlur={() => setFocusedIndex(null)}>{layer.title}</button></h3>
            <p>{layer.body}</p>
          </div>
        </article>)}
      </div>
    </div>
  </div>
}
