'use client'

import { LayoutDashboard, KanbanSquare, List, Plus, Settings, Users, Tag } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CreateTaskModal } from './create-task-modal'

export function Sidebar() {
  const pathname = usePathname()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { id: 'kanban', icon: KanbanSquare, label: 'Kanban Board', href: '/kanban' },
    { id: 'list', icon: List, label: 'Task List', href: '/list' },
    { id: 'team', icon: Users, label: 'Team', href: '/team' },
    { id: 'tags', icon: Tag, label: 'Tags', href: '/tags' },
  ]

  return (
    <>
      <aside className="w-64 bg-surface border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--color-primary] to-[--color-coral] flex items-center justify-center">
              <span className="text-white font-bold text-xl">TF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-text">TaskFlow</h1>
              <p className="text-xs text-text-muted">Pro Edition</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
                  transition-all duration-200
                  ${isActive 
                    ? 'bg-[--color-primary] text-white shadow-lg' 
                    : 'text-text-muted hover:bg-surface-elevated hover:text-text'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Create Task Button */}
        <div className="p-4 border-t border-border">
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[--color-primary] to-[--color-coral] text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>New Task</span>
          </button>
        </div>

        {/* Settings */}
        <div className="p-4 border-t border-border">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-text-muted hover:bg-surface-elevated hover:text-text transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>

      {/* CreateTaskModal component */}
      <CreateTaskModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </>
  )
}
