import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This is just frontend for now
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle>{isSignIn ? 'Sign In' : 'Sign Up'}</CardTitle>
          <CardDescription>
            {isSignIn
              ? 'Welcome back! Please sign in to continue.'
              : 'Create an account to get started.'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              {isSignIn ? 'Sign In' : 'Sign Up'}
            </Button>
            <p className="text-sm text-center text-gray-600">
              {isSignIn ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsSignIn(!isSignIn)}
                className="text-blue-600 hover:underline"
              >
                {isSignIn ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}