import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Dashboard.css';

export const Dashboard = () => {
    const { profile, loading } = useAuth();

    if (loading) {
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="loading-container">
                        <div className="spinner"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Redirect to role-specific dashboard
    if (profile?.role === 'finder') {
        return <Navigate to="/finder-dashboard" replace />;
    }

    if (profile?.role === 'owner') {
        return <Navigate to="/owner-dashboard" replace />;
    }

    // Fallback - shouldn't normally reach here
    return (
        <div className="dashboard">
            <div className="container">
                <div className="empty-state card">
                    <h2>Welcome!</h2>
                    <p>Loading your dashboard...</p>
                </div>
            </div>
        </div>
    );
};
