'use client'

import { useState, useRef, useEffect } from 'react'
import { useChatStore } from '@/store/useChatStore'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PaperAirplaneIcon, 
  PaperClipIcon,
  StopIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { MessageBubble } from './message-bubble'
import { FileUpload } from './file-upload'
import { TypingIndicator } from './typing-indicator'

export function ChatInterface() {
  const [input, setInput] = useState('')
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  
  const { 
    conversations, 
    activeConversationId, 
    isLoading, 
    isTyping, 
    sendMessage,
    addMessage 
  } = useChatStore()

  const activeConversation = conversations.find(conv => conv.id === activeConversationId)
  const messages = activeConversation?.messages || []

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const messageContent = input.trim()
    setInput('')

    // Add user message immediately
    if (activeConversationId) {
      addMessage(activeConversationId, {
        content: messageContent,
        role: 'user',
        conversationId: activeConversationId,
      })
    }

    // Send to AI
    await sendMessage(messageContent)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleStop = () => {
    // TODO: Implement stop generation
    console.log('Stop generation')
  }

  const handleRegenerate = (messageId: string) => {
    // TODO: Implement regenerate response
    console.log('Regenerate message:', messageId)
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-200 bg-white">
        <div>
          <h1 className="text-lg font-semibold text-secondary-900">
            {activeConversation?.title || 'New Conversation'}
          </h1>
          <p className="text-sm text-secondary-600">
            {messages.length} messages
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {isLoading && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleStop}
              className="text-error-600 hover:text-error-700"
            >
              <StopIcon className="w-4 h-4 mr-2" />
              Stop
            </Button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MessageBubble
                message={message}
                onRegenerate={() => handleRegenerate(message.id)}
                showRegenerate={index === messages.length - 1 && message.role === 'assistant'}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}

        {/* Empty State */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center py-12"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              Start a conversation
            </h3>
            <p className="text-secondary-600 mb-6 max-w-md">
              Ask me anything, upload files for analysis, or start a deep dive into any topic.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput('Explain quantum computing in simple terms')}
              >
                Explain quantum computing
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput('Help me analyze this research paper')}
              >
                Analyze research paper
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput('Fact check this claim')}
              >
                Fact check claim
              </Button>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-secondary-200 bg-white p-4">
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          {/* File Upload Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsFileUploadOpen(true)}
            className="flex-shrink-0"
          >
            <PaperClipIcon className="w-5 h-5" />
          </Button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="w-full px-4 py-3 pr-12 border border-secondary-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={1}
              style={{
                minHeight: '48px',
                maxHeight: '120px',
                height: 'auto',
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = 'auto'
                target.style.height = `${Math.min(target.scrollHeight, 120)}px`
              }}
            />
          </div>

          {/* Send Button */}
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0"
          >
            {isLoading ? (
              <ArrowPathIcon className="w-5 h-5 animate-spin" />
            ) : (
              <PaperAirplaneIcon className="w-5 h-5" />
            )}
          </Button>
        </form>

        {/* Input Footer */}
        <div className="mt-2 flex items-center justify-between text-xs text-secondary-500">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span>AI may make mistakes. Verify important information.</span>
        </div>
      </div>

      {/* File Upload Modal */}
      <FileUpload
        isOpen={isFileUploadOpen}
        onClose={() => setIsFileUploadOpen(false)}
        onUpload={(files) => {
          // TODO: Handle file upload
          console.log('Files uploaded:', files)
          setIsFileUploadOpen(false)
        }}
      />
    </div>
  )
}
