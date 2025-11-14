'use client'

import { Calendar, User, MoreVertical, Eye } from 'lucide-react'
import { useState } from 'react'
import { TaskDetailModal } from './task-detail-modal'

interface Task {
  id: string
  title: string
  status: 'Open' | 'In Progress' | 'In Review' | 'Completed'
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  assignee: string
  dueDate: string
  category: string
}

interface TaskRowProps {
  task: Task
  index: number
}

export function TaskRow({ task, index }: TaskRowProps) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const statusColors: Record<string, string> = {
    'Open': 'bg-[--color-amber]/20 text-[--color-amber] border-[--color-amber]/50',
    'In Progress': 'bg-[--color-primary]/20 text-[--color-primary] border-[--color-primary]/50',
    'In Review': 'bg-[--color-gold]/20 text-[--color-gold] border-[--color-gold]/50',
    'Completed': 'bg-green-500/20 text-green-400 border-green-500/50',
  }

  const priorityColors: Record<string, string> = {
    'Low': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    'Medium': 'bg-[--color-amber]/20 text-[--color-amber] border-[--color-amber]/50',
    'High': 'bg-[--color-coral]/20 text-[--color-coral] border-[--color-coral]/50',
    'Critical': 'bg-red-500/20 text-red-400 border-red-500/50',
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Completed'

  const taskDetail = {
    ...task,
    description: 'This is a detailed description of the task that needs to be completed. It includes all the necessary information and context for the assignee to understand what needs to be done.',
    tags: ['Bug', 'High Priority'],
    createdAt: '2024-01-10',
  }

  return (
    <>
      <div 
        onClick={() => setIsDetailModalOpen(true)}
        className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border hover:bg-surface-elevated transition-all cursor-pointer group animate-slideIn"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="col-span-4 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-text-muted">{task.id}</span>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-surface-elevated text-text-muted border border-border">
              {task.category}
            </span>
          </div>
          <h4 className="text-text font-medium group-hover:text-[--color-primary] transition-colors">
            {task.title}
          </h4>
        </div>

        <div className="col-span-2 flex items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}>
            {task.status}
          </span>
        </div>

        <div className="col-span-2 flex items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>

        <div className="col-span-2 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[--color-primary] to-[--color-gold] flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-text">{task.assignee.split(' ')[0]}</span>
        </div>

        <div className="col-span-1 flex items-center">
          <div className={`text-sm ${isOverdue ? 'text-red-400 font-medium' : 'text-text-muted'}`}>
            {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>

        <div className="col-span-1 flex items-center justify-center gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation()
              setIsDetailModalOpen(true)
            }}
            className="p-2 rounded-lg hover:bg-surface text-text-muted hover:text-text transition-all"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-lg hover:bg-surface text-text-muted hover:text-text transition-all"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
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
