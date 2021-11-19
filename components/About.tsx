import React from 'react';

type AboutProps = {
  aboutText: string;
};

export const About = ({ aboutText }: AboutProps) => {
  return (
    <div className="bg-blue-800 shadow-xl	rounded-xl mt-6 mb-8 p-6">
      <p className="text-white text-lg">{aboutText}</p>
    </div>
  );
};
