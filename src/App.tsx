import { useState, useEffect } from 'react'
import {
  Database, GitBranch, Code2, Shield, Zap,
  ChevronRight, Check, X, Menu,
  Table2, Layers, Lock, ChevronDown, Download
} from 'lucide-react'

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
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
        background: scrolled ? 'rgba(10,12,15,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #232830' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#00d97e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Database size={16} color="#0a0c0f" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#e8edf5', fontSize: 18, letterSpacing: '-0.02em' }}>
            Free My Query
          </span>
        </div>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hide-mobile">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ color: '#6b7587', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e8edf5')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6b7587')}>
              {l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#pricing" className="hide-mobile"
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#00d97e', color: '#0a0c0f', fontWeight: 600, fontSize: 14, padding: '8px 16px', borderRadius: 8, textDecoration: 'none', transition: 'background 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#00c070')}
          onMouseLeave={e => (e.currentTarget.style.background = '#00d97e')}>
          Get Early Access <ChevronRight size={16} />
        </a>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(v => !v)} className="show-mobile"
          style={{ background: 'none', border: 'none', color: '#6b7587', cursor: 'pointer', padding: 4 }}>
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#111318', borderBottom: '1px solid #232830', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ color: '#6b7587', fontSize: 14, textDecoration: 'none' }}>
              {l}
            </a>
          ))}
          <a href="#pricing"
            style={{ background: '#00d97e', color: '#0a0c0f', fontWeight: 600, fontSize: 14, padding: '10px 16px', borderRadius: 8, textDecoration: 'none', textAlign: 'center' }}>
            Get Early Access
          </a>
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
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      paddingTop: 64,
      backgroundImage: `
        linear-gradient(rgba(35,40,48,0.5) 1px, transparent 1px),
        linear-gradient(90deg, rgba(35,40,48,0.5) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
    }}>
      {/* Glows */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 500, borderRadius: '50%', background: 'rgba(0,217,126,0.06)', filter: 'blur(120px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '25%', right: '25%', width: 400, height: 300, borderRadius: '50%', background: 'rgba(14,165,233,0.05)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: 1152, margin: '0 auto', padding: '80px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#111318', border: '1px solid #232830', borderRadius: 999, padding: '6px 16px', marginBottom: 32 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00d97e', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#6b7587' }}>
            Beta — Free to download · Free updates
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800,
          fontSize: 'clamp(42px, 7vw, 80px)',
          lineHeight: 1.05, letterSpacing: '-0.03em',
          color: '#e8edf5', margin: 0, maxWidth: 800,
          animation: 'fadeUp 0.7s 0.1s ease both',
        }}>
          Your MySQL,{' '}
          <span style={{ color: '#00d97e', textShadow: '0 0 40px rgba(0,217,126,0.4)' }}>finally</span>
          {' '}makes sense
        </h1>

        {/* Subhead */}
        <p style={{
          marginTop: 24, color: '#6b7587',
          fontSize: 'clamp(16px, 2vw, 20px)',
          lineHeight: 1.7, maxWidth: 560,
          animation: 'fadeUp 0.7s 0.2s ease both',
        }}>
          Visualize, edit, and manage your entire MySQL schema — no SQL required.
          Interactive ER diagrams that update in real time as your database evolves.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, marginTop: 40, flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp 0.7s 0.3s ease both' }}>
          <a href="#pricing" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#00d97e', color: '#0a0c0f',
            fontWeight: 600, fontSize: 16,
            padding: '14px 28px', borderRadius: 12,
            textDecoration: 'none', transition: 'all 0.2s',
            boxShadow: '0 0 30px rgba(0,217,126,0.25)',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#00c070'; e.currentTarget.style.transform = 'scale(1.03)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#00d97e'; e.currentTarget.style.transform = 'scale(1)' }}>
            Download Free <Download size={18} />
          </a>
          <a href="#screenshots" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#111318', border: '1px solid #232830', color: '#e8edf5',
            fontWeight: 500, fontSize: 16,
            padding: '14px 28px', borderRadius: 12,
            textDecoration: 'none', transition: 'all 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,217,126,0.4)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#232830')}>
            See it in action
          </a>
        </div>

        <p style={{ marginTop: 16, fontSize: 12, color: '#6b7587', animation: 'fadeUp 0.7s 0.4s ease both' }}>
          Works offline · Windows desktop app · Connects to localhost or remote MySQL
        </p>

        {/* Screenshot */}
        <div style={{ position: 'relative', marginTop: 64, width: '100%', maxWidth: 960, animation: 'fadeUp 0.7s 0.5s ease both' }}>
          <div style={{ position: 'absolute', inset: -1, borderRadius: 18, background: 'linear-gradient(to bottom, rgba(0,217,126,0.2), transparent)', pointerEvents: 'none' }} />
          <div style={{ background: '#111318', border: '1px solid #232830', borderRadius: 16, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}>
            {/* Window bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: '1px solid #232830', background: '#0e1115' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
              </div>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#6b7587', marginLeft: 8 }}>
                Free My Query — clinic_test
              </span>
            </div>
            <img src="/screenshot-er.png" alt="ER Diagram" style={{ width: '100%', display: 'block' }} />
          </div>


        </div>
      </div>
    </section>
  )
}

// ─── Problem ──────────────────────────────────────────────────────────────────
function Problem() {
  const items = [
    { icon: '🗺️', title: 'Schema blindness', desc: "Can't see how tables relate without writing queries or diagramming manually" },
    { icon: '⌨️', title: 'SQL overhead', desc: 'Every insert, edit, or structural change requires typing out syntax' },
    { icon: '🔍', title: 'No visual feedback', desc: 'FK relationships are invisible in standard clients until you dig for them' },
  ]
  return (
    <section id="problem" style={{ padding: '96px 0', borderTop: '1px solid #232830' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6b7587', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              The Problem
            </span>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1, color: '#e8edf5', marginTop: 16, marginBottom: 24 }}>
              MySQL schemas get{' '}
              <span style={{ color: '#00d97e' }}>messy.</span> Fast.
            </h2>
            <p style={{ color: '#6b7587', lineHeight: 1.8, marginBottom: 16, fontSize: 15 }}>
              Whether you're a solo developer with 15 test databases or a small team maintaining a production system, MySQL schemas sprawl in ways that become impossible to reason about.
            </p>
            <p style={{ color: '#6b7587', lineHeight: 1.8, fontSize: 15 }}>
              Tools like Workbench are overkill. SQL alone means constantly switching to documentation just to understand what you built.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 16, padding: 20, background: '#111318', border: '1px solid #232830', borderRadius: 16 }}>
                <span style={{ fontSize: 24, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#e8edf5', marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 14, color: '#6b7587', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  { icon: GitBranch, color: '#00d97e', title: 'Live ER Diagrams',    desc: 'Your full schema renders as an interactive ER diagram the moment you connect. Drag, zoom, and explore every table and FK visually.' },
  { icon: Table2,    color: '#0ea5e9', title: 'No-SQL Data Editing', desc: 'Click any table to view its data in a clean spreadsheet. Insert rows with auto-generated forms that detect FK fields and give you dropdown selectors.' },
  { icon: Code2,     color: '#a78bfa', title: 'Code Generator',      desc: 'Generate production-ready login and auth code from your schema. Pick your identifier and password field — get Java/BCrypt code instantly.' },
  { icon: Layers,    color: '#fb923c', title: 'Multi-Schema',        desc: 'Switch between all your local schemas in one sidebar. Perfect for juggling bank_test, company, hotel_test, and more without losing your place.' },
  { icon: Zap,       color: '#facc15', title: 'Instant Connection',  desc: 'Connect to localhost or any remote MySQL instance. Store credentials securely. Reconnect in one click.' },
  { icon: Shield,    color: '#34d399', title: 'Fully Offline',       desc: 'Works without an internet connection. Your database data never leaves your machine. No cloud sync, no subscriptions after purchase.' },
]

function Features() {
  return (
    <section id="features" style={{ padding: '96px 0', borderTop: '1px solid #232830' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6b7587', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Features
          </span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#e8edf5', marginTop: 16, lineHeight: 1.15 }}>
            Everything your schema needs.{' '}
            <span style={{ color: '#00d97e' }}>Nothing it doesn't.</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {features.map(f => (
            <div key={f.title}
              style={{ padding: 28, background: '#111318', border: '1px solid #232830', borderRadius: 20, transition: 'all 0.2s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,217,126,0.3)'; e.currentTarget.style.background = '#13171f' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#232830'; e.currentTarget.style.background = '#111318' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: `${f.color}18` }}>
                <f.icon size={20} color={f.color} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#e8edf5', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#6b7587', lineHeight: 1.7 }}>{f.desc}</p>
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
    <section id="screenshots" style={{ padding: '96px 0', borderTop: '1px solid #232830' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6b7587', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Screenshots
          </span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#e8edf5', marginTop: 16, lineHeight: 1.15 }}>
            Built for <span style={{ color: '#00d97e' }}>real workflows</span>
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
          {shots.map((s, i) => (
            <button key={s.label} onClick={() => setActive(i)} style={{
              padding: '8px 18px', borderRadius: 10, fontSize: 14, fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.2s', border: '1px solid',
              background: active === i ? '#00d97e' : '#111318',
              color: active === i ? '#0a0c0f' : '#6b7587',
              borderColor: active === i ? '#00d97e' : '#232830',
            }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40, alignItems: 'start' }} className="screenshots-grid">
          {/* Window */}
          <div style={{ background: '#111318', border: '1px solid #232830', borderRadius: 16, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: '1px solid #232830', background: '#0e1115' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
              </div>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#6b7587', marginLeft: 8 }}>Free My Query</span>
            </div>
            <img key={active} src={shots[active].img} alt={shots[active].title} style={{ width: '100%', display: 'block', animation: 'fadeUp 0.35s ease both' }} />
          </div>

          {/* Caption */}
          <div style={{ paddingTop: 16 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0,217,126,0.1)', border: '1px solid rgba(0,217,126,0.2)', borderRadius: 999, padding: '4px 12px', marginBottom: 16 }}>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#00d97e' }}>{shots[active].label}</span>
            </div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 26, color: '#e8edf5', lineHeight: 1.3, marginBottom: 16 }}>
              {shots[active].title}
            </h3>
            <p style={{ fontSize: 15, color: '#6b7587', lineHeight: 1.75 }}>{shots[active].desc}</p>
            {/* Dot nav */}
            <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
              {shots.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  height: 6, borderRadius: 3, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  width: active === i ? 32 : 12,
                  background: active === i ? '#00d97e' : '#232830',
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
function Pricing() {
  
  const [downloading, setDownloading] = useState(false)
  const [done, setDone] = useState(false)

  const handleDownload = () => {
    setDownloading(true)
    if (typeof window.umami !== 'undefined') {
    window.umami.track('download-click')
  }
    const link = document.createElement('a')
    link.href = '/Free_My_SQL.jar'
    link.download = 'Free_My_SQL.jar'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => { setDownloading(false); setDone(true) }, 1000)
  }

  const included = ['Full desktop app (Windows)', 'Unlimited schemas & tables', 'Live ER diagram editor', 'No-SQL data management', 'Code generator (Java / BCrypt)', 'All future updates — free', 'Works 100% offline', 'Email support']
  const excluded = ['Monthly fees', 'Per-seat pricing', 'Cloud data storage', 'Account required to run', 'Feature paywalls', 'Vendor lock-in']

  return (
    <section id="pricing" style={{ padding: '96px 0', borderTop: '1px solid #232830' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6b7587', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Pricing</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#e8edf5', marginTop: 16, lineHeight: 1.15 }}>
            Download the free beta. <span style={{ color: '#00d97e' }}>Shape what comes next.</span>
          </h2>
          <p style={{ marginTop: 12, color: '#6b7587', fontSize: 16 }}>It's free while we're in beta. Try it, break it, and tell us what to build next.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, maxWidth: 800, margin: '0 auto' }}>
          {/* Main card */}
          <div style={{ position: 'relative', padding: 36, background: '#111318', border: '1px solid rgba(0,217,126,0.4)', borderRadius: 24, boxShadow: '0 0 40px rgba(0,217,126,0.08)' }}>
            <div style={{ position: 'absolute', top: 16, right: 16, background: '#00d97e', color: '#0a0c0f', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, letterSpacing: '0.05em' }}>
              FREE BETA
            </div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ color: '#6b7587', fontSize: 14, marginBottom: 4 }}>Beta Access</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 56, color: '#e8edf5', lineHeight: 1 }}>$0</span>
                <span style={{ color: '#6b7587', fontSize: 14, marginBottom: 8 }}>free</span>
              </div>
              <div style={{ fontSize: 12, color: '#6b7587', marginTop: 4 }}>Beta is free · Paid version planned post-launch</div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {included.map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#e8edf5' }}>
                  <Check size={16} color="#00d97e" style={{ flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>

            {!done ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button onClick={handleDownload} disabled={downloading} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: downloading ? '#00b368' : '#00d97e',
                  color: '#0a0c0f', fontWeight: 600, fontSize: 15,
                  padding: '13px 0', borderRadius: 12, border: 'none',
                  cursor: downloading ? 'wait' : 'pointer',
                  transition: 'all 0.2s', width: '100%',
                }}
                  onMouseEnter={e => { if (!downloading) { e.currentTarget.style.background = '#00c070'; e.currentTarget.style.transform = 'scale(1.02)' } }}
                  onMouseLeave={e => { e.currentTarget.style.background = downloading ? '#00b368' : '#00d97e'; e.currentTarget.style.transform = 'scale(1)' }}>
                  {downloading ? 'Preparing download…' : <><Download size={16} /> Download Free</>}
                </button>
                <p style={{ fontSize: 12, color: '#6b7587', textAlign: 'center', margin: 0 }}>
                  JAR file · Java 17+ required · Windows
                </p>
              </div>
            ) : (
              <div style={{ background: 'rgba(0,217,126,0.08)', border: '1px solid rgba(0,217,126,0.25)', borderRadius: 14, padding: 24, textAlign: 'center' }}>
                <Check size={32} color="#00d97e" style={{ margin: '0 auto 12px' }} />
                <div style={{ color: '#e8edf5', fontWeight: 600, marginBottom: 4 }}>Download started!</div>
              </div>
            )}
          </div>

          {/* What you skip */}
          <div style={{ padding: 36, background: '#111318', border: '1px solid #232830', borderRadius: 24 }}>
            <div style={{ color: '#6b7587', fontSize: 14, marginBottom: 4 }}>What you skip</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 24, color: '#e8edf5', marginBottom: 28, lineHeight: 1.3 }}>
              No subscriptions.<br />No surprises.
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {excluded.map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#6b7587' }}>
                  <X size={16} color="rgba(248,113,113,0.7)" style={{ flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
            
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'What databases does Free My Query support?',  a: 'Currently MySQL only, connecting via JDBC. Localhost and remote connections are both supported. Credentials are stored securely in the app.' },
  { q: 'Does it work without internet?',              a: 'Yes. The app is fully offline. It connects to your MySQL server directly — your schema data never leaves your machine.' },
  { q: 'What does "free updates" mean exactly?',      a: 'You download once and receive all updates at no extra cost for as long as the app is in active development. No expiry, no upgrade fees during beta.' },
  { q: 'What OS does it run on?',                     a: 'Currently Windows desktop. Mac and Linux builds are planned post-beta based on demand.' },
  { q: 'Can I use it on a production database?',      a: 'Yes — it reads live schema structure and data. Use with care on production. Read-only diagram mode is coming soon.' },
  { q: 'What is the code generator for?',             a: 'It generates Java auth code (login, register, BCrypt hashing) tailored to your actual schema — saves hours of boilerplate.' },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" style={{ padding: '96px 0', borderTop: '1px solid #232830' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6b7587', textTransform: 'uppercase', letterSpacing: '0.15em' }}>FAQ</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#e8edf5', marginTop: 16 }}>
            Common questions
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: '#111318', border: '1px solid #232830', borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s' }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: '100%', textAlign: 'left', padding: '18px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                background: 'none', border: 'none', cursor: 'pointer',
              }}>
                <span style={{ fontWeight: 500, color: '#e8edf5', fontSize: 15, lineHeight: 1.4 }}>{faq.q}</span>
                <ChevronDown size={18} color="#6b7587" style={{ flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
              </button>
              {open === i && (
                <div style={{ padding: '0 24px 20px', fontSize: 14, color: '#6b7587', lineHeight: 1.75, borderTop: '1px solid #232830', paddingTop: 16 }}>
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
    <section style={{ padding: '96px 0', borderTop: '1px solid #232830' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6b7587', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Feedback</span>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#e8edf5', marginTop: 16, marginBottom: 12 }}>
          Tell me what's <span style={{ color: '#00d97e' }}>missing.</span>
        </h2>
        <p style={{ color: '#6b7587', fontSize: 15, marginBottom: 32 }}>Beta feedback directly shapes what gets built next.</p>

        {!sent ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <textarea
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="What's broken, missing, or confusing?"
              rows={5}
              style={{
                background: '#111318', border: '1px solid #232830', borderRadius: 12,
                color: '#e8edf5', fontSize: 14, padding: '14px 16px',
                resize: 'vertical', outline: 'none', fontFamily: 'inherit',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,217,126,0.4)')}
              onBlur={e => (e.currentTarget.style.borderColor = '#232830')}
            />
            <button onClick={handleSubmit} style={{
              background: '#00d97e', color: '#0a0c0f', fontWeight: 600,
              fontSize: 15, padding: '13px 0', borderRadius: 12,
              border: 'none', cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#00c070'; e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#00d97e'; e.currentTarget.style.transform = 'scale(1)' }}>
              Send Feedback
            </button>
          </div>
        ) : (
          <div style={{ background: 'rgba(0,217,126,0.08)', border: '1px solid rgba(0,217,126,0.25)', borderRadius: 14, padding: 32 }}>
            <Check size={32} color="#00d97e" style={{ margin: '0 auto 12px' }} />
            <div style={{ color: '#e8edf5', fontWeight: 600 }}>Thanks — your mail client should have opened.</div>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #232830', padding: '40px 0' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: '#00d97e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Database size={14} color="#0a0c0f" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#e8edf5' }}>Free My Query</span>
        </div>
        <p style={{ fontSize: 13, color: '#6b7587', textAlign: 'center' }}>
          © 2026 Free My Query · Built for developers who love MySQL but hate SQL busywork.
        </p>
        <a href="mailto:hello@freemyquery.com"
          style={{ fontSize: 13, color: '#6b7587', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#e8edf5')}
          onMouseLeave={e => (e.currentTarget.style.color = '#6b7587')}>
          Contact
        </a>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
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
        body { background: #0a0c0f; color: #e8edf5; font-family: 'Instrument Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0c0f; }
        ::-webkit-scrollbar-thumb { background: #232830; border-radius: 3px; }
        input, button { font-family: inherit; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .screenshots-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
      <div style={{ minHeight: '100vh', background: '#0a0c0f' }}>
        <Nav />
        <Hero />
        <Problem />
        <Features />
        <Screenshots />
        <Pricing />
        <FAQ />
        <Feedback />
        <Footer />
      </div>
    </>
  )
}