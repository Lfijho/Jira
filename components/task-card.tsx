'use client'

import { Calendar, User } from 'lucide-react'
import { useState } from 'react'
import { TaskDetailModal } from './task-detail-modal'

interface TaskCardProps {
  id: string
  title: string
  status: string
  priority: string
  assignee: string
  dueDate: string
}

export function TaskCard({ id, title, status, priority, assignee, dueDate }: TaskCardProps) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const statusColors: Record<string, string> = {
    'Open': 'bg-[--color-amber] text-black',
    'In Progress': 'bg-[--color-primary] text-white',
    'In Review': 'bg-[--color-gold] text-black',
    'Completed': 'bg-green-600 text-white',
  }

  const priorityColors: Record<string, string> = {
    'Low': 'border-l-blue-500',
    'Medium': 'border-l-[--color-amber]',
    'High': 'border-l-[--color-coral]',
    'Critical': 'border-l-red-500',
  }

  const taskDetail = {
    id,
    title,
    description: 'This is a detailed description of the task that needs to be completed. It includes all the necessary information and context for the assignee to understand what needs to be done.',
    status,
    priority,
    assignee,
    dueDate,
    category: 'Backend',
    tags: ['Bug', 'High Priority'],
    createdAt: '2024-01-10',
  }

  return (
    <>
      <div 
        onClick={() => setIsDetailModalOpen(true)}
        className={`bg-surface rounded-lg p-4 border border-border border-l-4 ${priorityColors[priority]} hover:shadow-lg hover:scale-[1.01] transition-all duration-200 cursor-pointer group`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-text-muted">{id}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[status]}`}>
                {status}
              </span>
            </div>
            <h3 className="text-text font-medium group-hover:text-[--color-primary] transition-colors">
              {title}
            </h3>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-text-muted">
            <User className="w-4 h-4" />
            <span>{assignee}</span>
          </div>
          <div className="flex items-center gap-2 text-text-muted">
            <Calendar className="w-4 h-4" />
            <span>{new Date(dueDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <TaskDetailModal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)}
        task={taskDetail}
      />
    </>
  )
}
