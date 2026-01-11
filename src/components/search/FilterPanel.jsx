import { useState } from 'react';
import './FilterPanel.css';

export const FilterPanel = ({ filters, onFilterChange }) => {
    const [localFilters, setLocalFilters] = useState({
        minPrice: filters?.minPrice || '',
        maxPrice: filters?.maxPrice || '',
        propertyType: filters?.propertyType || '',
        tenantPreference: filters?.tenantPreference || '',
    });

    const handleChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
    };

    const handleApply = () => {
        onFilterChange(localFilters);
    };

    const handleReset = () => {
        const resetFilters = {
            minPrice: '',
            maxPrice: '',
            propertyType: '',
            tenantPreference: '',
        };
        setLocalFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <div className="filter-panel card">
            <h3>Filters</h3>

            <div className="filter-section">
                <label>Price Range</label>
                <div className="price-inputs">
                    <input
                        type="number"
                        placeholder="Min"
                        value={localFilters.minPrice}
                        onChange={(e) => handleChange('minPrice', e.target.value)}
                    />
                    <span>-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={localFilters.maxPrice}
                        onChange={(e) => handleChange('maxPrice', e.target.value)}
                    />
                </div>
            </div>

            <div className="filter-section">
                <label>Property Type</label>
                <select
                    value={localFilters.propertyType}
                    onChange={(e) => handleChange('propertyType', e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="Studio">Studio</option>
                    <option value="1 Bed">1 Bed</option>
                    <option value="2 Bed">2 Bed</option>
                    <option value="3 Bed">3 Bed</option>
                </select>
            </div>

            <div className="filter-section">
                <label>Tenant Preference</label>
                <select
                    value={localFilters.tenantPreference}
                    onChange={(e) => handleChange('tenantPreference', e.target.value)}
                >
                    <option value="">All Tenants</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Family">Family</option>
                    <option value="Girls">Girls</option>
                    <option value="Working">Working</option>
                </select>
            </div>

            <div className="filter-actions">
                <button className="btn btn-primary" onClick={handleApply}>
                    Apply Filters
                </button>
                <button className="btn btn-secondary" onClick={handleReset}>
                    Reset
                </button>
            </div>
        </div>
    );
};
