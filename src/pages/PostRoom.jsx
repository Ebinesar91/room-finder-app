import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { roomService } from '../services/roomService';
import './PostRoom.css';

export const PostRoom = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        property_type: '1 BHK',
        tenant_preference: 'Bachelor',
        contact_number: '',
    });
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 5) {
            setError('You can upload maximum 5 images');
            return;
        }
        setImages(files);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Create room first
            const roomData = {
                owner_id: user.id,
                title: formData.title,
                description: formData.description || '',
                location: formData.location,
                price: parseFloat(formData.price),
                property_type: formData.property_type,
                tenant_preference: formData.tenant_preference,
                contact_number: formData.contact_number,
                is_available: true,
                images: [],
            };

            const createdRoom = await roomService.createRoom(roomData);

            // Upload images if any
            if (images.length > 0) {
                const imageUrls = await roomService.uploadImages(images, createdRoom.id);

                // Update room with image URLs
                await roomService.updateRoom(createdRoom.id, {
                    images: imageUrls,
                });
            }

            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to post room. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="post-room">
            <div className="container post-room-container">
                <h1>Post a New Room</h1>
                <p className="page-subtitle">Fill in the details to list your room</p>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="room-form card">
                    <div className="form-section">
                        <h3>Basic Information</h3>

                        <div className="form-group">
                            <label htmlFor="title">Room Title *</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Spacious 2BHK near Metro Station"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your room, its features, and surroundings..."
                                rows={5}
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Location</h3>

                        <div className="form-group">
                            <label htmlFor="location">Location *</label>
                            <input
                                id="location"
                                name="location"
                                type="text"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g., Andheri West, Mumbai"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Room Details</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="price">Monthly Rent (₹) *</label>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="e.g., 15000"
                                    required
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="property_type">Property Type *</label>
                                <select
                                    id="property_type"
                                    name="property_type"
                                    value={formData.property_type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="1 BHK">1 BHK</option>
                                    <option value="2 BHK">2 BHK</option>
                                    <option value="3 BHK">3 BHK</option>
                                    <option value="Studio">Studio</option>
                                    <option value="1 Bed">1 Bed</option>
                                    <option value="2 Bed">2 Bed</option>
                                    <option value="3 Bed">3 Bed</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="tenant_preference">Tenant Preference *</label>
                                <select
                                    id="tenant_preference"
                                    name="tenant_preference"
                                    value={formData.tenant_preference}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Family">Family</option>
                                    <option value="Girls">Girls</option>
                                    <option value="Working">Working</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="contact_number">Contact Number *</label>
                                <input
                                    id="contact_number"
                                    name="contact_number"
                                    type="tel"
                                    value={formData.contact_number}
                                    onChange={handleChange}
                                    placeholder="e.g., +91 9876543210"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Images (Max 5)</h3>
                        <div className="form-group">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                disabled={loading}
                            />
                            {images.length > 0 && (
                                <p className="form-hint">
                                    {images.length} image{images.length > 1 ? 's' : ''} selected
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/dashboard')}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Posting...' : 'Post Room'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
