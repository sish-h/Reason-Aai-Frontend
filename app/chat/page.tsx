import { ChatInterface } from '@/components/chat/chat-interface'
import { ChatSidebar } from '@/components/chat/chat-sidebar'
import { MobileChatHeader } from '@/components/chat/mobile-chat-header'

export default function ChatPage() {
  return (
    <div className="h-screen bg-secondary-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 border-r border-secondary-200 bg-white">
        <ChatSidebar />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <MobileChatHeader />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col lg:ml-0">
        <ChatInterface />
      </div>
    </div>
  )
}
