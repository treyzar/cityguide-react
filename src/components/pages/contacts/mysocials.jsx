import React from 'react';

export default function Social({ name, url }) {
  return (
    <p className="modalSection__container-box-1-subtitle">
      {name}
      <a href={url} className="modalSection__container-box-1-social">
        {name}
      </a>
    </p>
  );
}