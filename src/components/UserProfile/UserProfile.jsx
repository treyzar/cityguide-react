import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import Loader from '../general/loader/loader';
import ProfileForm from './ProfileForm';
import ProfileHeader from './ProfileHeader';
import './UserProfile.scss';

const UserProfile = () => {
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(
    user?.avatar ||
      'https://avatars.mds.yandex.net/i?id=a12c405d1e9c8997d11da50a6f806ca3560f185f-10814708-images-thumbs&n=13'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/sign');
    } else if (user.id !== id) {
      navigate('/sign');
    } else {
      setUsername(user.username);
      setEmail(user.email);
      setAvatar(user.avatar);
    }
  }, [user, id, navigate]);

  const handleUpdateProfile = async updatedData => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://6790b987af8442fd737768f7.mockapi.io/auth/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...user, ...updatedData, avatar }),
        }
      );

      if (!response.ok) {
        throw new Error('Ошибка при обновлении данных');
      }

      const updatedUser = { ...user, ...updatedData, avatar };
      setUser(updatedUser);
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Данные успешно обновлены!');
    } catch (error) {
      console.error('Ошибка:', error);
      setError('Произошла ошибка при обновлении данных: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const updateResponse = await fetch(
        `https://6790b987af8442fd737768f7.mockapi.io/auth/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...user,
            online: 'false',
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error('Ошибка при обновлении статуса пользователя');
      }

      setUser(null);
      sessionStorage.removeItem('user');
      navigate('/sign');
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при выходе: ' + error.message);
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="user-profile">
      <ProfileHeader username={user.username} avatar={avatar} />
      {error && <p className="user-profile__error">{error}</p>}
      <ProfileForm
        username={username}
        email={email}
        avatar={avatar}
        onUsernameChange={setUsername}
        onEmailChange={setEmail}
        onAvatarChange={setAvatar}
        onSubmit={handleUpdateProfile}
        isLoading={isLoading}
      />
      <button onClick={handleLogout} className="user-profile__logout-button">
        Выйти из аккаунта
      </button>
      <Link to="/main">
        <button className="profile-form__button">На главную</button>
      </Link>
    </div>
  );
};

export default UserProfile;
