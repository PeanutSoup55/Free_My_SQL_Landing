// src/pages/shared.tsx
import type { CSSProperties, ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'

export function PageShell({ children, onBack }: { children: ReactNode; onBack: () => void }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: '#0a0c0f' }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
            color: '#6b7587', cursor: 'pointer', fontSize: 13, marginBottom: 24, padding: 0,
          }}
        >
          <ArrowLeft size={14} /> Back to site
        </button>
        {children}
      </div>
    </div>
  )
}

export const inputStyle: CSSProperties = {
  background: '#111318', border: '1px solid #232830', borderRadius: 10,
  color: '#e8edf5', fontSize: 14, padding: '12px 14px', outline: 'none', width: '100%',
}

export function primaryBtnStyle(loading: boolean): CSSProperties {
  return {
    background: loading ? '#00b368' : '#00d97e', color: '#0a0c0f', fontWeight: 600,
    fontSize: 15, padding: '13px 0', borderRadius: 12, border: 'none',
    cursor: loading ? 'wait' : 'pointer', width: '100%',
  }
}

export const linkBtnStyle: CSSProperties = {
  background: 'none', border: 'none', color: '#00d97e', cursor: 'pointer', fontSize: 13, padding: 0,
}

export type AccountTab = 'account' | 'docs' | 'support'

export function AccountShell({
  children,
  activeTab,
  onNavigate,
  onBack,
  maxWidth = 380,
}: {
  children: ReactNode
  activeTab: AccountTab
  onNavigate: (tab: AccountTab) => void
  onBack: () => void
  maxWidth?: number
}) {
  const tabs: { key: AccountTab; label: string }[] = [
    { key: 'account', label: 'Account' },
    { key: 'docs', label: 'Docs' },
    { key: 'support', label: 'Support' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0a0c0f' }}>
      <div style={{ borderBottom: '1px solid #232830', padding: '0 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, flexWrap: 'wrap', gap: 12 }}>
          <button
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#6b7587', cursor: 'pointer', fontSize: 13, padding: 0 }}
          >
            <ArrowLeft size={14} /> Back to site
          </button>
          <div style={{ display: 'flex', gap: 24 }}>
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => onNavigate(t.key)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, padding: '4px 0',
                  color: activeTab === t.key ? '#e8edf5' : '#6b7587',
                  borderBottom: activeTab === t.key ? '2px solid #00d97e' : '2px solid transparent',
                  transition: 'color 0.2s',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth, margin: '0 auto' }}>{children}</div>
      </div>
    </div>
  )
}