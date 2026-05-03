import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        fullName: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Updated path to match backend controller
            const response = await API.post('/auth/register', {
                username: form.username,
                email: form.email,
                password: form.password,
                fullName: form.fullName
            });

            // The response contains accessToken according to your AuthResponse
            if (!response.data || !response.data.accessToken) {
                throw new Error('Invalid response from server');
            }

            // Save token
            localStorage.setItem('token', response.data.accessToken);
            if (response.data.refreshToken) {
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }

            // Save user data
            const userData = {
                email: response.data.email,
                username: response.data.username,
                fullName: response.data.fullName,
                emailVerified: response.data.emailVerified || false
            };
            localStorage.setItem('user', JSON.stringify(userData));

            // Navigate to chat page
            navigate('/chat');
        } catch (err: any) {
            if (err.response) {
                if (err.response.status === 400) {
                    setError(err.response?.data?.message || 'Invalid registration data');
                } else if (err.response.status === 409) {
                    setError('Username or email already exists');
                } else {
                    setError(err.response?.data?.message || 'Registration failed');
                }
            } else if (err.request) {
                setError('Unable to connect to server. Please try again later.');
            } else {
                setError('An error occurred. Please try again.');
            }
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
                                <span className="text-white">Create</span>{' '}
                                <em className="italic font-normal grad-text">Account</em>
                            </h1>
                            <p className="font-dm text-sm text-white/50">
                                Sign up to get started
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 backdrop-blur-sm text-red-400 p-4 rounded-xl mb-6 text-sm text-center border border-red-500/30">
                                {error}
                            </div>
                        )}

                        {/* Register Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block mb-2 font-dm text-sm text-white/70 font-medium">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={form.fullName}
                                    onChange={(e) => setForm({...form, fullName: e.target.value})}
                                    className="w-full px-4 py-3 font-dm text-white bg-white/10 backdrop-blur-sm
                                        border border-white/20 rounded-xl outline-none transition-all
                                        placeholder:text-white/30 focus:border-white/40 focus:bg-white/15"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-dm text-sm text-white/70 font-medium">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    placeholder="Choose a username"
                                    value={form.username}
                                    onChange={(e) => setForm({...form, username: e.target.value})}
                                    className="w-full px-4 py-3 font-dm text-white bg-white/10 backdrop-blur-sm
                                        border border-white/20 rounded-xl outline-none transition-all
                                        placeholder:text-white/30 focus:border-white/40 focus:bg-white/15"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-dm text-sm text-white/70 font-medium">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={form.email}
                                    onChange={(e) => setForm({...form, email: e.target.value})}
                                    className="w-full px-4 py-3 font-dm text-white bg-white/10 backdrop-blur-sm
                                        border border-white/20 rounded-xl outline-none transition-all
                                        placeholder:text-white/30 focus:border-white/40 focus:bg-white/15"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-dm text-sm text-white/70 font-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Create a password"
                                    value={form.password}
                                    onChange={(e) => setForm({...form, password: e.target.value})}
                                    className="w-full px-4 py-3 font-dm text-white bg-white/10 backdrop-blur-sm
                                        border border-white/20 rounded-xl outline-none transition-all
                                        placeholder:text-white/30 focus:border-white/40 focus:bg-white/15"
                                    required
                                />
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
                                        <span className="font-dm">Creating account...</span>
                                    </div>
                                ) : (
                                    <span className="font-dm">Register →</span>
                                )}
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => navigate('/login')}
                                className="font-dm text-white/50 text-sm hover:text-white/80 transition-colors"
                            >
                                Already have an account?{' '}
                                <span className="font-medium text-blue-400 hover:text-blue-300 hover:underline">
                                    Login
                                </span>
                            </button>
                        </div>

                        {/* Terms hint */}
                        <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                            <p className="font-dm text-xs text-white/40">
                                By registering, you agree to our Terms of Service and Privacy Policy
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}