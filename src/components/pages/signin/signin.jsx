import Footer from '../../general/footer/footer';
import Header from '../../general/header/header';
import Form from './form';
import AuthManager from '../../general/authManager/authManager';
export default function Sign() {
  return (
    <>
      <Header />
      <AuthManager>
        <Form />
      </AuthManager>
      <Footer />
    </>
  );
}
