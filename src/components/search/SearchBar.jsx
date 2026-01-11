import { useState } from 'react';
import './SearchBar.css';

export const SearchBar = ({ onSearch }) => {
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ location });
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search by city or location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="search-input"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Search
            </button>
        </form>
    );
};
