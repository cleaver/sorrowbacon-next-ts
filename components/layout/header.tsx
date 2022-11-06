import Image from 'next/image';
import Link from 'next/link';

import logo from '../../public/sb-logo.jpg';
import wordmark from '../../public/wordmark.png';
import twIcon from '../../public/sb-tw-icon.png';
import fbIcon from '../../public/sb-fb-icon.png';
import igIcon from '../../public/sb-ig-icon.png';
import MainNavigation from './main-nav';

function Header() {
  return (
    <header className="flex flex-col">
      <div className="flex h-25 mt-3">
        <Link href={'/'} title="Sorrowbacon home" className="flex-1">
          <div className="flex flex-1">
            <Image src={logo} alt="sorrowbacon logo" height={100} width={100} />
            <div className="flex-1 pt-6 pl-6">
              <Image
                src={wordmark}
                alt="Sorrowbacon wordmark"
                width={500}
                height={100}
                className="h-8 sm:h-10 md:h-16 w-auto"
              />
            </div>
          </div>
        </Link>
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
      </div>
      <MainNavigation />
    </header>
  );
}

export default Header;
