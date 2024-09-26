import Image from "next/image";
import { apiServer } from "../../lib/config";
import { ImageEntity } from "../../types/types";

type Props = {
  image: ImageEntity;
  imageAltText: string;
};

function Comic({ image, imageAltText, key }: Props) {
  const imageUrl = image.url || "";
  const url = `${apiServer}${imageUrl}`;

  return (
    <Image
      src={url}
      alt={imageAltText}
      width={1000}
      height={1000}
      priority={true}
    />
  );
}

export default Comic;
