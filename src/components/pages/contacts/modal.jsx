import React, { useState } from 'react';
import './contacts.scss';

const Modal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmitForm = () => {
    alert('Форма отправлена!');
    handleCloseModal();
  };

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
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
                handleCloseModal();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Закрыть модальное окно"
          >
            &times;
          </span>

          <form className="modal__form">
            <input type="text" name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="text" name="phone" placeholder="Phone" />
            <button
              type="button"
              onClick={handleSubmitForm}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleSubmitForm();
                }
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
