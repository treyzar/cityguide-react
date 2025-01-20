import './header.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function NavbarMenu({ isMenuOpen }) {
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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

        {user?.online ? (
          <li className="navbar-menu-text">
            <Link to="/logout" className="navbar-menu-text">
              Выйти
            </Link>
          </li>
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
