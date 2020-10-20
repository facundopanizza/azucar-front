import React from 'react';

interface ItemAndTextProps {
  name: string;
  text: string;
}

const ItemAndText: React.FC<ItemAndTextProps> = ({ name, text }) => {
  return (
    <div className="my-2">
      <span className="text-sm text-gray-500 font-bold">{name}</span> {text}
    </div>
  );
};

export default ItemAndText;
