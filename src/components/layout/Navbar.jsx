import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import './Navbar.css';

export const Navbar = () => {
    const { user, profile } = useAuth();

    const handleLogout = async () => {
        try {
            await authService.signOut();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">🏠</span>
                    <span className="logo-text">RoomFinder</span>
                </Link>

                <div className="navbar-links">
                    {user ? (
                        <>
                            {/* Common Links */}
                            <Link to="/explore" className="nav-link">
                                Explore
                            </Link>

                            {/* Role-Specific Links */}
                            {profile?.role === 'finder' ? (
                                <>
                                    <Link to="/finder-dashboard" className="nav-link">
                                        My Saved Rooms
                                    </Link>
                                    <Link to="/finder-dashboard" className="nav-link">
                                        Dashboard
                                    </Link>
                                </>
                            ) : profile?.role === 'owner' ? (
                                <>
                                    <Link to="/owner-dashboard" className="nav-link">
                                        Dashboard
                                    </Link>
                                    <Link to="/post-room" className="nav-link btn btn-primary">
                                        Post Room
                                    </Link>
                                </>
                            ) : (
                                <Link to="/dashboard" className="nav-link">
                                    Dashboard
                                </Link>
                            )}

                            <div className="user-menu">
                                <div className="user-avatar">
                                    {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <button onClick={handleLogout} className="btn btn-secondary">
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/explore" className="nav-link">
                                Explore
                            </Link>
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
