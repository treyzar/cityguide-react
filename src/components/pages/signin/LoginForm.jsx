import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../registration/input';
import { UserContext } from '../../context/UserContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      const response = await fetch(
        'https://6790b987af8442fd737768f7.mockapi.io/auth'
      );
      if (!response.ok) {
        throw new Error('Ошибка сети: ' + response.statusText);
      }

      const users = await response.json();
      const user = users.find(
        u => u.email === email && u.password === password
      );

      if (!user) {
        setError('Неверный email или пароль.');
        return;
      }

      if (user.online === 'true') {
        setError('Пользователь уже онлайн.');
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
            online: 'true',
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error('Ошибка при обновлении статуса пользователя');
      }

      const updatedUser = await updateResponse.json();

      setUser(updatedUser);
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      navigate('/main');
    } catch (error) {
      console.error('Ошибка:', error);
      setError('Произошла ошибка при входе: ' + error.message);
    }
  };

  return (
    <form className="registration-form" id="loginForm" onSubmit={handleSubmit}>
      <h3 className="form-label">Вход</h3>
      {error && <p className="error-message">{error}</p>}
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
