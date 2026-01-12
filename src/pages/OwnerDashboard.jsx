import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { roomService } from '../services/roomService';
import { analyticsService } from '../services/analyticsService';
import { StatsCard } from '../components/dashboard/StatsCard';
import { RoomCard } from '../components/rooms/RoomCard';
import './OwnerDashboard.css';

export const OwnerDashboard = () => {
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalListings: 0,
        activeListings: 0,
        totalViews: 0,
        totalRevenue: 0,
        totalInquiries: 0,
    });
    const [myRooms, setMyRooms] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadDashboardData();
        }
    }, [user]);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            // Load stats - use try/catch to handle missing tables
            try {
                const statsData = await analyticsService.getOwnerStats(user.id);
                setStats(statsData);
            } catch (statsError) {
                console.log('Analytics not yet available:', statsError);
                // Set default stats if analytics table doesn't exist
                setStats({
                    totalListings: 0,
                    activeListings: 0,
                    totalViews: 0,
                    totalRevenue: 0,
                    totalInquiries: 0,
                });
            }

            // Load rooms
            const roomsData = await roomService.getRoomsByOwner(user.id);
            setMyRooms(roomsData);

            // Load recent inquiries - handle if table doesn't exist
            try {
                const inquiriesData = await analyticsService.getOwnerInquiries(user.id);
                setInquiries(inquiriesData.slice(0, 5)); // Show only latest 5
            } catch (inquiryError) {
                console.log('Inquiries not yet available:', inquiryError);
                setInquiries([]);
            }
        } catch (error) {
            console.error('Error loading dashboard:', error);
            alert('Error loading dashboard. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRoom = async (roomId) => {
        if (!window.confirm('Are you sure you want to delete this room?')) {
            return;
        }

        try {
            await roomService.deleteRoom(roomId);
            setMyRooms(myRooms.filter(room => room.id !== roomId));
            loadDashboardData(); // Refresh stats
        } catch (error) {
            console.error('Error deleting room:', error);
            alert('Failed to delete room');
        }
    };

    return (
        <div className="owner-dashboard">
            {/* Header */}
            <section className="owner-header">
                <div className="owner-header-background"></div>
                <div className="container">
                    <div className="owner-header-content">
                        <div>
                            <h1 className="owner-title">
                                Dashboard Overview 📊
                            </h1>
                            <p className="owner-subtitle">
                                Welcome back, {profile?.full_name}! Here's your property performance
                            </p>
                        </div>
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => navigate('/post-room')}
                        >
                            <span>+ Post New Room</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container owner-content">
                {/* Stats Grid */}
                <div className="stats-grid">
                    <StatsCard
                        icon="📋"
                        label="Total Listings"
                        value={stats.totalListings}
                        color="primary"
                    />
                    <StatsCard
                        icon="👁️"
                        label="Total Views"
                        value={stats.totalViews}
                        color="secondary"
                    />
                    <StatsCard
                        icon="💬"
                        label="Inquiries"
                        value={stats.totalInquiries}
                        color="accent"
                    />
                    <StatsCard
                        icon="💰"
                        label="Potential Revenue"
                        value={`₹${stats.totalRevenue.toLocaleString()}`}
                        color="success"
                    />
                </div>

                {/* Main Grid Layout */}
                <div className="dashboard-grid">
                    {/* My Listings */}
                    <section className="listings-section">
                        <div className="section-header">
                            <h2>My Listings ({myRooms.length})</h2>
                            <Link to="/post-room" className="btn btn-outline">
                                + Add New
                            </Link>
                        </div>

                        {loading ? (
                            <div className="loading-container">
                                <div className="spinner"></div>
                            </div>
                        ) : myRooms.length === 0 ? (
                            <div className="empty-state card">
                                <div className="empty-icon">🏠</div>
                                <h3>No listings yet</h3>
                                <p>Start by posting your first room</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate('/post-room')}
                                >
                                    Post Your First Room
                                </button>
                            </div>
                        ) : (
                            <div className="rooms-list">
                                {myRooms.map((room) => (
                                    <div key={room.id} className="room-item card">
                                        <div className="room-item-image">
                                            {room.images && room.images.length > 0 ? (
                                                <img src={room.images[0]} alt={room.title} />
                                            ) : (
                                                <div className="no-image">🏠</div>
                                            )}
                                        </div>
                                        <div className="room-item-content">
                                            <h3>{room.title}</h3>
                                            <p className="room-location">📍 {room.location}</p>
                                            <div className="room-meta">
                                                <span className="room-price">₹{room.price}/month</span>
                                                <span className="room-type">{room.property_type}</span>
                                            </div>
                                            <div className="room-stats-small">
                                                <span>👁️ {room.views || 0} views</span>
                                                <span className={`status-badge ${room.status}`}>
                                                    {room.status || 'active'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="room-item-actions">
                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => navigate(`/room/${room.id}/edit`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-outline btn-sm"
                                                onClick={() => handleDeleteRoom(room.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Sidebar */}
                    <aside className="owner-sidebar">
                        {/* Recent Inquiries */}
                        <div className="card inquiries-card">
                            <h3>Recent Inquiries</h3>
                            {inquiries.length === 0 ? (
                                <p className="text-muted">No inquiries yet</p>
                            ) : (
                                <div className="inquiries-list">
                                    {inquiries.map((inquiry) => (
                                        <div key={inquiry.id} className="inquiry-item">
                                            <div className="inquiry-header">
                                                <strong>{inquiry.profiles?.full_name || 'Anonymous'}</strong>
                                                <span className={`status-pill ${inquiry.status}`}>
                                                    {inquiry.status}
                                                </span>
                                            </div>
                                            <p className="inquiry-room">{inquiry.rooms?.title}</p>
                                            <p className="inquiry-date">
                                                {new Date(inquiry.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Quick Tips */}
                        <div className="card tips-card">
                            <h3>💡 Pro Tips</h3>
                            <ul className="tips-list">
                                <li>Add high-quality photos to get more views</li>
                                <li>Update pricing regularly based on market</li>
                                <li>Respond to inquiries within 24 hours</li>
                                <li>Keep room descriptions detailed and accurate</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};
