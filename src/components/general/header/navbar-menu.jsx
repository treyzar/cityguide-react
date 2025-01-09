import './header.css';
import { Link, useLocation } from 'react-router-dom';
export default function NavbarMenu() {
  const location = useLocation();
  return (
    <>
      <nav>
        <ul className="navbar-menu" id="navbarMenu">
          {location.pathname !== '/main' && (
            <li className="navbar-menu-text">
              <Link to="/" className="navbar-menu-text">
                Главная
              </Link>{' '}
            </li>
          )}
          {location.pathname !== '/contacts' && (
            <li className="navbar-menu-text">
              <Link to="/contacts" className="navbar-menu-text">
                Контакты
              </Link>{' '}
            </li>
          )}
          {location.pathname !== '/attractions' && (
            <li className="navbar-menu-text">
              <Link to="/attractions" className="navbar-menu-text">
                Достопримечательности
              </Link>{' '}
            </li>
          )}
          {location.pathname !== '/sign' && (
            <li className="navbar-menu-text">
              <Link to="/sign" className="navbar-menu-text">
                Войти
              </Link>{' '}
            </li>
          )}
          {location.pathname !== '/registration' && (
            <li className="navbar-menu-text">
              <Link to="/registration" className="navbar-menu-text">
                Зарегистрироваться
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
