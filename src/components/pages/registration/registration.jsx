import Header from '../../general/header/header';
import Footer from '../../general/footer/footer';
import './registration.css';
import Form from './form';
import AuthManager from '../../general/authManager/authManager';

export default function Registration() {
  return (
    <div className="registration-page">
      <Header />
      <AuthManager>
        <Form />
      </AuthManager>
      <Footer />
    </div>
  );
}
