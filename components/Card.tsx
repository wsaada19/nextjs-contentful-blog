import Link from 'next/link';
import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`${className} card rounded-lg shadow-md p-3 border border-gray-300 transform transition duration-300 hover:scale-1025 dark:border-opacity-0`}
    >
      {children}
    </div>
  );
};

type LinkCardProps = CardProps & {
  href: string;
};

export const LinkCard = ({ children, href, className = '' }: LinkCardProps) => {
  return (
    <Link href={href}>
      <a>
        <Card className={className}>{children}</Card>
      </a>
    </Link>
  );
};
