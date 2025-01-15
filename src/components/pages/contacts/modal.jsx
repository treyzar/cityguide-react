import React, { useState, useEffect } from 'react';
import './contacts.scss'; // Убедитесь, что путь правильный

const Modal = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('name');
    const savedEmail = localStorage.getItem('email');
    const savedPhone = localStorage.getItem('phone');
    const savedMessage = localStorage.getItem('message');
    const savedSubject = localStorage.getItem('subject');

    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
    if (savedPhone) setPhone(savedPhone);
    if (savedMessage) setMessage(savedMessage);
    if (savedSubject) setSubject(savedSubject);
  }, []);

  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);
    localStorage.setItem('message', message);
    localStorage.setItem('subject', subject);
  }, [name, email, phone, message, subject]);

  const handleNameChange = e => setName(e.target.value);
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePhoneChange = e => setPhone(e.target.value);
  const handleMessageChange = e => setMessage(e.target.value);
  const handleSubjectChange = e => setSubject(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Данные отправлены:', { name, email, phone, message, subject });
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubject('');
    setIsModalVisible(false);
  };

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' && isModalVisible) handleCloseModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalVisible]);

  return (
    <div>
      <div className="modal-trigger">
        <button
          className="modal-trigger__button"
          onClick={handleOpenModal}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') handleOpenModal();
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
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'Esc')
                handleCloseModal();
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
              placeholder="Имя"
              className="modal__input"
              onChange={handleNameChange}
              value={name}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="modal__input"
              onChange={handleEmailChange}
              value={email}
            />
            <input
              type="number"
              name="phone"
              placeholder="Телефон"
              className="modal__input"
              onChange={handlePhoneChange}
              value={phone}
            />
            <select
              name="subject"
              className="modal__select"
              onChange={handleSubjectChange}
              value={subject}
            >
              <option value="">Выберите тему</option>
              <option value="support">Поддержка</option>
              <option value="feedback">Обратная связь</option>
              <option value="other">Другое</option>
            </select>
            <textarea
              name="message"
              placeholder="Сообщение"
              className="modal__textarea"
              onChange={handleMessageChange}
              value={message}
            />
            <button type="submit" className="modal__submit-button">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
