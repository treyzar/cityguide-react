import React from 'react';

const Filters = ({
  category,
  region,
  rating,
  sortBy,
  order,
  handleFilterChange,
  handleSortChange,
}) => {
  return (
    <div className="filters">
      <select
        name="category"
        value={category}
        onChange={handleFilterChange}
        id="categoryFilter"
      >
        <option value="all">Все категории</option>
        <option value="temples">Храмы</option>
        <option value="parks">Парки</option>
        <option value="theaters">Театры</option>
        <option value="museums">Музеи</option>
        <option value="zoos">Зоопарки</option>
      </select>
      <select
        name="region"
        value={region}
        onChange={handleFilterChange}
        id="regionFilter"
      >
        <option value="all">Все регионы</option>
        <option value="north">Северный</option>
        <option value="south">Южный</option>
        <option value="east">Восточный</option>
        <option value="west">Западный</option>
      </select>
      <select
        name="rating"
        value={rating}
        onChange={handleFilterChange}
        id="ratingFilter"
      >
        <option value="all">Все рейтинги</option>
        <option value="5">5 звезд</option>
        <option value="4">4 звезды</option>
        <option value="3">3 звезды</option>
        <option value="2">2 звезды</option>
        <option value="1">1 звезда</option>
      </select>
      <select
        name="sort"
        value={`${sortBy}-${order}`}
        onChange={handleSortChange}
        id="sortSelect"
      >
        <option value="name-asc">По имени (А-Я)</option>
        <option value="name-desc">По имени (Я-А)</option>
        <option value="rating-asc">По рейтингу (по возрастанию)</option>
        <option value="rating-desc">По рейтингу (по убыванию)</option>
      </select>
    </div>
  );
};

export default Filters;