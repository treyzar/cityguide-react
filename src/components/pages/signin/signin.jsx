import Footer from '../../general/footer/footer';
import Header from '../../general/header/header';
import LoginForm from './LoginForm';
import AuthManager from '../../general/authManager/authManager';

export default function Sign() {
  return (
    <>
      <Header />
      <AuthManager>
        <LoginForm />
      </AuthManager>
      <Footer />
    </>
  );
}
