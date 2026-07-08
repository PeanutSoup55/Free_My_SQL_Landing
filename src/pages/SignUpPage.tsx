// src/pages/SignUpPage.tsx
import { useState } from 'react'
import { Check } from 'lucide-react'
import { supabase } from '../supabaseClient'
import { PageShell, inputStyle, primaryBtnStyle, linkBtnStyle } from '../shared'

export function SignUpPage({
  onBack,
  onGoToLogin,
  onSignedUpWithSession,
}: {
  onBack: () => void
  onGoToLogin: () => void
  onSignedUpWithSession: () => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = async () => {
    setError('')
    if (!email.trim() || !password) {
      setError('Enter an email and password.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
    setLoading(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    if (data.session) {
      // Email confirmation is off for this project — go straight in.
      onSignedUpWithSession()
    } else {
      // Confirmation required before a session exists.
      setDone(true)
    }
  }

  if (done) {
    return (
      <PageShell onBack={onBack}>
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Check size={36} color="#00d97e" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 24, color: '#e8edf5', marginBottom: 8 }}>
            Check your email
          </h2>
          <p style={{ color: '#6b7587', fontSize: 14, maxWidth: 320, margin: '0 auto', lineHeight: 1.6 }}>
            We sent a confirmation link to <strong style={{ color: '#e8edf5' }}>{email}</strong>.
            Confirm your account, then log in to subscribe and get the app.
          </p>
          <button
            onClick={onGoToLogin}
            style={{ marginTop: 24, background: 'none', border: '1px solid #232830', color: '#e8edf5', padding: '10px 24px', borderRadius: 10, cursor: 'pointer', fontSize: 14 }}
          >
            Go to Log In
          </button>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell onBack={onBack}>
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 28, color: '#e8edf5', marginBottom: 8 }}>
        Create your account
      </h2>
      <p style={{ color: '#6b7587', fontSize: 14, marginBottom: 28 }}>You'll subscribe on the next step.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
        <input type="password" placeholder="Confirm password" value={confirm} onChange={e => setConfirm(e.target.value)} style={inputStyle} />
        {error && <p style={{ color: '#f87171', fontSize: 13, margin: 0 }}>{error}</p>}
        <button onClick={handleSubmit} disabled={loading} style={primaryBtnStyle(loading)}>
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </div>

      <p style={{ marginTop: 20, fontSize: 13, color: '#6b7587', textAlign: 'center' }}>
        Already have an account?{' '}
        <button onClick={onGoToLogin} style={linkBtnStyle}>Log in</button>
      </p>
    </PageShell>
  )
}
