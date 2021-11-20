import React from 'react';
import Image from 'next/image';

export const Navigation = () => {
  return (
    <nav className="mt-2 mb-6 text-base">
      <a className="pr-2 md:pr-4" href="/">
        Home
      </a>
      <a className="px-2 md:px-4" href="/posts">
        Blog
      </a>
      <a className="px-2 md:px-4" href="/portfolio">
        Portfolio
      </a>
      <span className="float-right">
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
