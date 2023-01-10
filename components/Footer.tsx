import Link from 'next/link';
import Image from 'next/image';

export const Footer = (): JSX.Element => {
  return (
    <footer className="mt-4 text-base">
      <hr className="border-gray-300 mb-2" />
      <a
        className="text-sm hover:underline text-blue-600"
        href="https://github.com/wsaada19/nextjs-contentful-blog"
      >
        Source code
      </a>
      <Link href="/resume">
        <a className="text-sm px-2 hover:underline text-blue-600">Resume</a>
      </Link>
      <span className="sm:block float-right">
        <a className="px-2" href="https://github.com/wsaada19">
          <Image src="/images/github.svg" height={24} width={24} alt="Github logo"></Image>
        </a>
        <a className="px-2" href="https://www.linkedin.com/in/william-saada/">
          <Image src="/images/linkedin.svg" height={24} width={24} alt="Linkedin logo"></Image>
        </a>
      </span>
    </footer>
  );
};
