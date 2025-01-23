import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from './input';

const Form = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');

    if (!validateInput(username, email, password)) {
      setError('Пожалуйста, проверьте введенные данные.');
      return;
    }

    try {
      const emailExists = await checkEmail(email);
      if (emailExists) {
        setError('Пользователь с таким email уже зарегистрирован.');
        return;
      }

      const response = await registerUser(username, email, password);
      if (response) {
        alert('Регистрация прошла успешно!');
        navigate('/sign');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setError('Произошла ошибка при регистрации: ' + error.message);
    }
  };

  const validateInput = (username, email, password) => {
    if (username.length < 3 || username.length > 20) {
      setError('Имя пользователя должно быть от 3 до 20 символов.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Пожалуйста, введите корректный email.');
      return false;
    }
    if (!validatePassword(password)) {
      setError(
        'Пароль должен содержать минимум 8 символов и хотя бы одну букву.'
      );
      return false;
    }
    return true;
  };

  const validatePassword = password =>
    password.length >= 8 && /[A-Za-z]/.test(password);

  const checkEmail = async email => {
    const response = await fetch(
      'https://6790b987af8442fd737768f7.mockapi.io/auth'
    );
    const users = await response.json();
    return users.some(user => user.email === email);
  };

  const registerUser = async (username, email, password) => {
    const response = await fetch(
      'https://6790b987af8442fd737768f7.mockapi.io/auth',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          online: 'false',
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    return await response.json();
  };

  return (
    <form
      className="registration-form"
      id="registrationForm"
      onSubmit={handleSubmit}
    >
      <h3 className="form-label">Регистрация</h3>
      {error && <p className="error-message">{error}</p>}
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
        min="8"
        max="25"
        place="Введите пароль..."
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit" className="submit-button">
        Зарегистрироваться
      </button>
      <p className="have-account">
        Уже есть аккаунт?{' '}
        <Link to="/sign" className="here-link">
          Войдите здесь!
        </Link>
      </p>
    </form>
  );
};

export default Form;
