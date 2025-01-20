import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../general/header/header';
import Footer from '../../general/footer/footer';
import './info.scss';

const Info = () => {
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');

  const [editingReview, setEditingReview] = useState(null);
  const [editedReviewText, setEditedReviewText] = useState('');

  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        const response = await fetch(
          `https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd/?id=${id}`
        );
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        const data = await response.json();

        if (!data || data.length === 0) {
          throw new Error('Достопримечательность не найдена');
        }

        const attractionData = Array.isArray(data) ? data[0] : data;

        if (!Array.isArray(attractionData.reviews)) {
          attractionData.reviews = [];
        }

        setAttraction(attractionData);
      } catch (error) {
        console.error('Ошибка:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttraction();
  }, [id]);

  const handleSubmitReview = async e => {
    e.preventDefault();

    if (!reviewName.trim() || !reviewText.trim()) {
      setError('Имя и текст отзыва не могут быть пустыми.');
      return;
    }

    const newReview = {
      name: reviewName,
      text: reviewText,
    };

    try {
      const response = await fetch(
        `https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd/?id=${id}`
      );
      if (!response.ok) {
        throw new Error(`Ошибка при загрузке данных: ${response.statusText}`);
      }
      const data = await response.json();

      if (!data || data.length === 0) {
        throw new Error('Достопримечательность не найдена');
      }

      const attractionData = Array.isArray(data) ? data[0] : data;

      const updatedReviews = [...attractionData.reviews, newReview];

      const updateResponse = await fetch(
        `https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd/${attractionData.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...attractionData,
            reviews: updatedReviews,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error(
          `Ошибка при обновлении отзыва: ${updateResponse.statusText}`
        );
      }

      const responseData = await updateResponse.json();

      setAttraction(responseData);
      setReviewName('');
      setReviewText('');
      setError(null); 
    } catch (error) {
      console.error('Ошибка при добавлении отзыва:', error);
      setError(
        `Не удалось отправить отзыв. Пожалуйста, попробуйте снова. Ошибка: ${error.message}`
      );
    }
  };

  const handleDeleteReview = async name => {
    try {
      const response = await fetch(
        `https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd/?id=${id}`
      );
      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
      }
      const data = await response.json();

      if (!data || data.length === 0) {
        throw new Error('Достопримечательность не найдена');
      }

      const attractionData = Array.isArray(data) ? data[0] : data;

      const updatedReviews = attractionData.reviews.filter(
        review => review.name !== name
      );

      const updateResponse = await fetch(
        `https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd/${attractionData.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...attractionData,
            reviews: updatedReviews,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error('Ошибка при удалении отзыва');
      }

      const responseData = await updateResponse.json();

      setAttraction(responseData);
    } catch (error) {
      console.error('Ошибка при удалении отзыва:', error);
      setError('Не удалось удалить отзыв. Пожалуйста, попробуйте снова.');
    }
  };

  const handleEditReview = (name, text) => {
    setEditingReview(name);
    setEditedReviewText(text);
  };

  const handleSaveReview = async name => {
    try {
      const response = await fetch(
        `https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd/?id=${id}`
      );
      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
      }
      const data = await response.json();

      if (!data || data.length === 0) {
        throw new Error('Достопримечательность не найдена');
      }

      const attractionData = Array.isArray(data) ? data[0] : data;

      const updatedReviews = attractionData.reviews.map(review =>
        review.name === name ? { ...review, text: editedReviewText } : review
      );

      const updateResponse = await fetch(
        `https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd/${attractionData.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...attractionData,
            reviews: updatedReviews,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error('Ошибка при обновлении отзыва');
      }

      const responseData = await updateResponse.json();

      setAttraction(responseData);
      setEditingReview(null);
      setEditedReviewText('');
    } catch (error) {
      console.error('Ошибка при редактировании отзыва:', error);
      setError(
        'Не удалось отредактировать отзыв. Пожалуйста, попробуйте снова.'
      );
    }
  };

  const openFullscreen = index => {
    setCurrentImageIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const showPrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const showNextImage = () => {
    if (currentImageIndex < (attraction?.images?.length || 0) - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!attraction) {
    return <div>Достопримечательность не найдена.</div>;
  }

  const mapUrl =
    attraction.map && typeof attraction.map === 'string'
      ? attraction.map.replace(/&amp;/g, '&')
      : '';

  return (
    <>
      <Header />
      <div className="info-container">
        <div className="info-card">
          <h2 className="info-title">{attraction.name}</h2>
          <div className="info-image-map-container">
            <div className="info-gallery">
              {attraction.images && attraction.images.length > 0 ? (
                attraction.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => openFullscreen(index)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        openFullscreen(index);
                      }
                    }}
                    style={{ border: 'none', background: 'none', padding: 0 }}
                    aria-label={`Открыть изображение ${index + 1} в полноэкранном режиме`}
                  >
                    <img
                      src={image}
                      alt={`Изображение ${index + 1}`}
                      className="info-gallery-image"
                    />
                  </button>
                ))
              ) : (
                <p>Изображения отсутствуют</p>
              )}
            </div>
            {mapUrl && (
              <iframe src={mapUrl} title="Карта" className="info-map"></iframe>
            )}
          </div>
          {attraction.description2 ? (
            <p className="info-description">{attraction.description2}</p>
          ) : (
            <p>Описание отсутствует</p>
          )}
          <Link to="/attractions" className="info-back-button">
            Вернуться назад
          </Link>
        </div>

        {isFullscreen && (
          <div className="info-fullscreen-gallery active">
            <img
              src={attraction.images[currentImageIndex]}
              alt="Полноэкранное изображение"
              className="info-fullscreen-image"
            />
            <button
              className="info-gallery-button info-close-gallery"
              onClick={closeFullscreen}
              aria-label="Закрыть полноэкранный режим"
            >
              &times;
            </button>
            <button
              className="info-gallery-button info-prev-image"
              onClick={showPrevImage}
              aria-label="Предыдущее изображение"
            >
              &lt;
            </button>
            <button
              className="info-gallery-button info-next-image"
              onClick={showNextImage}
              aria-label="Следующее изображение"
            >
              &gt;
            </button>
          </div>
        )}

        <div className="info-reviews-container">
          <h3>Отзывы</h3>
          {attraction.reviews && attraction.reviews.length > 0 ? (
            attraction.reviews.map((review, index) => (
              <div key={index} className="info-review">
                <div className="review-content">
                  <div className="review-header">
                    <div className="review-name">{review.name}</div>
                    <div className="review-actions">
                      {editingReview === review.name ? (
                        <button
                          onClick={() => handleSaveReview(review.name)}
                          className="info-save-button"
                        >
                          Сохранить
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              handleEditReview(review.name, review.text)
                            }
                            className="info-edit-button"
                          >
                            Редактировать
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review.name)}
                            className="info-delete-button"
                          >
                            Удалить
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <hr className="review-divider" />
                  {editingReview === review.name ? (
                    <textarea
                      className="info-edit-review-textarea"
                      value={editedReviewText}
                      onChange={e => setEditedReviewText(e.target.value)}
                    />
                  ) : (
                    <div className="review-text">{review.text}</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Отзывов пока нет.</p>
          )}
        </div>

        <form className="info-review-form" onSubmit={handleSubmitReview}>
          <h3>Добавить отзыв</h3>
          <input
            type="text"
            id="review-name"
            name="reviewName"
            placeholder="Ваше имя"
            className="info-form-input"
            value={reviewName}
            onChange={e => setReviewName(e.target.value)}
            required
          />
          <textarea
            id="review-text"
            name="reviewText"
            placeholder="Ваш отзыв"
            className="info-form-textarea"
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            required
          />
          <button type="submit" className="info-form-button">
            Отправить отзыв
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Info;
