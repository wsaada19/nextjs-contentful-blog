import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`${className} card rounded-lg shadow-lg p-3 border border-gray-400 transform transition duration-300 hover:scale-1025`}
    >
      {children}
    </div>
  );
};
