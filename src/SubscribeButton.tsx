// src/SubscribeButton.tsx
//
// Drop this into your Pricing section as the paid-tier CTA.
// If the visitor isn't logged in, it hands off to the Sign Up page via
// onNeedsAccount. If they already have a session, it goes straight to
// Stripe Checkout.

import { useState } from 'react'
import { supabase } from './supabaseClient'

const FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL as string

export function SubscribeButton({
  priceLabel = '$X/mo',
  onNeedsAccount,
}: {
  priceLabel?: string
  onNeedsAccount: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleClick = async () => {
    setError('')
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      onNeedsAccount()
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${FUNCTIONS_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
      })
      const json = await res.json()
      if (json.error) throw new Error(json.error)

      window.location.href = json.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          background: loading ? '#00b368' : '#00d97e', color: '#0a0c0f', fontWeight: 600, fontSize: 15,
          padding: '13px 0', borderRadius: 12, border: 'none',
          cursor: loading ? 'wait' : 'pointer', transition: 'all 0.2s', width: '100%',
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#00c070' }}
        onMouseLeave={e => { e.currentTarget.style.background = loading ? '#00b368' : '#00d97e' }}
      >
        {loading ? 'Starting checkout…' : `Subscribe — ${priceLabel}`}
      </button>
      {error && <p style={{ color: '#f87171', fontSize: 13, marginTop: 8, textAlign: 'center' }}>{error}</p>}
    </div>
  )
}
