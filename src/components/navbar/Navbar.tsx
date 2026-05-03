import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    email: string;
    username: string;
    fullName: string;
    emailVerified: boolean;
}

interface NavbarProps {
    user: User | null;
    onProfileClick: () => void;
    onLogout: () => void;
}

export default function Navbar({ user, onProfileClick, onLogout }: NavbarProps) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
            setIsMenuOpen(false);
        }
    };

    const handleNavClick = (sectionId: string) => {
        if (window.location.pathname !== '/') {
            navigate('/');
            setTimeout(() => scrollToSection(sectionId), 100);
        } else {
            scrollToSection(sectionId);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'explore', 'community', 'about'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <>
            <style>{`
                .nav-underline {
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4);
                    border-radius: 2px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
                }

                .nav-link {
                    position: relative;
                    padding: 4px 8px;
                    transition: color 0.3s ease;
                }

                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 50%;
                    width: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4);
                    border-radius: 2px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    transform: translateX(-50%);
                    opacity: 0;
                    box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
                }

                .nav-link:hover::after {
                    width: 100%;
                    opacity: 0.6;
                }

                .mobile-nav-link {
                    position: relative;
                    transition: all 0.3s ease;
                }

                .mobile-nav-link.active {
                    background: linear-gradient(90deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2));
                    border-left: 3px solid #8b5cf6;
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .mobile-menu-item {
                    animation: slideIn 0.3s ease forwards;
                    opacity: 0;
                }

                .mobile-menu-item:nth-child(1) { animation-delay: 0.05s; }
                .mobile-menu-item:nth-child(2) { animation-delay: 0.1s; }
                .mobile-menu-item:nth-child(3) { animation-delay: 0.15s; }
                .mobile-menu-item:nth-child(4) { animation-delay: 0.2s; }
                .mobile-menu-item:nth-child(5) { animation-delay: 0.25s; }
            `}</style>

            {/* Fixed Navbar with glass-card styling using Tailwind */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center
                bg-white/5 backdrop-blur-[5px] border-b border-white/30
                shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(255,255,255,0.1)]
                overflow-hidden">

                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>

                {/* Left gradient line */}
                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-white/80 via-transparent to-white/30"></div>

                <div className="w-full max-w-[1200px] flex justify-between items-center px-4 md:px-8 py-4">
                    <h1
                        onClick={() => {
                            navigate('/');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-xl md:text-2xl font-bold text-white cursor-pointer hover:scale-105 transition-transform duration-300"
                    >
                        ChatWave
                    </h1>

                    {/* Desktop Navigation Links - Hidden on mobile */}
                    <div className="hidden md:flex gap-8">
                        {[
                            { id: 'home', label: 'Home' },
                            { id: 'explore', label: 'Explore' },
                            { id: 'community', label: 'Community' },
                            { id: 'about', label: 'About' },
                        ].map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => handleNavClick(id)}
                                className={`nav-link text-white/80 hover:text-white font-medium transition-all duration-300
                                    ${activeSection === id ? 'text-white' : ''}`}
                            >
                                {label}
                                {activeSection === id && (
                                    <span className="nav-underline"></span>
                                )}
                            </button>
                        ))}
                        {/* Chat link for logged-in users */}
                        {user && (
                            <button
                                onClick={() => navigate('/chat')}
                                className="nav-link text-blue-400 hover:text-blue-300 font-medium transition-all duration-300"
                            >
                                Chat
                            </button>
                        )}
                    </div>

                    <div className="flex gap-2 md:gap-3 items-center">
                        {user ? (
                            <>
                                <button
                                    onClick={() => navigate('/chat')}
                                    className="hidden sm:block px-3 md:px-5 py-2 text-sm md:text-base text-blue-400 hover:text-blue-300 font-medium transition-all duration-300 hover:scale-105"
                                >
                                    Chat
                                </button>
                                <button
                                    onClick={onProfileClick}
                                    className="hidden sm:block px-3 md:px-5 py-2 text-sm md:text-base text-white/80 hover:text-white font-medium transition-all duration-300 hover:scale-105"
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={onLogout}
                                    className="hidden sm:block px-3 md:px-5 py-2 text-sm md:text-base text-red-400 hover:text-red-300 font-medium transition-all duration-300 hover:scale-105"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="hidden sm:block px-5 py-2 text-white/80 hover:text-white font-medium transition-all duration-300 hover:scale-105"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="hidden sm:block relative px-4 md:px-5 py-2 text-sm md:text-base text-[#090909] cursor-pointer rounded-lg bg-[#e8e8e8] border
                                    border-[#e8e8e8] transition-all duration-300 ease-in overflow-hidden z-10 before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:top-full before:w-[140%] before:h-[180%]
                                    before:bg-black/5 before:rounded-full before:transition-all before:duration-500 before:ease-[cubic-bezier(0.55,0,0.1,1)] before:z-[-1] after:content-['']
                                    after:absolute after:left-[55%] after:-translate-x-1/2 after:top-[180%] after:w-[160%] after:h-[190%]
                                    after:bg-blue-500 after:rounded-full after:transition-all after:duration-500 after:ease-[cubic-bezier(0.55,0,0.1,1)] after:z-[-1]
                                    hover:text-white hover:border-blue-500 hover:before:top-[-35%]
                                    hover:before:bg-blue-500 hover:before:scale-y-[1.3] hover:before:scale-x-[0.8] hover:after:top-[-45%]
                                    hover:after:bg-blue-500 hover:after:scale-y-[1.3] hover:after:scale-x-[0.8] hover:scale-105"
                                >
                                    Register
                                </button>
                            </>
                        )}

                        {/* Mobile Menu Button - Visible only on mobile */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-110 relative z-50"
                            aria-label="Menu"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                {isMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M3 12h18M3 6h18M3 18h18" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-[5px] transition-all duration-300 md:hidden
                    ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu Panel - Fixed position, hidden by default, with glass-card styling */}
            <div
                className={`fixed top-0 right-0 bottom-0 z-40 w-[280px] 
                    bg-white/5 backdrop-blur-[5px] border-l border-white/30 
                    shadow-[-8px_0_32px_rgba(0,0,0,0.1),inset_1px_0_0_rgba(255,255,255,0.5),inset_-1px_0_0_rgba(255,255,255,0.1)] 
                    transform transition-all duration-300 ease-out md:hidden
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Spacer to push content down */}
                    <div className="h-20"></div>

                    {/* Mobile Navigation Links */}
                    <div className="flex-1 overflow-y-auto px-6">
                        <div className="flex flex-col gap-2">
                            {[
                                { id: 'home', label: 'Home' },
                                { id: 'explore', label: 'Explore' },
                                { id: 'community', label: 'Community' },
                                { id: 'about', label: 'About' },
                            ].map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => handleNavClick(id)}
                                    className={`mobile-nav-link mobile-menu-item text-left px-4 py-3 text-white/80 hover:text-white font-medium 
                                        transition-all duration-300 rounded-lg hover:bg-white/10 hover:translate-x-1
                                        ${activeSection === id ? 'active text-white' : ''}`}
                                >
                                    {label}
                                </button>
                            ))}
                            {/* Chat link for mobile */}
                            {user && (
                                <button
                                    onClick={() => {
                                        navigate('/chat');
                                        setIsMenuOpen(false);
                                    }}
                                    className="mobile-nav-link mobile-menu-item text-left px-4 py-3 text-blue-400 hover:text-blue-300 font-medium
                                        transition-all duration-300 rounded-lg hover:bg-white/10 hover:translate-x-1"
                                >
                                    Chat
                                </button>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-6" />

                        {/* Mobile Auth Buttons */}
                        {!user ? (
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => {
                                        navigate('/login');
                                        setIsMenuOpen(false);
                                    }}
                                    className="mobile-menu-item px-5 py-3 text-white/80 hover:text-white font-medium transition-all duration-300
                                        text-center border border-white/30 rounded-lg hover:bg-white/10 hover:scale-105"
                                    style={{ animationDelay: '0.25s' }}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => {
                                        navigate('/register');
                                        setIsMenuOpen(false);
                                    }}
                                    className="mobile-menu-item px-5 py-3 text-[#090909] font-medium transition-all duration-300
                                        text-center bg-[#e8e8e8] rounded-lg hover:scale-105"
                                    style={{ animationDelay: '0.3s' }}
                                >
                                    Register
                                </button>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        onProfileClick();
                                        setIsMenuOpen(false);
                                    }}
                                    className="mobile-menu-item px-5 py-3 text-white/80 hover:text-white font-medium transition-all duration-300
                                        text-center border border-white/30 rounded-lg hover:bg-white/10 hover:scale-105"
                                    style={{ animationDelay: '0.25s' }}
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={() => {
                                        onLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="mobile-menu-item px-5 py-3 text-red-400 hover:text-red-300 font-medium transition-all duration-300
                                        text-center border border-red-400/30 rounded-lg hover:bg-red-400/10 hover:scale-105"
                                    style={{ animationDelay: '0.3s' }}
                                >
                                    Logout
                                </button>
                            </>
                        )}

                        {/* Mobile User Info */}
                        {user && (
                            <div className="mobile-menu-item mt-6 p-4 bg-white/5 backdrop-blur-[5px] rounded-lg border border-white/30" style={{ animationDelay: '0.35s' }}>
                                <div className="text-white/60 text-sm">
                                    Signed in as
                                </div>
                                <div className="text-white font-medium">
                                    {user.fullName || user.username}
                                </div>
                                <div className="text-white/40 text-xs mt-1">
                                    {user.email}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}