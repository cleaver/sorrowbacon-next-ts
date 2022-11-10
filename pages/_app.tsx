import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta name="og:type" content="website" />
      </Head>
      <main className="prose max-w-none">
        <Component {...pageProps} />
      </main>
    </Layout>
  );
}

export default MyApp;
