import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';

type Props = {
  page: number;
  pageCount: number;
};

function ArchivePager({ page, pageCount }: Props) {
  const router = useRouter();
  const pageRef = useRef<HTMLSelectElement>(null);

  const changePage = () => {
    const newPage = pageRef.current?.value || 1;
    router.push(`/archive/${newPage}`);
  };

  const newerLink =
    page > 1 ? (
      <Link
        href={`/archive/${page - 1}`}
        className="no-underline active:underline hover:underline"
      >
        Newer
      </Link>
    ) : null;
  const olderLink =
    page < pageCount ? (
      <Link
        href={`/archive/${page + 1}`}
        className="no-underline active:underline hover:underline"
      >
        Older
      </Link>
    ) : null;
  const options = [<></>];
  for (let index = 0; index <= pageCount; index++) {
    options.push(
      <option value={index} key={index}>
        {index}
      </option>
    );
  }
  return (
    <nav className="flex w-full text-lg mt-6">
      <div className="flex-1">{newerLink}</div>
      <div className="flex-1 text-center">
        <label htmlFor="page">Page:</label>
        <select
          name="page"
          id="page"
          value={page}
          ref={pageRef}
          onChange={changePage}
          className="ml-3 px-3 py-1.5 rounded border border-gray-400"
        >
          {options}
        </select>
      </div>
      <div className="flex-1 text-right">{olderLink}</div>
    </nav>
  );
}

export default ArchivePager;
