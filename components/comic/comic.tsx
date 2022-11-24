import Image from 'next/image';
import { UploadFileEntity } from '../../types/types';

type Props = {
  image: UploadFileEntity;
  imageAltText: string;
  key: string;
};
function Comic({ image, imageAltText, key }: Props) {
  const imageUrl = image?.attributes?.url || '';
  const filename = imageUrl?.split('/')[2] || '';
  const url = `/images/${filename}`;

  return (
    <Image
      src={url}
      alt={imageAltText}
      width={1000}
      height={1000}
      key={key}
      priority={true}
    />
  );
}

export default Comic;
