import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta name="og:type" content="website" />
        <link rel="shortcut icon" href="/sb-favicon.png" type="image/png" />
      </Head>
      <main className="prose max-w-none">
        <Component {...pageProps} />
      </main>
    </Layout>
  );
}

export default MyApp;
