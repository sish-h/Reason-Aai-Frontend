'use client'

import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { 
  UserIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  user: any
  isAuthenticated: boolean
  onLogout: () => void
}

export function MobileMenu({ isOpen, onClose, user, isAuthenticated, onLogout }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-secondary-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-gradient">ReasonAAI</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-secondary-700 hover:bg-secondary-100 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-4 py-6 space-y-2 bg-gray-100">
            <Link 
              href="/features" 
              className="flex items-center px-3 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
              onClick={onClose}
            >
              <DocumentTextIcon className="w-5 h-5 mr-3" />
              Features
            </Link>
            <Link 
              href="/pricing" 
              className="flex items-center px-3 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
              onClick={onClose}
            >
              <DocumentTextIcon className="w-5 h-5 mr-3" />
              Pricing
            </Link>
            <Link 
              href="/about" 
              className="flex items-center px-3 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
              onClick={onClose}
            >
              <DocumentTextIcon className="w-5 h-5 mr-3" />
              About
            </Link>
            <Link 
              href="/contact" 
              className="flex items-center px-3 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
              onClick={onClose}
            >
              <DocumentTextIcon className="w-5 h-5 mr-3" />
              Contact
            </Link>
          </div>

          {/* Auth Section */}
          <div className="p-4 border-t border-secondary-200">
            {isAuthenticated ? (
              <div className="space-y-4">
                {/* User Info */}
                <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                  <Avatar 
                    src={user?.avatar} 
                    alt={user?.name || 'User'} 
                    size="md"
                  />
                  <div>
                    <p className="font-medium text-secondary-900">{user?.name}</p>
                    <p className="text-sm text-secondary-600">{user?.email}</p>
                  </div>
                </div>

                {/* User Actions */}
                <div className="space-y-2">
                  <Link 
                    href="/dashboard" 
                    className="flex items-center px-3 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    <ChatBubbleLeftRightIcon className="w-5 h-5 mr-3" />
                    Dashboard
                  </Link>
                  <Link 
                    href="/profile" 
                    className="flex items-center px-3 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    <UserIcon className="w-5 h-5 mr-3" />
                    Profile
                  </Link>
                  <Link 
                    href="/settings" 
                    className="flex items-center px-3 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    <Cog6ToothIcon className="w-5 h-5 mr-3" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      onLogout()
                      onClose()
                    }}
                    className="flex items-center w-full px-3 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Link href="/auth/login" onClick={onClose}>
                  <Button variant="ghost" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={onClose}>
                  <Button className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
