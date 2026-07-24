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
          'This account is what powers your subscription and license — it\'s separate from any MySQL credentials you\'ll use later. Nothing about your database, or any server you eventually connect to, is collected at sign-up.',
        ],
      },
      {
        id: 'setup-verify-account',
        title: 'Verify Account',
        body: [
          'Check your inbox for a verification email and click the link to confirm your address.',
          'You won\'t be able to activate a subscription until your email is verified. If the email doesn\'t arrive within a few minutes, check your spam folder before requesting a new one — verification links expire after 24 hours.',
        ],
      },
      {
        id: 'setup-pay',
        title: 'Pay',
        body: [
          'Subscribe from your account dashboard — Free My Query is $10/month, billed through Stripe.',
          'Once payment succeeds, your account is marked active and unlocks the download. You can update your payment method or cancel at any time from the Account tab; cancelling stops future billing but doesn\'t immediately revoke access already paid for in the current period.',
        ],
      },
      {
        id: 'setup-download',
        title: 'Download File',
        body: [
          'With an active subscription, the Download button on your dashboard becomes available.',
          'This gives you a signed, time-limited link to the installer for your platform. If the link expires before you finish downloading, simply return to the dashboard and select Download again to generate a fresh one.',
        ],
      },
      {
        id: 'setup-sign-in',
        title: 'Sign Into Application',
        body: [
          'Install and launch Free My Query, then sign in on the login screen using the same email and password from your account.',
          'The app checks your subscription status and unlocks once confirmed. This app login controls access to Free My Query itself — your saved connection profiles, theme, and subscription — and is separate from the MySQL username and password you\'ll enter afterward to reach an actual database.',
        ],
        image: '/docs/setup/sign-in.png',
        imageAlt: 'Free My Query sign-in screen',
      },
    ],
  },
  {
    id: 'schemas',
    title: 'Schemas',
    subsections: [
      {
        id: 'schemas-diagram-view',
        title: 'Viewing the Schema Diagram',
        body: [
          'Once connected, every schema on the server appears in the sidebar. Selecting one renders all of its tables on a canvas as an entity-relationship diagram — each card shows the table name, its primary key at the top, and any foreign keys beneath it in a distinct colour.',
          'Relationship lines are drawn automatically between a foreign key and the primary key it references, so you can trace how tables connect at a glance. Use the filter box above the schema list to jump straight to a schema by name when a server hosts many databases.',
        ],
        image: '/docs/schemas/diagram-view.png',
        imageAlt: 'Entity-relationship diagram showing linked tables',
      },
      {
        id: 'schemas-make',
        title: 'Make a Schema',
        body: [
          'Once connected to a MySQL server, create a new schema directly from the app without writing any SQL.',
          'Give it a name, then build it up one table at a time: name each table, choose a data type for its primary key, and add any further columns before saving. It appears immediately in your sidebar tree, and nothing is written to the server until you save.',
        ],
        image: '/docs/schemas/make-schema.png',
        imageAlt: 'Create New Schema screen with table and primary key fields',
      },
      {
        id: 'schemas-crud',
        title: 'CRUD Data Into Schema',
        body: [
          'Click any table to open its data view, shown as a spreadsheet-style grid of every existing row.',
          'Use the insert form to add rows — foreign key fields show a dropdown of valid values instead of asking you to know the ID, so you can only link to rows that actually exist. Edit or delete existing rows inline; deleting a row removes it from the underlying table immediately, so double check you\'ve selected the right one first.',
        ],
        image: '/docs/schemas/crud-data.png',
        imageAlt: 'Table data grid with an insert-new-row form',
      },
      {
        id: 'schemas-editing-tables',
        title: 'Editing Tables',
        body: [
          'Rename, delete, or add tables directly from the schema view.',
          'Column changes (add, rename, change type, or point a column at a foreign key) are applied without needing to hand-write ALTER statements — a live preview of the table\'s current data is shown alongside the editor so you can confirm what a column actually contains before deciding to change its type or remove it.',
        ],
        image: '/docs/schemas/edit-table.png',
        imageAlt: 'Edit Table panel with column types and foreign key references',
      },
      {
        id: 'schemas-editing-schemas',
        title: 'Editing Schemas',
        body: [
          'Rename or delete an entire schema, or add new tables to an existing one, from the schema card grid.',
          'Renaming a schema renames the underlying database on the server, so update any external tools or connection strings pointing at the old name. Deleting a schema permanently drops it and every table inside it from MySQL — this can\'t be undone, so confirm you\'ve selected the right one first.',
        ],
        image: '/docs/schemas/edit-schema.png',
        imageAlt: 'Edit Schema screen listing all tables in a schema',
      },
      {
        id: 'schemas-codegen',
        title: 'Generating Login Code',
        body: [
          'From the schema context menu, choose to generate login/auth code.',
          'Pick which column is your identifier (e.g. email) and which is your password field — the generator outputs Java code using BCrypt for password hashing, complete with a matching user model, a login method that verifies the password against the stored hash, and a method to hash and insert a new user. Every generated query uses parameterized statements, so the snippet is safe against SQL injection out of the box and ready to drop into your own project.',
        ],
        image: '/docs/schemas/codegen.png',
        imageAlt: 'Generated login code with BCrypt password hashing',
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
          'Results display in the same grid used elsewhere in the app, and errors are shown inline underneath. Every statement you run is kept in a history you can step back and forward through to re-run or tweak a previous query without retyping it. Because statements execute exactly as written with no schema validation beforehand, double-check a query\'s WHERE clause before running anything destructive here.',
        ],
        image: '/docs/manual-sql/query-editor.png',
        imageAlt: 'SQL query editor with query history panel',
      },
    ],
  },
  {
    id: 'credentials',
    title: 'Credentials',
    intro: [
      'Manage saved MySQL credentials separately from your Free My Query account login.',
    ],
    subsections: [
      {
        id: 'credentials-profiles',
        title: 'Connection Profiles',
        body: [
          'Connection Profiles store host, port, username, and password so you can reconnect in one click — check "Remember details for this profile" before connecting to save one.',
          'Switch between profiles from a dropdown, add a new blank profile at any time, and delete one you no longer need. Testing a profile before saving verifies the connection details are valid and, if something\'s wrong, tells you whether the problem was the host, the credentials, or the network, so you can fix just that field instead of starting over.',
        ],
        image: '/docs/credentials/profiles.png',
        imageAlt: 'Saved connection profile with host, user, and password fields',
      },
    ],
  },
  {
    id: 'logs',
    title: 'Logs',
    intro: [
      'Free My Query keeps a log of recent actions — connections, schema changes, and queries run — so you can review what happened during a session.',
      'Logs are stored locally and never leave your machine.',
    ],
    subsections: [
      {
        id: 'logs-overview',
        title: 'Reading the Log',
        body: [
          'Each entry shows the time it was logged, the user and host it came from, a colour-coded command type (connect, query, disconnect, and so on), and the full query text where applicable.',
          'Filter down to a single command type, control how many rows are pulled at once, and turn on auto-refresh to keep the view polling continuously — handy when you\'re actively reproducing an issue and want to watch queries arrive in real time. Keep in mind that logging every statement has a small performance cost on the server itself, so avoid leaving auto-refresh running unattended against a busy production instance for long stretches.',
        ],
        image: '/docs/logs/mysql-logs.png',
        imageAlt: 'MySQL query log with command types and timestamps',
      },
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
          'Enter the SSH host, port, username, and either a password or key file, and Free My Query handles the tunnel for you. If you\'re authenticating with a key rather than a password, make sure the key file\'s permissions are locked down to your user only — most SSH servers silently reject an overly permissive key.',
        ],
        image: '/docs/ssh/tunnel-setup.png',
        imageAlt: 'SSH tunnel and MySQL database connection form',
      },
      {
        id: 'ssh-mysql-database',
        title: 'MySQL Database',
        body: [
          'Once the tunnel is established, connect to the MySQL database as usual — host and port refer to how the database looks from the far end of the tunnel (often localhost from the remote server\'s perspective), not how your own machine would reach it directly.',
          'The MySQL user account also needs to be allowed to log in from the tunnel\'s bind address, since traffic arrives at MySQL from the SSH server\'s local address rather than your real IP — a common cause of a tunnel opening successfully while the database step still fails.',
        ],
      },
      {
        id: 'ssh-connection-status',
        title: 'Connection Status',
        body: [
          'Once a tunnel is up, Free My Query shows a live status view confirming the connected database and host, with the full path — your machine, the SSH server, and MySQL — displayed in green when every hop is healthy.',
          'Summary cards report tunnel uptime, the local bridge port being forwarded through, and how long the handshake took to establish, alongside live server info such as MySQL version, uptime, active threads, and database size pulled straight from the connected instance. Select Disconnect at any time to close the tunnel.',
        ],
        image: '/docs/ssh/connection-status.png',
        imageAlt: 'Connected SSH tunnel status with live server info',
      },
      {
        id: 'ssh-saved-connections',
        title: 'Saved Connections',
        body: [
          'SSH tunnel details can be saved alongside a Connection Profile so the whole chain — SSH plus MySQL — reconnects in one click next time.',
          'Give the combined profile a name when saving so it\'s easy to tell apart from your direct, non-tunneled profiles in the same list.',
        ],
      },
      {
        id: 'ssh-remote-database',
        title: 'Remote Database',
        body: [
          'Use SSH tunneling to safely reach a remote production or staging database without opening MySQL\'s port to the public internet.',
          'Because the tunnel encrypts traffic between your machine and the SSH server, this is generally the safer option any time the database itself lives outside your local network.',
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
          'If the app ever says your subscription is inactive, check that you\'re signed in with the same email you subscribed with, and that your card hasn\'t failed a recent payment — you can refresh your subscription status immediately from this screen after resolving a billing issue rather than waiting for the next automatic check.',
        ],
        image: '/docs/account/account-settings.png',
        imageAlt: 'Account settings showing email and subscription status',
      },
      {
        id: 'account-theme',
        title: 'Theme',
        body: [
          'Choose a colour palette for the whole application from Settings → Theme. Palettes are grouped by mood, and each row previews itself as a strip of swatches so you can compare options before committing.',
          'Selecting a palette applies it immediately across every screen, including the schema diagram and this documentation viewer — there\'s no separate save step, and your choice is remembered the next time you open the app.',
        ],
        image: '/docs/account/theme.png',
        imageAlt: 'Theme selection screen with colour palette previews',
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
