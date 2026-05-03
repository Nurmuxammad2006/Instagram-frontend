import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';

    const [step, setStep] = useState<'code' | 'password'>('code');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const verifyCode = async () => {
        setLoading(true);
        try {
            await API.post('/verify-reset-code', { email, code });
            setMessage('Code verified! Enter new password');
            setStep('password');
        } catch (err: any) {
            setMessage(err.response?.data?.message || 'Invalid code');
        }
        setLoading(false);
    };

    const resetPassword = async () => {
        setLoading(true);
        try {
            await API.post('/reset-password', { email, newPassword });
            setMessage('Password reset successfully!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            setMessage(err.response?.data?.message || 'Error resetting password');
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: 400, margin: '50px auto' }}>
            <h2>Reset Password</h2>
            {message && <p style={{ color: 'blue' }}>{message}</p>}

            {step === 'code' && (
                <div>
                    <p>Enter verification code sent to {email}</p>
                    <input
                        type="text"
                        placeholder="6-digit code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        style={{ width: '100%', padding: 10, margin: '10px 0' }}
                    />
                    <button onClick={verifyCode} disabled={loading} style={{ width: '100%', padding: 10 }}>
                        Verify Code
                    </button>
                </div>
            )}

            {step === 'password' && (
                <div>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ width: '100%', padding: 10, margin: '10px 0' }}
                    />
                    <button onClick={resetPassword} disabled={loading} style={{ width: '100%', padding: 10 }}>
                        Reset Password
                    </button>
                </div>
            )}

            <button onClick={() => navigate('/login')}>Back to Login</button>
        </div>
    );
}