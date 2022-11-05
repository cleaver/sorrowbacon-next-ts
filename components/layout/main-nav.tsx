import Link from 'next/link';

function MainNavigation() {
  return (
    <nav>
      <ul className="flex gap-12 mt-6">
        <li>
          <Link
            href="/"
            className="no-underline active:underline hover:underline"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/archive/1"
            className="no-underline active:underline hover:underline"
          >
            Archive
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="no-underline active:underline hover:underline"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="no-underline active:underline hover:underline"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
