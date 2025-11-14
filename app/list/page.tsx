import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { TaskList } from '@/components/task-list'

export default function ListPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden p-6">
          <TaskList />
        </main>
      </div>
    </div>
  )
}
