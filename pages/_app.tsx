import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout, { siteTitle } from '../components/layout/layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main className="prose">
        <Component {...pageProps} />
      </main>
    </Layout>
  );
}

export default MyApp;
