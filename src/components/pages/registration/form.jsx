import Input from './input';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Form = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!validateInput(username, password)) {
      alert(
        'Пожалуйста, убедитесь, что имя пользователя и пароль соответствуют требованиям.'
      );
      return;
    }

    try {
      const exists = await checkUsername(username);
      if (exists) {
        alert('Ошибка, такое имя пользователя уже есть');
      } else {
        await registerUser(username, password);
        alert('Регистрация прошла успешно!');
        navigate('/signin'); // Редирект на страницу входа
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при регистрации: ' + error.message);
    }
  };

  const validateInput = (username, password) => {
    if (username.length < 3 || username.length > 20) {
      alert('Имя пользователя должно быть от 3 до 20 символов.');
      return false;
    }
    if (password.length < 6) {
      alert('Пароль должен содержать не менее 6 символов.');
      return false;
    }
    return true;
  };

  const checkUsername = async username => {
    const response = await fetch(
      'https://672b2e13976a834dd025f082.mockapi.io/travelguide/info'
    );
    const users = await response.json();
    return users.some(user => user.username === username);
  };

  const registerUser = async (username, password) => {
    const response = await fetch(
      'https://672b2e13976a834dd025f082.mockapi.io/travelguide/info',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
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
