import './footer.css';
import { Link } from 'react-router-dom';
import Btn from './btn';
import vklogo from './images/icons8-vk.svg';
import tglogo from './images/icons8-телеграм.svg';
import ytlogo from './images/icons8-youtube.svg';

export default function Text() {
  return (
    <footer className="footer">
      <div className="footer__wrap">
        <div className="footer__container">
          <h1 className="footer__container-text">
            All Rights Reserved © Round Deer
          </h1>
          <p className="footer__container-paragraph">
            Все права защищены © Round Deer
          </p>
          <Link to="/contacts" className="footer__container-connection">
            Связаться с нами
          </Link>
          <div className="footer__container-icons">
            <Btn to="https://vk.com/" src={vklogo} alt="VK Logo" />
            <Btn
              to="https://www.youtube.com/"
              src={ytlogo}
              alt="YouTube Logo"
            />
            <Btn to="https://telegram.org/" src={tglogo} alt="Telegram Logo" />
          </div>
        </div>
      </div>
    </footer>
  );
}
