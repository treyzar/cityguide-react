import React, { useState } from "react";

const ReviewForm = ({ attractionId, updateReviews }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !text) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    const newReview = { name, text };
    const response = await fetch(
      `https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd/${attractionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviews: [newReview] }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      updateReviews(data.reviews);
      setName("");
      setText("");
    } else {
      console.error("Ошибка при отправке отзыва");
    }
  };

  return (
    <form id="review-form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="review-name"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        id="review-text"
        placeholder="Ваш отзыв"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Отправить отзыв</button>
    </form>
  );
};

export default ReviewForm;