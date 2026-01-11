import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../components/search/SearchBar';
import { FilterPanel } from '../components/search/FilterPanel';
import { RoomList } from '../components/rooms/RoomList';
import { roomService } from '../services/roomService';
import './Explore.css';

export const Explore = () => {
    const [searchParams] = useSearchParams();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        location: searchParams.get('location') || '',
        minPrice: '',
        maxPrice: '',
        propertyType: '',
        tenantPreference: '',
    });

    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = async (filterParams = {}) => {
        setLoading(true);
        try {
            const data = await roomService.getRooms(filterParams);
            setRooms(data);
        } catch (error) {
            console.error('Error loading rooms:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchData) => {
        const newFilters = { ...filters, ...searchData };
        setFilters(newFilters);
        loadRooms(newFilters);
    };

    const handleFilterChange = (newFilters) => {
        const combinedFilters = { ...filters, ...newFilters };
        setFilters(combinedFilters);

        loadRooms({
            location: combinedFilters.location,
            minPrice: combinedFilters.minPrice,
            maxPrice: combinedFilters.maxPrice,
            propertyType: combinedFilters.propertyType,
            tenantPreference: combinedFilters.tenantPreference,
        });
    };

    return (
        <div className="explore">
            <div className="explore-header">
                <div className="container">
                    <h1>Explore Rooms</h1>
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>

            <div className="container-wide">
                <div className="explore-content">
                    <aside className="explore-sidebar">
                        <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
                    </aside>

                    <main className="explore-main">
                        <div className="results-header">
                            <h2>
                                {loading ? 'Loading...' : `${rooms.length} rooms found`}
                            </h2>
                        </div>
                        <RoomList rooms={rooms} loading={loading} />
                    </main>
                </div>
            </div>
        </div>
    );
};
