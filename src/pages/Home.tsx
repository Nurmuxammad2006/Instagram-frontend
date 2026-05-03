import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

interface User {
    email: string;
    username: string;
    fullName: string;
    emailVerified: boolean;
}

const features = [
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
        title: 'Real-time Messaging',
        description: "Zero-latency chat powered by WebSockets. Messages appear the instant they're sent — no refresh, no delay.",
        accent: 'from-violet-500/20 to-violet-500/5',
        border: 'border-violet-500/20',
        iconColor: 'text-violet-400',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
        title: 'End-to-End Encryption',
        description: 'Every conversation is locked with military-grade encryption. Only you and your recipient can read it.',
        accent: 'from-emerald-500/20 to-emerald-500/5',
        border: 'border-emerald-500/20',
        iconColor: 'text-emerald-400',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        title: 'Group Spaces',
        description: 'Create channels for teams, friend groups, or communities of any size — public or private.',
        accent: 'from-blue-500/20 to-blue-500/5',
        border: 'border-blue-500/20',
        iconColor: 'text-blue-400',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
        ),
        title: 'Video & Voice Calls',
        description: 'Crystal-clear HD calls with no time limits. Switch seamlessly between voice and video.',
        accent: 'from-amber-500/20 to-amber-500/5',
        border: 'border-amber-500/20',
        iconColor: 'text-amber-400',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
            </svg>
        ),
        title: 'Media Sharing',
        description: 'Share photos, videos, files, and voice notes without compression or quality loss.',
        accent: 'from-pink-500/20 to-pink-500/5',
        border: 'border-pink-500/20',
        iconColor: 'text-pink-400',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        title: 'Message History',
        description: 'Scroll back through your entire conversation history. Search by keyword, date, or sender.',
        accent: 'from-violet-500/20 to-violet-500/5',
        border: 'border-violet-500/20',
        iconColor: 'text-violet-400',
    },
];

const communities = [
    { emoji: '🎮', name: 'Gaming Hub', members: '84.2K', online: '1,240' },
    { emoji: '💻', name: 'Dev Lounge', members: '62.7K', online: '980' },
    { emoji: '🎨', name: 'Creative Studio', members: '41.5K', online: '630' },
    { emoji: '🌍', name: 'Travel Stories', members: '33.9K', online: '410' },
    { emoji: '🎵', name: 'Music Room', members: '29.1K', online: '370' },
    { emoji: '📚', name: 'Book Club', members: '18.3K', online: '210' },
];

const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/1.gafurjanov__' },
    { name: 'Telegram', url: 'http://t.me/nurmuxammad_16' },
    { name: 'Twitter', url: 'https://x.com/NGofurzono7649' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nurimuhammad-gofurjonov-3906a234b' },
    { name: 'GitHub', url: 'https://github.com/Nurmuxammad2006' },
    { name: 'Reddit', url: 'https://www.reddit.com/u/Dependent_Layer_5343' },
    { name: 'VK', url: 'https://vk.ru/id1103456019' },
];

const avatarColors = ['bg-violet-600', 'bg-blue-600', 'bg-emerald-600', 'bg-amber-600', 'bg-pink-600'];
const avatarLetters = ['A', 'M', 'K', 'S', 'J'];

export default function Home() {
    const navigate = useNavigate();
    const [mounted, setMounted] = useState(false);
    const _unusedRef = useRef(null);

    const [user, setUser] = useState<User | null>(() => {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    });

    const handleLogout = (): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="min-h-screen bg-[#080b14] text-white overflow-x-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

                .font-playfair { font-family: 'Playfair Display', serif; }
                .font-dm       { font-family: 'DM Sans', sans-serif; }

                /* Glass card */
                .glass {
                    background: rgba(255,255,255,0.05);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.13);
                    box-shadow:
                        0 8px 32px rgba(0,0,0,0.25),
                        inset 0 1px 0 rgba(255,255,255,0.35),
                        inset 0 -1px 0 rgba(255,255,255,0.08);
                    position: relative;
                    overflow: hidden;
                }
                .glass::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent);
                }
                .glass::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0;
                    width: 1px; height: 100%;
                    background: linear-gradient(180deg, rgba(255,255,255,0.75), transparent, rgba(255,255,255,0.25));
                }

                /* Orb */
                .orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    pointer-events: none;
                    opacity: 0.35;
                }

                /* Gradient text */
                .grad-text {
                    background: linear-gradient(135deg, #a78bfa, #60a5fa, #34d399);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                @keyframes scrollPulse {
                    0%, 100% { opacity: 0.25; }
                    50%       { opacity: 0.7; }
                }
                .scroll-pulse { animation: scrollPulse 2s ease-in-out infinite; }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .fade-up-1 { animation: fadeUp 0.8s ease forwards 0.1s; opacity: 0; }
                .fade-up-2 { animation: fadeUp 0.8s ease forwards 0.3s; opacity: 0; }
                .fade-up-3 { animation: fadeUp 0.8s ease forwards 0.5s; opacity: 0; }
                .fade-up-4 { animation: fadeUp 0.8s ease forwards 0.7s; opacity: 0; }

                @keyframes bubble1 {
                    0%,100% { transform: translateY(0px); }
                    50%     { transform: translateY(-6px); }
                }
                @keyframes bubble2 {
                    0%,100% { transform: translateY(0px); }
                    50%     { transform: translateY(-8px); }
                }
                @keyframes bubble3 {
                    0%,100% { transform: translateY(0px); }
                    50%     { transform: translateY(-5px); }
                }
                .float-1 { animation: bubble1 4s ease-in-out infinite; }
                .float-2 { animation: bubble2 5s ease-in-out infinite 0.8s; }
                .float-3 { animation: bubble3 4.5s ease-in-out infinite 1.5s; }

                .hover-lift {
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                }
                .hover-lift:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                }

                .btn-primary {
                    background: linear-gradient(135deg, #7c3aed, #2563eb);
                    transition: opacity 0.2s, transform 0.15s;
                }
                .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

                .online-dot {
                    width: 7px; height: 7px;
                    border-radius: 50%;
                    background: #34d399;
                    display: inline-block;
                    box-shadow: 0 0 6px #34d399;
                }
            `}</style>

            <Navbar
                user={user}
                onProfileClick={() => navigate('/chat')}
                onLogout={handleLogout}
            />

            {/* HERO SECTION */}
            <section
                id="home"
                className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
            >
                {/* Orbs */}
                <div className="orb w-[520px] h-[520px] bg-violet-700 -top-28 -left-36" />
                <div className="orb w-[400px] h-[400px] bg-blue-700 top-32 -right-24 opacity-25" />
                <div className="orb w-[280px] h-[280px] bg-emerald-700 bottom-0 left-1/2 opacity-20" />

                <div className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-700
                    ${mounted ? 'opacity-100' : 'opacity-0'}`}>

                    {/* Badge */}
                    <div className="fade-up-1 inline-flex items-center gap-2 px-4 py-2 rounded-full
                        border border-white/15 bg-white/[0.06] backdrop-blur-sm mb-8">
                        <span className="online-dot" />
                        <span className="font-dm text-[12px] text-white/60 tracking-widest uppercase">
                            Real-time messaging — now live
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="fade-up-2 font-playfair font-light leading-[1.05] tracking-[-0.03em]
                        text-[clamp(52px,8vw,92px)] mb-6">
                        Chat without<br />
                        <em className="italic font-normal grad-text">limits.</em>
                    </h1>

                    {/* Subline */}
                    <p className="fade-up-3 font-dm font-light text-[17px] text-white/50 leading-relaxed
                        max-w-[480px] mx-auto mb-10">
                        Connect with anyone, share moments instantly, and build communities
                        that matter — all in one beautiful space.
                    </p>

                    {/* CTAs */}
                    <div className="fade-up-4 flex items-center justify-center gap-4 flex-wrap mb-14">
                        {!user ? (
                            <>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="btn-primary font-dm px-8 py-3.5 rounded-xl text-[15px] font-medium cursor-pointer border-0"
                                >
                                    Start chatting free →
                                </button>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="font-dm px-8 py-3.5 rounded-xl text-[15px] font-light
                                        border border-white/20 bg-transparent text-white/75
                                        hover:bg-white/[0.06] hover:border-white/35 transition-all duration-200 cursor-pointer"
                                >
                                    Sign in
                                </button>
                            </>
                        ) : (
                            <div className="glass inline-flex flex-col gap-3 px-6 py-4">
                                <span className="font-dm text-[15px] text-white/85">
                                    Welcome back, {user.fullName || user.username} 👋
                                </span>
                                <button
                                    onClick={() => navigate('/chat')}
                                    className="btn-primary font-dm px-6 py-2.5 rounded-xl text-[14px] font-medium cursor-pointer border-0"
                                >
                                    Go to Chats →
                                </button>
                                {!user.emailVerified && (
                                    <span className="font-dm text-[11px] uppercase tracking-widest text-amber-400">
                                        ⚠️ Email not verified — verify in profile
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Social proof */}
                    <div className="fade-up-4 flex items-center justify-center gap-4">
                        <div className="flex items-center">
                            {avatarLetters.map((l, i) => (
                                <div
                                    key={i}
                                    className={`w-9 h-9 rounded-full ${avatarColors[i]} flex items-center justify-center
                                        text-[13px] font-semibold border-2 border-[#080b14]`}
                                    style={{ marginLeft: i === 0 ? 0 : '-10px' }}
                                >
                                    {l}
                                </div>
                            ))}
                        </div>
                        <div className="text-left">
                            <div className="font-dm text-[15px] font-medium">2.4M+ users</div>
                            <div className="font-dm text-[12px] text-white/35">already chatting</div>
                        </div>
                    </div>
                </div>

                {/* Floating chat bubbles — decorative */}
                <div className="absolute left-[6%] top-[28%] float-1 hidden xl:block">
                    <div className="glass px-4 py-3 max-w-[200px]">
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-[10px] font-bold">A</div>
                            <span className="font-dm text-[11px] text-white/50">Alex</span>
                        </div>
                        <p className="font-dm text-[13px] text-white/80">Hey! Are you free tonight? 🎉</p>
                    </div>
                </div>
                <div className="absolute right-[6%] top-[40%] float-2 hidden xl:block">
                    <div className="glass px-4 py-3 max-w-[220px]">
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold">M</div>
                            <span className="font-dm text-[11px] text-white/50">Maya</span>
                        </div>
                        <p className="font-dm text-[13px] text-white/80">Let&apos;s catch up on ChatWave! 💬</p>
                    </div>
                </div>
                <div className="absolute left-[10%] bottom-[22%] float-3 hidden xl:block">
                    <div className="glass px-4 py-3 max-w-[190px]">
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold">K</div>
                            <span className="font-dm text-[11px] text-white/50">Kai</span>
                        </div>
                        <p className="font-dm text-[13px] text-white/80">Calling you now 📞</p>
                    </div>
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                    <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/35 scroll-pulse" />
                    <span className="font-dm text-[10px] tracking-[0.2em] uppercase text-white/25">scroll</span>
                </div>
            </section>

            {/* STATS STRIP */}
            <div className="border-t border-b border-white/[0.07] px-8 py-10
                grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { value: '2.4M', label: 'Active users' },
                    { value: '140M', label: 'Messages sent daily' },
                    { value: '99.9%', label: 'Uptime SLA' },
                    { value: '190+', label: 'Countries reached' },
                ].map((s, i) => (
                    <div key={i} className="text-center">
                        <div className="font-playfair font-light text-[clamp(32px,4vw,44px)]
                            tracking-[-0.03em] grad-text leading-none mb-1">
                            {s.value}
                        </div>
                        <div className="font-dm text-[13px] text-white/35">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* EXPLORE SECTION */}
            <section id="explore" className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden">
                <div className="orb w-[400px] h-[400px] bg-violet-700 right-0 top-1/2 -translate-y-1/2 opacity-20" />

                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-16">
                        <p className="font-dm text-[11px] tracking-[0.2em] uppercase text-white/30 mb-3">
                            Explore
                        </p>
                        <h2 className="font-playfair font-light text-[clamp(36px,5vw,60px)]
                            tracking-[-0.03em] leading-tight max-w-[480px]">
                            Everything you need to{' '}
                            <em className="italic font-normal">connect.</em>
                        </h2>
                    </div>

                    {/* Feature grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {/* Big card — spans 2 rows */}
                        <div className="glass hover-lift p-9 lg:row-span-2 flex flex-col justify-between min-h-[340px] lg:min-h-[auto]">
                            <div>
                                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${features[0].accent}
                                    flex items-center justify-center ${features[0].iconColor} mb-6`}>
                                    {features[0].icon}
                                </div>
                                <h3 className="font-dm text-[19px] font-medium mb-3">{features[0].title}</h3>
                                <p className="font-dm text-[14px] text-white/45 leading-relaxed">
                                    {features[0].description}
                                </p>
                            </div>
                            {/* Mini chat demo */}
                            <div className="mt-8 flex flex-col gap-3">
                                <div className="flex gap-3 items-end">
                                    <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-[11px] font-bold flex-shrink-0">A</div>
                                    <div className="bg-violet-600/20 border border-violet-500/20 px-4 py-2.5 rounded-2xl rounded-bl-sm">
                                        <p className="font-dm text-[13px] text-white/80">Hey! Are you free tonight? 🎉</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-end flex-row-reverse">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[11px] font-bold flex-shrink-0">M</div>
                                    <div className="bg-blue-600/20 border border-blue-500/20 px-4 py-2.5 rounded-2xl rounded-br-sm">
                                        <p className="font-dm text-[13px] text-white/80">Let&apos;s catch up on ChatWave 💬</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-end">
                                    <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-[11px] font-bold flex-shrink-0">A</div>
                                    <div className="bg-violet-600/20 border border-violet-500/20 px-4 py-2.5 rounded-2xl rounded-bl-sm">
                                        <p className="font-dm text-[13px] text-white/80">Perfect! Calling now 📞</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Regular cards */}
                        {features.slice(1).map((f, i) => (
                            <div key={i} className="glass hover-lift p-7 flex gap-5 items-start">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.accent}
                                    flex items-center justify-center ${f.iconColor} flex-shrink-0`}>
                                    {f.icon}
                                </div>
                                <div>
                                    <h3 className="font-dm text-[16px] font-medium mb-2">{f.title}</h3>
                                    <p className="font-dm text-[13px] text-white/40 leading-relaxed">{f.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMMUNITY SECTION */}
            <section id="community"
                     className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden
                    bg-white/[0.02] border-t border-white/[0.06]">
                <div className="orb w-[500px] h-[500px] bg-blue-700 -left-36 top-1/2 -translate-y-1/2 opacity-15" />

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Left */}
                    <div>
                        <p className="font-dm text-[11px] tracking-[0.2em] uppercase text-white/30 mb-3">
                            Community
                        </p>
                        <h2 className="font-playfair font-light text-[clamp(36px,5vw,58px)]
                            tracking-[-0.03em] leading-tight mb-6">
                            Find your <em className="italic font-normal">people.</em>
                        </h2>
                        <p className="font-dm font-light text-[15px] text-white/45 leading-[1.85] mb-10 max-w-[440px]">
                            Discover communities built around your passions. From tech to travel,
                            art to gaming — your tribe is already here, waiting.
                        </p>

                        {/* Feature list */}
                        {[
                            { icon: '🌍', title: 'Public & Private Rooms', desc: 'Open rooms for everyone, or invite-only spaces for your inner circle.' },
                            { icon: '✓', title: 'Verified Creators', desc: 'Follow and chat directly with verified creators, influencers, and experts.' },
                            { icon: '🔍', title: 'Topic Discovery', desc: 'Explore trending rooms and get recommendations based on your interests.' },
                        ].map((item, i) => (
                            <div key={i} className={`flex items-start gap-4 py-5 ${i < 2 ? 'border-b border-white/[0.06]' : ''}`}>
                                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-lg flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <div className="font-dm text-[15px] font-medium mb-1">{item.title}</div>
                                    <div className="font-dm text-[13px] text-white/40 leading-relaxed">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right — Community cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {communities.map((c, i) => (
                            <div key={i} className="glass hover-lift p-6 cursor-pointer">
                                <div className="text-3xl mb-3">{c.emoji}</div>
                                <div className="font-dm text-[14px] font-medium mb-1">{c.name}</div>
                                <div className="font-dm text-[12px] text-white/35 mb-4">{c.members} members</div>
                                <div className="flex items-center gap-2">
                                    <span className="online-dot" />
                                    <span className="font-dm text-[11px] text-white/40">{c.online} online</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden">
                <div className="orb w-[400px] h-[400px] bg-emerald-700 bottom-0 right-0 opacity-15" />

                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-20">
                        <p className="font-dm text-[11px] tracking-[0.2em] uppercase text-white/30 mb-3">About</p>
                        <h2 className="font-playfair font-light text-[clamp(36px,5vw,60px)]
                            tracking-[-0.03em] leading-tight max-w-[560px] mx-auto mb-5">
                            Built by people who{' '}
                            <em className="italic font-normal">love to connect.</em>
                        </h2>
                        <p className="font-dm font-light text-[15px] text-white/40 leading-[1.85] max-w-[480px] mx-auto">
                            ChatWave started as a personal project and grew into something much bigger.
                            We believe communication should be effortless, safe, and genuinely enjoyable.
                        </p>
                    </div>

                    {/* Values */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                        {[
                            {
                                icon: '💭',
                                title: 'Human-first Design',
                                desc: "Every feature starts with one question: does this make connection easier and more meaningful?",
                                grad: 'from-violet-500/15 to-blue-500/10',
                            },
                            {
                                icon: '🔒',
                                title: 'Privacy by Default',
                                desc: "We don't sell your data. We don't read your messages. Your conversations are yours alone — full stop.",
                                grad: 'from-emerald-500/15 to-blue-500/10',
                            },
                            {
                                icon: '🌐',
                                title: 'Global & Open',
                                desc: "Available in 40+ languages. Everyone deserves a place to express themselves freely.",
                                grad: 'from-amber-500/15 to-pink-500/10',
                            },
                        ].map((v, i) => (
                            <div key={i} className="glass hover-lift p-9 text-center">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.grad}
                                    flex items-center justify-center text-2xl mx-auto mb-6`}>
                                    {v.icon}
                                </div>
                                <h3 className="font-dm text-[17px] font-medium mb-3">{v.title}</h3>
                                <p className="font-dm text-[13px] text-white/40 leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA BANNER */}
            <section className="relative py-24 px-6 overflow-hidden border-t border-white/[0.06]">
                <div className="orb w-[600px] h-[300px] bg-gradient-to-r from-violet-700 to-blue-700
                    left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 rounded-full [filter:blur(70px)]" />
                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <h2 className="font-playfair font-light text-[clamp(32px,5vw,56px)]
                        tracking-[-0.03em] leading-tight mb-5">
                        Ready to start{' '}
                        <em className="italic font-normal grad-text">chatting?</em>
                    </h2>
                    <p className="font-dm text-[15px] text-white/40 leading-relaxed mb-10 max-w-[420px] mx-auto">
                        Join millions of people already connecting on ChatWave.
                        Free forever, no credit card needed.
                    </p>
                    <button
                        onClick={() => navigate('/register')}
                        className="btn-primary font-dm px-10 py-4 rounded-xl text-[16px] font-medium cursor-pointer border-0"
                    >
                        Create your free account →
                    </button>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-white/[0.07] py-12 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap justify-between items-start gap-10 mb-10">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-lg btn-primary flex items-center justify-center">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                </div>
                                <span className="font-dm text-[17px] font-medium">ChatWave</span>
                            </div>
                            <p className="font-dm text-[13px] text-white/30 max-w-[200px] leading-relaxed">
                                Share the world, one message at a time.
                            </p>
                        </div>

                        {/* Nav links */}
                        <div className="flex flex-col gap-3">
                            <p className="font-dm text-[11px] uppercase tracking-widest text-white/25 mb-1">Navigation</p>
                            {['home', 'explore', 'community', 'about'].map(s => (
                                <a key={s} href={`#${s}`}
                                   className="font-dm text-[13px] text-white/40 hover:text-white transition-colors duration-200 capitalize no-underline">
                                    {s}
                                </a>
                            ))}
                        </div>

                        {/* Social links */}
                        <div>
                            <p className="font-dm text-[11px] uppercase tracking-widest text-white/25 mb-4">Connect</p>
                            <div className="flex flex-wrap gap-2 max-w-[280px]">
                                {socialLinks.map((s, i) => (
                                    <a
                                        key={i}
                                        href={s.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-dm text-[12px] text-white/40 border border-white/10 rounded-sm
                                            px-3 py-1.5 no-underline hover:text-white hover:border-white/30 transition-all duration-200"
                                    >
                                        {s.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex flex-wrap justify-between items-center gap-2 pt-6 border-t border-white/[0.07]">
                        <span className="font-dm text-[11px] text-white/20">
                            © {new Date().getFullYear()} ChatWave. All rights reserved.
                        </span>
                        <span className="font-dm text-[11px] text-white/15 tracking-[0.05em]">
                            React • Spring Boot • Tailwind CSS
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}