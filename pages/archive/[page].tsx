import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ArchiveList from '../../components/comic/archive-list';
import ArchivePager from '../../components/comic/archive-pager';
import { getArchivePage, getArchivePageCount } from '../../lib/api';
import { revalidateInterval, webHost } from '../../lib/config';
import { ComicEntity } from '../../types/types';

type Props = {
  comics: ComicEntity[];
  pageCount: number;
};

function ArchivePage({ comics, pageCount }: Props) {
  const router = useRouter();

  const page = router.query.page || 1;
  const pageNumber: number = +page;

  return (
    <>
      <Head>
        <title>Archive page {page} | sorrowbacon</title>
        <meta name="og:title" content="Archive | sorrowbacon" />
        <meta
          name="description"
          content="The entire catalog of sorrowbacon comics."
        />
        <meta
          name="og:description"
          content="The entire catalog of sorrowbacon comics."
        />
      </Head>

      <article>
        <h1 className="mt-12">Archive</h1>
        <ArchiveList comics={comics} />
        <ArchivePager page={pageNumber} pageCount={pageCount} />
      </article>
    </>
  );
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const page = ctx.params?.page || 1;
  const pageNumber: number = +page;

  const archiveComics = await getArchivePage(pageNumber);
  const pageCount = await getArchivePageCount();

  return {
    props: {
      comics: archiveComics,
      pageCount: pageCount,
    },
    revalidate: revalidateInterval,
  };
}

export async function getStaticPaths() {
  const pageCount = await getArchivePageCount();

  const paths = [];
  for (let page = 1; page <= pageCount; page++) {
    paths.push({ params: { page: `${page}` } });
  }

  return { paths: paths, fallback: 'blocking' };
}

export default ArchivePage;
