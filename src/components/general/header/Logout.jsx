import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      const user = JSON.parse(sessionStorage.getItem('user'));

      if (user) {
        try {
          const updateResponse = await fetch(
            `https://672b2e13976a834dd025f082.mockapi.io/travelguide/info/${user.id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ online: false }),
            }
          );

          if (!updateResponse.ok) {
            throw new Error('Ошибка при обновлении статуса пользователя');
          }

          sessionStorage.removeItem('sign');
          sessionStorage.removeItem('user');

          navigate('/sign');
        } catch (error) {
          console.error('Ошибка:', error);
          alert('Произошла ошибка при выходе: ' + error.message);
        }
      }
    };

    logoutUser();
  }, [navigate]);

  return <div>Выход из системы...</div>;
};

export default Logout;
