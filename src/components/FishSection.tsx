import { useEffect, useState } from 'react'
import FishAsciiBackdrop from './FishAsciiBackdrop'
import useReducedMotion from '../hooks/useReducedMotion'

/** The one dedicated Fish feature. There is no separate Fish page or navigation item. */
export default function FishSection() {
  const reducedMotion = useReducedMotion()
  const [paused, setPaused] = useState(reducedMotion)
  useEffect(() => { if (reducedMotion) setPaused(true) }, [reducedMotion])

  return <section className="section fish-bridge" id="fish" aria-labelledby="fish-heading">
    <FishAsciiBackdrop className="fish-bridge__ascii" paused={paused} />
    <div className="page-frame fish-bridge__grid">
      <div>
        <h2 id="fish-heading">The first vehicle should build more than returns.</h2>
      </div>
      <div className="fish-bridge__copy">
        <p>Fish Network is part of our portfolio. It's building the operating and trust infrastructure for Neofunds, bringing capital, ownership and investment decisions into one connected record.</p>
        <p className="fish-bridge__line">Iron Key prepares the manager. Fish supports the work that follows.</p>
        <dl className="fish-function-list">
          <div><dt>Operate</dt><dd>Manage capital, ownership and governance.</dd></div>
          <div><dt>Record</dt><dd>Keep a record of decisions and participation.</dd></div>
          <div><dt>Grow</dt><dd>Carry that record into the next stage of the firm.</dd></div>
        </dl>
        <a className="text-link light" href="https://fishnetwork.co/" target="_blank" rel="noopener noreferrer">Visit Fish Network <span aria-hidden="true">&#8599;</span><span className="sr-only"> (opens in a new tab)</span></a>
      </div>
    </div>
    <div className="page-frame fish-motion-row">
      <button type="button" className="motion-control" onClick={() => setPaused(value => !value)}
        aria-label={paused ? 'Play fish background animation' : 'Pause fish background animation'}>
        <span aria-hidden="true">{paused ? '\u25b6' : '\u2161'}</span> {paused ? 'Play animation' : 'Pause animation'}
      </button>
    </div>
  </section>
}
