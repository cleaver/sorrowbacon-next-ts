import Head from "next/head";
import DynamicContent from "../components/content/dynamic-content";
import { getAbout } from "../lib/api";
import { revalidateInterval, webHost } from "../lib/config";
import { AboutEntityResponse } from "../types/types";

type Props = {
  about: AboutEntityResponse;
};

function AboutPage({ about }: Props) {
  const title = about.data?.attributes?.title;
  const maybeBlocksArray = about.data?.attributes?.blocks;
  const blocks = Array.isArray(maybeBlocksArray) ? maybeBlocksArray : [];

  return (
    <>
      <Head>
        <title>About | sorrowbacon</title>
        <meta name="og:title" content="About | sorrowbacon" />
        <meta name="description" content="About the sorrowbacon comic." />
        <meta name="og:description" content="About the sorrowbacon comic." />
        <meta name="og:url" content={webHost + "/about"} />
      </Head>
      <article>
        <h1 className="mt-12">{title}</h1>
        <DynamicContent blocks={blocks} />
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
