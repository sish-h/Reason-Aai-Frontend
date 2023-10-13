import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
  conversationId: string
  metadata?: {
    sources?: string[]
    confidence?: number
    type?: 'text' | 'file_analysis' | 'research' | 'fact_check'
  }
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: string
  updatedAt: string
  isActive: boolean
}

interface ChatState {
  conversations: Conversation[]
  activeConversationId: string | null
  isLoading: boolean
  isTyping: boolean
  
  // Actions
  createConversation: (title?: string) => string
  deleteConversation: (id: string) => void
  setActiveConversation: (id: string) => void
  addMessage: (conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) => void
  updateMessage: (messageId: string, content: string) => void
  deleteMessage: (messageId: string) => void
  sendMessage: (content: string, files?: File[]) => Promise<void>
  clearConversation: (conversationId: string) => void
  exportConversation: (conversationId: string) => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,
      isLoading: false,
      isTyping: false,

      createConversation: (title?: string) => {
        const id = crypto.randomUUID()
        const newConversation: Conversation = {
          id,
          title: title || 'New Conversation',
          messages: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        }
        
        set((state) => ({
          conversations: [newConversation, ...state.conversations],
          activeConversationId: id,
        }))
        
        return id
      },

      deleteConversation: (id: string) => {
        set((state) => ({
          conversations: state.conversations.filter(conv => conv.id !== id),
          activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
        }))
      },

      setActiveConversation: (id: string) => {
        set({ activeConversationId: id })
      },

      addMessage: (conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) => {
        const newMessage: Message = {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        }
        
        set((state) => ({
          conversations: state.conversations.map(conv =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, newMessage],
                  updatedAt: new Date().toISOString(),
                }
              : conv
          ),
        }))
      },

      updateMessage: (messageId: string, content: string) => {
        set((state) => ({
          conversations: state.conversations.map(conv => ({
            ...conv,
            messages: conv.messages.map(msg =>
              msg.id === messageId ? { ...msg, content } : msg
            ),
            updatedAt: new Date().toISOString(),
          })),
        }))
      },

      deleteMessage: (messageId: string) => {
        set((state) => ({
          conversations: state.conversations.map(conv => ({
            ...conv,
            messages: conv.messages.filter(msg => msg.id !== messageId),
            updatedAt: new Date().toISOString(),
          })),
        }))
      },

      sendMessage: async (content: string, files?: File[]) => {
        const { activeConversationId, addMessage, createConversation } = get()
        
        let conversationId = activeConversationId
        if (!conversationId) {
          conversationId = createConversation()
        }

        // Add user message
        addMessage(conversationId, {
          content,
          role: 'user',
          conversationId,
          metadata: files ? { type: 'file_analysis' } : undefined,
        })

        set({ isLoading: true, isTyping: true })

        try {
          // TODO: Replace with actual API call
          const response = await fetch('/api/chat/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: content,
              conversationId,
              files: files?.map(f => ({ name: f.name, size: f.size, type: f.type })),
            }),
          })

          if (!response.ok) {
            throw new Error('Failed to send message')
          }

          const { message: aiMessage } = await response.json()
          
          addMessage(conversationId, {
            content: aiMessage.content,
            role: 'assistant',
            conversationId,
            metadata: aiMessage.metadata,
          })
        } catch (error) {
          addMessage(conversationId, {
            content: 'Sorry, I encountered an error. Please try again.',
            role: 'assistant',
            conversationId,
            metadata: { type: 'error' },
          })
        } finally {
          set({ isLoading: false, isTyping: false })
        }
      },

      clearConversation: (conversationId: string) => {
        set((state) => ({
          conversations: state.conversations.map(conv =>
            conv.id === conversationId
              ? { ...conv, messages: [], updatedAt: new Date().toISOString() }
              : conv
          ),
        }))
      },

      exportConversation: (conversationId: string) => {
        const { conversations } = get()
        const conversation = conversations.find(conv => conv.id === conversationId)
        
        if (!conversation) return

        const exportData = {
          title: conversation.title,
          createdAt: conversation.createdAt,
          messages: conversation.messages.map(msg => ({
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp,
          })),
        }

        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
          type: 'application/json',
        })
        
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${conversation.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      },
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        conversations: state.conversations,
        activeConversationId: state.activeConversationId,
      }),
    }
  )
)
