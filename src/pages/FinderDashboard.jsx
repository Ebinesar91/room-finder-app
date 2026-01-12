import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { bookmarkService } from '../services/bookmarkService';
import { RoomCard } from '../components/rooms/RoomCard';
import { SearchBar } from '../components/search/SearchBar';
import './FinderDashboard.css';

export const FinderDashboard = () => {
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    const [savedRooms, setSavedRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadSavedRooms();
        }
    }, [user]);

    const loadSavedRooms = async () => {
        setLoading(true);
        try {
            const rooms = await bookmarkService.getBookmarks(user.id);
            setSavedRooms(rooms);
        } catch (error) {
            console.error('Error loading saved rooms:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchData) => {
        navigate(`/explore?location=${searchData.location}`);
    };

    return (
        <div className="finder-dashboard">
            {/* Hero Section */}
            <section className="finder-hero">
                <div className="finder-hero-background"></div>
                <div className="container">
                    <div className="finder-hero-content">
                        <h1 className="finder-title">
                            Welcome back, {profile?.full_name?.split(' ')[0]}! 👋
                        </h1>
                        <p className="finder-subtitle">
                            Continue your search for the perfect room
                        </p>

                        <div className="finder-search-wrapper">
                            <SearchBar onSearch={handleSearch} />
                        </div>

                        <div className="quick-actions">
                            <Link to="/explore" className="quick-action-btn">
                                <span className="action-icon">🔍</span>
                                <span>Explore All</span>
                            </Link>
                            <button
                                className="quick-action-btn"
                                onClick={() => document.getElementById('saved-section').scrollIntoView({ behavior: 'smooth' })}
                            >
                                <span className="action-icon">💾</span>
                                <span>Saved Rooms</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container finder-content">
                {/* Stats Overview */}
                <div className="finder-stats">
                    <div className="stat-box card">
                        <div className="stat-icon">💾</div>
                        <div>
                            <div className="stat-number">{savedRooms.length}</div>
                            <div className="stat-label">Saved Rooms</div>
                        </div>
                    </div>
                    <div className="stat-box card">
                        <div className="stat-icon">🔍</div>
                        <div>
                            <div className="stat-number">Browse</div>
                            <div className="stat-label">New Listings</div>
                        </div>
                    </div>
                    <div className="stat-box card">
                        <div className="stat-icon">⚡</div>
                        <div>
                            <div className="stat-number">Quick</div>
                            <div className="stat-label">Filters</div>
                        </div>
                    </div>
                </div>

                {/* Saved Rooms Section */}
                <section id="saved-section" className="saved-rooms-section">
                    <div className="section-header">
                        <h2>Your Saved Rooms</h2>
                        <Link to="/explore" className="btn btn-outline">
                            Find More Rooms
                        </Link>
                    </div>

                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                        </div>
                    ) : savedRooms.length === 0 ? (
                        <div className="empty-state card">
                            <div className="empty-icon">🏠</div>
                            <h3>No saved rooms yet</h3>
                            <p>Start exploring and save rooms that interest you!</p>
                            <Link to="/explore" className="btn btn-primary">
                                Explore Rooms
                            </Link>
                        </div>
                    ) : (
                        <div className="rooms-grid">
                            {savedRooms.map((room) => (
                                <RoomCard key={room.id} room={room} showBookmark={true} />
                            ))}
                        </div>
                    )}
                </section>

                {/* Tips Section */}
                <section className="tips-section card">
                    <h3>🎯 Tips for Room Hunting</h3>
                    <div className="tips-grid">
                        <div className="tip-item">
                            <div className="tip-icon">📍</div>
                            <div>
                                <h4>Check Location</h4>
                                <p>Visit the area during different times of the day</p>
                            </div>
                        </div>
                        <div className="tip-item">
                            <div className="tip-icon">💰</div>
                            <div>
                                <h4>Budget Wisely</h4>
                                <p>Include maintenance and other hidden costs</p>
                            </div>
                        </div>
                        <div className="tip-item">
                            <div className="tip-icon">📋</div>
                            <div>
                                <h4>Read Agreement</h4>
                                <p>Carefully review all terms before signing</p>
                            </div>
                        </div>
                        <div className="tip-item">
                            <div className="tip-icon">🏠</div>
                            <div>
                                <h4>Inspect Property</h4>
                                <p>Check for water supply, electricity, and amenities</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
