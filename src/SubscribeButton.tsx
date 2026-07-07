// src/SubscribeButton.tsx
//
// Drop this into your Pricing section as the paid-tier CTA. It:
//   1. Signs the user in (or up, if they don't have an account yet)
//   2. Calls the create-checkout-session Edge Function
//   3. Redirects to Stripe Checkout
//
// Styling is a rough match to the existing green/dark theme in App.tsx —
// swap the inline styles for your own classes/tokens as you like.

import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Check } from 'lucide-react'
import { supabase } from './supabaseClient'
console.log('ALL ENV VARS:', import.meta.env)

const FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL as string

export function SubscribeButton({ priceLabel = '$X/mo' }: { priceLabel?: string }) {
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false)

  const startCheckout = async () => {
    if (!email.trim() || !password) {
      setError('Enter an email and password.')
      return
    }
    setLoading(true)
    setError('')

    try {
      let { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        // Try signing in first; if that fails, assume they're new and sign up.
        const { data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({ email, password })

        if (signInError) {
          const { data: signUpData, error: signUpError } =
            await supabase.auth.signUp({ email, password })
          if (signUpError) throw signUpError

          if (!signUpData.session) {
            // Email confirmation is required before a session exists.
            setAwaitingConfirmation(true)
            setLoading(false)
            return
          }
          session = signUpData.session
        } else {
          session = signInData.session
        }
      }

      if (!session) throw new Error('Could not start a session.')

      console.log('session at checkout time:', session) 
      const res = await fetch(`${FUNCTIONS_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
      })
      const json = await res.json()
      console.log('checkout response:', json)   
      if (json.error) throw new Error(json.error)

      window.location.href = json.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
      setLoading(false)
    }
  }

  if (awaitingConfirmation) {
    return (
      <div style={{ background: 'rgba(0,217,126,0.08)', border: '1px solid rgba(0,217,126,0.25)', borderRadius: 14, padding: 20, textAlign: 'center' }}>
        <Check size={28} color="#00d97e" style={{ margin: '0 auto 8px' }} />
        <div style={{ color: '#e8edf5', fontWeight: 600, fontSize: 14 }}>Check your email</div>
        <p style={{ color: '#6b7587', fontSize: 13, marginTop: 4 }}>
          Confirm your account, then come back and subscribe.
        </p>
      </div>
    )
  }

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          background: '#00d97e', color: '#0a0c0f', fontWeight: 600, fontSize: 15,
          padding: '13px 0', borderRadius: 12, border: 'none',
          cursor: 'pointer', transition: 'all 0.2s', width: '100%',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#00c070' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#00d97e' }}
      >
        Subscribe — {priceLabel}
      </button>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={inputStyle}
      />
      {error && <p style={{ color: '#f87171', fontSize: 13, margin: 0 }}>{error}</p>}
      <button
        onClick={startCheckout}
        disabled={loading}
        style={{
          background: loading ? '#00b368' : '#00d97e',
          color: '#0a0c0f', fontWeight: 600, fontSize: 15,
          padding: '13px 0', borderRadius: 12, border: 'none',
          cursor: loading ? 'wait' : 'pointer', width: '100%',
        }}
      >
        {loading ? 'Starting checkout…' : 'Continue to payment'}
      </button>
    </div>
  )
}

const inputStyle: CSSProperties = {
  background: '#111318', border: '1px solid #232830', borderRadius: 10,
  color: '#e8edf5', fontSize: 14, padding: '12px 14px', outline: 'none',
}