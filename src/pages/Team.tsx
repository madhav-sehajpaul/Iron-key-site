import { Link } from 'react-router-dom'
import { venturePartners } from '../data/firm'

/** Founder profile and venture partners. More team members will be added here. */
export default function Team() {
  return <div className="team-page master-home">
    <section className="manager-page-hero team-hero" aria-labelledby="team-page-heading">
      <div className="page-frame">
        <h1 id="team-page-heading">Our team.</h1>
        <p className="team-hero__lead">The people building Iron Key, and the founders, operators and investors who work alongside us.</p>
      </div>
    </section>

    <section className="section people-section" id="people" aria-labelledby="founder-heading">
      <div className="page-frame">
        <div className="founder-profile" id="joseph-argiro">
          <div className="founder-name"><h2 id="founder-heading">Joseph Argiro.</h2><p>Founder of Iron Key</p></div>
          <div className="editorial-body founder-story">
            <p>Joseph's background spans company building, blockchain and investing. He was employee number two at ICO Alert and worked in Hewlett Packard Enterprise's blockchain innovation lab before founding Enter the Void and Iron Key.</p>
            <p>That experience shapes how we work: understand the problem, work with the people building a solution, and put capital behind the opportunities we believe in.</p>
          </div>
        </div>
        <div className="partners-header" id="venture-partners">
          <h2>Our venture partners.</h2>
          <p>Founders, operators and investors who help us evaluate opportunities and build companies.</p>
        </div>
        <ul className="partner-directory">
          {venturePartners.map(partner => <li key={partner.name}><h3>{partner.name}</h3><p>{partner.role}{partner.company && <><span className="partner-separator">, </span><span>{partner.company}</span></>}</p></li>)}
        </ul>
      </div>
    </section>

    <section className="section conversation-close" aria-labelledby="team-conversation-heading">
      <div className="page-frame">
        <h2 id="team-conversation-heading">Work with us.</h2>
        <div><p>Founders, investors and operators who want to build with Iron Key can start with a short note.</p><Link className="button button-dark" to="/apply?interest=venture-partner">Start a conversation <span aria-hidden="true">&#8599;</span></Link></div>
      </div>
    </section>
  </div>
}
