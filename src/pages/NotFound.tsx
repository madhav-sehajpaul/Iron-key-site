import { Link } from 'react-router-dom'
export default function NotFound() {
  return <section className="not-found"><div><h1>We can't find that page.</h1><p>The link may have changed. You can start again from the homepage.</p><Link className="button button-light" to="/">Back to Iron Key <span aria-hidden="true">&#8599;</span></Link></div></section>
}
