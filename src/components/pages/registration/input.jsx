import React from 'react';

export default function Input({ type, id, name, min, max, place }) {
  return (
    <input
      className="form-input"
      type={type}
      id={id}
      name={name}
      required
      minLength={min}
      maxLength={max}
      placeholder={place}
    />
  );
}
