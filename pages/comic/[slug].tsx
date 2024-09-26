import { GetStaticPropsContext } from "next";
import Head from "next/head";
import ComicSection from "../../components/comic/comic-section";
import { getAllSlugs, getComicBySlug, getPrevNextForSlug } from "../../lib/api";
import { revalidateInterval, webHost } from "../../lib/config";
import { ComicEntity, PrevNextElement, SiteSettings } from "../../types/types";

type Props = {
  comic: ComicEntity;
  site: SiteSettings;
  prevNext: PrevNextElement;
};

function ComicPage({ comic, site, prevNext }: Props) {
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
    fallback: "blocking",
  };
}

export default ComicPage;
