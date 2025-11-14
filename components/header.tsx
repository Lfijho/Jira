'use client'

import { Search, Bell, User } from 'lucide-react'

export function Header() {
  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search tasks, projects, or people..."
            className="w-full pl-10 pr-4 py-2 bg-surface-elevated border border-border rounded-lg text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-text-muted hover:text-text hover:bg-surface-elevated rounded-lg transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[--color-coral] rounded-full"></span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 px-3 py-2 hover:bg-surface-elevated rounded-lg transition-all">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[--color-primary] to-[--color-gold] flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="text-left hidden md:block">
            <p className="text-sm font-medium text-text">John Doe</p>
            <p className="text-xs text-text-muted">Project Manager</p>
          </div>
        </button>
      </div>
    </header>
  )
}
