import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Small, dependency-free regression checks for the agreed content and structure.
// These complement TypeScript and Vite; they do not replace a browser or accessibility audit.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const read = path => readFileSync(join(root, path), 'utf8')
const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const path = join(directory, entry.name)
  return entry.isDirectory() ? walk(path) : [path]
})
const files = walk(join(root, 'src')).filter(path => /\.(tsx?|css)$/.test(path))
let checks = 0
function check(condition, message) {
  assert.ok(condition, message)
  checks += 1
  console.log(`PASS ${message}`)
}
for (const path of files) {
  const text = readFileSync(path, 'utf8')
  check(!/[\u2014]|&mdash;|&#8212;|&#x2014;|\\u2014/i.test(text), `No em dashes: ${path.slice(root.length + 1)}`)
}
const pageSources = walk(join(root, 'src/pages')).filter(path => path.endsWith('.tsx')).map(path => readFileSync(path, 'utf8')).join('\n')
check(!/className=["'][^"']*\b(?:eyebrow|section-kicker)\b/.test(pageSources), 'No repeated heading labels on pages')
const home = read('src/pages/Home.tsx')
check(home.includes('<CityVideoBackground />'), 'City video remains on the homepage')
check(home.includes('<NeofundStory />'), 'Neofund explanation and animation remain on the homepage')
check((home.match(/<FishSection\s*\/>/g) ?? []).length === 1, 'One dedicated Fish section on the homepage')
const layout = read('src/components/Layout.tsx')
const layout_has_team = () => /<nav aria-label="Iron Key team">[\s\S]*?to="\/team"/.test(layout)
const team = read('src/pages/Team.tsx')
check(team.includes('Joseph Argiro.') && team.includes('venturePartners.map'), 'Team page includes Joseph Argiro and venture partners')
check(!home.includes('venturePartners') && !/Joe Argiro/.test(home + team), 'Homepage has no team section; Joseph is never shortened to Joe')
check(layout_has_team(), 'Footer links to the team page')
check(home.includes('/emerging-managers'), 'Homepage links to the manager program')
const navigation = layout.match(/const navigation = \[([\s\S]*?)\]/)?.[1] ?? ''
check(navigation.length > 0 && !/fish|thesis/i.test(navigation), 'No Fish or Thesis navigation item')
check(navigation.includes('Emerging Managers'), 'Dedicated emerging-manager navigation item')
check(!layout.includes('to="/fish-network"') && !layout.includes('to="/#fish"'), 'No Fish link in the navigation or footer')
const data = read('src/data/firm.ts')
const portfolio = data.match(/export const portfolio = \[([\s\S]*?)\] as const/)?.[1] ?? ''
const partners = data.match(/export const venturePartners = \[([\s\S]*?)\] as const/)?.[1] ?? ''
check((portfolio.match(/name:/g) ?? []).length === 6, 'Six portfolio companies')
check((partners.match(/name:/g) ?? []).length === 10, 'Ten named venture partners')
const apply = read('src/pages/Apply.tsx')
check(apply.includes('VITE_APPLICATION_ENDPOINT') && apply.includes('disabled={!endpoint'), 'Contact form cannot submit without a configured endpoint')
check(/^VITE_APPLICATION_ENDPOINT=\s*$/m.test(read('.env.example')), 'Example configuration contains no production endpoint')
for (const asset of ['iron-key-mark.svg', 'iron-key-nyc-poster.jpg', 'iron-key-nyc-hero-forward.mp4', 'media/fish-koi-frames.webp']) {
  check(existsSync(join(root, 'public', asset)), `Original asset is bundled: ${asset}`)
}
check(read('src/components/NeofundStory.tsx').includes('NeofundLedgerFigure'), 'Original Neofund figure is used')
check(read('src/components/FishSection.tsx').includes('FishAsciiBackdrop'), 'Original Fish ASCII animation is used')
check(read('src/App.tsx').includes('<Navigate to="/#fish" replace />'), 'Old Fish route redirects to its homepage section')
check(read('public/_redirects').includes('/index.html'), 'Static host has an SPA fallback')
check(!existsSync(join(root, '.env')), 'No local endpoint or secrets file is packaged')
console.log(`\n${checks} content and structure checks passed.`)
