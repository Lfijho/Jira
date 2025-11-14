'use client'

import { KanbanCard } from './kanban-card'
import { Plus } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  assignee: string
  dueDate: string
  tags: string[]
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

interface KanbanColumnProps {
  column: Column
  onDragStart: (task: Task, columnId: string) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (columnId: string) => void
  index: number
}

export function KanbanColumn({ column, onDragStart, onDragOver, onDrop, index }: KanbanColumnProps) {
  const columnColors: Record<string, string> = {
    open: 'border-[--color-amber]',
    progress: 'border-[--color-primary]',
    review: 'border-[--color-gold]',
    done: 'border-green-600',
  }

  return (
    <div 
      className="flex-shrink-0 w-80 flex flex-col animate-slideIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Column Header */}
      <div className={`bg-surface rounded-t-xl border-t-4 ${columnColors[column.id]} border-x border-border p-4`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-text">{column.title}</h3>
          <span className="px-2 py-1 rounded-full bg-surface-elevated text-xs font-medium text-text-muted">
            {column.tasks.length}
          </span>
        </div>
      </div>

      {/* Task List */}
      <div
        className="flex-1 bg-surface border-x border-b border-border rounded-b-xl p-4 space-y-3 overflow-y-auto"
        onDragOver={onDragOver}
        onDrop={() => onDrop(column.id)}
      >
        {column.tasks.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            onDragStart={() => onDragStart(task, column.id)}
          />
        ))}
        
        {/* Add Task Button */}
        <button className="w-full py-3 border-2 border-dashed border-border rounded-lg text-text-muted hover:text-text hover:border-[--color-primary] hover:bg-surface-elevated transition-all flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Task</span>
        </button>
      </div>
    </div>
  )
}
