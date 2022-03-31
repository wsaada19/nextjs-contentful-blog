import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Switch } from './switch';

type NavigationProps = {
  hideLinks: boolean;
};

export const Navigation = ({ hideLinks = false }: NavigationProps) => {
  return (
    <nav className="mt-2 mb-4 text-base h-6">
      {!hideLinks && (
        <>
          <Link href="/">
            <a className="pr-2 md:pr-4 hover:underline">Home</a>
          </Link>
          <Link href="/posts">
            <a className="px-2 md:px-4 hover:underline">Blog</a>
          </Link>
          <Link href="/portfolio">
            <a className="pl-2 md:px-4 hover:underline">Portfolio</a>
          </Link>
        </>
      )}
      <span className="sm:block float-right">
        <Switch className="px-2" />
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
