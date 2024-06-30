import ReactMarkdown from 'react-markdown';
import { PrevNextElement } from '../../lib/api';
import { webHost } from '../../lib/config';
import { ComicEntity } from '../../types/types';
import CopyClipboard from '../sharing/copy-clipboard';
import ShareFacebook from '../sharing/share-facebook';
import ShareTwitter from '../sharing/share-twitter';
import TagList from '../tag/tag-list';
import ComicList from './comic-list';
import PrevNextNav from './prev-next-nav';

type Props = {
  prevNext: PrevNextElement;
  comic: ComicEntity;
};

function ComicSection({ comic, prevNext }: Props) {
  const shareUrl = encodeURI(webHost + '/comic/' + comic?.attributes?.slug);

  const imageData = comic?.attributes?.image.data;

  if (!Array.isArray(imageData)) {
    return <article></article>;
  }

  return (
    <article>
      <PrevNextNav prevNext={prevNext} />
      <ComicList
        images={imageData}
        imageAltText={comic?.attributes?.image_alt_text || ''}
      />
      <h1>{comic?.attributes?.title}</h1>
      <ReactMarkdown>{comic?.attributes?.body || ''}</ReactMarkdown>
      <div className="flex gap-3 mb-6">
        <div className="font-bold">Share:</div>
        <ShareFacebook url={shareUrl} />
        <ShareTwitter url={shareUrl} />
        <CopyClipboard text={shareUrl} />
      </div>
      <TagList tags={comic?.attributes?.tags} />
    </article>
  );
}

export default ComicSection;
