'use client'

import { useState } from 'react'
import { KanbanColumn } from './kanban-column'
import { Plus, Filter } from 'lucide-react'

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

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'open',
      title: 'Open',
      tasks: [
        {
          id: 'TASK-104',
          title: 'Design new landing page',
          description: 'Create mockups for the new product landing page',
          priority: 'High',
          assignee: 'Sarah Johnson',
          dueDate: '2024-01-20',
          tags: ['Design', 'Frontend'],
        },
        {
          id: 'TASK-105',
          title: 'Update user documentation',
          description: 'Refresh the user guide with new features',
          priority: 'Low',
          assignee: 'Emma Davis',
          dueDate: '2024-01-25',
          tags: ['Documentation'],
        },
      ],
    },
    {
      id: 'progress',
      title: 'In Progress',
      tasks: [
        {
          id: 'TASK-101',
          title: 'Fix authentication bug',
          description: 'Resolve login flow issues in production',
          priority: 'Critical',
          assignee: 'Mike Chen',
          dueDate: '2024-01-15',
          tags: ['Bug', 'Backend'],
        },
        {
          id: 'TASK-106',
          title: 'Implement search feature',
          description: 'Add global search functionality',
          priority: 'Medium',
          assignee: 'John Doe',
          dueDate: '2024-01-18',
          tags: ['Feature', 'Backend'],
        },
      ],
    },
    {
      id: 'review',
      title: 'In Review',
      tasks: [
        {
          id: 'TASK-102',
          title: 'API performance optimization',
          description: 'Improve response times for key endpoints',
          priority: 'High',
          assignee: 'Sarah Johnson',
          dueDate: '2024-01-16',
          tags: ['Performance', 'Backend'],
        },
      ],
    },
    {
      id: 'done',
      title: 'Completed',
      tasks: [
        {
          id: 'TASK-103',
          title: 'Setup CI/CD pipeline',
          description: 'Configure automated deployment workflow',
          priority: 'Medium',
          assignee: 'Mike Chen',
          dueDate: '2024-01-14',
          tags: ['DevOps'],
        },
      ],
    },
  ])

  const [draggedTask, setDraggedTask] = useState<{ task: Task; columnId: string } | null>(null)

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask({ task, columnId })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetColumnId: string) => {
    if (!draggedTask) return

    const { task, columnId: sourceColumnId } = draggedTask

    if (sourceColumnId === targetColumnId) {
      setDraggedTask(null)
      return
    }

    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((col) => {
        if (col.id === sourceColumnId) {
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== task.id),
          }
        }
        if (col.id === targetColumnId) {
          return {
            ...col,
            tasks: [...col.tasks, task],
          }
        }
        return col
      })
      return newColumns
    })

    setDraggedTask(null)
  }

  return (
    <div className="h-full flex flex-col animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Kanban Board</h1>
          <p className="text-text-muted">Drag and drop tasks to update their status</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-text hover:bg-surface-elevated transition-all">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[--color-primary] to-[--color-coral] text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
        {columns.map((column, index) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
