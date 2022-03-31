import Link from 'next/link';

export const Footer = (): JSX.Element => {
  return (
    <footer className="mt-6 text-base">
      <hr className="border-gray-300 mb-2" />
      <a
        className="text-sm hover:underline"
        href="https://github.com/wsaada19/nextjs-contentful-blog"
      >
        View source code
      </a>
      <Link href="/resume">
        <a className="text-sm px-2 hover:underline">My resume</a>
      </Link>
    </footer>
  );
};
