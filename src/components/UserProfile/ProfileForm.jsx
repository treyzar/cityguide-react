import React from 'react';
import './UserProfile.scss';

const ProfileForm = ({
  username,
  email,
  avatar,
  onUsernameChange,
  onEmailChange,
  onAvatarChange,
  onSubmit,
  isLoading,
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ username, email });
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="profile-form__group">
        <label htmlFor="username" className="profile-form__label">
          Имя пользователя:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={e => onUsernameChange(e.target.value)}
          className="profile-form__input"
          required
        />
      </div>
      <div className="profile-form__group">
        <label htmlFor="email" className="profile-form__label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => onEmailChange(e.target.value)}
          className="profile-form__input"
          required
        />
      </div>
      <div className="profile-form__group">
        <label htmlFor="avatar" className="profile-form__label">
          Аватарка:
        </label>
        <input
          type="url"
          id="avatar"
          value={avatar}
          onChange={e => onAvatarChange(e.target.value)}
          className="profile-form__input"
          placeholder="Введите URL аватарки"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="profile-form__button"
      >
        {isLoading ? 'Обновление...' : 'Обновить данные'}
      </button>
    </form>
  );
};

export default ProfileForm;
