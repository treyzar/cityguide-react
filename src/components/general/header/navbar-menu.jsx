import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavbarMenu({ isMenuOpen }) {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav>
      <ul
        className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}
        id="navbarMenu"
      >
        {location.pathname !== '/attractions' && (
          <li className="navbar-menu-text">
            <Link to="/attractions" className="navbar-menu-text">
              Достопримечательности
            </Link>
          </li>
        )}
        {location.pathname !== '/main' && (
          <li className="navbar-menu-text">
            <Link to="/" className="navbar-menu-text">
              Главная
            </Link>
          </li>
        )}
        {location.pathname !== '/contacts' && (
          <li className="navbar-menu-text">
            <Link to="/contacts" className="navbar-menu-text">
              Контакты
            </Link>
          </li>
        )}

        {user ? (
          <>
            <li className="navbar-menu-text">
              <Link to={`/userprofile/${user.id}`} className="navbar-menu-text">
                <img
                  src={user.avatar}
                  alt="Аватарка"
                  className="navbar-avatar"
                />
                <span className="navbar-username">{user.username}</span>
              </Link>
            </li>
            <li className="navbar-menu-text">
              <Link to="/logout" className="navbar-menu-text">
                <img
                  src="https://avatars.mds.yandex.net/i?id=edc28409644c88d9bd3f7ec60eb48ee6772d1121-4599759-images-thumbs&n=13"
                  alt="Выйти"
                  className="logout-icon"
                />
              </Link>
            </li>
          </>
        ) : (
          <>
            {location.pathname !== '/registration' && (
              <li className="navbar-menu-text">
                <Link to="/registration" className="navbar-menu-text">
                  Зарегистрироваться
                </Link>
              </li>
            )}
            {location.pathname !== '/sign' && (
              <li className="navbar-menu-text">
                <Link to="/sign" className="navbar-menu-text">
                  Войти
                </Link>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
}
