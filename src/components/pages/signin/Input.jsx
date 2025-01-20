import React from 'react';

export default function Input({
  type,
  id,
  name,
  min,
  max,
  place,
  value,
  onChange,
}) {
  return (
    <div className="input-container">
      <input
        className="form-input"
        type={type}
        id={id}
        name={name}
        required
        minLength={min}
        maxLength={max}
        placeholder=" "
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id} className="form-input-placeholder">
        {place}
      </label>
    </div>
  );
}