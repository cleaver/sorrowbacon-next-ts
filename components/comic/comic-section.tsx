import ReactMarkdown from "react-markdown";
import { PrevNextElement } from "../../lib/api";
import { webHost } from "../../lib/config";
import { JjComicEntity, JjImageEntity, MaybeImage } from "../../types/jj_types";
import CopyClipboard from "../sharing/copy-clipboard";
import ShareFacebook from "../sharing/share-facebook";
import ShareTwitter from "../sharing/share-twitter";
import TagList from "../tag/tag-list";
import ComicList from "./comic-list";
import PrevNextNav from "./prev-next-nav";

type Props = {
  prevNext: PrevNextElement;
  comic: JjComicEntity;
};

function ComicSection({ comic, prevNext }: Props) {
  const shareUrl = encodeURI(webHost + "/comic/" + comic.slug);

  const image = comic.media;

  if (!isImage(image)) {
    return <article></article>;
  }

  return (
    <article>
      <PrevNextNav prevNext={prevNext} />
      <ComicList images={[image]} imageAltText={comic.image_alt_text} />
      <h1>{comic.title}</h1>
      <ReactMarkdown>{comic.body}</ReactMarkdown>
      <div className="flex gap-3 mb-6">
        <div className="font-bold">Share:</div>
        <ShareFacebook url={shareUrl} />
        <ShareTwitter url={shareUrl} />
        <CopyClipboard text={shareUrl} />
      </div>
      <TagList tags={comic.tags} />
    </article>
  );
}

function isImage(image: MaybeImage): image is JjImageEntity {
  return (
    typeof image === "object" &&
    image.hasOwnProperty("id") &&
    image.hasOwnProperty("url") &&
    image.hasOwnProperty("name")
  );
}

export default ComicSection;
