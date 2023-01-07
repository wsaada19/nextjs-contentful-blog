import Link from 'next/link';

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
    </footer>
  );
};
