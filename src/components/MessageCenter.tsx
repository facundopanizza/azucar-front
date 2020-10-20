import React from 'react';

interface MessageCenterProps {
  text: string;
}

const MessageCenter: React.FC<MessageCenterProps> = ({ text }) => {
  return (
    <div className="flex justify-center h-screen">
      <h1 className="text-3xl text-brand self-center block">{text}</h1>
    </div>
  );
};

export default MessageCenter;
