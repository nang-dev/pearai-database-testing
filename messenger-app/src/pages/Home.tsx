import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Home() {
  const navigate = useNavigate()

  const handleSignOut = () => {
    // This is just frontend for now
    navigate('/auth')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold">Welcome to Your Dashboard</h1>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-500 text-lg">Your dashboard content will go here</p>
          </div>
        </div>
      </main>
    </div>
  )
}