import ReactMarkdown from 'react-markdown';
import { ComicEntity } from '../../types/types';
import { PrevNextElement } from '../../lib/api';
import ComicList from './comic-list';
import PrevNextNav from './prev-next-nav';
import TagList from '../tag/tag-list';
import FacebookIcon from '../sharing/icons/facebook-icon';
import { webHost } from '../../lib/config';
import TwitterIcon from '../sharing/icons/twitter-icon';
import LinkIcon from '../sharing/icons/link-icon';
import CopyClipboard from '../sharing/copy-clipboard';
import ShareTwitter from '../sharing/share-twitter';
import ShareFacebook from '../sharing/share-facebook';

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
