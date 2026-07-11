import { useState, useEffect } from 'react'
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
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #e2e5ea' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={logo} alt="Free My Query" style={{ width: 32, height: 32, borderRadius: 8, display: 'block', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1C2333', fontSize: 18, letterSpacing: '-0.02em' }}>
            Free My Query
          </span>
        </div>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hide-mobile">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ color: '#6b7280', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#1C2333')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>
              {l}
            </a>
          ))}
        </div>

        {/* Login + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }} className="hide-mobile">
          {isLoggedIn ? (
            <button onClick={onAccountClick}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1C2333', color: '#ffffff', fontWeight: 600, fontSize: 14, padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#2E3A52')}
              onMouseLeave={e => (e.currentTarget.style.background = '#1C2333')}>
              Account <ChevronRight size={16} />
            </button>
          ) : (
            <>
              <button onClick={onLoginClick} style={{
                background: 'none', border: 'none', color: '#6b7280', fontSize: 14,
                cursor: 'pointer', transition: 'color 0.2s', padding: 0,
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1C2333')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>
                Log In
              </button>
              <button onClick={onSignUpClick}
                style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1C2333', color: '#ffffff', fontWeight: 600, fontSize: 14, padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#2E3A52')}
                onMouseLeave={e => (e.currentTarget.style.background = '#1C2333')}>
                Subscribe <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(v => !v)} className="show-mobile"
          style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: 4 }}>
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#f7f8fa', borderBottom: '1px solid #e2e5ea', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ color: '#6b7280', fontSize: 14, textDecoration: 'none' }}>
              {l}
            </a>
          ))}
          {isLoggedIn ? (
            <button onClick={() => { setMenuOpen(false); onAccountClick() }}
              style={{ background: '#1C2333', color: '#ffffff', fontWeight: 600, fontSize: 14, padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'center' }}>
              Account
            </button>
          ) : (
            <>
              <button onClick={() => { setMenuOpen(false); onLoginClick() }}
                style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: 14, textAlign: 'left', cursor: 'pointer', padding: 0 }}>
                Log In
              </button>
              <button onClick={() => { setMenuOpen(false); onSignUpClick() }}
                style={{ background: '#1C2333', color: '#ffffff', fontWeight: 600, fontSize: 14, padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'center' }}>
                Subscribe
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 64,
      backgroundImage: `
        linear-gradient(rgba(28,35,51,0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(28,35,51,0.045) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
    }}>
      <div style={{ position: 'relative', maxWidth: 1152, margin: '0 auto', padding: '48px 24px 56px' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 48, alignItems: 'center' }}>

          {/* Copy */}
          <div className="hero-copy" style={{ textAlign: 'left' }}>
            <h1 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(38px, 5vw, 60px)',
              lineHeight: 1.08, letterSpacing: '-0.03em',
              color: '#1C2333', margin: 0,
              animation: 'fadeUp 0.7s 0.1s ease both',
            }}>
              Your MySQL,{' '}
              <span style={{ color: '#1C2333' }}>finally</span>
              {' '}makes sense
            </h1>

            <p style={{
              marginTop: 18, color: '#6b7280',
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
                background: '#1C2333', color: '#ffffff',
                fontWeight: 600, fontSize: 15,
                padding: '12px 24px', borderRadius: 12,
                textDecoration: 'none', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#2E3A52'; e.currentTarget.style.transform = 'scale(1.03)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1C2333'; e.currentTarget.style.transform = 'scale(1)' }}>
                Get Started <ChevronRight size={18} />
              </a>
              <a href="#screenshots" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#f7f8fa', border: '1px solid #e2e5ea', color: '#1C2333',
                fontWeight: 500, fontSize: 15,
                padding: '12px 24px', borderRadius: 12,
                textDecoration: 'none', transition: 'all 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#c7cbd3')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#e2e5ea')}>
                See it in action
              </a>
            </div>

            <p style={{ marginTop: 14, fontSize: 12, color: '#6b7280', animation: 'fadeUp 0.7s 0.4s ease both' }}>
              Works offline · Windows desktop app · Connects to localhost or remote MySQL
            </p>
          </div>

          {/* Screenshot */}
          <div style={{ position: 'relative', width: '100%', animation: 'fadeUp 0.7s 0.5s ease both' }}>
            <div style={{ background: '#f7f8fa', border: '1px solid #e2e5ea', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 50px rgba(28,35,51,0.1)' }}>
              {/* Window bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: '1px solid #e2e5ea', background: '#f0f1f4' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
                </div>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#6b7280', marginLeft: 8 }}>
                  Free My Query — clinic_test
                </span>
              </div>
              <img src="/screenshot-er.png" alt="ER Diagram" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  { icon: GitBranch, color: '#1C2333', title: 'Live ER Diagrams',    desc: 'Your full schema renders as an interactive ER diagram the moment you connect. Drag, zoom, and explore every table and FK visually.' },
  { icon: Table2,    color: '#0ea5e9', title: 'No-SQL Data Editing', desc: 'Click any table to view its data in a clean spreadsheet. Insert rows with auto-generated forms that detect FK fields and give you dropdown selectors.' },
  { icon: Code2,     color: '#a78bfa', title: 'Code Generator',      desc: 'Generate production-ready login and auth code from your schema. Pick your identifier and password field — get Java/BCrypt code instantly.' },
  { icon: Layers,    color: '#fb923c', title: 'Multi-Schema',        desc: 'Switch between all your local schemas in one sidebar. Perfect for juggling bank_test, company, hotel_test, and more without losing your place.' },
  { icon: Zap,       color: '#facc15', title: 'Instant Connection',  desc: 'Connect to localhost or any remote MySQL instance. Store credentials securely. Reconnect in one click.' },
  { icon: Shield,    color: '#34d399', title: 'Fully Offline',       desc: 'Works without an internet connection. Your database data never leaves your machine — no cloud sync, ever.' },
]

function Features() {
  return (
    <section id="features" style={{ padding: '64px 0', borderTop: '1px solid #e2e5ea' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Features
          </span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#1C2333', marginTop: 16, lineHeight: 1.15 }}>
            Everything your schema needs.{' '}
            <span style={{ color: '#1C2333' }}>Nothing it doesn't.</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {features.map(f => (
            <div key={f.title}
              style={{ padding: 28, background: '#f7f8fa', border: '1px solid #e2e5ea', borderRadius: 20, transition: 'all 0.2s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(28,35,51,0.3)'; e.currentTarget.style.background = '#eef0f3' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e5ea'; e.currentTarget.style.background = '#f7f8fa' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: `${f.color}18` }}>
                <f.icon size={20} color={f.color} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#1C2333', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Screenshots ──────────────────────────────────────────────────────────────
const shots = [
  { img: '/screenshot-er.png',     label: 'ER Diagram',     title: 'See your entire schema at a glance',   desc: 'Every table, every FK, every relationship — rendered as a draggable, zoomable diagram. No setup required.' },
  { img: '/screenshot-data.png',   label: 'Data Explorer',  title: 'Browse and edit data without SQL',     desc: 'Click any table to inspect rows. The inline view shows all columns, data types, and live data.' },
  { img: '/screenshot-insert.png', label: 'Row Insertion',  title: 'Insert rows with smart forms',         desc: 'FK fields auto-detect and show you a dropdown of valid references. No more looking up IDs manually.' },
  { img: '/screenshot-login.png',  label: 'Code Generator', title: 'Generate auth code from your schema',  desc: 'Pick your email and password columns, hit Generate, get a complete BCrypt login system for your Java project.' },
]

function Screenshots() {
  const [active, setActive] = useState(0)
  return (
    <section id="screenshots" style={{ padding: '64px 0', borderTop: '1px solid #e2e5ea' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Screenshots
          </span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#1C2333', marginTop: 16, lineHeight: 1.15 }}>
            Built for <span style={{ color: '#1C2333' }}>real workflows</span>
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
          {shots.map((s, i) => (
            <button key={s.label} onClick={() => setActive(i)} style={{
              padding: '8px 18px', borderRadius: 10, fontSize: 14, fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.2s', border: '1px solid',
              background: active === i ? '#1C2333' : '#f7f8fa',
              color: active === i ? '#ffffff' : '#6b7280',
              borderColor: active === i ? '#1C2333' : '#e2e5ea',
            }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40, alignItems: 'start' }} className="screenshots-grid">
          {/* Window */}
          <div style={{ background: '#f7f8fa', border: '1px solid #e2e5ea', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 50px rgba(28,35,51,0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: '1px solid #e2e5ea', background: '#f0f1f4' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
              </div>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#6b7280', marginLeft: 8 }}>Free My Query</span>
            </div>
            <img key={active} src={shots[active].img} alt={shots[active].title} style={{ width: '100%', display: 'block', animation: 'fadeUp 0.35s ease both' }} />
          </div>

          {/* Caption */}
          <div style={{ paddingTop: 16 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(28,35,51,0.1)', border: '1px solid rgba(28,35,51,0.2)', borderRadius: 999, padding: '4px 12px', marginBottom: 16 }}>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#1C2333' }}>{shots[active].label}</span>
            </div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 26, color: '#1C2333', lineHeight: 1.3, marginBottom: 16 }}>
              {shots[active].title}
            </h3>
            <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.75 }}>{shots[active].desc}</p>
            {/* Dot nav */}
            <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
              {shots.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  height: 6, borderRadius: 3, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  width: active === i ? 32 : 12,
                  background: active === i ? '#1C2333' : '#e2e5ea',
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
// ─── V2 Changelog ─────────────────────────────────────────────────────────────
function V2Changelog() {
  const [active, setActive] = useState(0)
  const [prev2, setPrev2] = useState<number | null>(null)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragDelta, setDragDelta] = useState(0)

  const changes = [
    {
      title: 'Improved Layout Algorithm',
      desc: 'Smarter force-directed positioning keeps related tables closer together with far less overlap out of the box. Tables that share foreign keys are pulled toward each other automatically.',
      img: '/layout.png',
    },
    {
      title: 'Upgraded Schema Sidebar',
      desc: 'Collapsible sections, inline search, table count badges, and separate Local / Remote schema groups. Generate login code right from the schema context menu — no need to dig into each table.',
      img: '/sidebar.png',
    },
    {
      title: 'Integrated Feedback System',
      desc: 'Send feedback with a star rating directly from inside the app — no browser, no email client, no interruption to your workflow. Beta feedback shapes what gets built next.',
      img: '/feedback.png',
    },
    {
      title: 'Redesigned Login Screen',
      desc: 'Connection profiles, separate Host and Port fields, User Initials, and a cleaner layout make connecting to local or remote MySQL instant. Save multiple profiles and switch between them in one click.',
      img: '/login.png',
    },
  ]

  const goTo = (i: number, dir: 'left' | 'right') => {
    setPrev2(active)
    setDirection(dir)
    setActive((i + changes.length) % changes.length)
  }
  const goPrev = () => goTo(active - 1, 'left')
  const goNext = () => goTo(active + 1, 'right')

  const onMouseDown = (e: React.MouseEvent) => { setDragging(true); setStartX(e.clientX); setDragDelta(0) }
  const onMouseMove = (e: React.MouseEvent) => { if (dragging) setDragDelta(e.clientX - startX) }
  const onMouseUp = () => {
    if (!dragging) return
    if (dragDelta < -60) goNext()
    else if (dragDelta > 60) goPrev()
    setDragging(false); setDragDelta(0)
  }
  const onTouchStart = (e: React.TouchEvent) => { setDragging(true); setStartX(e.touches[0].clientX); setDragDelta(0) }
  const onTouchMove = (e: React.TouchEvent) => { if (dragging) setDragDelta(e.touches[0].clientX - startX) }
  const onTouchEnd = () => {
    if (!dragging) return
    if (dragDelta < -60) goNext()
    else if (dragDelta > 60) goPrev()
    setDragging(false); setDragDelta(0)
  }

  const enterAnim = direction === 'right' ? 'slideInFromRight' : 'slideInFromLeft'
  const exitAnim  = direction === 'right' ? 'slideOutToLeft'  : 'slideOutToRight'

  return (
    <>
      <style>{`
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutToLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-60px); }
        }
        @keyframes slideOutToRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(60px); }
        }
      `}</style>

      <section style={{ padding: '56px 0', borderTop: '1px solid #e2e5ea' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>

          {/* Header + nav centered together */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(28,35,51,0.1)', border: '1px solid rgba(28,35,51,0.25)', borderRadius: 999, padding: '5px 16px', marginBottom: 16 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#1C2333', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#1C2333', fontWeight: 600 }}>v2.0 — What's New</span>
            </div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#1C2333', lineHeight: 1.15 }}>
              A much better <span style={{ color: '#1C2333' }}>everything.</span>
            </h2>
            <p style={{ marginTop: 12, color: '#6b7280', fontSize: 15, marginBottom: 32 }}>
              Every part of the app got a meaningful upgrade in v2.
            </p>

            {/* Nav arrows + dots centered under title */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <button onClick={goPrev} style={{
                width: 40, height: 40, borderRadius: '50%', border: '1px solid #e2e5ea',
                background: '#f7f8fa', color: '#1C2333', fontSize: 16, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(28,35,51,0.4)'; e.currentTarget.style.background = '#eef0f3' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e5ea'; e.currentTarget.style.background = '#f7f8fa' }}>
                ←
              </button>

              <div style={{ display: 'flex', gap: 8 }}>
                {changes.map((_, i) => (
                  <button key={i} onClick={() => goTo(i, i > active ? 'right' : 'left')} style={{
                    height: 6, borderRadius: 3, border: 'none', cursor: 'pointer',
                    transition: 'all 0.2s', padding: 0,
                    width: active === i ? 32 : 12,
                    background: active === i ? '#1C2333' : '#e2e5ea',
                  }} />
                ))}
              </div>

              <button onClick={goNext} style={{
                width: 40, height: 40, borderRadius: '50%', border: '1px solid #e2e5ea',
                background: '#f7f8fa', color: '#1C2333', fontSize: 16, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(28,35,51,0.4)'; e.currentTarget.style.background = '#eef0f3' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e5ea'; e.currentTarget.style.background = '#f7f8fa' }}>
                →
              </button>
            </div>
          </div>

          {/* Slide area — overflow hidden so exit anim doesn't show */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>

            {/* Exiting slide */}
            {prev2 !== null && prev2 !== active && (
              <div key={`exit-${prev2}`} style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start',
                animation: `${exitAnim} 0.35s cubic-bezier(0.22,1,0.36,1) both`,
                pointerEvents: 'none',
              }} className="screenshots-grid">
                <div style={{ borderRadius: 16, background: '#f7f8fa', border: '1px solid #e2e5ea', overflow: 'hidden', maxHeight: 520 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: '1px solid #e2e5ea', background: '#f0f1f4' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
                    </div>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#6b7280', marginLeft: 8 }}>Free My Query</span>
                  </div>
                  <div style={{ background: '#e8e8e8', overflow: 'hidden', maxHeight: 480 }}>
                    <img src={changes[prev2].img} alt="" draggable={false} style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top', maxHeight: 480 }} />
                  </div>
                </div>
                <div style={{ paddingTop: 0 }}>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 36px)', color: '#1C2333', lineHeight: 1.2, marginBottom: 18 }}>
                    {changes[prev2].title}
                  </h3>
                  <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.85 }}>{changes[prev2].desc}</p>
                </div>
              </div>
            )}

            {/* Entering slide */}
            <div key={`enter-${active}`} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start',
              animation: `${enterAnim} 0.4s cubic-bezier(0.22,1,0.36,1) both`,
            }} className="screenshots-grid">

              {/* Image */}
              <div
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                style={{
                  borderRadius: 16, background: '#f7f8fa', border: '1px solid #e2e5ea',
                  boxShadow: '0 20px 50px rgba(28,35,51,0.12)', overflow: 'hidden',
                  cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none', maxHeight: 520,
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: '1px solid #e2e5ea', background: '#f0f1f4' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
                  </div>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#6b7280', marginLeft: 8 }}>Free My Query</span>
                </div>
                <div style={{ background: '#e8e8e8', overflow: 'hidden', maxHeight: 480 }}>
                  <img
                    src={changes[active].img}
                    alt={changes[active].title}
                    draggable={false}
                    style={{
                      width: '100%', display: 'block',
                      objectFit: 'cover', objectPosition: 'top', maxHeight: 480,
                      transform: dragging ? `translateX(${dragDelta * 0.06}px)` : 'translateX(0)',
                      transition: dragging ? 'none' : 'transform 0.3s',
                    }}
                  />
                </div>
              </div>

              {/* Text — top aligned */}
              <div style={{ paddingTop: 0 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(28,35,51,0.1)', border: '1px solid rgba(28,35,51,0.2)', borderRadius: 999, padding: '4px 14px', marginBottom: 20 }}>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#1C2333' }}>
                    {active + 1} of {changes.length}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 36px)', color: '#1C2333', lineHeight: 1.2, marginBottom: 18 }}>
                  {changes[active].title}
                </h3>
                <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.85 }}>
                  {changes[active].desc}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
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
    'No-SQL data management',
    'Code generator (Java / BCrypt)',
    'All future updates included',
    'Works offline — 7-day grace period',
    'Email support',
  ]

  return (
    <section id="pricing" style={{ padding: '64px 0', borderTop: '1px solid #e2e5ea' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Pricing</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#1C2333', marginTop: 16, lineHeight: 1.15 }}>
            One plan. <span style={{ color: '#1C2333' }}>Everything included.</span>
          </h2>
          <p style={{ marginTop: 12, color: '#6b7280', fontSize: 16 }}>Simple monthly pricing. Cancel whenever you want.</p>
        </div>

        {checkoutStatus === 'success' && (
          <div style={{ maxWidth: 800, margin: '0 auto 32px', background: 'rgba(28,35,51,0.08)', border: '1px solid rgba(28,35,51,0.25)', borderRadius: 14, padding: 20, textAlign: 'center' }}>
            <Check size={24} color="#1C2333" style={{ margin: '0 auto 8px' }} />
            <div style={{ color: '#1C2333', fontWeight: 600, fontSize: 14 }}>You're subscribed!</div>
            <p style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>Download the app below and sign in with the same email to activate it.</p>
          </div>
        )}
        {checkoutStatus === 'cancelled' && (
          <div style={{ maxWidth: 800, margin: '0 auto 32px', background: '#f7f8fa', border: '1px solid #e2e5ea', borderRadius: 14, padding: 20, textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: 13, margin: 0 }}>Checkout was cancelled — no charge was made.</p>
          </div>
        )}

        <div style={{ maxWidth: 440, margin: '0 auto' }}>

          {/* Subscribe card */}
          <div style={{ position: 'relative', padding: 36, background: '#f7f8fa', border: '1px solid rgba(28,35,51,0.4)', borderRadius: 24, boxShadow: '0 0 40px rgba(28,35,51,0.08)' }}>
            <div style={{ position: 'absolute', top: 16, right: 16, background: '#1C2333', color: '#ffffff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, letterSpacing: '0.05em' }}>
              PRO
            </div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 4 }}>Monthly subscription</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 56, color: '#1C2333', lineHeight: 1 }}>$10</span>
                <span style={{ color: '#6b7280', fontSize: 14, marginBottom: 8 }}>/ month</span>
              </div>
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Billed monthly · Cancel anytime</div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {included.map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#1C2333' }}>
                  <Check size={16} color="#1C2333" style={{ flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>

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
    <section id="faq" style={{ padding: '64px 0', borderTop: '1px solid #e2e5ea' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>FAQ</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#1C2333', marginTop: 16 }}>
            Common questions
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: '#f7f8fa', border: '1px solid #e2e5ea', borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s' }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: '100%', textAlign: 'left', padding: '18px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                background: 'none', border: 'none', cursor: 'pointer',
              }}>
                <span style={{ fontWeight: 500, color: '#1C2333', fontSize: 15, lineHeight: 1.4 }}>{faq.q}</span>
                <ChevronDown size={18} color="#6b7280" style={{ flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
              </button>
              {open === i && (
                <div style={{ padding: '0 24px 20px', fontSize: 14, color: '#6b7280', lineHeight: 1.75, borderTop: '1px solid #e2e5ea', paddingTop: 16 }}>
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
    <section style={{ padding: '64px 0', borderTop: '1px solid #e2e5ea' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Feedback</span>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#1C2333', marginTop: 16, marginBottom: 12 }}>
          Tell me what's <span style={{ color: '#1C2333' }}>missing.</span>
        </h2>
        <p style={{ color: '#6b7280', fontSize: 15, marginBottom: 32 }}>Beta feedback directly shapes what gets built next.</p>

        {!sent ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <textarea
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="What's broken, missing, or confusing?"
              rows={5}
              style={{
                background: '#f7f8fa', border: '1px solid #e2e5ea', borderRadius: 12,
                color: '#1C2333', fontSize: 14, padding: '14px 16px',
                resize: 'vertical', outline: 'none', fontFamily: 'inherit',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(28,35,51,0.4)')}
              onBlur={e => (e.currentTarget.style.borderColor = '#e2e5ea')}
            />
            <button onClick={handleSubmit} style={{
              background: '#1C2333', color: '#ffffff', fontWeight: 600,
              fontSize: 15, padding: '13px 0', borderRadius: 12,
              border: 'none', cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2E3A52'; e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1C2333'; e.currentTarget.style.transform = 'scale(1)' }}>
              Send Feedback
            </button>
          </div>
        ) : (
          <div style={{ background: 'rgba(28,35,51,0.08)', border: '1px solid rgba(28,35,51,0.25)', borderRadius: 14, padding: 32 }}>
            <Check size={32} color="#1C2333" style={{ margin: '0 auto 12px' }} />
            <div style={{ color: '#1C2333', fontWeight: 600 }}>Thanks — your mail client should have opened.</div>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e2e5ea', padding: '40px 0' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={logo} alt="Free My Query" style={{ width: 28, height: 28, borderRadius: 7, display: 'block' }} />
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#1C2333' }}>Free My Query</span>
        </div>
        <p style={{ fontSize: 13, color: '#6b7280', textAlign: 'center' }}>
          © 2026 Free My Query · Built for developers who love MySQL but hate SQL busywork.
        </p>
        <a href="mailto:hello@freemyquery.com"
          style={{ fontSize: 13, color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#1C2333')}
          onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>
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
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #ffffff; color: #1C2333; font-family: 'Instrument Sans', sans-serif; -webkit-font-smoothing: antialiased; }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #ffffff; }
      ::-webkit-scrollbar-thumb { background: #c7cbd3; border-radius: 3px; }
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
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        <Nav
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setView('login')}
          onSignUpClick={() => setView('signup')}
          onAccountClick={() => setView('account')}
        />
        <Hero />
        <Features />
        <Screenshots />
        <V2Changelog />
        <Pricing onNeedsAccount={() => setView('signup')} />
        <FAQ />
        <Feedback />
        <Footer />

      </div>
    </>
  )
}