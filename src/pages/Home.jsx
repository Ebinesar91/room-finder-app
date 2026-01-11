import { Link } from 'react-router-dom';
import { SearchBar } from '../components/search/SearchBar';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
    const navigate = useNavigate();

    const handleSearch = (searchData) => {
        navigate(`/explore?location=${searchData.location}`);
    };

    return (
        <div className="home">
            <section className="hero">
                <div className="hero-background"></div>
                <div className="container hero-content">
                    <h1 className="hero-title fade-in">
                        Find Your Perfect Room
                    </h1>
                    <p className="hero-subtitle fade-in">
                        Discover comfortable and affordable rooms in your preferred location
                    </p>

                    <div className="hero-search fade-in">
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Available Rooms</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">1000+</div>
                            <div className="stat-label">Happy Tenants</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">50+</div>
                            <div className="stat-label">Cities</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <h2 className="section-title">Why Choose RoomFinder?</h2>

                    <div className="grid grid-3">
                        <div className="feature-card card">
                            <div className="feature-icon">🔍</div>
                            <h3>Easy Search</h3>
                            <p>Find rooms quickly with our powerful search and filter system</p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">✅</div>
                            <h3>Verified Listings</h3>
                            <p>All room listings are verified for authenticity and quality</p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">💰</div>
                            <h3>Best Prices</h3>
                            <p>Compare prices and find the best deals in your budget</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container cta-content">
                    <h2>Ready to find your room?</h2>
                    <p>Start exploring thousands of listings today</p>
                    <Link to="/explore" className="btn btn-primary btn-lg">
                        Explore Rooms
                    </Link>
                </div>
            </section>
        </div>
    );
};
