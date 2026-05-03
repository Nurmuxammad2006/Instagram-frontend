import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        usernameOrEmail: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Send exactly what the backend expects
            const payload = {
                usernameOrEmail: form.usernameOrEmail.trim(),
                password: form.password
            };

            // Updated path to match backend controller
            const response = await API.post('/auth/login', payload);

            // The response contains accessToken and refreshToken
            if (!response.data || !response.data.accessToken) {
                throw new Error('Invalid response from server');
            }

            // Save tokens
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
            // Handle error silently for production
            if (err.response) {
                // Check for validation errors
                if (err.response.status === 400) {
                    setError('Invalid username/email or password');
                } else if (err.response.status === 401) {
                    setError('Invalid username/email or password');
                } else if (err.response.status === 403) {
                    setError('Access forbidden');
                } else if (err.response.status === 429) {
                    setError('Too many attempts. Please try again later.');
                } else {
                    setError(err.response?.data?.message || 'Invalid credentials');
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
                                <span className="text-white">Welcome</span>{' '}
                                <em className="italic font-normal grad-text">Back</em>
                            </h1>
                            <p className="font-dm text-sm text-white/50">
                                Please login to your account
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 backdrop-blur-sm text-red-400 p-4 rounded-xl mb-6 text-sm text-center border border-red-500/30">
                                {error}
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block mb-2 font-dm text-sm text-white/70 font-medium">
                                    Username or Email
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your username or email"
                                    value={form.usernameOrEmail}
                                    onChange={(e) => setForm({...form, usernameOrEmail: e.target.value})}
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
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={form.password}
                                        onChange={(e) => setForm({...form, password: e.target.value})}
                                        className="w-full px-4 py-3 font-dm text-white bg-white/10 backdrop-blur-sm
                                            border border-white/20 rounded-xl outline-none transition-all
                                            placeholder:text-white/30 focus:border-white/40 focus:bg-white/15 pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        )}
                                    </button>
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
                                        <span className="font-dm">Logging in...</span>
                                    </div>
                                ) : (
                                    <span className="font-dm">Login →</span>
                                )}
                            </button>
                        </form>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={() => navigate('/forgot-password')}
                                className="flex-1 py-2.5 font-dm text-sm text-white/70 border border-white/30 rounded-lg
                                    transition-all hover:bg-white/10 hover:text-white hover:border-white/50"
                            >
                                Forgot Password?
                            </button>

                            <button
                                onClick={() => navigate('/register')}
                                className="flex-1 py-2.5 font-dm text-sm text-blue-400 border border-blue-400/50 rounded-lg
                                    transition-all hover:bg-blue-400/10 hover:text-blue-300 hover:border-blue-400"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}