import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatLayout from '../components/chat/ChatLayout';

export default function Chat() {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            navigate('/login');
            return;
        }

        setUser(JSON.parse(userData));
    }, [navigate]);

    if (!user) {
        return (
            <div className="min-h-screen bg-[#080b14] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
        );
    }

    return <ChatLayout user={user} />;
}