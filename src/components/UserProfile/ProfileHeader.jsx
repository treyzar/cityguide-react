import React from 'react';
import './UserProfile.scss';

const ProfileHeader = ({ username, avatar }) => {
  return (
    <div className="profile-header">
      <h1 className="profile-header__title">Профиль пользователя</h1>
      <p className="profile-header__welcome">
        Добро пожаловать,{' '}
        <span className="profile-header__username">{username}</span>!
      </p>
      <img src={avatar} alt="Аватарка" className="profile-header__avatar" />
    </div>
  );
};

export default ProfileHeader;
