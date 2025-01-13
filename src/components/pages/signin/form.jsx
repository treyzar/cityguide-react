import Input from '../registration/input';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Form() {
  return (
    <form className="registration-form" id="loginForm">
      <h3 className="form-label">Вход</h3>
      <Input
        type="text"
        id="username"
        name="username"
        min="3"
        max="20"
        place="Введите имя пользователя..."
      />
      <br />
      <Input
        type="password"
        id="password"
        name="password"
        min="6"
        max="25"
        place="Введите пароль..."
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
