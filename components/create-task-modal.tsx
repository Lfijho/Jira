'use client'

import { X, Calendar, User, Flag, Tag } from 'lucide-react'
import { useState } from 'react'

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Open',
    priority: 'Medium',
    assignee: '',
    dueDate: '',
    category: '',
    tags: '',
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating task:', formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-surface rounded-2xl border border-border shadow-2xl overflow-hidden animate-fadeIn glass">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-[--color-primary]/10 to-[--color-coral]/10">
          <div>
            <h2 className="text-2xl font-bold text-text">Create New Task</h2>
            <p className="text-sm text-text-muted mt-1">Add a new task to your project</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-surface-elevated hover:bg-surface border border-border flex items-center justify-center text-text-muted hover:text-text transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Task Title <span className="text-[--color-coral]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title..."
              className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-lg text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the task..."
              className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-lg text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Status and Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                <Flag className="w-4 h-4 inline mr-1" />
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-[--color-primary] cursor-pointer transition-all"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                <Flag className="w-4 h-4 inline mr-1" />
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-[--color-primary] cursor-pointer transition-all"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Assignee and Due Date Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Assignee
              </label>
              <input
                type="text"
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                placeholder="Assign to..."
                className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-lg text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-[--color-primary] cursor-pointer transition-all"
              />
            </div>
          </div>

          {/* Category and Tags Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Frontend, Backend..."
                className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-lg text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Comma separated tags..."
                className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-lg text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-surface-elevated">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-lg border border-border text-text hover:bg-surface transition-all font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[--color-primary] to-[--color-coral] text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  )
}
