export default function Legal({ type }: { type: 'privacy' | 'terms' }) {
  const privacy = type === 'privacy'

  return (
    <section className="legal-page">
      <div className="page-frame legal-wrap">
        <h1>{privacy ? 'Privacy notice' : 'Terms of use'}</h1>
        {privacy ? (
          <>
            <h2>Information collected</h2>
            <p>Iron Key may collect information submitted through contact forms, including contact details, professional background and the information you choose to share. Campaign attribution may be held in session storage and included with an inquiry. This version of the site does not add an analytics service.</p>
            <h2>How information is used</h2>
            <p>Information may be used to respond to inquiries, assess program interest and discuss ways to work together.</p>
            <h2>Contact</h2>
            <p>Questions about this privacy notice may be submitted through the website’s contact form.</p>
          </>
        ) : (
          <>
            <h2>Website information</h2>
            <p>This website describes Iron Key’s venture studio, investing activities and educational programs. Nothing on this website is investment, legal or tax advice, an offer of securities, a recommendation or a promise of results.</p>
            <h2>No guarantee</h2>
            <p>Participation, application or use of any resource does not guarantee acceptance into a program, a fund launch, investor interest, capital commitments or financial results.</p>
            <h2>Professional advice</h2>
            <p>Visitors remain responsible for obtaining appropriate legal, tax, regulatory and investment advice for their circumstances.</p>
          </>
        )}
      </div>
    </section>
  )
}
