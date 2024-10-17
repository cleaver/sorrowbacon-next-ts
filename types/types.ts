// from old generated type file
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  AboutBlocksDynamicZoneInput: any;
};

export type PrevNextElement = {
  prev: string | null;
  next: string | null;
};

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

export type Image = {
  name: string;
  url: string;
};

export type MaybeImage = Image | {} | "not loaded";

export type ImageEntity = IdentifiedEntity & Image;

export type ImageCollection = ImageEntity[];

export type Tag = {
  name: string;
  slug: string;
  comics: ComicStubCollection;
};

export type TagEntity = IdentifiedEntity & Tag;

export type TagCollection = TagEntity[];

export type TagEntityResponse = DataResponse<TagEntity> | NotFoundResponse;

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

export type Comic = {
  title: string;
  body: string;
  post_date: Scalars["DateTime"];
  slug: string;
  meta_description: string;
  image_alt_text: string;
  media: ImageEntity | {} | "not loaded";
  media_id: number;
  tags: TagCollection | "not loaded";
  published: boolean;
};

export type ComicEntity = IdentifiedEntity & Comic;

export type ComicCollection = ComicEntity[];

export type ComicEntityResponse = DataResponse<ComicEntity> | NotFoundResponse;

export type ComicCollectionResponse =
  | DataResponse<ComicCollection>
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
