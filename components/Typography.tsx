import React, { ReactNode } from 'react';

type TypographyProps = {
  children: ReactNode;
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  className?: string;
};

const stylesByTag = {
  h1: 'text-3xl font-semibold',
  h2: 'text-2xl font-semibold',
  h3: 'text-2xl font-medium',
  h4: 'text-xl font-medium',
  h5: 'text-base font-normal',
  h6: 'text-base font-normal',
};

const textColor = 'text-blue-800 dark:text-white';
export const Typography = ({ children, type, className }: TypographyProps) => {
  const Component = type ?? 'p';

  return (
    <Component className={`${stylesByTag[type]} ${className} ${textColor}`}>{children}</Component>
  );
};
