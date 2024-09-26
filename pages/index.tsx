import Head from "next/head";
import ComicSection from "../components/comic/comic-section";
import { getFrontPage, getPrevNextForSlug, PrevNextElement } from "../lib/api";
import { revalidateInterval, webHost } from "../lib/config";
import { JjComicEntity, SiteSettings } from "../types/types";

type Props = {
  comic: JjComicEntity;
  site: SiteSettings;
  prevNext: PrevNextElement;
};

function HomePage({ comic, site, prevNext }: Props) {
  const canonicalUrl = `${webHost}/comic/${comic.slug}`;

  return (
    <>
      <Head>
        <title>{site.site_title}</title>
        <meta name="og:title" content={site.meta_title} />
        <meta name="description" content={site.meta_description} />
        <meta name="og:description" content={site.meta_description} />
        <meta name="og:url" content={canonicalUrl} />
        <meta name="twitter:url" content={canonicalUrl} />
      </Head>
      <ComicSection comic={comic} prevNext={prevNext} />
    </>
  );
}

export async function getStaticProps() {
  const { comic, site } = await getFrontPage();
  const slug = comic.slug;
  const prevNext = await getPrevNextForSlug(slug);

  return {
    props: {
      comic: comic,
      site: site,
      prevNext: prevNext,
    },
    revalidate: revalidateInterval,
  };
}

export default HomePage;
