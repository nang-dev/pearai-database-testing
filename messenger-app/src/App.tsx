import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Chat from '@/pages/Chat'
import Auth from '@/pages/Auth'
import Home from '@/pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Navigate to="/auth" replace />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App