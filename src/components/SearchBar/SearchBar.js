import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onFilterSubmit }) => {
    const [filters, setFilters] = useState({
        keywords: '',
        id: '',
        article_id: '',
        user_id: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        onFilterSubmit(filters);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="search-bar-container">
            <input
                className="search-bar-input keywords-input"
                type="text"
                placeholder="keywords..."
                name="keywords"
                value={filters.keywords}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <input
                className="search-bar-input id-input"
                type="number"
                placeholder="id..."
                name="id"
                value={filters.id}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <input
                className="search-bar-input article-id-input"
                type="text"
                placeholder="article_id..."
                name="article_id"
                value={filters.article_id}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <input
                className="search-bar-input user-id-input"
                type="text"
                placeholder="user_id..."
                name="user_id"
                value={filters.user_id}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <button
                className="search-bar-button"
                onClick={handleSubmit}
            >
                Buscar
            </button>
        </div>
    );
};

export default SearchBar;
