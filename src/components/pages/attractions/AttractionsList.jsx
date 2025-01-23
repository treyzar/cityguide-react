import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Header from '../../general/header/header';
import Footer from '../../general/footer/footer';
import Loader from '../../general/loader/loader';
import Filters from './Filters';
import AttractionCard from './AttractionCard';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import './attractions.css';

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
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
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

  const handleSearch = e => setSearchTerm(e.target.value);
  const handleSearchClick = () => setPage(1);

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

  const handleAttractionClick = id => navigate(`/attraction/${id}`);

  if (isError) return <div>Ошибка: {error.message}</div>;

  const finalData = (data || []).filter(matchesAllConditions);

  return (
    <div className="attractions-page">
      <Header />
      <div className="container">
        <h1>Достопримечательности Чебоксар</h1>
        <SearchBar
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          handleSearchClick={handleSearchClick}
        />
        <Filters
          category={category}
          region={region}
          rating={rating}
          sortBy={sortBy}
          order={order}
          handleFilterChange={handleFilterChange}
          handleSortChange={handleSortChange}
        />
        {isFetching ? (
          <Loader />
        ) : (
          <>
            <div id="cardsContainer">
              {finalData.length === 0 ? (
                <div>Достопримечательности не найдены</div>
              ) : (
                finalData.map(attraction => (
                  <AttractionCard
                    key={attraction.id}
                    attraction={attraction}
                    handleAttractionClick={handleAttractionClick}
                  />
                ))
              )}
            </div>
            <Pagination page={page} setPage={setPage} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AttractionsList;
