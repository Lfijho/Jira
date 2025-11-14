'use client'

import { Calendar, User, Tag } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  assignee: string
  dueDate: string
  tags: string[]
}

interface KanbanCardProps {
  task: Task
  onDragStart: () => void
}

export function KanbanCard({ task, onDragStart }: KanbanCardProps) {
  const priorityColors: Record<string, string> = {
    Low: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    Medium: 'bg-[--color-amber]/20 text-[--color-amber] border-[--color-amber]/50',
    High: 'bg-[--color-coral]/20 text-[--color-coral] border-[--color-coral]/50',
    Critical: 'bg-red-500/20 text-red-400 border-red-500/50',
  }

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-surface-elevated rounded-lg p-4 border border-border hover:border-[--color-primary] hover:shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-mono text-text-muted">{task.id}</span>
        <span className={`px-2 py-0.5 rounded border text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {/* Title & Description */}
      <h4 className="text-text font-medium mb-2 group-hover:text-[--color-primary] transition-colors">
        {task.title}
      </h4>
      <p className="text-sm text-text-muted mb-4 line-clamp-2">{task.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-surface rounded text-xs text-text-muted border border-border"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-text-muted">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[--color-primary] to-[--color-gold] flex items-center justify-center">
            <User className="w-3 h-3 text-white" />
          </div>
          <span>{task.assignee.split(' ')[0]}</span>
        </div>
        <div className="flex items-center gap-1 text-text-muted">
          <Calendar className="w-3 h-3" />
          <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
    </div>
  )
}
