import { type FormEvent, useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const interests = [
  { value: 'founder', label: 'Building a company' },
  { value: 'investor', label: 'Investing with Iron Key' },
  { value: 'emerging-manager', label: 'The emerging-manager program' },
  { value: 'venture-partner', label: 'Becoming a venture partner' },
  { value: 'other', label: 'Something else' },
]
const endpoint = import.meta.env.VITE_APPLICATION_ENDPOINT?.trim() as string | undefined

export default function Apply() {
  const [params] = useSearchParams()
  const initialInterest = params.get('interest') ?? ''
  const [interest, setInterest] = useState(interests.some(item => item.value === initialInterest) ? initialInterest : '')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const requestRef = useRef<AbortController | null>(null)
  const isManager = interest === 'emerging-manager'
  useEffect(() => () => requestRef.current?.abort(), [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!endpoint || status === 'sending') return
    const form = event.currentTarget
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(new FormData(form))
    if (data.website) return
    delete data.website
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      try { data[key] = params.get(key) ?? sessionStorage.getItem(key) ?? '' } catch { data[key] = params.get(key) ?? '' }
    }
    const controller = new AbortController()
    requestRef.current = controller
    const timer = window.setTimeout(() => controller.abort(), 20000)
    setStatus('sending')
    try {
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal,
        body: JSON.stringify({ form: isManager ? 'incubator-interest' : 'iron-key-conversation', ...data }),
      })
      if (!response.ok) throw new Error('The server did not accept the submission.')
      form.reset()
      setInterest('')
      setStatus('success')
    } catch { setStatus('error') }
    finally { window.clearTimeout(timer); requestRef.current = null }
  }

  return <div className="application-page master-application">
    <section className="page-hero application-hero"><div className="page-frame"><h1>Let's talk.</h1><p className="application-hero__statement">A company you're building. An investment thesis. A way to work together.<span>Tell us a little about yourself and what you have in mind.</span></p></div></section>
    <section className="section paper-bright application-conversation" id="conversation" aria-label="Contact Iron Key">
      <div className="page-frame">
        {!endpoint && <p className="preview-notice" role="note">This preview isn't connected to an inbox yet. Nothing entered here will be sent. The contact form can be enabled when the site is ready to publish.</p>}
      </div>
      <form className="application-form page-frame" onSubmit={submit} aria-busy={status === 'sending'}>
        <div className="form-trap" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <fieldset disabled={status === 'sending'}><legend>Your details</legend><div className="form-grid">
          <label>Full name<input name="fullName" autoComplete="name" required maxLength={160} /></label>
          <label>Email address<input type="email" name="email" autoComplete="email" required maxLength={254} /></label>
          <label>Current role or organization <span className="optional">(optional)</span><input name="role" autoComplete="organization" maxLength={240} /></label>
          <label>LinkedIn profile <span className="optional">(optional)</span><input type="url" name="linkedin" placeholder="https://linkedin.com/in/yourname" maxLength={500} /></label>
        </div></fieldset>
        <fieldset disabled={status === 'sending'}><legend>What you have in mind</legend><div className="form-grid">
          <label className="wide">What would you like to discuss?<select name="interest" required value={interest} onChange={event => { setInterest(event.target.value); setStatus('idle') }}><option value="" disabled>Select a topic</option>{interests.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
          <label className="wide">{isManager ? 'What is your investment thesis or area of expertise?' : 'Tell us about your company, plans or question.'}<textarea name={isManager ? 'thesis' : 'message'} rows={5} required maxLength={6000} /></label>
          {isManager && <><label>What vehicle are you considering?<select name="vehicle" required defaultValue=""><option value="" disabled>Select a vehicle</option><option>Investment club</option><option>Single deal or syndicate</option><option>SPV</option><option>Fund</option><option>Not sure yet</option></select></label><label>When would you like to start?<select name="timeline" defaultValue=""><option value="">No date in mind</option><option>Within 6 months</option><option>6 to 18 months</option><option>Later</option></select></label></>}
        </div></fieldset>
        <label className="application-consent"><input type="checkbox" name="acknowledgement" required disabled={status === 'sending'} /><span>I agree that Iron Key may use these details to respond to my inquiry, as described in the <Link to="/privacy">privacy notice</Link>.</span></label>
        {isManager && <p className="form-boundary">The program provides education and preparation. It does not promise investor introductions, fundraising or financial results, and does not replace legal or tax advice.</p>}
        <button className="button button-dark submit-application" type="submit" disabled={!endpoint || status === 'sending'}>{status === 'sending' ? 'Sending...' : endpoint ? 'Send your message' : 'Preview only'} <span aria-hidden="true">&#8599;</span></button>
        <div className="form-status" role="status" aria-live="polite" aria-atomic="true">{status === 'success' && <p>Thanks. Your message has been sent to Iron Key.</p>}{status === 'error' && <p>Your message wasn't sent. Your details are still here. Please try again.</p>}</div>
      </form>
    </section>
  </div>
}
