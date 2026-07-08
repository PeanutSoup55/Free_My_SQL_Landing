// src/pages/SupportPage.tsx
import { useEffect, useState } from 'react'
import { Check, Mail } from 'lucide-react'
import { supabase } from '../supabaseClient'
import { AccountShell, inputStyle, primaryBtnStyle, type AccountTab } from '../shared'

const quickAnswers = [
  { q: 'My subscription says inactive but I paid', a: 'Make sure you\'re signed in with the exact email you used at checkout. If it still shows inactive after a minute, your card may have failed — check your email for a Stripe notice, or reach out below.' },
  { q: 'How do I cancel?', a: 'Cancel anytime from your Stripe billing portal — email support below if you need a direct link, and access continues until the end of your current billing period.' },
  { q: 'I can\'t connect to my MySQL server', a: 'Confirm the host and port are correct, and that the MySQL server is configured to accept connections from your machine (especially for remote/cloud databases).' },
  { q: 'Where\'s the latest download?', a: 'Head to the Account tab — the download button there always points at your current subscription\'s latest version.' },
]

export function SupportPage({
  onBack,
  onLoggedOut,
  onNavigate,
}: {
  onBack: () => void
  onLoggedOut: () => void
  onNavigate: (tab: AccountTab) => void
}) {
  const [checked, setChecked] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        onLoggedOut()
        return
      }
      setEmail(session.user.email ?? '')
      setChecked(true)
    })()
  }, [onLoggedOut])

  const handleSubmit = async () => {
    setError('')
    if (!message.trim()) {
      setError('Enter a message before sending.')
      return
    }
    setSending(true)
    try {
      // Reuses the same Formspree endpoint as the beta feedback form —
      // swap in a dedicated support form ID if you want these routed
      // to a different inbox than general feedback.
      await fetch('https://formspree.io/f/xvzyezqy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message, source: 'support-page' }),
      })
      setSent(true)
    } catch {
      setError('Could not send right now — try emailing directly below.')
    } finally {
      setSending(false)
    }
  }

  if (!checked) return null

  return (
    <AccountShell activeTab="support" onNavigate={onNavigate} onBack={onBack} maxWidth={640}>
      <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 36, color: '#e8edf5', marginBottom: 8 }}>
        Support
      </h1>
      <p style={{ color: '#6b7587', fontSize: 15, marginBottom: 40 }}>
        Quick answers below, or send a message directly.
      </p>

      {/* Quick answers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 48 }}>
        {quickAnswers.map((qa, i) => (
          <div key={i} style={{ background: '#111318', border: '1px solid #232830', borderRadius: 14, padding: '18px 22px' }}>
            <div style={{ fontWeight: 600, color: '#e8edf5', fontSize: 15, marginBottom: 6 }}>{qa.q}</div>
            <div style={{ color: '#6b7587', fontSize: 14, lineHeight: 1.7 }}>{qa.a}</div>
          </div>
        ))}
      </div>

      {/* Contact form */}
      <div style={{ background: '#111318', border: '1px solid #232830', borderRadius: 20, padding: 32 }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, color: '#e8edf5', marginBottom: 20 }}>
          Contact us
        </h2>

        {!sent ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
            />
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="What's going on?"
              rows={5}
              style={{
                background: '#0a0c0f', border: '1px solid #232830', borderRadius: 10,
                color: '#e8edf5', fontSize: 14, padding: '12px 14px',
                resize: 'vertical', outline: 'none', fontFamily: 'inherit',
              }}
            />
            {error && <p style={{ color: '#f87171', fontSize: 13, margin: 0 }}>{error}</p>}
            <button onClick={handleSubmit} disabled={sending} style={primaryBtnStyle(sending)}>
              {sending ? 'Sending…' : 'Send message'}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <Mail size={13} color="#6b7587" />
              <a href="mailto:hello@freemyquery.com" style={{ color: '#6b7587', fontSize: 13, textDecoration: 'none' }}>
                Or email hello@freemyquery.com directly
              </a>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Check size={28} color="#00d97e" style={{ margin: '0 auto 12px' }} />
            <div style={{ color: '#e8edf5', fontWeight: 600, marginBottom: 4 }}>Message sent</div>
            <p style={{ color: '#6b7587', fontSize: 13 }}>We'll get back to you at {email}.</p>
          </div>
        )}
      </div>
    </AccountShell>
  )
}
