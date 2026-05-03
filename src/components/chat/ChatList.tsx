import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

interface ChatListProps {
    user: any;
    activeChat: any;
    onSelectChat: (chat: any) => void;
    onProfileClick: () => void;
    onMenuClick: () => void;
}

const mockChats = [
    { id: 1, name: 'Alex Johnson', lastMessage: 'Hey! Are you free tonight?', time: '2:30 PM', unread: 3, online: true },
    { id: 2, name: 'Maya Williams', lastMessage: 'Let\'s catch up on ChatWave', time: '1:15 PM', unread: 0, online: true },
    { id: 3, name: 'Dev Lounge', lastMessage: 'Kai: Check out the new update', time: '12:00 PM', unread: 12, online: false },
    { id: 4, name: 'Sarah Chen', lastMessage: 'Thanks for the help!', time: 'Yesterday', unread: 1, online: false },
    { id: 5, name: 'Gaming Hub', lastMessage: 'Tournament starts at 8PM', time: 'Yesterday', unread: 0, online: true },
];

export default function ChatList({ user, activeChat, onSelectChat, onProfileClick, onMenuClick }: ChatListProps) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    const filteredChats = mockChats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col bg-white/[0.02]">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-3">
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        </svg>
                    </button>
                    <h2 className="font-playfair text-xl text-white">Chats</h2>
                    <button
                        onClick={onProfileClick}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-blue-600
                            flex items-center justify-center text-white font-semibold text-sm
                            hover:scale-105 transition-transform"
                    >
                        {user.fullName?.charAt(0) || user.username?.charAt(0) || '?'}
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search chats..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2.5 pl-10 font-dm text-sm text-white bg-white/5
                            border border-white/10 rounded-xl outline-none
                            placeholder:text-white/30 focus:border-white/20 transition-all"
                    />
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
                {filteredChats.map((chat) => (
                    <button
                        key={chat.id}
                        onClick={() => onSelectChat(chat)}
                        className={`w-full p-4 flex items-center gap-3 transition-all hover:bg-white/5
                            ${activeChat?.id === chat.id ? 'bg-white/10 border-l-2 border-blue-500' : 'border-l-2 border-transparent'}`}
                    >
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-blue-600
                                flex items-center justify-center text-white font-semibold">
                                {chat.name.charAt(0)}
                            </div>
                            {chat.online && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500
                                    rounded-full border-2 border-[#080b14]"></div>
                            )}
                        </div>

                        {/* Chat Info */}
                        <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-dm text-sm text-white font-medium truncate">
                                    {chat.name}
                                </span>
                                <span className="font-dm text-[11px] text-white/30 flex-shrink-0 ml-2">
                                    {chat.time}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-dm text-[13px] text-white/40 truncate">
                                    {chat.lastMessage}
                                </span>
                                {chat.unread > 0 && (
                                    <span className="bg-blue-600 text-white text-[10px] font-dm font-medium
                                        px-1.5 py-0.5 rounded-full ml-2 flex-shrink-0">
                                        {chat.unread}
                                    </span>
                                )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-white/10 flex gap-3">
                <button
                    onClick={handleLogout}
                    className="flex-1 py-2.5 font-dm text-sm text-red-400 border border-red-400/20
                        rounded-lg hover:bg-red-400/10 transition-all"
                >
                    Logout
                </button>
                <button className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center
                    hover:bg-blue-700 transition-all text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                </button>
            </div>
        </div>
    );
}