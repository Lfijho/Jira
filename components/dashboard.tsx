'use client'

import { ArrowUp, ArrowDown, Clock, CheckCircle2, AlertCircle, Circle } from 'lucide-react'
import { StatCard } from './stat-card'
import { TaskCard } from './task-card'
import { ActivityFeed } from './activity-feed'

export function Dashboard() {
  const stats = [
    {
      label: 'Total Tasks',
      value: '124',
      change: '+12%',
      trend: 'up' as const,
      color: 'primary'
    },
    {
      label: 'In Progress',
      value: '32',
      change: '+8%',
      trend: 'up' as const,
      color: 'amber'
    },
    {
      label: 'Completed',
      value: '78',
      change: '+24%',
      trend: 'up' as const,
      color: 'green'
    },
    {
      label: 'Critical',
      value: '14',
      change: '-5%',
      trend: 'down' as const,
      color: 'red'
    },
  ]

  const priorityTasks = [
    {
      id: 'TASK-101',
      title: 'Fix authentication bug in login flow',
      status: 'In Progress',
      priority: 'Critical',
      assignee: 'Sarah Johnson',
      dueDate: '2024-01-15',
    },
    {
      id: 'TASK-102',
      title: 'Implement new dashboard analytics',
      status: 'Open',
      priority: 'High',
      assignee: 'Mike Chen',
      dueDate: '2024-01-18',
    },
    {
      id: 'TASK-103',
      title: 'Update API documentation',
      status: 'In Review',
      priority: 'Medium',
      assignee: 'Emma Davis',
      dueDate: '2024-01-20',
    },
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-text mb-2 text-balance">
          Welcome back, John
        </h1>
        <p className="text-text-muted">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} {...stat} index={index} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text">Priority Tasks</h2>
            <button className="text-sm text-[--color-primary] hover:text-[--color-primary-hover] font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {priorityTasks.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text">Recent Activity</h2>
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
