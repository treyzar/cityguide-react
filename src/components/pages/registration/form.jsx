import Input from './input';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Form = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!validateInput(username, email, password)) {
      alert(
        'Пожалуйста, убедитесь, что имя пользователя, email и пароль соответствуют требованиям.'
      );
      return;
    }

    try {
      const exists = await checkEmail(email);
      if (exists) {
        alert('Ошибка, такой email уже зарегистрирован');
      } else {
        await registerUser(username, email, password);
        alert('Регистрация прошла успешно!');
        navigate('/sign');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при регистрации: ' + error.message);
    }
  };

  const validateInput = (username, email, password) => {
    if (username.length < 3 || username.length > 20) {
      alert('Имя пользователя должно быть от 3 до 20 символов.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Пожалуйста, введите корректный email.');
      return false;
    }
    if (password.length < 6) {
      alert('Пароль должен содержать не менее 6 символов.');
      return false;
    }
    return true;
  };

  const checkEmail = async email => {
    const response = await fetch(
      'https://672b2e13976a834dd025f082.mockapi.io/travelguide/info'
    );
    const users = await response.json();
    return users.some(user => user.email === email);
  };

  const registerUser = async (username, email, password) => {
    const response = await fetch(
      'https://672b2e13976a834dd025f082.mockapi.io/travelguide/info',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      }
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('Успешная регистрация:', data);
    return data;
  };

  return (
    <form
      className="registration-form"
      id="registrationForm"
      onSubmit={handleSubmit}
    >
      <h3 className="form-label">Регистрация</h3>
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
        Зарегистрироваться
      </button>
      <p className="have-account">
        Войдите
        <Link to="/sign" className="here-link">
          здесь!
        </Link>
      </p>
    </form>
  );
};

export default Form;
