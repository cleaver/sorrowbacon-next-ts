import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';

type Props = {
  page: number;
  pageCount: number;
};

function ArchiveNav({ page, pageCount }: Props) {
  const router = useRouter();
  const pageRef = useRef<HTMLSelectElement>(null);

  const changePage = () => {
    const newPage = pageRef.current?.value || 1;
    router.push(`/archive/${newPage}`);
  };

  const newerLink =
    page > 1 ? <Link href={`/archive/${page - 1}`}>Newer</Link> : null;
  const olderLink =
    page < pageCount ? <Link href={`/archive/${page + 1}`}>Older</Link> : null;
  const options = [<></>];
  for (let index = 0; index <= pageCount; index++) {
    options.push(
      <option value={index} selected={page === index} key={index}>
        {index}
      </option>
    );
  }
  return (
    <nav className="flex w-full">
      <div className="flex-1">{newerLink}</div>
      <div className="flex-1 text-center">
        <label htmlFor="page">Page:</label>
        <select name="page" id="page" ref={pageRef} onChange={changePage}>
          {options}
        </select>
      </div>
      <div className="flex-1 text-right">{olderLink}</div>
    </nav>
  );
}

export default ArchiveNav;
