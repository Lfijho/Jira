'use client'

import { ArrowUp, ArrowDown } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
  color: string
  index: number
}

export function StatCard({ label, value, change, trend, color, index }: StatCardProps) {
  const colorMap: Record<string, string> = {
    primary: 'border-[--color-primary]',
    amber: 'border-[--color-amber]',
    green: 'border-green-500',
    red: 'border-red-500',
  }

  return (
    <div 
      className={`bg-surface rounded-xl p-6 border-2 ${colorMap[color]} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fadeIn`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          {change}
        </div>
      </div>
      <h3 className="text-3xl font-bold text-text mb-1">{value}</h3>
      <p className="text-sm text-text-muted">{label}</p>
    </div>
  )
}
