import React, { useState, useEffect } from 'react';
import './contacts.scss';

const Modal = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('name');
    const savedEmail = localStorage.getItem('email');
    const savedPhone = localStorage.getItem('phone');

    if (savedName) {
      setName(savedName);
    }
    if (savedEmail) {
      setEmail(savedEmail);
    }
    if (savedPhone) {
      setPhone(savedPhone);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);
  }, [name, email, phone]);

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = e => {
    setPhone(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log('Данные отправлены:', { name, email, phone });

    setName('');
    setEmail('');
    setPhone('');

    setIsModalVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' && isModalVisible) {
        handleCloseModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalVisible]);

  return (
    <div>
      <div className="modal-trigger">
        <button
          className="modal-trigger__button"
          onClick={handleOpenModal}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleOpenModal();
            }
          }}
        >
          Окно для связи
        </button>
      </div>

      <div className={`modal ${isModalVisible ? 'modal--visible' : ''}`}>
        <div className="modal__content">
          <span
            className="modal__close"
            onClick={handleCloseModal}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'Esc') {
                handleCloseModal();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Закрыть модальное окно"
          >
            &times;
          </span>

          <form className="modal__form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleNameChange}
              value={name}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleEmailChange}
              value={email}
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              onChange={handlePhoneChange}
              value={phone}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
