import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { BookmarkButton } from '../dashboard/BookmarkButton';
import './RoomCard.css';

export const RoomCard = ({ room, showBookmark = false }) => {
    const { user, profile } = useAuth();
    const mainImage = room.images?.[0] || '/placeholder-room.jpg';

    return (
        <div className="room-card-wrapper">
            <Link to={`/room/${room.id}`} className="room-card card">
                <div className="room-image">
                    <img src={mainImage} alt={room.title} />
                    <div className="room-price">₹{room.price.toLocaleString()}/month</div>
                    {!room.is_available && <div className="room-unavailable">Unavailable</div>}

                    {/* Show bookmark for finders */}
                    {showBookmark && user && profile?.role === 'finder' && (
                        <div className="bookmark-wrapper">
                            <BookmarkButton roomId={room.id} userId={user.id} />
                        </div>
                    )}

                    {/* Show views for owners or if viewing own room */}
                    {room.views !== undefined && room.views > 0 && (
                        <div className="room-views-badge">
                            👁️ {room.views}
                        </div>
                    )}
                </div>

                <div className="room-info">
                    <h3 className="room-title">{room.title}</h3>
                    <p className="room-location">📍 {room.location}</p>

                    <div className="room-details">
                        <span className="badge badge-primary">{room.property_type}</span>
                        <span className="badge">{room.tenant_preference}</span>
                    </div>

                    {room.contact_number && (
                        <p className="room-contact">📞 {room.contact_number}</p>
                    )}
                </div>
            </Link>
        </div>
    );
};
