import React from 'react';

type AboutProps = {
  aboutText: string;
};

export const About = ({ aboutText }: AboutProps) => {
  return (
    <div className="bg-blue-600 shadow-xl mt-3 mb-5 p-3 text-lg text-white md:p-5">
      <p>{aboutText}</p>
    </div>
  );
};
