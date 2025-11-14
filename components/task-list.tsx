'use client'

import { useState } from 'react'
import { Search, Filter, SortAsc, MoreVertical, Eye } from 'lucide-react'
import { TaskRow } from './task-row'

interface Task {
  id: string
  title: string
  status: 'Open' | 'In Progress' | 'In Review' | 'Completed'
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  assignee: string
  dueDate: string
  category: string
}

export function TaskList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedPriority, setSelectedPriority] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'status'>('dueDate')

  const allTasks: Task[] = [
    {
      id: 'TASK-101',
      title: 'Fix authentication bug in login flow',
      status: 'In Progress',
      priority: 'Critical',
      assignee: 'Mike Chen',
      dueDate: '2024-01-15',
      category: 'Backend',
    },
    {
      id: 'TASK-102',
      title: 'Implement new dashboard analytics',
      status: 'Open',
      priority: 'High',
      assignee: 'Sarah Johnson',
      dueDate: '2024-01-18',
      category: 'Frontend',
    },
    {
      id: 'TASK-103',
      title: 'Update API documentation',
      status: 'In Review',
      priority: 'Medium',
      assignee: 'Emma Davis',
      dueDate: '2024-01-20',
      category: 'Documentation',
    },
    {
      id: 'TASK-104',
      title: 'Design new landing page',
      status: 'Open',
      priority: 'High',
      assignee: 'Sarah Johnson',
      dueDate: '2024-01-20',
      category: 'Design',
    },
    {
      id: 'TASK-105',
      title: 'Setup CI/CD pipeline',
      status: 'Completed',
      priority: 'Medium',
      assignee: 'Mike Chen',
      dueDate: '2024-01-14',
      category: 'DevOps',
    },
    {
      id: 'TASK-106',
      title: 'Implement search feature',
      status: 'In Progress',
      priority: 'Medium',
      assignee: 'John Doe',
      dueDate: '2024-01-18',
      category: 'Backend',
    },
    {
      id: 'TASK-107',
      title: 'Mobile responsive testing',
      status: 'Open',
      priority: 'Low',
      assignee: 'Emma Davis',
      dueDate: '2024-01-25',
      category: 'QA',
    },
    {
      id: 'TASK-108',
      title: 'Database optimization',
      status: 'In Progress',
      priority: 'High',
      assignee: 'Mike Chen',
      dueDate: '2024-01-17',
      category: 'Backend',
    },
  ]

  const filteredTasks = allTasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    } else if (sortBy === 'priority') {
      const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    return 0
  })

  return (
    <div className="h-full flex flex-col animate-fadeIn">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text mb-2">All Tasks</h1>
        <p className="text-text-muted">Manage and track all your tasks in one place</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-surface rounded-xl border border-border p-4 mb-6 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface-elevated border border-border rounded-lg text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-surface-elevated border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-[--color-primary] cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 bg-surface-elevated border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-[--color-primary] cursor-pointer"
          >
            <option value="all">All Priority</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 bg-surface-elevated border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-[--color-primary] cursor-pointer"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">
            Showing <span className="text-text font-medium">{sortedTasks.length}</span> of{' '}
            <span className="text-text font-medium">{allTasks.length}</span> tasks
          </span>
          <button className="text-[--color-primary] hover:text-[--color-primary-hover] font-medium">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Task Table */}
      <div className="flex-1 bg-surface rounded-xl border border-border overflow-hidden flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border bg-surface-elevated text-sm font-semibold text-text-muted">
          <div className="col-span-4">Task</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Priority</div>
          <div className="col-span-2">Assignee</div>
          <div className="col-span-1">Due Date</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-y-auto">
          {sortedTasks.map((task, index) => (
            <TaskRow key={task.id} task={task} index={index} />
          ))}
          
          {sortedTasks.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full p-12">
              <div className="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">No tasks found</h3>
              <p className="text-text-muted text-center">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
