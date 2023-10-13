'use client'

import { useState } from 'react'
import { useChatStore } from '@/store/useChatStore'
import { motion } from 'framer-motion'
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'

export function ChatSidebar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showMenu, setShowMenu] = useState<string | null>(null)
  
  const { 
    conversations, 
    activeConversationId, 
    createConversation, 
    setActiveConversation, 
    deleteConversation,
    exportConversation 
  } = useChatStore()

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleNewChat = () => {
    createConversation()
  }

  const handleConversationClick = (conversationId: string) => {
    setActiveConversation(conversationId)
  }

  const handleDeleteConversation = (conversationId: string) => {
    if (confirm('Are you sure you want to delete this conversation?')) {
      deleteConversation(conversationId)
    }
    setShowMenu(null)
  }

  const handleExportConversation = (conversationId: string) => {
    exportConversation(conversationId)
    setShowMenu(null)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-secondary-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-secondary-900">Conversations</h2>
          <Button
            onClick={handleNewChat}
            size="sm"
            className="bg-primary-600 hover:bg-primary-700"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-secondary-500">
            {searchQuery ? 'No conversations found' : 'No conversations yet'}
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {filteredConversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeConversationId === conversation.id
                    ? 'bg-primary-50 border border-primary-200'
                    : 'hover:bg-secondary-50'
                }`}
                onClick={() => handleConversationClick(conversation.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-secondary-900 truncate">
                      {conversation.title}
                    </h3>
                    <p className="text-xs text-secondary-500 mt-1">
                      {conversation.messages.length} messages • {formatDistanceToNow(new Date(conversation.updatedAt), { addSuffix: true })}
                    </p>
                  </div>

                  {/* Menu Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowMenu(showMenu === conversation.id ? null : conversation.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-secondary-200 transition-all duration-200"
                  >
                    <EllipsisVerticalIcon className="w-4 h-4 text-secondary-500" />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {showMenu === conversation.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-2 top-2 mt-1 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 z-10"
                  >
                    <div className="py-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleExportConversation(conversation.id)
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                      >
                        <ArrowDownTrayIcon className="w-4 h-4 mr-3" />
                        Export
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteConversation(conversation.id)
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-error-600 hover:bg-error-50"
                      >
                        <TrashIcon className="w-4 h-4 mr-3" />
                        Delete
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-secondary-200">
        <div className="text-xs text-secondary-500 text-center">
          <p>AI may make mistakes. Verify important information.</p>
        </div>
      </div>
    </div>
  )
}
