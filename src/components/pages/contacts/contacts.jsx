import React from 'react';
import Footer from '../../general/footer/footer';
import Header from '../../general/header/header';
import Title from './title';
import Modal from './modal';
import Social from './mysocials';
import './contacts.scss'; 

export default function Contacts() {
  return (
    <>
      <Header />
      <section className="modalSection">
        <div className="modalSection__wrap">
          <div className="modalSection__container">
            <div className="modalSection__container-box-1">
              <Title />
              <Social
                name="Telegram "
                url="https://web.telegram.org/a/#996599138"
              />
              <Social name="Vk " url="https://vk.com/rikimauzer" />
              <Social name="GitHub " url="https://github.com/treyzar" />
            </div>
            <Modal />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
