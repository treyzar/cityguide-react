import React from 'react';
import { Link } from 'react-router-dom';

const ReviewForm = ({
  user,
  reviewText,
  setReviewText,
  handleSubmitReview,
}) => {
  if (!user) {
    return (
      <div className="info-review-form">
        <h3>Чтобы оставить отзыв, пожалуйста, войдите.</h3>
        <Link to="/sign" className="info-login-link">
          Войти
        </Link>
      </div>
    );
  }

  return (
    <form className="info-review-form" onSubmit={handleSubmitReview}>
      <h3>Добавить отзыв</h3>
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
  );
};

export default ReviewForm;
