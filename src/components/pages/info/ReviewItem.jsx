import React from 'react';

const ReviewList = ({
  reviews,
  reviewsError,
  user,
  editingReview,
  editedReviewText,
  setEditedReviewText,
  handleEditReview,
  handleSaveReview,
  handleDeleteReview,
}) => {
  if (reviewsError) {
    return <div>Ошибка при загрузке отзывов: {reviewsError.message}</div>;
  }

  return (
    <div className="review-list">
      <h3>Отзывы</h3>
      {reviews.map(review => (
        <div key={review.id} className="review-item">
          {editingReview === review.id ? (
            <div className="edit-review-form">
              <textarea
                value={editedReviewText}
                onChange={e => setEditedReviewText(e.target.value)}
                className="edit-review-textarea"
              />
              <button
                onClick={() => handleSaveReview(review.id)}
                className="save-review-button"
              >
                Сохранить
              </button>
            </div>
          ) : (
            <>
              <p className="review-author">{review.name}</p>
              <p className="review-text">{review.text}</p>
              {user && user.username === review.name && (
                <div className="review-actions">
                  <button
                    onClick={() => handleEditReview(review.id, review.text)}
                    className="edit-review-button"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="delete-review-button"
                  >
                    Удалить
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
