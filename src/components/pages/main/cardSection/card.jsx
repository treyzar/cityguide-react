import React, { useEffect, useRef } from 'react';

export default function Card() {
  const YandexCard = useRef(null);
  const scriptAdded = useRef(false);

  useEffect(() => {
    if (scriptAdded.current) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src =
      'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Acde902d244e946be132aa95d0011af4b78c2a334d7a96de0bb10e90ed93e4c2a&width=740&height=450&lang=ru_RU&scroll=true';

    YandexCard.current.appendChild(script);
    scriptAdded.current = true;

    return () => {
      if (YandexCard.current && YandexCard.current.contains(script)) {
        YandexCard.current.removeChild(script);
        scriptAdded.current = false;
      }
    };
  }, []);

  return (
    <>
      <div className="cart__container-cart">
        <div ref={YandexCard}></div>
      </div>
    </>
  );
}
