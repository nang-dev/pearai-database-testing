import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: newMessage,
      timestamp: new Date()
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Chat List Sidebar */}
      <div className="w-80 border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Chats</h2>
          <div className="space-y-2">
            {['Alice', 'Bob', 'Charlie'].map((name) => (
              <Card key={name} className="p-3 hover:bg-accent cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      {name[0]}
                    </div>
                  </Avatar>
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-muted-foreground">Online</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                A
              </div>
            </Avatar>
            <div>
              <p className="font-medium">Alice</p>
              <p className="text-sm text-muted-foreground">Active now</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'You' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'You'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  )
}