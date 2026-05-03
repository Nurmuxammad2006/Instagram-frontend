interface UserProfileProps {
    user: any;
    onClose: () => void;
}

export default function UserProfile({ user, onClose }: UserProfileProps) {
    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={onClose}
            />

            {/* Profile Panel */}
            <div className="fixed right-0 top-0 bottom-0 w-[320px] bg-[#0a0e17]/95 backdrop-blur-md
                border-l border-white/20 z-50 shadow-[-8px_0_32px_rgba(0,0,0,0.3)]
                flex flex-col">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <h3 className="font-playfair text-lg text-white">Profile</h3>
                    <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Profile Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Avatar */}
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-blue-600
                            flex items-center justify-center text-white text-2xl font-semibold mx-auto mb-3">
                            {user.fullName?.charAt(0) || user.username?.charAt(0) || '?'}
                        </div>
                        <h4 className="font-playfair text-xl text-white">
                            {user.fullName || user.username}
                        </h4>
                        <p className="font-dm text-sm text-white/50 mt-1">@{user.username}</p>
                    </div>

                    {/* Info */}
                    <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="font-dm text-[11px] text-white/30 uppercase tracking-wider mb-1">Email</p>
                            <p className="font-dm text-sm text-white/80">{user.email}</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="font-dm text-[11px] text-white/30 uppercase tracking-wider mb-1">Status</p>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${user.emailVerified ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                <span className="font-dm text-sm text-white/80">
                                    {user.emailVerified ? 'Verified' : 'Not Verified'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}