import Head from 'next/head';
import Header from './header';

export const siteTitle = 'sorrowbacon | a comic';
type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="container mx-auto">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="sorrowbacon - Nihilism and nachos." />
        <meta name="og:title" content={siteTitle} />
        <meta
          name="twitter:card"
          content="==== Replace this with a good static image ===="
        />
      </Head>
      <Header />
      {children}
    </div>
  );
}
