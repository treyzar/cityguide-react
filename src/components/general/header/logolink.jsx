import logo from './images/logo2.png';
import { Link, useLocation } from 'react-router-dom';
export default function LogoLink() {
  const location = useLocation();
  return (
    <>
      <div className="navbar-brand">
        <Link
          className="navbar__logo-img"
          to="/main"
          style={{
            pointerEvents: location.pathname == '/main' ? 'none' : 'auto',
          }}
        >
          <img src={logo} alt="logo" className="navbar__logo" />
        </Link>
      </div>
    </>
  );
}
