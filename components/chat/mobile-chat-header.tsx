'use client'

import { useState } from 'react'
import { useChatStore } from '@/store/useChatStore'
import { 
  Bars3Icon, 
  XMarkIcon,
  PlusIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

interface MobileChatHeaderProps {
  onMenuToggle?: () => void
}

export function MobileChatHeader({ onMenuToggle }: MobileChatHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { createConversation, activeConversationId } = useChatStore()

  const handleNewChat = () => {
    createConversation()
  }

  return (
    <div className="bg-white border-b border-secondary-200 px-4 py-3 safe-top">
      <div className="flex items-center justify-between">
        {/* Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuToggle}
          className="lg:hidden"
        >
          <Bars3Icon className="w-6 h-6" />
        </Button>

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="text-lg font-bold text-gradient">ReasonAAI</span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </Button>
          <Button
            size="sm"
            onClick={handleNewChat}
            className="bg-primary-600 hover:bg-primary-700"
          >
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="mt-3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      )}
    </div>
  )
}
