import React, { useState } from 'react';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const submitForm = () => {
    alert('Форма отправлена!');
    closeModal();
  };

  return (
    <div>
      <div className="openModal">
        <button
          className="openModalBtn"
          onClick={openModal}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              openModal();
            }
          }}
        >
          Окно для связи
        </button>
      </div>

      <div id="modal" className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <span
            className="close"
            onClick={closeModal}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
                closeModal();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Закрыть модальное окно"
          >
            &times;
          </span>

          <form id="contactForm">
            <input type="text" name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="text" name="phone" placeholder="Phone" />
            <button
              type="button"
              onClick={submitForm}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  submitForm();
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
