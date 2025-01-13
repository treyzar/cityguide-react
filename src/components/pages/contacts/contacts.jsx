import Footer from '../../general/footer/footer';
import Header from '../../general/header/header';
import Title from './title';
import Modal from './modal';
import Social from './mysocials';
import './contacts.css';
export default function Contacts() {
  return (
    <>
      <Header />
      <section className="main">
        <div className="main__wrap">
          <div className="main__container">
          <div className="main__container-box-1">
          <Title/>
          <Social name='Telegram: ' url='https://web.telegram.org/a/#996599138' />
          <Social name='Vk: ' url='https://vk.com/rikimauzer' />
          <Social name='GitHub: ' url= 'https://github.com/treyzar'/>
          </div>
          <Modal/>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
