// src/pages/LoginPage.tsx
import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { PageShell, inputStyle, primaryBtnStyle, linkBtnStyle } from '../shared'

export function LoginPage({
  onBack,
  onGoToSignUp,
  onLoggedIn,
}: {
  onBack: () => void
  onGoToSignUp: () => void
  onLoggedIn: () => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    if (!email.trim() || !password) {
      setError('Enter your email and password.')
      return
    }
    setLoading(true)
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (signInError) {
      setError(signInError.message)
      return
    }
    onLoggedIn()
  }

  return (
    <PageShell onBack={onBack}>
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 28, color: '#e8edf5', marginBottom: 8 }}>
        Log in
      </h2>
      <p style={{ color: '#6b7587', fontSize: 14, marginBottom: 28 }}>Access your account and downloads.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
        {error && <p style={{ color: '#f87171', fontSize: 13, margin: 0 }}>{error}</p>}
        <button onClick={handleSubmit} disabled={loading} style={primaryBtnStyle(loading)}>
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </div>

      <p style={{ marginTop: 20, fontSize: 13, color: '#6b7587', textAlign: 'center' }}>
        Don't have an account?{' '}
        <button onClick={onGoToSignUp} style={linkBtnStyle}>Sign up</button>
      </p>
    </PageShell>
  )
}
