import Head from "next/head";
import RichText from "../components/content/rich-text";
import { getAbout } from "../lib/api";
import { revalidateInterval, webHost } from "../lib/config";
import { Page } from "../types/jj_types";

type Props = {
  about: Page;
};

function AboutPage({ about }: Props) {
  return (
    <>
      <Head>
        <title>About | sorrowbacon</title>
        <meta name="og:title" content="About | sorrowbacon" />
        <meta name="description" content="About the sorrowbacon comic." />
        <meta name="og:description" content="About the sorrowbacon comic." />
        <meta name="og:url" content={webHost + "/about"} />
        <meta name="og:image" content={webHost + about.media.url} />
      </Head>
      <article>
        <h1 className="mt-12">{about.title}</h1>
        <RichText body={about.body} />
      </article>
    </>
  );
}

export async function getStaticProps() {
  const about = await getAbout();

  return {
    props: { about },
    revalidate: revalidateInterval,
  };
}

export default AboutPage;
