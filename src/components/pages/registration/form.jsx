import React from 'react';
import Input from './input';
import { Link } from 'react-router-dom';

export default function Form() {
  return (
    <form className="registration-form" id="registrationForm">
      <h3 className="form-label">Регистрация</h3>
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
}
