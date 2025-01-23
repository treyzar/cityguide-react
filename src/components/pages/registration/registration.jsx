import Header from '../../general/header/header';
import Footer from '../../general/footer/footer';
import './registration.css';
import Form from './form';
import AuthManager from '../../context/UserContext';

export default function Registration() {
  return (
    <div className="registration-page">
      <Header />
        <Form />
      <Footer />
    </div>
  );
}
