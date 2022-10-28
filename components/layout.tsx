import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../public/sb-logo.jpg';
import twIcon from '../public/sb-tw-icon.png';
import fbIcon from '../public/sb-fb-icon.png';
import igIcon from '../public/sb-ig-icon.png';

export const siteTitle = 'sorrowbacon | a comic';

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
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
      <header className="flex h-25 mt-6">
        <Image src={logo} alt="sorrowbacon logo" height={100} width={100} />
        <div className="flex-1 pt-6 pl-6">
          <h1 className="text-3xl font-bold">sorrowbacon</h1>
        </div>
        <div className="h-25 flex flex-col">
          <div id="socials" className="flex space-x-1">
            <a href="https://twitter.com/sorrowbacon">
              <Image alt="Twitter icon" src={twIcon} height={30} width={30} />
            </a>
            <a href="https://facebook.com/sorrowbacon">
              <Image alt="Facebook icon" src={fbIcon} height={30} width={30} />
            </a>
            <a href="https://instagram.com/sorrowbacon">
              <Image alt="Instagram icon" src={igIcon} height={30} width={30} />
            </a>
          </div>
          <div className="mt-2 mx-auto">
            <a href="https://patreon.com/sorrowbacon">Support</a>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
