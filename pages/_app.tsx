import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import Layout from '../components/layout/layout';
import * as gtag from '../lib/analytics';
import { GA_TRACKING_ID } from '../lib/config';
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
      <Script
        async
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
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

export function reportGAVitals({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) {
  if (typeof window !== 'undefined')
    window.gtag('event', name, {
      event_category:
        label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      event_label: id,
      non_interaction: true,
    } as Gtag.EventParams);
}
