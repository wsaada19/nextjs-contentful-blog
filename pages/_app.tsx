import '../styles/global.css';
import { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
const env = process.env.NODE_ENV;
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      {env == 'production' && <Analytics />}
    </>
  );
}
