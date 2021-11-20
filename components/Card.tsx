import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`${className} card rounded-lg shadow-md p-3 border border-gray-200 transform transition duration-300 hover:scale-1025`}
    >
      {children}
    </div>
  );
};
