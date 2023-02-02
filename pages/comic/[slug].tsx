import { GetStaticPropsContext } from 'next';
import { ComicEntity, SiteEntity } from '../../types/types';
import {
  getAllSlugs,
  getComicBySlug,
  getPrevNextForSlug,
  PrevNextElement,
} from '../../lib/api';
import ComicSection from '../../components/comic/comic-section';
import { revalidateInterval, webHost } from '../../lib/config';
import Head from 'next/head';

type Props = {
  comic: ComicEntity;
  site: SiteEntity;
  prevNext: PrevNextElement;
};

function ComicPage({ comic, site, prevNext }: Props) {
  const seoArray = site?.attributes?.seo;
  const seo = Array.isArray(seoArray) ? seoArray[0] : null;
  const canonicalUrl = `${webHost}/comic/${comic.attributes?.slug}`;
  const title = `${comic.attributes?.title} | ${site?.attributes?.site_name}`;

  return (
    <>
      <Head>
        <title>{title}</title>
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

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const slugParam = ctx?.params?.slug;

  if (!slugParam) {
    return;
  }

  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  const prevNext = await getPrevNextForSlug(slug);
  const { comic, site } = await getComicBySlug(slug);

  return {
    props: {
      comic: comic,
      site: site,
      prevNext: prevNext,
    },
    revalidate: revalidateInterval,
  };
}

export async function getStaticPaths() {
  const slugs = await getAllSlugs();
  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug: slug,
        },
      };
    }),
    fallback: 'blocking',
  };
}

export default ComicPage;
