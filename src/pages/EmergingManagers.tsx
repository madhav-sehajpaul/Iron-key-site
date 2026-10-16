import { Link } from 'react-router-dom'
import { RecordArchive, VehicleArtwork } from '../components/VisualSystems'

const method = [
  { number: '01', title: 'Define your thesis', copy: 'Be specific about the opportunities you understand, what you want to invest in and what you will pass on.', output: 'A focused investment thesis' },
  { number: '02', title: 'Choose a first vehicle', copy: 'Start with a structure that fits your strategy, network and experience. A full fund is not always the first step.', output: 'A practical starting point' },
  { number: '03', title: 'Invest and keep a record', copy: 'Document your decisions, track capital and ownership, and keep investors informed as the work develops.', output: 'A record people can review' },
  { number: '04', title: 'Build toward a firm', copy: 'Use what you have learned and demonstrated to decide when a larger investment business makes sense.', output: 'A plan for the next stage' },
]
const vehicles = [
  { type: 'club' as const, title: 'Investment club', summary: 'A way to invest with a group and develop a shared approach to research, decisions and accountability.', use: 'Investing with a group', record: 'Process and collaboration' },
  { type: 'deal' as const, title: 'Single deal', summary: 'A way to focus on one opportunity and demonstrate how you source, assess and execute an investment.', use: 'One defined opportunity', record: 'Selection and execution' },
  { type: 'spv' as const, title: 'SPV', summary: 'A structure for organizing capital and ownership around a particular investment or transaction.', use: 'A specific asset or transaction', record: 'Operations and governance' },
  { type: 'fund' as const, title: 'Fund', summary: 'A vehicle for applying a repeatable strategy across a portfolio, when your experience and capacity support it.', use: 'A portfolio strategy', record: 'Portfolio management' },
]

export default function EmergingManagers() {
  return <div className="home-v3 managers-page">
    <section className="manager-page-hero" aria-labelledby="manager-page-heading">
      <div className="page-frame">
        <h1 id="manager-page-heading">Capital needs<br />new managers.</h1>
        <div className="manager-hero-bottom">
          <p>You've built expertise in a market. Now you want to put it to work as an investor. We help you develop a thesis, choose a first vehicle and build a record that others can examine.</p>
          <Link className="button button-light" to="/apply?interest=emerging-manager">Discuss the program <span aria-hidden="true">&#8599;</span></Link>
        </div>
      </div>
    </section>

    <section className="section method-section" id="method" aria-labelledby="method-heading">
      <div className="page-frame">
        <div className="method-heading"><h2 id="method-heading">The work comes<br />before the fund.</h2><p>Forming a vehicle is one step. Knowing what to invest in, making decisions and communicating with investors take practice. That's what the program is built around.</p></div>
        <div className="method-ledger">
          {method.map(item => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p><div><strong>{item.output}</strong></div></article>)}
        </div>
      </div>
    </section>

    <section className="section vehicle-framework" id="vehicles" aria-labelledby="vehicles-heading">
      <div className="page-frame">
        <div className="framework-heading"><h2 id="vehicles-heading">Choose a vehicle that fits.</h2><p>We start with your strategy and the people you expect to invest with. Then we work through the options. The structure should support the work you are ready to do.</p></div>
        <div className="vehicle-gallery">
          {vehicles.map(vehicle => <article className={`vehicle-object vehicle-object--${vehicle.type}`} key={vehicle.title}>
            <div className="vehicle-object__visual"><VehicleArtwork type={vehicle.type} /></div>
            <div className="vehicle-object__copy"><h3>{vehicle.title}</h3><p>{vehicle.summary}</p></div>
            <dl><div><dt>Used for</dt><dd>{vehicle.use}</dd></div><div><dt>Builds a record of</dt><dd>{vehicle.record}</dd></div></dl>
          </article>)}
        </div>
        <p className="section-note">These are starting points, not a required sequence. A single deal may use an SPV. The right structure and any legal requirements need to be worked through with qualified advisers.</p>
      </div>
    </section>

    <section className="section record-section-v3" id="record" aria-labelledby="record-heading">
      <div className="page-frame">
        <div className="record-heading-v3"><h2 id="record-heading">Show how<br />you invest.</h2><p>Performance matters. So does the work behind it. Keep the reasoning, approvals, capital movements and investor updates that explain your decisions.</p></div>
        <RecordArchive />
      </div>
    </section>

    <section className="section manager-fit" id="program" aria-labelledby="fit-heading">
      <div className="page-frame editorial-split"><h2 id="fit-heading">Who the program is for.</h2><div className="editorial-body"><p>Experienced professionals with a clear area of expertise and the ambition to manage capital. You might be an operator, founder, angel investor or specialist who sees opportunities others miss.</p><p>You don't need a finished fund plan. You do need a point of view, a willingness to do the work, and time to put what you learn into practice.</p><Link className="text-link" to="/apply?interest=emerging-manager">Tell us about your plans <span aria-hidden="true">&#8599;</span></Link></div></div>
    </section>

    <section className="section manager-questions" aria-labelledby="questions-heading">
      <div className="page-frame questions-layout"><h2 id="questions-heading">Before we talk.</h2><div className="questions-list">
        <details><summary>Do I need to choose a vehicle first?</summary><p>No. Share your experience and what you're considering. Choosing an appropriate first vehicle is part of the work.</p></details>
        <details><summary>Will Iron Key raise capital for me?</summary><p>The program provides education and preparation. It does not raise capital on your behalf or promise investor introductions, commitments or financial results.</p></details>
        <details><summary>Does the program replace legal or tax advice?</summary><p>No. You'll need qualified advisers for legal, tax and compliance matters. The program helps you prepare to have those conversations.</p></details>
        <details><summary>What should I bring to the first conversation?</summary><p>Your background, the market or opportunities you know well, and a sense of what you'd like to build. An early thesis is enough to start the discussion.</p></details>
      </div></div>
    </section>

    <section className="section conversation-close" aria-labelledby="manager-close-heading"><div className="page-frame"><h2 id="manager-close-heading">Tell us what you have in mind.</h2><div><p>Your experience and investment point of view are a useful place to start.</p><Link className="button button-dark" to="/apply?interest=emerging-manager">Start a conversation <span aria-hidden="true">&#8599;</span></Link></div></div></section>
  </div>
}
