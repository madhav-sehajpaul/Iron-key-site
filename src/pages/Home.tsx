import { Link } from 'react-router-dom'
import CityVideoBackground from '../components/CityVideoBackground'
import FishSection from '../components/FishSection'
import NeofundStory from '../components/NeofundStory'
import { portfolio } from '../data/firm'

export default function Home() {
  return <div className="home-v3 master-home">
    <section className="hero-cinema master-hero" aria-labelledby="home-heading">
      <CityVideoBackground />
      <div className="page-frame hero-cinema__content">
        <h1 id="home-heading">Building for the next<br className="hero-line-break" /> billion <span className="keep-together">on-chain.</span></h1>
        <p className="hero-cinema__lead">Building and investing in the on-chain economy. We work with founders and help emerging managers build investment firms.</p>
        <div className="hero-actions">
          <Link className="button button-light" to="/apply">Start a conversation <span aria-hidden="true">&#8599;</span></Link>
          <a className="text-link light" href="#studio">Explore our work <span aria-hidden="true">&#8595;</span></a>
        </div>
      </div>
    </section>

    <section className="section studio-section" id="studio" aria-labelledby="studio-heading">
      <div className="page-frame">
        <div className="editorial-split">
          <h2 id="studio-heading">We build companies.<br />We back founders.<br />We develop emerging managers.</h2>
          <div className="editorial-body">
            <p>Since 2022, we've brought founders, investors and operators together to work on the on-chain future.</p>
            <p>We research the market, invest in early-stage companies and build new ones through our venture studio. Our venture partners contribute to sourcing, diligence and the work of building a company.</p>
            <p>We also help experienced investors become fund managers, from shaping a thesis to choosing a first vehicle and building a track record.</p>
          </div>
        </div>
        <div className="studio-practices">
          <article><h3>Venture studio</h3><p>We work with founders to turn a problem worth solving into a company. Research helps us decide what to build. Operators help bring it to life.</p><Link className="text-link" to="/apply?interest=founder">Build with us <span aria-hidden="true">&#8599;</span></Link></article>
          <article><h3>Venture investing</h3><p>We back early-stage companies working on the infrastructure and applications that can bring more people on-chain.</p><a className="text-link" href="#portfolio">Meet the companies <span aria-hidden="true">&#8595;</span></a></article>
          <article><h3>Emerging managers</h3><p>We help investors with real market expertise launch their first vehicle, build a disciplined process and keep a record others can examine.</p><a className="text-link" href="#managers">See the program <span aria-hidden="true">&#8595;</span></a></article>
        </div>
      </div>
    </section>

    <section className="section manager-invitation" id="managers" aria-labelledby="manager-heading">
      <div className="page-frame editorial-split">
        <h2 id="manager-heading">Build the manager<br />before the fund.</h2>
        <div className="editorial-body">
          <p>A good investment thesis needs work behind it. Our emerging-manager program helps you choose a first vehicle, develop your process and keep a record of your decisions.</p>
          <p>We start with your experience and the opportunities you understand. Then we work on what it takes to manage capital responsibly.</p>
          <Link className="button button-light" to="/emerging-managers">Explore the program <span aria-hidden="true">&#8599;</span></Link>
        </div>
      </div>
    </section>

    <section className="section neofund-thesis" id="neofund" aria-labelledby="neofund-heading">
      <NeofundStory />
    </section>

    <FishSection />

    <section className="section portfolio-section" id="portfolio" aria-labelledby="portfolio-heading">
      <div className="page-frame">
        <div className="directory-heading">
          <h2 id="portfolio-heading">Our portfolio.</h2>
          <p>Six companies we're building and backing.</p>
        </div>
        <div className="portfolio-directory">
          {portfolio.map(company => {
            const content = <><h3>{company.name}</h3><div className="portfolio-description"><p>{company.description}</p><span>{company.category}</span></div><span className="directory-arrow" aria-hidden="true">{company.href.startsWith('/') ? '↑' : '↗'}</span></>
            return company.href.startsWith('/')
              ? <Link className="portfolio-entry" key={company.name} to={company.href} aria-label={`${company.name}: ${company.description}`}>{content}</Link>
              : <a className="portfolio-entry" key={company.name} href={company.href} target="_blank" rel="noopener noreferrer" aria-label={`${company.name}: ${company.description} Opens in a new tab.`}>{content}</a>
          })}
        </div>
      </div>
    </section>

    <section className="section conversation-close" aria-labelledby="conversation-heading">
      <div className="page-frame">
        <h2 id="conversation-heading">What are you working on?</h2>
        <div><p>Tell us about your company, your investment thesis, or the experience you'd like to bring to Iron Key.</p><Link className="button button-dark" to="/apply">Start a conversation <span aria-hidden="true">&#8599;</span></Link></div>
      </div>
    </section>
  </div>
}
