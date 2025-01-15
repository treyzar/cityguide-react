import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Header from '../../general/header/header';
import './attractions.css';
import Footer from '../../general/footer/footer';
import Loader from '../../general/loader/loader';

const fetchAttractions = async ({ queryKey }) => {
  const [_, page, limit, searchTerm, category, region, rating, sortBy, order] =
    queryKey;
  const url = new URL(
    'https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd'
  );

  url.searchParams.append('page', page);
  url.searchParams.append('limit', limit);

  if (searchTerm) url.searchParams.append('search', searchTerm);

  if (category !== 'all') url.searchParams.append('category', category);
  if (region !== 'all') url.searchParams.append('region', region);
  if (rating !== 'all') url.searchParams.append('rating', rating);

  if (sortBy) url.searchParams.append('sortBy', sortBy);
  if (order) url.searchParams.append('order', order);

  const response = await fetch(url);
  if (!response.ok) throw new Error('Ошибка при загрузке данных');
  return response.json();
};

const AttractionsList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [region, setRegion] = useState('all');
  const [rating, setRating] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isFetching, isError, error } = useQuery({
    queryKey: [
      'attractions',
      page,
      limit,
      debouncedSearchTerm,
      category,
      region,
      rating,
      sortBy,
      order,
    ],
    queryFn: fetchAttractions,
    keepPreviousData: true,
  });

  const matchesAllConditions = item => {
    const matchesSearch = debouncedSearchTerm
      ? item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      : true;

    const matchesCategory = category === 'all' || item.category === category;
    const matchesRegion = region === 'all' || item.region === region;
    const matchesRating = rating === 'all' || item.rating >= parseInt(rating);

    return matchesSearch && matchesCategory && matchesRegion && matchesRating;
  };

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    setPage(1);
  };

  const handleFilterChange = e => {
    const { name, value } = e.target;
    if (name === 'category') setCategory(value);
    if (name === 'region') setRegion(value);
    if (name === 'rating') setRating(value);
    setPage(1);
  };

  const handleSortChange = e => {
    const [sortBy, order] = e.target.value.split('-');
    setSortBy(sortBy);
    setOrder(order);
    setPage(1);
  };

  const handleAttractionClick = id => {
    navigate(`/attraction/${id}`);
  };

  if (isError) {
    return <div>Ошибка: {error.message}</div>;
  }

  const finalData = (data || []).filter(matchesAllConditions);

  return (
    <div className="attractions-page">
      <Header />
      <div className="container">
        <h1>Достопримечательности Чебоксар</h1>
        <div className="filters">
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
        {isFetching ? (
          <Loader />
        ) : (
          <>
            <div id="cardsContainer">
              {finalData.length === 0 ? (
                <div>Достопримечательности не найдены</div>
              ) : (
                finalData.map(attraction => (
                  <div
                    key={attraction.id}
                    className="card"
                    onClick={() => handleAttractionClick(attraction.id)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleAttractionClick(attraction.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      style={{
                        height: '200px',
                        width: '320px',
                        borderRadius: '7px',
                      }}
                    />
                    <h2>{attraction.name}</h2>
                    <p>{attraction.description}</p>
                    <p>
                      <strong>Адрес:</strong> {attraction.addres}
                    </p>
                    <p>
                      <strong>Регион:</strong> {attraction.region}
                    </p>
                    <p>
                      <strong>Рейтинг:</strong> {attraction.rating}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div id="pagination">
              <button
                id="prevPage"
                className="prevPage"
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              >
                Предыдущая
              </button>
              <span id="pageInfo">Страница {page}</span>
              <button
                id="nextPage"
                className="nextPage"
                onClick={() => setPage(prev => prev + 1)}
              >
                Следующая
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AttractionsList;
