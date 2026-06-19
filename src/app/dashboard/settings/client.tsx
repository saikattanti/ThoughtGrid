'use client'

import { useState } from 'react'
import { ProfileTab } from './tabs/profile-tab'
import { IntegrationsTab } from './tabs/integrations-tab'
import { BillingTab } from './tabs/billing-tab'
import { SecurityTab } from './tabs/security-tab'

type TabID = 'profile' | 'integrations' | 'billing' | 'security'

export function SettingsClient({ 
  hasLinkedIn, 
  email, 
  fullName, 
  avatarUrl 
}: { 
  hasLinkedIn: boolean
  email: string
  fullName: string
  avatarUrl: string
}) {
  const [activeTab, setActiveTab] = useState<TabID>('profile')

  const tabs = [
    { id: 'profile', label: 'Profile & Account', icon: 'person' },
    { id: 'integrations', label: 'Integrations', icon: 'extension' },
    { id: 'billing', label: 'Billing & Plan', icon: 'credit_card' },
    { id: 'security', label: 'Security', icon: 'shield' },
  ] as const

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Settings Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0 space-y-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-left text-[14px] font-medium ${
              activeTab === tab.id
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-muted hover:bg-surface hover:text-foreground border border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Settings Content Area */}
      <div className="flex-1">
        {activeTab === 'profile' && <ProfileTab email={email} fullName={fullName} avatarUrl={avatarUrl} />}
        {activeTab === 'integrations' && <IntegrationsTab hasLinkedIn={hasLinkedIn} />}
        {activeTab === 'billing' && <BillingTab />}
        {activeTab === 'security' && <SecurityTab />}
      </div>
    </div>
  )
}
