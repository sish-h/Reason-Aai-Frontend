'use client'

import { useState } from 'react'
import { Message } from '@/store/useChatStore'
import { motion } from 'framer-motion'
import { 
  ArrowPathIcon, 
  CheckIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  LinkIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'

interface MessageBubbleProps {
  message: Message
  onRegenerate?: () => void
  showRegenerate?: boolean
}

export function MessageBubble({ message, onRegenerate, showRegenerate }: MessageBubbleProps) {
  const [isCopied, setIsCopied] = useState(false)
  const isUser = message.role === 'user'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const getMessageTypeIcon = () => {
    if (message.metadata?.type === 'file_analysis') {
      return <DocumentTextIcon className="w-4 h-4" />
    }
    if (message.metadata?.type === 'research') {
      return <LinkIcon className="w-4 h-4" />
    }
    if (message.metadata?.type === 'fact_check') {
      return <CheckIcon className="w-4 h-4" />
    }
    return null
  }

  const getMessageTypeColor = () => {
    if (message.metadata?.type === 'file_analysis') {
      return 'text-primary-600'
    }
    if (message.metadata?.type === 'research') {
      return 'text-accent-600'
    }
    if (message.metadata?.type === 'fact_check') {
      return 'text-success-600'
    }
    return 'text-secondary-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-start space-x-3 max-w-xs lg:max-w-2xl ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          {isUser ? (
            <Avatar 
              src="/user-avatar.png" 
              alt="You" 
              size="sm"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">R</span>
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          {/* Message Bubble */}
          <div
            className={`relative px-4 py-3 rounded-2xl ${
              isUser
                ? 'bg-primary-600 text-white'
                : 'bg-secondary-100 text-secondary-900'
            }`}
          >
            {/* Message Type Indicator */}
            {!isUser && message.metadata?.type && (
              <div className={`flex items-center space-x-1 mb-2 text-xs ${getMessageTypeColor()}`}>
                {getMessageTypeIcon()}
                <span className="font-medium capitalize">
                  {message.metadata.type.replace('_', ' ')}
                </span>
              </div>
            )}

            {/* Message Text */}
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>

            {/* Sources */}
            {message.metadata?.sources && message.metadata.sources.length > 0 && (
              <div className="mt-3 pt-3 border-t border-secondary-200">
                <p className="text-xs font-medium text-secondary-600 mb-2">Sources:</p>
                <div className="space-y-1">
                  {message.metadata.sources.map((source, index) => (
                    <a
                      key={index}
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-primary-600 hover:text-primary-700 truncate"
                    >
                      {source}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Confidence Score */}
            {message.metadata?.confidence && (
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex-1 bg-secondary-200 rounded-full h-1">
                  <div
                    className="bg-success-500 h-1 rounded-full"
                    style={{ width: `${message.metadata.confidence * 100}%` }}
                  />
                </div>
                <span className="text-xs text-secondary-600">
                  {Math.round(message.metadata.confidence * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Message Actions */}
          <div className={`flex items-center space-x-2 mt-2 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <span className="text-xs text-secondary-500">
              {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {isCopied ? (
                <CheckIcon className="w-3 h-3 text-success-600" />
              ) : (
                <span className="text-xs">Copy</span>
              )}
            </Button>

            {showRegenerate && onRegenerate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRegenerate}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ArrowPathIcon className="w-3 h-3 mr-1" />
                <span className="text-xs">Regenerate</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
