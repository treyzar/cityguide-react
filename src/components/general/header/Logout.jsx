import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Loader from '../loader/loader';

const Logout = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const logoutUser = async () => {
      try {
        if (!user) {
          navigate('/sign');
          return;
        }

        const updateResponse = await fetch(
          `https://6790b987af8442fd737768f7.mockapi.io/auth/${user.id}`,
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

        const updatedUser = await updateResponse.json();
        console.log('Статус пользователя обновлен:', updatedUser);
      } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при выходе: ' + error.message);
      } finally {
        setUser(null);
        sessionStorage.removeItem('user');
        navigate('/sign');
      }
    };

    logoutUser();
  }, [navigate, user, setUser]);

  return (
    <div>
      <Loader />
    </div>
  );
};

export default Logout;
