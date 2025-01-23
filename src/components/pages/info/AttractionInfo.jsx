import React from 'react';
import { Link } from 'react-router-dom';
import ImageGallery from './ImageGallery';

const AttractionInfo = ({ attraction, attractionError }) => {
  if (attractionError) {
    return (
      <div className="error-message">
        Ошибка при загрузке данных: {attractionError.message}
      </div>
    );
  }

  const mapUrl =
    attraction?.map && typeof attraction.map === 'string'
      ? attraction.map.replace(/&amp;/g, '&')
      : '';

  return (
    <div className="info-card">
      <h2 className="info-title">
        {attraction?.name || 'Название не указано'}
      </h2>
      <div className="info-image-map-container">
        <ImageGallery images={attraction?.images || []} />
        {mapUrl && (
          <iframe src={mapUrl} title="Карта" className="info-map"></iframe>
        )}
      </div>
      {attraction?.description2 ? (
        <p className="info-description">{attraction.description2}</p>
      ) : (
        <p>Описание отсутствует</p>
      )}
      <Link to="/attractions" className="info-back-button">
        Вернуться назад
      </Link>
    </div>
  );
};

export default AttractionInfo;
