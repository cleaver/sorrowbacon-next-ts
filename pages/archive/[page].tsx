import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import ArchiveList from '../../components/comic/archive-list';
import ArchiveNav from '../../components/comic/archive-nav';
import { getArchivePage, getArchivePageCount } from '../../lib/api';
import { ComicEntity } from '../../types/types';

type Props = {
  comics: ComicEntity[];
  pageCount: number;
};

function ArchivePage({ comics, pageCount }: Props) {
  const router = useRouter();

  const page = router.query.page || 1;
  const pageNumber: number = +page;

  console.log('pageNumber', pageNumber);
  console.log('pageCount', pageCount);

  return (
    <article>
      <h1>Archive</h1>
      <ArchiveNav page={pageNumber} pageCount={pageCount} />
      <ArchiveList comics={comics} />
    </article>
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
  };
}

export async function getStaticPaths() {
  const pageCount = await getArchivePageCount();

  const paths = [];
  for (let page = 1; page <= pageCount; page++) {
    paths.push({ params: { page: `${page}` } });
  }

  return { paths: paths, fallback: false };
}

export default ArchivePage;
