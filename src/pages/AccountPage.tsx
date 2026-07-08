// src/pages/AccountPage.tsx
import { useEffect, useState } from 'react'
import { Check, Download, LogOut } from 'lucide-react'
import { supabase } from '../supabaseClient'
import { AccountShell, primaryBtnStyle, type AccountTab } from '../shared'

const FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL as string

type SubStatus = 'loading' | 'active' | 'inactive'

export function AccountPage({
  onBack,
  onLoggedOut,
  onNavigate,
}: {
  onBack: () => void
  onLoggedOut: () => void
  onNavigate: (tab: AccountTab) => void
}) {
  const [status, setStatus] = useState<SubStatus>('loading')
  const [email, setEmail] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [subscribing, setSubscribing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        onLoggedOut()
        return
      }
      setEmail(session.user.email ?? '')

      const { data: sub } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('user_id', session.user.id)
        .maybeSingle()

      const active = sub?.status === 'active' || sub?.status === 'trialing'
      setStatus(active ? 'active' : 'inactive')
    })()
  }, [onLoggedOut])

  const handleDownload = async () => {
    setDownloading(true)
    setError('')
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Session expired — log in again.')

      // The server checks subscription status itself and only issues a
      // short-lived signed URL if it's actually active — this page hiding
      // the button is just UX, this call is the real gate.
      const res = await fetch(`${FUNCTIONS_URL}/get-download-url`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
      const json = await res.json()
      if (json.error) throw new Error(json.error)

      window.location.href = json.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not start download.')
    } finally {
      setDownloading(false)
    }
  }

  const handleSubscribe = async () => {
    setSubscribing(true)
    setError('')
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Session expired — log in again.')

      const res = await fetch(`${FUNCTIONS_URL}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      })
      const json = await res.json()
      if (json.error) throw new Error(json.error)

      window.location.href = json.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not start checkout.')
      setSubscribing(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    onLoggedOut()
  }

  return (
    <AccountShell activeTab="account" onNavigate={onNavigate} onBack={onBack}>
      <p style={{ color: '#6b7587', fontSize: 13, marginBottom: 4 }}>Signed in as</p>
      <p style={{ color: '#e8edf5', fontSize: 15, fontWeight: 600, marginBottom: 28, wordBreak: 'break-all' }}>{email}</p>

      {status === 'loading' && <p style={{ color: '#6b7587', fontSize: 14 }}>Checking your subscription…</p>}

      {status === 'active' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,217,126,0.08)', border: '1px solid rgba(0,217,126,0.25)', borderRadius: 12, padding: '10px 14px', marginBottom: 20 }}>
            <Check size={16} color="#00d97e" />
            <span style={{ fontSize: 13, color: '#e8edf5' }}>Subscription active</span>
          </div>
          <button onClick={handleDownload} disabled={downloading} style={primaryBtnStyle(downloading)}>
            {downloading ? 'Preparing download…' : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Download size={16} /> Download the app
              </span>
            )}
          </button>
        </>
      )}

      {status === 'inactive' && (
        <>
          <p style={{ color: '#6b7587', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
            No active subscription on this account yet.
          </p>
          <button onClick={handleSubscribe} disabled={subscribing} style={primaryBtnStyle(subscribing)}>
            {subscribing ? 'Starting checkout…' : 'Subscribe — $10/mo'}
          </button>
        </>
      )}

      {error && <p style={{ color: '#f87171', fontSize: 13, marginTop: 12 }}>{error}</p>}

      <button
        onClick={handleLogout}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
          color: '#6b7587', cursor: 'pointer', fontSize: 13, marginTop: 28, padding: 0,
        }}
      >
        <LogOut size={13} /> Log out
      </button>
    </AccountShell>
  )
}