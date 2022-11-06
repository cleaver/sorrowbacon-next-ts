import Link from 'next/link';
import Image from 'next/image';
import homeImg from '../../public/menu/home.png';
import archiveImg from '../../public/menu/archive.png';
import aboutImg from '../../public/menu/about.png';
import contactImg from '../../public/menu/contact.png';

function MainNavigation() {
  return (
    <nav>
      <ul className="flex gap-12 mt-8">
        <li>
          <Link
            href="/"
            className="no-underline active:underline hover:underline"
            title="Home"
          >
            <Image
              src={homeImg}
              width={100}
              height={30}
              alt="Home"
              className="h-6 w-auto hover:rotate-3 transition-transform"
            />
          </Link>
        </li>
        <li>
          <Link
            href="/archive/1"
            className="no-underline active:underline hover:underline"
            title="Archive"
          >
            <Image
              src={archiveImg}
              width={100}
              height={30}
              alt="Archive"
              className="h-6 w-auto hover:rotate-3 transition-transform"
            />
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="no-underline active:underline hover:underline"
            title="About"
          >
            <Image
              src={aboutImg}
              width={100}
              height={30}
              alt="About"
              className="h-6 w-auto hover:rotate-3 transition-transform"
            />
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="no-underline active:underline hover:underline"
            title="Contact"
          >
            <Image
              src={contactImg}
              width={100}
              height={30}
              alt="Contact"
              className="h-6 w-auto hover:rotate-3 transition-transform"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
