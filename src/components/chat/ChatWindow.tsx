import { useState } from 'react';

interface ChatWindowProps {
    activeChat: any;
    onBack: () => void;
}

export default function ChatWindow({ activeChat, onBack }: ChatWindowProps) {
    const [message, setMessage] = useState('');

    if (!activeChat) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             className="text-white/20" strokeWidth="1.5">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <h3 className="font-playfair text-xl text-white/60 mb-2">Select a chat</h3>
                    <p className="font-dm text-sm text-white/30">Choose a conversation to start messaging</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
                <button onClick={onBack} className="md:hidden p-1 text-white/60 hover:text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-blue-600
                    flex items-center justify-center text-white font-semibold text-sm">
                    {activeChat.name.charAt(0)}
                </div>
                <div>
                    <h3 className="font-dm text-sm text-white font-medium">{activeChat.name}</h3>
                    <p className="font-dm text-[11px] text-emerald-400">online</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {/* Placeholder messages */}
                <div className="flex items-end gap-2">
                    <div className="w-8 h-8 rounded-full bg-violet-600 flex-shrink-0"></div>
                    <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[70%]">
                        <p className="font-dm text-sm text-white/80">Hey! How are you?</p>
                        <span className="font-dm text-[10px] text-white/30 mt-1 block">2:30 PM</span>
                    </div>
                </div>
                <div className="flex items-end gap-2 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0"></div>
                    <div className="bg-blue-600/20 border border-blue-500/20 px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[70%]">
                        <p className="font-dm text-sm text-white/80">I'm good! Working on ChatWave 🚀</p>
                        <span className="font-dm text-[10px] text-white/30 mt-1 block">2:31 PM</span>
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10">
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 px-4 py-3 font-dm text-sm text-white bg-white/5
                            border border-white/10 rounded-xl outline-none
                            placeholder:text-white/30 focus:border-white/20 transition-all"
                    />
                    <button className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center
                        hover:bg-blue-700 transition-all text-white flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}