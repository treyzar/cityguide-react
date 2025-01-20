import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../registration/input';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch(
        'https://672b2e13976a834dd025f082.mockapi.io/travelguide/info'
      );
      if (!response.ok) {
        throw new Error('Ошибка сети: ' + response.statusText);
      }
      const users = await response.json();

      const user = users.find(
        user => user.email === email && user.password === password
      );

      if (user) {
        const updateResponse = await fetch(
          `https://672b2e13976a834dd025f082.mockapi.io/travelguide/info/${user.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ online: true }),
          }
        );

        if (!updateResponse.ok) {
          throw new Error('Ошибка при обновлении статуса пользователя');
        }

        const updatedUserResponse = await fetch(
          `https://672b2e13976a834dd025f082.mockapi.io/travelguide/info/${user.id}`
        );
        const updatedUser = await updatedUserResponse.json();

        sessionStorage.setItem('sign', 'true');
        sessionStorage.setItem('user', JSON.stringify(updatedUser));

        navigate('/main');
      } else {
        alert('Ошибка входа: Неверный email или пароль');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при входе: ' + error.message);
    }
  };

  return (
    <form className="registration-form" id="loginForm" onSubmit={handleSubmit}>
      <h3 className="form-label">Вход</h3>
      <Input
        type="email"
        id="email"
        name="email"
        place="Введите email..."
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        type="password"
        id="password"
        name="password"
        min="6"
        max="25"
        place="Введите пароль..."
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit" className="submit-button">
        Войти
      </button>
      <p className="have-account">
        Зарегистрируйтесь
        <Link to="/registration" className="here-link">
          здесь!
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
