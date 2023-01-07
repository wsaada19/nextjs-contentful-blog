import React from 'react';

type AboutProps = {
  aboutText: string;
};

export const About = ({ aboutText }: AboutProps) => {
  return (
    <div className="bg-blue-700 shadow-xl border-2 border-blue-400 mt-3 mb-5 p-5 text-lg text-white transform transition duration-300 hover:scale-1025">
      <p>{aboutText}</p>
    </div>
  );
};
