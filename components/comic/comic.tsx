import Image from "next/image";
import { apiServer } from "../../lib/config";
import { JjImageEntity } from "../../types/types";

type Props = {
  image: JjImageEntity;
  imageAltText: string;
  key: string;
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
      key={key}
      priority={true}
    />
  );
}

export default Comic;
