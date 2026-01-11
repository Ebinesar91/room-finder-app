import { RoomCard } from './RoomCard';
import './RoomList.css';

export const RoomList = ({ rooms, loading }) => {
    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading rooms...</p>
            </div>
        );
    }

    if (!rooms || rooms.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">🏠</div>
                <h3>No rooms found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <div className="room-list grid grid-3">
            {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
            ))}
        </div>
    );
};
