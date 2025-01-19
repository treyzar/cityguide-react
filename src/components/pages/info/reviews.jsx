import React from 'react';

const Reviews = ({ reviews = [], updateReviews }) => {
  const deleteReview = async index => {
    const newReviews = reviews.filter((_, i) => i !== index);
    updateReviews(newReviews);
  };

  return (
    <div id="reviews-container">
      {reviews.map((review, index) => (
        <div key={index} className="review">
          <div className="review-name">{review.name}</div>
          <hr />
          <div className="review-text">{review.text}</div>
          <button
            className="delete-review"
            onClick={() => deleteReview(index)}
            aria-label={`Удалить отзыв ${index + 1}`}
          >
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
