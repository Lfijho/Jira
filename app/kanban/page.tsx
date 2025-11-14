import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { KanbanBoard } from '@/components/kanban-board'

export default function KanbanPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden p-6">
          <KanbanBoard />
        </main>
      </div>
    </div>
  )
}
