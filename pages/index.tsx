import { ComicEntity, SiteEntity } from '../types/types';
import { getFrontPage, getPrevNextForSlug, PrevNextElement } from '../lib/api';
import ComicSection from '../components/comic/comic-section';
import { revalidateInterval, webHost } from '../lib/config';
import Head from 'next/head';
import { siteTitle } from '../components/layout/layout';

type Props = {
  comic: ComicEntity;
  site: SiteEntity;
  prevNext: PrevNextElement;
};

function HomePage({ comic, site, prevNext }: Props) {
  const seoArray = site?.attributes?.seo;
  const seo = Array.isArray(seoArray) ? seoArray[0] : null;
  const canonicalUrl = `${webHost}/comic/${comic.attributes?.slug}`;

  return (
    <>
      <Head>
        <title>{seo?.metaTitle}</title>
        <meta name="og:title" content={seo?.metaTitle} />
        <meta name="description" content={seo?.metaDescription} />
        <meta name="og:description" content={seo?.metaDescription} />
        <meta name="og:url" content={canonicalUrl} />
        <meta name="twitter:url" content={canonicalUrl} />
      </Head>
      <ComicSection comic={comic} prevNext={prevNext} />
    </>
  );
}

export async function getStaticProps() {
  const { comic, site } = await getFrontPage();
  const slug = comic?.attributes?.slug || '';
  const prevNext = await getPrevNextForSlug(slug);
  console.log('site:', site);

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
