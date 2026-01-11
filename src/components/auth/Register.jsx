import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { profileService } from '../../services/profileService';
import './Auth.css';

export const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        role: 'finder',
        phone: '',
    });
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('details'); // 'details' or 'otp'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.sendOTP(formData.email);
            setStep('otp');
        } catch (err) {
            setError(err.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { user } = await authService.verifyOTP(formData.email, otp);

            // Create user profile
            await profileService.createProfile(user.id, {
                email: formData.email,
                full_name: formData.fullName,
                role: formData.role,
                phone: formData.phone,
            });

            navigate('/');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card card">
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join Room Finder today</p>

                {error && <div className="alert alert-error">{error}</div>}

                {step === 'details' ? (
                    <form onSubmit={handleSendOTP} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number (Optional)</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 1234567890"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label>I am a:</label>
                            <div className="role-selector">
                                <label className={`role-option ${formData.role === 'finder' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="finder"
                                        checked={formData.role === 'finder'}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <div className="role-content">
                                        <span className="role-icon">🔍</span>
                                        <span className="role-label">Room Finder</span>
                                        <span className="role-desc">Looking for a room</span>
                                    </div>
                                </label>

                                <label className={`role-option ${formData.role === 'owner' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="owner"
                                        checked={formData.role === 'owner'}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <div className="role-content">
                                        <span className="role-icon">🏠</span>
                                        <span className="role-label">Room Owner</span>
                                        <span className="role-desc">Have rooms to rent</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Sending...' : 'Continue'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOTP} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="otp">Enter OTP</label>
                            <input
                                id="otp"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="123456"
                                required
                                disabled={loading}
                                maxLength={6}
                            />
                            <p className="form-hint">Check your email for the verification code</p>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Complete Registration'}
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                setStep('details');
                                setOtp('');
                                setError('');
                            }}
                            disabled={loading}
                        >
                            Go Back
                        </button>
                    </form>
                )}

                <p className="auth-link">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};
