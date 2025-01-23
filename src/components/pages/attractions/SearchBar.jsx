import React from 'react';

const SearchBar = ({ searchTerm, handleSearch, handleSearchClick }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        id="searchInput"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="search-button" onClick={handleSearchClick}>
        Найти
      </button>
    </div>
  );
};

export default SearchBar;