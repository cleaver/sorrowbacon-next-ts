import { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../lib/config';

const Document = () => {
  return (
    <Html lang="en-CA">
      <Head>
        <meta charSet="utf-8" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${GA_TRACKING_ID}', {
                        page: window.location.pathname
                    });`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
