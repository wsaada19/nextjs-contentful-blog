import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface NavigationProps {
  hideLinks: boolean;
}

export const Navigation = ({ hideLinks = false }) => {
  return (
    <nav className="mt-2 mb-6 text-base h-2">
      {!hideLinks && (
        <>
          <Link href="/">
            <a className="pr-2 md:pr-4 hover:underline">Home</a>
          </Link>
          <Link href="/posts">
            <a className="px-2 md:px-4 hover:underline">Blog</a>
          </Link>
          <Link href="/portfolio">
            <a className="px-2 md:px-4 hover:underline">Portfolio</a>
          </Link>
        </>
      )}
      <span className="float-right block">
        <a className="px-2" href="https://github.com/wsaada19">
          <Image src="/images/github.svg" height={24} width={24} alt="Github logo"></Image>
        </a>
        <a className="px-2" href="https://www.linkedin.com/in/william-saada/">
          <Image src="/images/linkedin.svg" height={24} width={24} alt="Linkedin logo"></Image>
        </a>
      </span>
    </nav>
  );
};
