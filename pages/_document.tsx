import { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../lib/config';

const Document = () => {
  return (
    <Html lang="en-CA">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
