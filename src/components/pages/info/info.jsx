import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '../../general/header/header';
import Footer from '../../general/footer/footer';
import { UserContext } from '../../context/UserContext';
import AttractionInfo from './AttractionInfo';
import ReviewList from './ReviewList';
import ReviewForm from './reviewForm';
import Loader from '../../general/loader/loader';
import './info.scss';

const Info = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  // const [object, setObject] = useState({ name: '', city: '' });

  const [reviewText, setReviewText] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const [editedReviewText, setEditedReviewText] = useState('');

  // const changeDataObject = (name, city) => {
  //   const newDataObject = {
  //     name,
  //     city,
  //   };
  //   setObject(newDataObject);
  //   console.log(object);
  // };

  // changeDataObject('name1','city1');
  const {
    data: attraction,
    isLoading: isAttractionLoading,
    error: attractionError,
  } = useQuery({
    queryKey: ['attraction', id],
    queryFn: async () => {
      const response = await fetch(
        `https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd?id=${id}`
      );
      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
      }
      const data = await response.json();
      if (!data || data.length === 0) {
        throw new Error('Достопримечательность не найдена');
      }
      return data[0];
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const {
    data: reviews,
    isLoading: isReviewsLoading,
    error: reviewsError,
  } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const response = await fetch(
        `https://672b2e13976a834dd025f082.mockapi.io/travelguide/reviews`
      );
      if (!response.ok) {
        throw new Error('Ошибка при загрузке отзывов');
      }
      const data = await response.json();
      return data.filter(review => review.asdId === id);
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const addReviewMutation = useMutation({
    mutationFn: async newReview => {
      const response = await fetch(
        `https://672b2e13976a834dd025f082.mockapi.io/travelguide/reviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            asdId: id,
            name: user.username,
            text: reviewText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Ошибка при добавлении отзыва');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', id]);
      setReviewText('');
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async reviewId => {
      const response = await fetch(
        `https://672b2e13976a834dd025f082.mockapi.io/travelguide/reviews/${reviewId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isDeleted: true }),
        }
      );

      if (!response.ok) {
        throw new Error('Ошибка при удалении отзыва');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', id]);
    },
    onError: error => {
      console.error('Ошибка при удалении отзыва:', error);
      alert('Не удалось удалить отзыв. Проверьте, существует ли отзыв.');
    },
  });

  const editReviewMutation = useMutation({
    mutationFn: async ({ reviewId, text }) => {
      const response = await fetch(
        `https://672b2e13976a834dd025f082.mockapi.io/travelguide/reviews/${reviewId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) {
        throw new Error('Ошибка при редактировании отзыва');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', id]);
      setEditingReview(null);
      setEditedReviewText('');
    },
  });

  const handleSubmitReview = e => {
    e.preventDefault();
    if (!user) {
      alert('Пожалуйста, войдите, чтобы оставить отзыв.');
      return;
    }
    if (!reviewText.trim()) {
      alert('Текст отзыва не может быть пустым.');
      return;
    }
    addReviewMutation.mutate({
      asdId: id,
      name: user.username,
      text: reviewText,
    });
  };

  const handleDeleteReview = reviewId => {
    const reviewToDelete = reviews.find(review => review.id === reviewId);
    if (!reviewToDelete) {
      alert('Отзыв не найден.');
      return;
    }

    if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
      deleteReviewMutation.mutate(reviewId);
    }
  };

  const handleEditReview = (reviewId, text) => {
    setEditingReview(reviewId);
    setEditedReviewText(text);
  };

  const handleSaveReview = reviewId => {
    editReviewMutation.mutate({ reviewId, text: editedReviewText });
  };

  if (isAttractionLoading || isReviewsLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="info-container">
        <AttractionInfo
          attraction={attraction}
          attractionError={attractionError}
        />
        <ReviewList
          reviews={reviews}
          reviewsError={reviewsError}
          user={user}
          editingReview={editingReview}
          editedReviewText={editedReviewText}
          setEditedReviewText={setEditedReviewText}
          handleEditReview={handleEditReview}
          handleSaveReview={handleSaveReview}
          handleDeleteReview={handleDeleteReview}
        />
        <ReviewForm
          user={user}
          reviewText={reviewText}
          setReviewText={setReviewText}
          handleSubmitReview={handleSubmitReview}
        />
      </div>
      <Footer />
    </>
  );
};

export default Info;
