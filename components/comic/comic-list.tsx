import { UploadFileEntity } from '../../types/types';
import Comic from './comic';

type Props = {
  images: UploadFileEntity[] | undefined;
  imageAltText: string;
};

function ComicList({ images, imageAltText }: Props) {
  if (!Array.isArray(images)) {
    return null;
  }

  return (
    <div className="not-prose ">
      {images.map((image) => (
        <Comic image={image} imageAltText={imageAltText} key={image.id || ''} />
      ))}
    </div>
  );
}

export default ComicList;
