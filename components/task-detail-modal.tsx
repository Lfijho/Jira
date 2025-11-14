'use client'

import { X, Calendar, User, Flag, Tag, MessageSquare, Clock, CheckCircle2 } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: string
  assignee: string
  dueDate: string
  category: string
  tags: string[]
  createdAt: string
}

interface TaskDetailModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
}

export function TaskDetailModal({ isOpen, onClose, task }: TaskDetailModalProps) {
  if (!isOpen || !task) return null

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

  const activities = [
    { type: 'comment', user: 'Sarah Johnson', text: 'Updated the implementation approach', time: '2 hours ago' },
    { type: 'status', user: 'Mike Chen', text: 'Changed status to In Progress', time: '5 hours ago' },
    { type: 'assigned', user: 'System', text: 'Task assigned to Mike Chen', time: '1 day ago' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-surface rounded-2xl border border-border shadow-2xl overflow-hidden glass">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border bg-gradient-to-r from-[--color-primary]/10 to-[--color-coral]/10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-mono text-text-muted">{task.id}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}>
                {task.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-text">{task.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-surface-elevated hover:bg-surface border border-border flex items-center justify-center text-text-muted hover:text-text transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 h-[calc(90vh-180px)]">
          {/* Main Content */}
          <div className="col-span-2 p-6 overflow-y-auto space-y-6 border-r border-border">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-text mb-3">Description</h3>
              <p className="text-text-muted leading-relaxed">
                {task.description || 'No description provided.'}
              </p>
            </div>

            {/* Details Grid */}
            <div>
              <h3 className="text-lg font-semibold text-text mb-3">Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-surface-elevated rounded-lg border border-border">
                  <User className="w-5 h-5 text-[--color-primary]" />
                  <div>
                    <p className="text-xs text-text-muted">Assignee</p>
                    <p className="text-sm font-medium text-text">{task.assignee}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-surface-elevated rounded-lg border border-border">
                  <Calendar className="w-5 h-5 text-[--color-coral]" />
                  <div>
                    <p className="text-xs text-text-muted">Due Date</p>
                    <p className="text-sm font-medium text-text">
                      {new Date(task.dueDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-surface-elevated rounded-lg border border-border">
                  <Clock className="w-5 h-5 text-[--color-gold]" />
                  <div>
                    <p className="text-xs text-text-muted">Created</p>
                    <p className="text-sm font-medium text-text">
                      {new Date(task.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-surface-elevated rounded-lg border border-border">
                  <Tag className="w-5 h-5 text-[--color-amber]" />
                  <div>
                    <p className="text-xs text-text-muted">Category</p>
                    <p className="text-sm font-medium text-text">{task.category}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-text mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-surface-elevated rounded-lg text-sm text-text border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Activity */}
          <div className="col-span-1 p-6 overflow-y-auto bg-surface-elevated/50">
            <h3 className="text-lg font-semibold text-text mb-4">Activity</h3>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[--color-primary] to-[--color-gold] flex items-center justify-center flex-shrink-0">
                    {activity.type === 'comment' && <MessageSquare className="w-4 h-4 text-white" />}
                    {activity.type === 'status' && <CheckCircle2 className="w-4 h-4 text-white" />}
                    {activity.type === 'assigned' && <User className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text font-medium">{activity.user}</p>
                    <p className="text-sm text-text-muted">{activity.text}</p>
                    <p className="text-xs text-text-subtle mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="mt-6 pt-6 border-t border-border">
              <textarea
                placeholder="Add a comment..."
                rows={3}
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-[--color-primary] resize-none"
              />
              <button className="mt-2 w-full px-4 py-2 bg-gradient-to-r from-[--color-primary] to-[--color-coral] text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                Post Comment
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-surface-elevated">
          <button className="px-4 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-all font-medium">
            Delete Task
          </button>
          <div className="flex gap-3">
            <button className="px-6 py-2 rounded-lg border border-border text-text hover:bg-surface transition-all font-medium">
              Close
            </button>
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-[--color-primary] to-[--color-coral] text-white font-semibold hover:shadow-lg hover:scale-105 transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
