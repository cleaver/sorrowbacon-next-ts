import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/layout/layout';
import * as gtag from '../lib/analytics';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
