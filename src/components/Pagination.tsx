import React from 'react';

interface PaginationProps {
  pages: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ pages, currentPage }) => {
  const renderButtonPages = () => {
    let buttonPages = [];

    for (let i = 1; i <= pages; i++) {
      buttonPages.push(
        <button
          key={i}
          className={`px-3 py-1 ${
            currentPage === i ? 'bg-brand text-white' : ''
          }`}>
          {i}
        </button>
      );
    }

    return buttonPages;
  };

  return (
    <div className="flex border border-brand rounded">
      {renderButtonPages()}
    </div>
  );
};

export default Pagination;
