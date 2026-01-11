import { Link } from 'react-router-dom';
import './RoomCard.css';

export const RoomCard = ({ room }) => {
    const mainImage = room.images?.[0] || '/placeholder-room.jpg';

    return (
        <Link to={`/room/${room.id}`} className="room-card card">
            <div className="room-image">
                <img src={mainImage} alt={room.title} />
                <div className="room-price">₹{room.price.toLocaleString()}/month</div>
                {!room.is_available && <div className="room-unavailable">Unavailable</div>}
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
    );
};
