import React from 'react';

const Pagination = ({ page, setPage }) => {
  return (
    <div id="pagination">
      <button
        id="prevPage"
        className="prevPage"
        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
      >
        Предыдущая
      </button>
      <span id="pageInfo">Страница {page}</span>
      <button
        id="nextPage"
        className="nextPage"
        onClick={() => setPage(prev => prev + 1)}
      >
        Следующая
      </button>
    </div>
  );
};

export default Pagination;