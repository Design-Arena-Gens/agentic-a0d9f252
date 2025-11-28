'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './page.module.css'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'm ChatPTAtlas, a demo chat interface. I can help you explore various topics!",
        "That's an interesting question! As a demo application, I provide simulated responses.",
        "Great observation! This interface mimics a chat experience with AI.",
        "I understand what you're asking. In a production environment, this would connect to a real AI service.",
        "Thanks for chatting with ChatPTAtlas! This is a demonstration of a modern chat interface.",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <button className={styles.newChatBtn}>
          <span>+</span> New chat
        </button>
        <div className={styles.sidebarContent}>
          <h1 className={styles.title}>ChatPTAtlas</h1>
          <p className={styles.subtitle}>AI Chat Interface</p>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.messages}>
          {messages.length === 0 && (
            <div className={styles.welcome}>
              <h2>ChatPTAtlas</h2>
              <p>Your AI-powered assistant</p>
              <div className={styles.suggestions}>
                <button onClick={() => setInput("What can you help me with?")}>
                  What can you help me with?
                </button>
                <button onClick={() => setInput("Tell me something interesting")}>
                  Tell me something interesting
                </button>
                <button onClick={() => setInput("How does this work?")}>
                  How does this work?
                </button>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message.role === 'user' ? styles.userMessage : styles.assistantMessage
              }`}
            >
              <div className={styles.messageContent}>
                <div className={styles.avatar}>
                  {message.role === 'user' ? '👤' : '🤖'}
                </div>
                <div className={styles.text}>{message.content}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className={`${styles.message} ${styles.assistantMessage}`}>
              <div className={styles.messageContent}>
                <div className={styles.avatar}>🤖</div>
                <div className={styles.text}>
                  <div className={styles.typing}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputArea}>
          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a message..."
              className={styles.input}
              disabled={isLoading}
            />
            <button
              type="submit"
              className={styles.sendBtn}
              disabled={!input.trim() || isLoading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 11L12 6L17 11M12 18V7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
