import ReactMarkdown from 'react-markdown';
import { ComicEntity } from '../../types/types';
import { PrevNextElement } from '../../lib/api';
import ComicList from './comic-list';
import PrevNextNav from './prev-next-nav';
import TagList from '../tag/tag-list';

type Props = {
  prevNext: PrevNextElement;
  comic: ComicEntity;
};

function ComicSection({ comic, prevNext }: Props) {
  const imageData = comic?.attributes?.image.data;

  if (!Array.isArray(imageData)) {
    return <article></article>;
  }

  return (
    <article>
      <PrevNextNav prevNext={prevNext} />
      <ComicList
        images={comic?.attributes?.image.data}
        imageAltText={comic?.attributes?.image_alt_text || ''}
      />
      <h1>{comic?.attributes?.title}</h1>
      <ReactMarkdown>{comic.attributes?.body || ''}</ReactMarkdown>
      <TagList tags={comic.attributes?.tags} />
    </article>
  );
}

export default ComicSection;
