'use client'

import { CheckCircle2, MessageSquare, User, GitBranch } from 'lucide-react'

export function ActivityFeed() {
  const activities = [
    {
      icon: CheckCircle2,
      color: 'text-green-500',
      title: 'Task Completed',
      description: 'Sarah completed "User authentication"',
      time: '5 min ago',
    },
    {
      icon: MessageSquare,
      color: 'text-[--color-primary]',
      title: 'New Comment',
      description: 'Mike commented on "API Integration"',
      time: '23 min ago',
    },
    {
      icon: User,
      color: 'text-[--color-gold]',
      title: 'Task Assigned',
      description: 'You were assigned to "Dashboard redesign"',
      time: '1 hour ago',
    },
    {
      icon: GitBranch,
      color: 'text-[--color-coral]',
      title: 'Status Changed',
      description: 'Task moved to "In Review"',
      time: '2 hours ago',
    },
  ]

  return (
    <div className="bg-surface rounded-xl border border-border p-4 space-y-4">
      {activities.map((activity, index) => {
        const Icon = activity.icon
        return (
          <div 
            key={index} 
            className="flex gap-3 p-3 rounded-lg hover:bg-surface-elevated transition-all cursor-pointer animate-slideIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-10 h-10 rounded-lg bg-surface-elevated flex items-center justify-center flex-shrink-0 ${activity.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text mb-1">{activity.title}</p>
              <p className="text-xs text-text-muted truncate">{activity.description}</p>
              <p className="text-xs text-text-subtle mt-1">{activity.time}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
