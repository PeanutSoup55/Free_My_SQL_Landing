// src/pages/DocsPage.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { AccountShell, type AccountTab } from '../shared'

const sections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    body: [
      'After downloading and installing, launch Free My Query and sign in with the account email you subscribed with.',
      'On first launch you\'ll land on the login screen. Use the "MySQL Credentials" side to connect to a database — this is separate from your subscription account.',
    ],
  },
  {
    id: 'connecting',
    title: 'Connecting to MySQL',
    body: [
      'Enter your Host, Port (defaults to 3306), MySQL username, and password. Both localhost and remote MySQL servers are supported.',
      'Save a Connection Profile to reconnect in one click next time — check "Remember details for this profile" before connecting. You can store multiple profiles and switch between them from the dropdown.',
    ],
  },
  {
    id: 'er-diagrams',
    title: 'ER Diagrams',
    body: [
      'Once connected, your schema renders automatically as an interactive diagram. Drag to pan, scroll to zoom, and drag individual tables to rearrange the layout.',
      'Foreign key relationships are drawn as connecting lines between tables — hover a table to highlight its relationships.',
    ],
  },
  {
    id: 'data',
    title: 'Managing Data',
    body: [
      'Click any table to open its data view. Rows display in a spreadsheet-style grid you can scroll and inspect directly.',
      'Use the insert form to add new rows — fields that reference another table (foreign keys) show a dropdown of valid values instead of asking you to know the ID.',
    ],
  },
  {
    id: 'codegen',
    title: 'Code Generator',
    body: [
      'From the schema context menu, choose to generate login/auth code. Pick which column is your identifier (e.g. email) and which is your password field.',
      'The generator outputs Java code using BCrypt for password hashing, ready to drop into your own project.',
    ],
  },
  {
    id: 'offline',
    title: 'Offline Access & Grace Period',
    body: [
      'Free My Query checks your subscription status periodically when it can reach the internet. Your actual database connection is always local — schema and data never leave your machine.',
      'If you\'re offline, the app keeps working for up to 7 days from your last successful check. After that, it will ask you to reconnect and verify before continuing.',
    ],
  },
  {
    id: 'updates',
    title: 'Updates',
    body: [
      'The app checks for new versions on launch. If one is available, you\'ll see a small prompt with a link to download it — updates are included in your subscription at no extra cost.',
    ],
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    body: [
      '"Can\'t connect to MySQL" — double check host/port, and confirm the MySQL server accepts remote connections if you\'re not on localhost.',
      '"App says my subscription is inactive" — check that you\'re signed in with the same email you subscribed with, and that your card hasn\'t failed a recent payment (check your email for a Stripe receipt/failure notice).',
      'Still stuck? Head to the Support tab.',
    ],
  },
]

export function DocsPage({
  onBack,
  onLoggedOut,
  onNavigate,
}: {
  onBack: () => void
  onLoggedOut: () => void
  onNavigate: (tab: AccountTab) => void
}) {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        onLoggedOut()
        return
      }
      setChecked(true)
    })()
  }, [onLoggedOut])

  if (!checked) return null

  return (
    <AccountShell activeTab="docs" onNavigate={onNavigate} onBack={onBack} maxWidth={960}>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48 }} className="docs-grid">
        {/* Sidebar TOC */}
        <div style={{ position: 'sticky', top: 24, alignSelf: 'start', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6b7587', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
            On this page
          </span>
          {sections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              style={{ color: '#6b7587', fontSize: 13, textDecoration: 'none', padding: '6px 0', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e8edf5')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6b7587')}
            >
              {s.title}
            </a>
          ))}
        </div>

        {/* Content */}
        <div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 36, color: '#e8edf5', marginBottom: 8 }}>
            Documentation
          </h1>
          <p style={{ color: '#6b7587', fontSize: 15, marginBottom: 48 }}>
            Everything you need to get the most out of Free My Query.
          </p>

          {sections.map((s, i) => (
            <div key={s.id} id={s.id} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: i < sections.length - 1 ? '1px solid #232830' : 'none' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 22, color: '#e8edf5', marginBottom: 16 }}>
                {s.title}
              </h2>
              {s.body.map((p, j) => (
                <p key={j} style={{ color: '#6b7587', fontSize: 15, lineHeight: 1.8, marginBottom: 12 }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .docs-grid { grid-template-columns: 1fr !important; }
          .docs-grid > div:first-child { position: static !important; display: none !important; }
        }
      `}</style>
    </AccountShell>
  )
}
