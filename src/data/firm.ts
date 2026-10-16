/**
 * Public company and partner details, reviewed 16 October 2026.
 * Sources and editorial qualifications are recorded in docs/CONTENT-SOURCES.md.
 * Keep relationship labels neutral until each investment/studio role is confirmed.
 */
export const portfolio = [
  { name: 'ProAgent', category: 'On-chain finance', description: 'AI agents for trading and managing liquidity on TON.', href: 'https://www.proagent.xyz/' },
  { name: '3thix', category: 'Payments', description: 'Payment infrastructure for businesses with complex payment needs.', href: 'https://3thix.com/' },
  { name: '3DOS', category: 'Manufacturing', description: 'A decentralized network connecting designs with on-demand manufacturing.', href: 'https://3dos.io/' },
  { name: 'MyStandard', category: 'Data ownership', description: 'A hiring platform that gives people control of their professional data.', href: 'https://mystandard.io/' },
  { name: 'Fish Network', category: 'Investment infrastructure', description: 'Tools for coordinating capital, ownership and investment decisions.', href: '/#fish' },
  { name: 'Enter the Void', category: 'NFT infrastructure', description: 'A protocol for building programmable NFT applications.', href: 'https://enterthevoid.io/' },
] as const

// Preserve the names and abbreviations used on the existing public website.
export const venturePartners = [
  { name: 'Joash L.', role: 'CEO', company: 'Sedifly' },
  { name: 'George K.', role: 'CEO', company: 'H2cryptO' },
  { name: 'Karishma S.', role: 'Strategic Advisor', company: '' },
  { name: 'Katherine V.', role: 'Investor & Advisor', company: '' },
  { name: 'Wesley T.', role: 'COO', company: 'WellPrepped Education' },
  { name: 'Ricker R.', role: 'Co-Founder', company: 'Contact VC' },
  { name: 'Thomas H.', role: 'Fractional CFO', company: 'EBITDA.Org' },
  { name: 'Raj M.', role: 'SVP', company: 'PayPal' },
  { name: 'Ling M.', role: 'CEO', company: 'Lucia Protocol' },
  { name: 'Kent G.', role: 'Software Engineer', company: '' },
] as const

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/company/iron-key/',
  x: 'https://x.com/ironkeycapital',
} as const
