import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            await API.post('/forgot-password', { email });
            setMessage('Reset code sent to your email! Redirecting...');
            setTimeout(() => navigate('/reset-password', { state: { email } }), 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Unable to send reset code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#080b14] px-4 relative overflow-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

                .font-playfair { font-family: 'Playfair Display', serif; }
                .font-dm { font-family: 'DM Sans', sans-serif; }

                .grad-text {
                    background: linear-gradient(135deg, #60a5fa, #3b82f6, #2563eb);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeUp {
                    animation: fadeUp 0.6s ease forwards;
                }
            `}</style>

            {/* Background Orbs */}
            <div className="absolute w-[520px] h-[520px] bg-violet-700 rounded-full blur-[80px] opacity-35 -top-28 -left-36 pointer-events-none" />
            <div className="absolute w-[400px] h-[400px] bg-blue-700 rounded-full blur-[80px] opacity-25 top-32 -right-24 pointer-events-none" />
            <div className="absolute w-[280px] h-[280px] bg-emerald-700 rounded-full blur-[80px] opacity-20 bottom-0 left-1/2 pointer-events-none" />

            {/* Glass Card Container */}
            <div className="relative w-full max-w-md animate-fadeUp">
                <div className="relative bg-white/5 backdrop-blur-[5px] rounded-[20px] border border-white/30
                    shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(255,255,255,0.1)]
                    overflow-hidden">

                    {/* Top gradient line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>

                    {/* Left gradient line */}
                    <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-white/80 via-transparent to-white/30"></div>

                    {/* Content */}
                    <div className="p-8 md:p-10">
                        {/* Logo/Brand */}
                        <div className="text-center mb-8">
                            <h1 className="font-playfair text-4xl font-light tracking-[-0.03em] mb-2">
                                <span className="text-white">Forgot</span>{' '}
                                <em className="italic font-normal grad-text">Password</em>
                            </h1>
                            <p className="font-dm text-sm text-white/50">
                                Enter your email to receive a reset code
                            </p>
                        </div>

                        {/* Success Message */}
                        {message && (
                            <div className="bg-blue-500/10 backdrop-blur-sm text-blue-400 p-4 rounded-xl mb-6 text-sm text-center border border-blue-500/30">
                                ✓ {message}
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 backdrop-blur-sm text-red-400 p-4 rounded-xl mb-6 text-sm text-center border border-red-500/30">
                                {error}
                            </div>
                        )}

                        {/* Forgot Password Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block mb-2 font-dm text-sm text-white/70 font-medium">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 font-dm text-white bg-white/10 backdrop-blur-sm
                                            border border-white/20 rounded-xl outline-none transition-all
                                            placeholder:text-white/30 focus:border-white/40 focus:bg-white/15"
                                        required
                                    />
                                    <svg
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/30"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M3 8l7.89 7.89a2 2 0 002.12.35l8.85-4.47A2 2 0 0021 8.12V6a2 2 0 00-2-2H5a2 2 0 00-2 2v2.12z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`
                                    w-full py-3.5 rounded-xl font-dm font-medium text-base
                                    transition-all transform hover:scale-[1.02]
                                    ${loading
                                    ? 'bg-white/20 text-white/50 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl'
                                }
                                `}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                                        <span className="font-dm">Sending...</span>
                                    </div>
                                ) : (
                                    <span className="font-dm">Send Reset Code →</span>
                                )}
                            </button>
                        </form>

                        {/* Back to Login */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => navigate('/login')}
                                className="font-dm text-white/50 text-sm hover:text-white/80 transition-colors inline-flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Login
                            </button>
                        </div>

                        {/* Help Text */}
                        <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                            <p className="font-dm text-xs text-white/40">
                                We'll send a password reset code to your email address.
                                The code will expire in 15 minutes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}