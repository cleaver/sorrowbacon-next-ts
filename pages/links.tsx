import Link from "next/link";

function LinksPage() {
  return (
    <article>
      <h1 className="mt-12">Sorrowbacon Links</h1>
      <p>
        <ul>
          <li>
            <Link href={"https://www.patreon.com/sorrowbacon"}>Patreon</Link>
          </li>
          <li>
            <Link href={"https://www.facebook.com/sorrowbacon"}>Facebook</Link>
          </li>
          <li>
            <Link href={"https://twitter.com/sorrowbacon"}>Twitter</Link>
          </li>
          <li>
            <Link href={"https://www.instagram.com/sorrowbacon/"}>
              Instagram
            </Link>
          </li>
        </ul>
      </p>
    </article>
  );
}

export default LinksPage;
