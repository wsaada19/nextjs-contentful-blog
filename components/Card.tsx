import Link from 'next/link';
import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`
        ${className}
        card
        shadow-md
        p-3
        transform
        transition
        duration=300
        hover:scale-1025
      `}
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
    <Link href={href} passHref className="hover:no-underline">
      <Card className={className}>{children}</Card>
    </Link>
  );
};
