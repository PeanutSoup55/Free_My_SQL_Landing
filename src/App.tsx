import { useState, useEffect, useRef } from 'react'
import {
  GitBranch, Code2, Shield, Zap,
  ChevronRight, Check, Menu,
  Table2, Layers, ChevronDown, Download
} from 'lucide-react'
import { SubscribeButton } from './SubscribeButton'
import { supabase } from './supabaseClient'
import { SignUpPage } from './pages/SignUpPage'
import { LoginPage } from './pages/LoginPage'
import { AccountPage } from './pages/AccountPage'
import { DocsPage } from './pages/DocsPage'
import { SupportPage } from './pages/SupportPage'
import logo from './assets/logo.png'

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({
  isLoggedIn,
  onLoginClick,
  onSignUpClick,
  onAccountClick,
}: {
  isLoggedIn: boolean
  onLoginClick: () => void
  onSignUpClick: () => void
  onAccountClick: () => void
}) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = ['Features', 'Screenshots', 'Pricing', 'FAQ']

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s',
        background: scrolled ? 'rgba(8,12,20,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #1C2333' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={logo} alt="Free My Query" style={{ width: 32, height: 32, borderRadius: 8, display: 'block', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 18, letterSpacing: '-0.02em' }}>
            Free My Query
          </span>
        </div>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hide-mobile">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ color: '#A9B4C7', fontSize: 13, fontFamily: 'DM Mono, monospace', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#A9B4C7')}>
              /{l.toLowerCase()}
            </a>
          ))}
        </div>

        {/* Login + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }} className="hide-mobile">
          {isLoggedIn ? (
            <button onClick={onAccountClick}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#ffffff', color: '#080C14', fontWeight: 600, fontSize: 14, padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#A9B4C7')}
              onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}>
              Account <ChevronRight size={16} />
            </button>
          ) : (
            <>
              <button onClick={onLoginClick} style={{
                background: 'none', border: 'none', color: '#A9B4C7', fontSize: 14,
                cursor: 'pointer', transition: 'color 0.2s', padding: 0,
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#A9B4C7')}>
                Log In
              </button>
              <button onClick={onSignUpClick}
                style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#ffffff', color: '#080C14', fontWeight: 600, fontSize: 14, padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#A9B4C7')}
                onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}>
                Subscribe <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(v => !v)} className="show-mobile"
          style={{ background: 'none', border: 'none', color: '#A9B4C7', cursor: 'pointer', padding: 4 }}>
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#121723', borderBottom: '1px solid #1C2333', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ color: '#A9B4C7', fontSize: 14, fontFamily: 'DM Mono, monospace', textDecoration: 'none' }}>
              /{l.toLowerCase()}
            </a>
          ))}
          {isLoggedIn ? (
            <button onClick={() => { setMenuOpen(false); onAccountClick() }}
              style={{ background: '#ffffff', color: '#080C14', fontWeight: 600, fontSize: 14, padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'center' }}>
              Account
            </button>
          ) : (
            <>
              <button onClick={() => { setMenuOpen(false); onLoginClick() }}
                style={{ background: 'none', border: 'none', color: '#A9B4C7', fontSize: 14, textAlign: 'left', cursor: 'pointer', padding: 0 }}>
                Log In
              </button>
              <button onClick={() => { setMenuOpen(false); onSignUpClick() }}
                style={{ background: '#ffffff', color: '#080C14', fontWeight: 600, fontSize: 14, padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'center' }}>
                Subscribe
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

// ─── ER Diagram Background (decorative) ───────────────────────────────────────
// A quiet network of "tables" and "foreign keys" drifting behind the hero copy.
function ERBackground() {
  const nodes = [
    { x: 620, y: 70,  w: 92, h: 46, delay: 0,    dur: 7 },
    { x: 720, y: 210, w: 78, h: 40, delay: 0.6,  dur: 8.5 },
    { x: 560, y: 300, w: 100, h: 50, delay: 1.2, dur: 6.5 },
    { x: 690, y: 400, w: 84, h: 42, delay: 0.3,  dur: 9 },
    { x: 430, y: 40,  w: 70, h: 36, delay: 0.9,  dur: 7.5 },
    { x: 380, y: 220, w: 64, h: 34, delay: 1.5,  dur: 8 },
  ]
  const edges = [
    [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [2, 5],
  ]
  const center = (n: typeof nodes[number]) => ({ cx: n.x + n.w / 2, cy: n.y + n.h / 2 })

  return (
    <svg
      viewBox="0 0 800 480"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', top: 0, right: 0, width: '65%', height: '100%', opacity: 0.55, pointerEvents: 'none' }}
    >
      {edges.map(([a, b], i) => {
        const p1 = center(nodes[a])
        const p2 = center(nodes[b])
        return (
          <line key={i} x1={p1.cx} y1={p1.cy} x2={p2.cx} y2={p2.cy}
            stroke="#1C2333" strokeWidth={1.5} />
        )
      })}
      {nodes.map((n, i) => (
        <g key={i} style={{
          animation: `erFloat ${n.dur}s ${n.delay}s ease-in-out infinite`,
          transformOrigin: `${n.x + n.w / 2}px ${n.y + n.h / 2}px`,
        }}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={8}
            fill="#121723" stroke="#1C2333" strokeWidth={1.5} />
          <rect x={n.x} y={n.y} width={n.w} height={n.h * 0.32} rx={8}
            fill="#1C2333" />
          <circle cx={n.x + 12} cy={n.y + n.h * 0.16} r={2.5} fill="#A9B4C7" />
        </g>
      ))}
    </svg>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [mouse, setMouse] = useState({ x: 50, y: 30 })

  return (
    <section
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMouse({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 64,
        background: '#080C14',
        backgroundImage: `
          linear-gradient(rgba(169,180,199,0.045) 1px, transparent 1px),
          linear-gradient(90deg, rgba(169,180,199,0.045) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}>

      {/* cursor-following glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(169,180,199,0.07), transparent 65%)`,
        transition: 'background 0.15s ease-out',
      }} />

      <ERBackground />

      <div style={{ position: 'relative', maxWidth: 1152, margin: '0 auto', padding: '48px 24px 56px' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 48, alignItems: 'center' }}>

          {/* Copy */}
          <div className="hero-copy" style={{ textAlign: 'left', position: 'relative' }}>
            {/* ghost watermark */}
            <div aria-hidden style={{
              position: 'absolute', top: -36, left: -8, right: 0,
              fontFamily: 'DM Mono, monospace', fontSize: 'clamp(20px, 2.6vw, 30px)',
              color: 'rgba(169,180,199,0.1)', whiteSpace: 'nowrap', letterSpacing: '-0.02em',
              userSelect: 'none', zIndex: 0,
            }}>
              SELECT * FROM sanity;
            </div>

            <h1 style={{
              position: 'relative', zIndex: 1,
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(38px, 5vw, 60px)',
              lineHeight: 1.08, letterSpacing: '-0.03em',
              color: '#ffffff', margin: 0,
              animation: 'fadeUp 0.7s 0.1s ease both',
            }}>
              Your MySQL,{' '}
              <span style={{ color: '#A9B4C7' }}>finally</span>
              {' '}makes sense
            </h1>

            <p style={{
              marginTop: 18, color: '#A9B4C7',
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              lineHeight: 1.65, maxWidth: 480,
              animation: 'fadeUp 0.7s 0.2s ease both',
            }}>
              Visualize, edit, and manage your entire MySQL schema — no SQL required.
              Interactive ER diagrams that update in real time as your database evolves.
            </p>

            <div className="hero-ctas" style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap', animation: 'fadeUp 0.7s 0.3s ease both' }}>
              <a href="#pricing" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#ffffff', color: '#080C14',
                fontWeight: 600, fontSize: 15,
                padding: '12px 24px', borderRadius: 12,
                textDecoration: 'none', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#A9B4C7'; e.currentTarget.style.transform = 'scale(1.03)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.transform = 'scale(1)' }}>
                Get Started <ChevronRight size={18} />
              </a>
              <a href="#screenshots" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#121723', border: '1px solid #1C2333', color: '#ffffff',
                fontWeight: 500, fontSize: 15,
                padding: '12px 24px', borderRadius: 12,
                textDecoration: 'none', transition: 'all 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#A9B4C7')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#1C2333')}>
                See it in action
              </a>
            </div>

            <p style={{ marginTop: 14, fontSize: 12, fontFamily: 'DM Mono, monospace', color: '#A9B4C7', animation: 'fadeUp 0.7s 0.4s ease both' }}>
              works_offline · windows_desktop · localhost_or_remote
            </p>
          </div>

          {/* Screenshot */}
          <div style={{ position: 'relative', width: '100%', animation: 'fadeUp 0.7s 0.5s ease both' }}>
            <div style={{ background: '#121723', border: '1px solid #1C2333', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(169,180,199,0.06)' }}>
              <img src="/docs/schemas/diagram-view.png" alt="ER Diagram" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  { icon: GitBranch, id: 'T01', title: 'Live ER Diagrams',    desc: 'Your full schema renders as an interactive ER diagram the moment you connect. Drag, zoom, and explore every table and FK visually.' },
  { icon: Table2,    id: 'T02', title: 'No-SQL Data Editing', desc: 'Click any table to view its data in a clean spreadsheet. Insert rows with auto-generated forms that detect FK fields and give you dropdown selectors.' },
  { icon: Code2,     id: 'T03', title: 'Code Generator',      desc: 'Generate production-ready login and auth code from your schema. Pick your identifier and password field — get Java/BCrypt code instantly.' },
  { icon: Layers,    id: 'T04', title: 'Multi-Schema',        desc: 'Switch between all your local schemas in one sidebar. Perfect for juggling bank_test, company, hotel_test, and more without losing your place.' },
  { icon: Zap,       id: 'T05', title: 'Instant Connection',  desc: 'Connect to localhost or any remote MySQL instance. Store credentials securely. Reconnect in one click.' },
  { icon: Shield,    id: 'T06', title: 'Fully Offline',       desc: 'Works without an internet connection. Your database data never leaves your machine — no cloud sync, ever.' },
]

function Features() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="features" style={{ padding: '64px 0', borderTop: '1px solid #1C2333', background: '#080C14' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#A9B4C7', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Features
          </span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#ffffff', marginTop: 16, lineHeight: 1.15 }}>
            Everything your schema needs.{' '}
            <span style={{ color: '#A9B4C7' }}>Nothing it doesn't.</span>
          </h2>
        </div>
        <div ref={sectionRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {features.map((f, i) => (
            <div key={f.title}
              style={{
                padding: 28, background: '#121723', border: '1px solid #1C2333', borderRadius: 20,
                boxShadow: 'inset 0 1px 0 rgba(169,180,199,0.05)',
                cursor: 'default',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(22px)',
                transition: `opacity 0.6s ${i * 0.08}s ease, transform 0.6s ${i * 0.08}s ease, border-color 0.2s, background 0.2s`,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#A9B4C7'; e.currentTarget.style.background = '#1C2333' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1C2333'; e.currentTarget.style.background = '#121723' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1C2333' }}>
                  <f.icon size={20} color="#A9B4C7" strokeWidth={1.5} />
                </div>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#A9B4C7', opacity: 0.6, letterSpacing: '0.05em' }}>
                  {f.id}
                </span>
              </div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#ffffff', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#A9B4C7', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Screenshots ──────────────────────────────────────────────────────────────
const shots = [
  { img: '/docs/schemas/diagram-view.png', label: 'ER Diagram',     title: 'See your entire schema at a glance',   desc: 'Every table, every FK, every relationship — rendered as a draggable, zoomable diagram. No setup required.' },
  { img: '/docs/schemas/edit-table.png',   label: 'Data Explorer',  title: 'Browse and edit data without SQL',     desc: 'Click any table to inspect rows. The inline view shows all columns, data types, and live data.' },
  { img: '/docs/schemas/crud-data.png',    label: 'Row Insertion',  title: 'Insert rows with smart forms',         desc: 'FK fields auto-detect and show you a dropdown of valid references. No more looking up IDs manually.' },
  { img: '/docs/schemas/codegen.png',      label: 'Code Generator', title: 'Generate auth code from your schema',  desc: 'Pick your email and password columns, hit Generate, get a complete BCrypt login system for your Java project.' },
]

function Screenshots() {
  const [active, setActive] = useState(0)
  return (
    <section id="screenshots" style={{ padding: '64px 0', borderTop: '1px solid #1C2333', background: '#080C14' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#A9B4C7', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Screenshots
          </span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#ffffff', marginTop: 16, lineHeight: 1.15 }}>
            Built for <span style={{ color: '#A9B4C7' }}>real workflows</span>
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
          {shots.map((s, i) => (
            <button key={s.label} onClick={() => setActive(i)} style={{
              padding: '8px 18px', borderRadius: 10, fontSize: 13, fontFamily: 'DM Mono, monospace', fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.2s', border: '1px solid',
              background: active === i ? '#ffffff' : '#121723',
              color: active === i ? '#080C14' : '#A9B4C7',
              borderColor: active === i ? '#ffffff' : '#1C2333',
            }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40, alignItems: 'start' }} className="screenshots-grid">
          {/* Window */}
          <div style={{ background: '#121723', border: '1px solid #1C2333', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(169,180,199,0.06)' }}>
            <img key={active} src={shots[active].img} alt={shots[active].title} style={{ width: '100%', display: 'block', animation: 'fadeUp 0.35s ease both' }} />
          </div>

          {/* Caption */}
          <div style={{ paddingTop: 16 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#1C2333', border: '1px solid #A9B4C7', borderRadius: 999, padding: '4px 12px', marginBottom: 16 }}>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#ffffff' }}>{shots[active].label}</span>
            </div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 26, color: '#ffffff', lineHeight: 1.3, marginBottom: 16 }}>
              {shots[active].title}
            </h3>
            <p style={{ fontSize: 15, color: '#A9B4C7', lineHeight: 1.75 }}>{shots[active].desc}</p>
            {/* Dot nav */}
            <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
              {shots.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  height: 6, borderRadius: 3, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  width: active === i ? 32 : 12,
                  background: active === i ? '#ffffff' : '#1C2333',
                  padding: 0,
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    umami?: { track: (event: string) => void }
  }
}

function Pricing({ onNeedsAccount }: { onNeedsAccount: () => void }) {
  const [checkoutStatus, setCheckoutStatus] = useState<'success' | 'cancelled' | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const status = params.get('checkout')
    if (status === 'success' || status === 'cancelled') {
      setCheckoutStatus(status)
    }
  }, [])

  const included = [
    'Full desktop app (Windows)',
    'Unlimited schemas & tables',
    'Live ER diagram editor',
    'SSH support for existing tunnels',
    'No-SQL data management',
    'Code generator (Java / BCrypt)',
    'All future updates included',
    'Works offline — 7-day grace period',
    'Email support',
  ]

  return (
    <section id="pricing" style={{ padding: '64px 0', borderTop: '1px solid #1C2333', background: '#080C14' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#A9B4C7', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Pricing</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#ffffff', marginTop: 16, lineHeight: 1.15 }}>
            One plan. <span style={{ color: '#A9B4C7' }}>Everything included.</span>
          </h2>
          <p style={{ marginTop: 12, color: '#A9B4C7', fontSize: 16 }}>Simple monthly pricing. Cancel whenever you want.</p>
        </div>

        {checkoutStatus === 'success' && (
          <div style={{ maxWidth: 800, margin: '0 auto 32px', background: '#121723', border: '1px solid #A9B4C7', borderRadius: 14, padding: 20, textAlign: 'center' }}>
            <Check size={24} color="#ffffff" style={{ margin: '0 auto 8px' }} />
            <div style={{ color: '#ffffff', fontWeight: 600, fontSize: 14 }}>You're subscribed!</div>
            <p style={{ color: '#A9B4C7', fontSize: 13, marginTop: 4 }}>Download the app below and sign in with the same email to activate it.</p>
          </div>
        )}
        {checkoutStatus === 'cancelled' && (
          <div style={{ maxWidth: 800, margin: '0 auto 32px', background: '#121723', border: '1px solid #1C2333', borderRadius: 14, padding: 20, textAlign: 'center' }}>
            <p style={{ color: '#A9B4C7', fontSize: 13, margin: 0 }}>Checkout was cancelled — no charge was made.</p>
          </div>
        )}

        <div style={{ maxWidth: 460, margin: '0 auto' }}>

          {/* Subscribe card */}
          <div style={{ position: 'relative', padding: 36, background: '#121723', border: '1px solid #A9B4C7', borderRadius: 24, boxShadow: '0 0 40px rgba(169,180,199,0.08), inset 0 1px 0 rgba(169,180,199,0.06)' }}>
            <div style={{ position: 'absolute', top: 16, right: 16, background: '#ffffff', color: '#080C14', fontSize: 11, fontFamily: 'DM Mono, monospace', fontWeight: 700, padding: '4px 10px', borderRadius: 999, letterSpacing: '0.05em' }}>
              PRO
            </div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ color: '#A9B4C7', fontSize: 14, marginBottom: 4 }}>Monthly subscription</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontWeight: 700, fontSize: 52, color: '#ffffff', lineHeight: 1 }}>$10</span>
                <span style={{ color: '#A9B4C7', fontSize: 14, marginBottom: 8, fontFamily: 'DM Mono, monospace' }}>/mo</span>
              </div>
              <div style={{ fontSize: 12, color: '#A9B4C7', marginTop: 4 }}>Billed monthly · Cancel anytime</div>
            </div>

            {/* included as a query-result style table */}
            <div style={{ border: '1px solid #1C2333', borderRadius: 12, overflow: 'hidden', marginBottom: 28 }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 72px',
                padding: '8px 14px', background: '#1C2333',
                fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#A9B4C7',
                textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>
                <span>feature</span>
                <span style={{ textAlign: 'right' }}>status</span>
              </div>
              {included.map((item, i) => (
                <div key={item} style={{
                  display: 'grid', gridTemplateColumns: '1fr 72px',
                  alignItems: 'center', padding: '10px 14px',
                  background: i % 2 === 0 ? '#121723' : '#080C14',
                  borderTop: '1px solid #1C2333',
                }}>
                  <span style={{ fontSize: 13, color: '#ffffff' }}>{item}</span>
                  <span style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4,
                    fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#A9B4C7',
                  }}>
                    <Check size={13} color="#A9B4C7" /> true
                  </span>
                </div>
              ))}
            </div>

            <SubscribeButton priceLabel="$10/mo" onNeedsAccount={onNeedsAccount} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'What databases does Free My Query support?',  a: 'Currently MySQL only, connecting via JDBC. Localhost and remote connections are both supported. Credentials are stored securely in the app.' },
  { q: 'Does it work without internet?',              a: 'Yes. Your MySQL connection itself is always local — your schema data never leaves your machine. The app checks your subscription periodically, and if you\'re offline it keeps working for up to 7 days before asking you to reconnect.' },
  { q: 'Can I cancel anytime?',                       a: 'Yes. Cancel from your account at any time — you\'ll keep access until the end of the billing period you already paid for.' },
  { q: 'What\'s included in the subscription?',       a: 'Everything: the full app, unlimited schemas, the ER diagram editor, the code generator, and every future update — no separate upgrade fees.' },
  { q: 'What OS does it run on?',                      a: 'Currently Windows desktop. Mac and Linux builds are planned based on demand.' },
  { q: 'Can I use it on a production database?',      a: 'Yes — it reads live schema structure and data. Use with care on production. Read-only diagram mode is coming soon.' },
  { q: 'What is the code generator for?',              a: 'It generates Java auth code (login, register, BCrypt hashing) tailored to your actual schema — saves hours of boilerplate.' },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" style={{ padding: '64px 0', borderTop: '1px solid #1C2333', background: '#080C14' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#A9B4C7', textTransform: 'uppercase', letterSpacing: '0.15em' }}>FAQ</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#ffffff', marginTop: 16 }}>
            Common questions
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: '#121723', border: '1px solid #1C2333', borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s' }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: '100%', textAlign: 'left', padding: '18px 24px',
                display: 'flex', alignItems: 'center', gap: 12,
                background: 'none', border: 'none', cursor: 'pointer',
              }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#A9B4C7', opacity: 0.6, flexShrink: 0 }}>
                  row_{String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontWeight: 500, color: '#ffffff', fontSize: 15, lineHeight: 1.4, flex: 1 }}>{faq.q}</span>
                <ChevronDown size={18} color="#A9B4C7" style={{ flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
              </button>
              {open === i && (
                <div style={{ padding: '0 24px 20px 58px', fontSize: 14, color: '#A9B4C7', lineHeight: 1.75, borderTop: '1px solid #1C2333', paddingTop: 16 }}>
                  <span style={{ fontFamily: 'DM Mono, monospace', color: '#A9B4C7', opacity: 0.6, marginRight: 6 }}>→</span>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Feedback() {
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)

const handleSubmit = async () => {
  if (!msg.trim()) return
  await fetch('https://formspree.io/f/xvzyezqy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: msg })
  })
  setSent(true)
}

  return (
    <section style={{ padding: '64px 0', borderTop: '1px solid #1C2333', background: '#080C14' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#A9B4C7', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Feedback</span>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#ffffff', marginTop: 16, marginBottom: 12 }}>
          Tell me what's <span style={{ color: '#A9B4C7' }}>missing.</span>
        </h2>
        <p style={{ color: '#A9B4C7', fontSize: 15, marginBottom: 32 }}>Beta feedback directly shapes what gets built next.</p>

        {!sent ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <textarea
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="What's broken, missing, or confusing?"
              rows={5}
              style={{
                background: '#121723', border: '1px solid #1C2333', borderRadius: 12,
                color: '#ffffff', fontSize: 14, padding: '14px 16px',
                resize: 'vertical', outline: 'none', fontFamily: 'inherit',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#A9B4C7')}
              onBlur={e => (e.currentTarget.style.borderColor = '#1C2333')}
            />
            <button onClick={handleSubmit} style={{
              background: '#ffffff', color: '#080C14', fontWeight: 600,
              fontSize: 15, padding: '13px 0', borderRadius: 12,
              border: 'none', cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#A9B4C7'; e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.transform = 'scale(1)' }}>
              Send Feedback
            </button>
          </div>
        ) : (
          <div style={{ background: '#121723', border: '1px solid #A9B4C7', borderRadius: 14, padding: 32 }}>
            <Check size={32} color="#ffffff" style={{ margin: '0 auto 12px' }} />
            <div style={{ color: '#ffffff', fontWeight: 600 }}>Thanks — your mail client should have opened.</div>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #1C2333', padding: '40px 0', background: '#080C14' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={logo} alt="Free My Query" style={{ width: 28, height: 28, borderRadius: 7, display: 'block' }} />
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#ffffff' }}>Free My Query</span>
        </div>
        <p style={{ fontSize: 13, color: '#A9B4C7', textAlign: 'center' }}>
          © 2026 Free My Query · Built for developers who love MySQL but hate SQL busywork.
        </p>
        <a href="mailto:hello@freemyquery.com"
          style={{ fontSize: 13, color: '#A9B4C7', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={e => (e.currentTarget.style.color = '#A9B4C7')}>
          Contact
        </a>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
type View = 'landing' | 'signup' | 'login' | 'account' | 'docs' | 'support'

export default function App() {
  const [view, setView] = useState<View>('landing')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const globalStyles = (
    <style>{`
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50%       { transform: translateY(-10px); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.4; }
      }
      @keyframes erFloat {
        0%, 100% { transform: translate(0, 0); }
        50%       { transform: translate(6px, -10px); }
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #080C14; color: #ffffff; font-family: 'Instrument Sans', sans-serif; -webkit-font-smoothing: antialiased; }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #080C14; }
      ::-webkit-scrollbar-thumb { background: #1C2333; border-radius: 3px; }
      input, button { font-family: inherit; }
      @media (max-width: 768px) {
        .hide-mobile { display: none !important; }
        .show-mobile { display: flex !important; }
        .screenshots-grid { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 900px) {
        .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
        .hero-copy { text-align: center !important; }
        .hero-copy p { margin-left: auto; margin-right: auto; }
        .hero-ctas { justify-content: center !important; }
      }
      @media (min-width: 769px) {
        .show-mobile { display: none !important; }
      }
        @keyframes slideInRight {
        from { opacity: 0; transform: translateX(40px); }
        to   { opacity: 1; transform: translateX(0); }
      }
    `}</style>
  )

  if (view === 'signup') {
    return (
      <>
        {globalStyles}
        <SignUpPage
          onBack={() => setView('landing')}
          onGoToLogin={() => setView('login')}
          onSignedUpWithSession={() => setView('account')}
        />
      </>
    )
  }

  if (view === 'login') {
    return (
      <>
        {globalStyles}
        <LoginPage
          onBack={() => setView('landing')}
          onGoToSignUp={() => setView('signup')}
          onLoggedIn={() => setView('account')}
        />
      </>
    )
  }

  if (view === 'account') {
    return (
      <>
        {globalStyles}
        <AccountPage
          onBack={() => setView('landing')}
          onLoggedOut={() => setView('landing')}
          onNavigate={setView}
        />
      </>
    )
  }

  if (view === 'docs') {
    return (
      <>
        {globalStyles}
        <DocsPage
          onBack={() => setView('landing')}
          onLoggedOut={() => setView('landing')}
          onNavigate={setView}
        />
      </>
    )
  }

  if (view === 'support') {
    return (
      <>
        {globalStyles}
        <SupportPage
          onBack={() => setView('landing')}
          onLoggedOut={() => setView('landing')}
          onNavigate={setView}
        />
      </>
    )
  }

  return (
    <>
      {globalStyles}
      <div style={{ minHeight: '100vh', background: '#080C14' }}>
        <Nav
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setView('login')}
          onSignUpClick={() => setView('signup')}
          onAccountClick={() => setView('account')}
        />
        <Hero />
        <Features />
        <Screenshots />
        <Pricing onNeedsAccount={() => setView('signup')} />
        <FAQ />
        <Feedback />
        <Footer />

      </div>
    </>
  )
}