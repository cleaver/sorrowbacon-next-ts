import Head from 'next/head';
import { webHost } from '../lib/config';

function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | sorrowbacon</title>
        <meta name="og:title" content="Contact | sorrowbacon" />
        <meta name="description" content="Contact the sorrowbacon comic." />
        <meta name="og:description" content="Contact the sorrowbacon comic." />
        <meta name="og:url" content={webHost + '/contact'} />
      </Head>
      <article>
        <h1 className="mt-12">Contact</h1>
        <div className="font-mono leading-5">
          &nbsp;/\_/\
          <br />
          ( o.o )<br />
          &nbsp;&gt; ^ &lt;
        </div>
        <p>
          Got inquiries or comments? Say hi at hellosorrowbacon [at] gmail.com.
        </p>
      </article>
    </>
  );
}

export default ContactPage;
