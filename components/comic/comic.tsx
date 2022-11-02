import Image from 'next/future/image';
import { UploadFileEntity } from '../../types/types';
import { imageServer } from '../../lib/config';

type Props = {
  image: UploadFileEntity;
  imageAltText: string;
  key: string;
};
function Comic({ image, imageAltText, key }: Props) {
  const url = `${imageServer}${image?.attributes?.url}`;

  return (
    <Image src={url} alt={imageAltText} width={1000} height={1000} key={key} />
  );
}

export default Comic;
