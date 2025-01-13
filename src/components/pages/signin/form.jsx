import Input from '../registration/input';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Form() {
  const [username, setUsername] = useState('');
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
        user => user.username === username && user.password === password
      );

      if (user) {
        alert('Вход выполнен успешно!');
        sessionStorage.setItem('sign', 'true');
        navigate('/main');
      } else {
        alert('Ошибка входа: Неверное имя пользователя или пароль');
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
        type="text"
        id="username"
        name="username"
        min="3"
        max="20"
        place="Введите имя пользователя..."
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <br />
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
}
