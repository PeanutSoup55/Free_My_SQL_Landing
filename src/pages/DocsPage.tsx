// src/pages/DocsPage.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { AccountShell, type AccountTab } from '../shared'

type SubSection = {
  id: string
  title: string
  body: string[]
  // Drop a screenshot filename here later (e.g. import or public path) and
  // it will render under the text for this subsection.
  image?: string
  imageAlt?: string
}

type Section = {
  id: string
  title: string
  // Optional intro copy for the top-level section itself (shown before subsections)
  intro?: string[]
  subsections: SubSection[]
}

const sections: Section[] = [
  {
    id: 'setup',
    title: 'Setup',
    subsections: [
      {
        id: 'setup-make-account',
        title: 'Make an Account',
        body: [
          'Head to the Free My Query website and create an account with your email and a password.',
          'This account is what powers your subscription and license — it\'s separate from any MySQL credentials you\'ll use later.',
        ],
      },
      {
        id: 'setup-verify-account',
        title: 'Verify Account',
        body: [
          'Check your inbox for a verification email and click the link to confirm your address.',
          'You won\'t be able to activate a subscription until your email is verified.',
        ],
      },
      {
        id: 'setup-pay',
        title: 'Pay',
        body: [
          'Subscribe from your account dashboard — Free My Query is $10/month, billed through Stripe.',
          'Once payment succeeds, your account is marked active and unlocks the download.',
        ],
      },
      {
        id: 'setup-download',
        title: 'Download File',
        body: [
          'With an active subscription, the Download button on your dashboard becomes available.',
          'This gives you a signed, time-limited link to the installer for your platform.',
        ],
      },
      {
        id: 'setup-sign-in',
        title: 'Sign Into Application',
        body: [
          'Install and launch Free My Query, then sign in on the login screen using the same email and password from your account.',
          'The app checks your subscription status and unlocks once confirmed.',
        ],
      },
    ],
  },
  {
    id: 'schemas',
    title: 'Schemas',
    subsections: [
      {
        id: 'schemas-make',
        title: 'Make a Schema',
        body: [
          'Once connected to a MySQL server, create a new schema directly from the app without writing any SQL.',
          'Give it a name and it appears immediately in your sidebar tree.',
        ],
      },
      {
        id: 'schemas-crud',
        title: 'CRUD Data Into Schema',
        body: [
          'Click any table to open its data view, shown as a spreadsheet-style grid.',
          'Use the insert form to add rows — foreign key fields show a dropdown of valid values instead of asking you to know the ID. Edit or delete existing rows inline.',
        ],
      },
      {
        id: 'schemas-editing-tables',
        title: 'Editing Tables',
        body: [
          'Rename, delete, or add tables directly from the schema view.',
          'Column changes (add, rename, change type) are applied without needing to hand-write ALTER statements.',
        ],
      },
      {
        id: 'schemas-editing-schemas',
        title: 'Editing Schemas',
        body: [
          'Rename or delete an entire schema, or add new tables to an existing one, from the schema card grid.',
          'Remote-linked schemas keep track of their connection so changes stay tied to the right server.',
        ],
      },
      {
        id: 'schemas-codegen',
        title: 'Generating Login Code',
        body: [
          'From the schema context menu, choose to generate login/auth code.',
          'Pick which column is your identifier (e.g. email) and which is your password field — the generator outputs Java code using BCrypt for password hashing, ready to drop into your own project.',
        ],
      },
    ],
  },
  {
    id: 'manual-sql',
    title: 'Manual SQL',
    subsections: [
      {
        id: 'manual-sql-writing',
        title: 'Writing',
        body: [
          'Prefer to write your own SQL? Open the manual query editor to run statements directly against your connected database.',
          'Results display in the same grid used elsewhere in the app, and errors are shown inline.',
        ],
      },
    ],
  },
  {
    id: 'credentials',
    title: 'Credentials',
    subsections: [],
    intro: [
      'Manage saved MySQL credentials separately from your Free My Query account login.',
      'Connection Profiles store host, port, username, and password so you can reconnect in one click — check "Remember details for this profile" before connecting to save one.',
    ],
  },
  {
    id: 'logs',
    title: 'Logs',
    subsections: [],
    intro: [
      'Free My Query keeps a log of recent actions — connections, schema changes, and queries run — so you can review what happened during a session.',
      'Logs are stored locally and never leave your machine.',
    ],
  },
  {
    id: 'ssh',
    title: 'SSH',
    subsections: [
      {
        id: 'ssh-tunnel',
        title: 'SSH Tunnel',
        body: [
          'Connect to a MySQL server that isn\'t directly reachable by tunneling through an SSH host.',
          'Enter the SSH host, port, username, and either a password or key file, and Free My Query handles the tunnel for you.',
        ],
      },
      {
        id: 'ssh-mysql-database',
        title: 'MySQL Database',
        body: [
          'Once the tunnel is established, connect to the MySQL database as usual — host and port refer to how the database looks from the far end of the tunnel (often localhost from the remote server\'s perspective).',
        ],
      },
      {
        id: 'ssh-saved-connections',
        title: 'Saved Connections',
        body: [
          'SSH tunnel details can be saved alongside a Connection Profile so the whole chain — SSH plus MySQL — reconnects in one click next time.',
        ],
      },
      {
        id: 'ssh-remote-database',
        title: 'Remote Database',
        body: [
          'Use SSH tunneling to safely reach a remote production or staging database without opening MySQL\'s port to the public internet.',
        ],
      },
      {
        id: 'ssh-local-connectivity',
        title: 'Local Connectivity',
        body: [
          'For databases already on your local network or machine, SSH tunneling isn\'t needed — connect directly using host and port as normal.',
        ],
      },
    ],
  },
  {
    id: 'account',
    title: 'Account',
    subsections: [
      {
        id: 'account-manage',
        title: 'Managing Your Account',
        body: [
          'From your account dashboard you can update your email, change your password, and view your subscription status.',
          'If the app ever says your subscription is inactive, check that you\'re signed in with the same email you subscribed with, and that your card hasn\'t failed a recent payment.',
        ],
      },
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
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48 }} className="docs-grid">
        {/* Sidebar TOC */}
        <div style={{ position: 'sticky', top: 24, alignSelf: 'start', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#6b7587', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
            On this page
          </span>
          {sections.map((s, idx) => (
            <div key={s.id} style={{ marginBottom: 6 }}>
              <a
                href={`#${s.id}`}
                style={{ color: '#e8edf5', fontSize: 13, fontWeight: 600, textDecoration: 'none', padding: '4px 0', display: 'block' }}
              >
                {idx + 1}. {s.title}
              </a>
              {s.subsections.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingLeft: 14 }}>
                  {s.subsections.map((sub, subIdx) => (
                    <a
                      key={sub.id}
                      href={`#${sub.id}`}
                      style={{ color: '#6b7587', fontSize: 12.5, textDecoration: 'none', padding: '3px 0', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#e8edf5')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#6b7587')}
                    >
                      {idx + 1}.{subIdx + 1} {sub.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
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
            <div key={s.id} id={s.id} style={{ marginBottom: 48, paddingBottom: 40, borderBottom: i < sections.length - 1 ? '1px solid #232830' : 'none' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 24, color: '#e8edf5', marginBottom: 16 }}>
                {i + 1}. {s.title}
              </h2>

              {s.intro?.map((p, j) => (
                <p key={j} style={{ color: '#6b7587', fontSize: 15, lineHeight: 1.8, marginBottom: 12 }}>
                  {p}
                </p>
              ))}

              {s.subsections.map((sub, subIdx) => (
                <div key={sub.id} id={sub.id} style={{ marginTop: 28 }}>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 17, color: '#e8edf5', marginBottom: 10 }}>
                    {i + 1}.{subIdx + 1} {sub.title}
                  </h3>
                  {sub.body.map((p, j) => (
                    <p key={j} style={{ color: '#6b7587', fontSize: 15, lineHeight: 1.8, marginBottom: 12 }}>
                      {p}
                    </p>
                  ))}
                  {/* Screenshot placeholder — drop an image path/import into `image`
                      on the matching subsection object above and it renders here. */}
                  {sub.image && (
                    <img
                      src={sub.image}
                      alt={sub.imageAlt ?? sub.title}
                      style={{ width: '100%', borderRadius: 8, border: '1px solid #232830', marginTop: 8, marginBottom: 8 }}
                    />
                  )}
                </div>
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