import { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import UserProfile from './UserProfile';

interface ChatLayoutProps {
    user: any;
}

export default function ChatLayout({ user }: ChatLayoutProps) {
    const [showProfile, setShowProfile] = useState(false);
    const [activeChat, setActiveChat] = useState<any>(null);
    const [showChatList, setShowChatList] = useState(true);

    return (
        <div className="h-screen bg-[#080b14] flex overflow-hidden">
            {/* Left Sidebar - Chat List */}
            <div className={`
                ${showChatList ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 transition-transform duration-300
                w-full md:w-[380px] lg:w-[420px] flex-shrink-0
                border-r border-white/10
            `}>
                <ChatList
                    user={user}
                    activeChat={activeChat}
                    onSelectChat={setActiveChat}
                    onProfileClick={() => setShowProfile(true)}
                    onMenuClick={() => setShowChatList(!showChatList)}
                />
            </div>

            {/* Right Side - Chat Window */}
            <div className="flex-1 flex flex-col">
                <ChatWindow
                    activeChat={activeChat}
                    onBack={() => setShowChatList(true)}
                />
            </div>

            {/* Profile Panel - Slides from right */}
            {showProfile && (
                <UserProfile
                    user={user}
                    onClose={() => setShowProfile(false)}
                />
            )}
        </div>
    );
}