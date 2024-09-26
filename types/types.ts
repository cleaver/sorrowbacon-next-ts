import { Maybe, Scalars } from "./types";

export type DataResponse<T> = {
  data: T;
};

export type NotFoundResponse = {
  errors: {
    detail: string;
  };
};

export type IdentifiedEntity = {
  id: number;
};

export type JjImage = {
  name: string;
  url: string;
};

export type MaybeImage = JjImage | {} | "not loaded";

export type JjImageEntity = IdentifiedEntity & JjImage;

export type JjImageCollection = JjImageEntity[];

export type JjTag = {
  name: string;
  slug: string;
  comics: ComicStubCollection;
};

export type JjTagEntity = IdentifiedEntity & JjTag;

export type JjTagCollection = JjTagEntity[];

export type JjTagEntityResponse = DataResponse<JjTagEntity> | NotFoundResponse;

export type ComicStub = {
  title: string;
  body: string;
  post_date: Scalars["DateTime"];
  slug: string;
  meta_description: string;
  image_alt_text: string;
  media: "not loaded";
  media_id: number;
  tags: "not loaded";
  published: boolean;
};

export type ComicStubEntity = IdentifiedEntity & ComicStub;

export type ComicStubCollection = ComicStubEntity[];

export type JjComic = {
  title: string;
  body: string;
  post_date: Scalars["DateTime"];
  slug: string;
  meta_description: string;
  image_alt_text: string;
  media: JjImageEntity | {} | "not loaded";
  media_id: number;
  tags: JjTagCollection | "not loaded";
  published: boolean;
};

export type JjComicEntity = IdentifiedEntity & JjComic;

export type JjComicCollection = JjComicEntity[];

export type JjComicEntityResponse =
  | DataResponse<JjComicEntity>
  | NotFoundResponse;

export type JjComicCollectionResponse =
  | DataResponse<JjComicCollection>
  | NotFoundResponse;

export type Slug = string;

export type SlugCollection = Slug[];

export type SlugCollectionResponse =
  | DataResponse<SlugCollection>
  | NotFoundResponse;

export type Page = {
  title: string;
  body: string;
  slug: string;
  image_alt_text: string;
  media: {
    id: number;
    name: string;
    url: string;
  };
  meta_description: string;
};

export type PageEntity = IdentifiedEntity & Page;

export type PageEntityResponse = DataResponse<PageEntity> | NotFoundResponse;

export type Setting = {
  key: string;
  value: string;
  inserted_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};

export type SettingEntity = IdentifiedEntity & Setting;

export type SettingCollection = SettingEntity[];

export type SettingCollectionResponse =
  | DataResponse<SettingCollection>
  | NotFoundResponse;

export type SettingsObject = {
  [key: string]: string;
};
export type SiteSettings = {
  site_title: string;
  meta_title: string;
  meta_description: string;
};
