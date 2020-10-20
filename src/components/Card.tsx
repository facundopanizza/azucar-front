import Link from 'next/link';
import React from 'react';

interface CardProps {
  header: string;
  backLink?: string;
}

const Card: React.FC<CardProps> = ({ children, header, backLink }) => {
  return (
    <div className="border m-auto rounded shadow" style={{ maxWidth: '700px' }}>
      <div className="bg-gray-300 p-2 flex justify-between">
        <div className="self-center">{header}</div>
        {backLink && (
          <Link href={backLink}>
            <button className="bg-blue-300 rounded px-4 py-2">atras</button>
          </Link>
        )}
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
};
export default Card;
