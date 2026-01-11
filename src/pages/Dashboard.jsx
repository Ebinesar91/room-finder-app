import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { roomService } from '../services/roomService';
import { RoomCard } from '../components/rooms/RoomCard';
import './Dashboard.css';

export const Dashboard = () => {
    const { user, profile } = useAuth();
    const [myRooms, setMyRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && profile?.role === 'owner') {
            loadMyRooms();
        } else {
            setLoading(false);
        }
    }, [user, profile]);

    const loadMyRooms = async () => {
        setLoading(true);
        try {
            const data = await roomService.getRoomsByOwner(user.id);
            setMyRooms(data);
        } catch (error) {
            console.error('Error loading rooms:', error);
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
        } catch (error) {
            console.error('Error deleting room:', error);
            alert('Failed to delete room');
        }
    };

    return (
        <div className="dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p className="dashboard-subtitle">
                            Welcome back, {profile?.full_name}!
                        </p>
                    </div>

                    {profile?.role === 'owner' && (
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/post-room')}
                        >
                            + Post New Room
                        </button>
                    )}
                </div>

                <div className="profile-card card">
                    <h2>Profile Information</h2>
                    <div className="profile-info">
                        <div className="info-item">
                            <span className="info-label">Email:</span>
                            <span className="info-value">{profile?.email}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Role:</span>
                            <span className="info-value badge badge-primary">
                                {profile?.role}
                            </span>
                        </div>
                        {profile?.phone && (
                            <div className="info-item">
                                <span className="info-label">Phone:</span>
                                <span className="info-value">{profile.phone}</span>
                            </div>
                        )}
                    </div>
                </div>

                {profile?.role === 'owner' && (
                    <div className="my-listings">
                        <h2>My Listings ({myRooms.length})</h2>

                        {loading ? (
                            <div className="loading-container">
                                <div className="spinner"></div>
                            </div>
                        ) : myRooms.length === 0 ? (
                            <div className="empty-state card">
                                <p>You haven't posted any rooms yet.</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate('/post-room')}
                                >
                                    Post Your First Room
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-3">
                                {myRooms.map((room) => (
                                    <div key={room.id} className="room-card-wrapper">
                                        <RoomCard room={room} />
                                        <div className="room-actions">
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
                    </div>
                )}

                {profile?.role === 'finder' && (
                    <div className="finder-section card">
                        <h2>Saved Rooms</h2>
                        <p className="text-muted">Bookmark feature coming soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
