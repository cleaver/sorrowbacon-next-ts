/**
 * @file lib/api.ts
 *
 * API for static generation (SSG).
 *
 */
import { accessCache } from "next-build-cache";
import {
  apiKey,
  apiServer,
  archivePageSize,
  buildCacheFile,
  revalidateInterval,
} from "../lib/config";
import {
  ComicCollectionResponse,
  ComicEntityResponse,
  TagEntityResponse,
  NotFoundResponse,
  PageEntityResponse,
  SettingCollection,
  SettingCollectionResponse,
  SiteSettings,
  SlugCollectionResponse,
} from "../types/types";

const url = apiServer + "/api";

export type PrevNextElement = {
  prev: string | null;
  next: string | null;
};

async function apiCall(query: string, variables = {}) {
  const url_query = url + query;
  return await fetch(url_query, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });
}

/**
 * Get the comic for the front page.
 *
 * @returns comic
 */
export async function getFrontPage() {
  const result = await apiCall("/comics/_front");
  const jsonData: ComicEntityResponse = await result.json();
  guardNotFoundResponse(jsonData);
  const comic = jsonData.data;
  const site = await getCachedSiteSettings();
  return { comic, site };
}

function guardNotFoundResponse<T>(
  response: T,
): asserts response is Exclude<T, NotFoundResponse> {
  if (isNotFoundResponse<T>(response)) {
    throw new Error(response.errors.detail);
  }
}

function isNotFoundResponse<T>(response: T): response is T & NotFoundResponse {
  return (response as NotFoundResponse).errors !== undefined;
}

/**
 * Get a single comic by slug.
 *
 * @param slug The unique slug for the comic.
 * @returns comic
 */
export async function getComicBySlug(slug: string) {
  const result = await apiCall(`/comics/${slug}`);
  const jsonData: ComicEntityResponse = await result.json();
  guardNotFoundResponse(jsonData);
  const comic = jsonData.data;
  const site = await getCachedSiteSettings();
  return { comic, site };
}

/**
 * Get all the published comic slugs.
 *
 * @returns an array of all comic slugs
 */
export async function getAllSlugs() {
  const slugsResult = await apiCall("/comics?select=slug");
  const slugsData: SlugCollectionResponse = await slugsResult.json();
  guardNotFoundResponse(slugsData);
  return slugsData.data;
}

/**
 * Get a map of previous and next for each published comic.
 *
 * @returns a map of previous and next for each comic.
 */
async function getPrevNextMap(): Promise<object> {
  const orderedSlugs = await getAllSlugs();
  const prevNextMap: any = {};

  orderedSlugs.forEach((slug, index) => {
    if (index === 0) {
      prevNextMap[slug] = { prev: null, next: orderedSlugs[1] };
    } else if (index >= orderedSlugs.length - 1) {
      prevNextMap[slug] = { prev: orderedSlugs[index - 1], next: null };
    } else {
      prevNextMap[slug] = {
        prev: orderedSlugs[index - 1],
        next: orderedSlugs[index + 1],
      };
    }
  });
  return prevNextMap;
}

/**
 * Get the previous and next slugs for a given comic.
 *
 * @param slug identifies the comic.
 * @returns prev and next slug for the comic.
 */
export async function getPrevNextForSlug(slug: string) {
  const cache = accessCache(buildCacheFile);

  let map: any = await cache.get("prev-next-map");

  if (!map) {
    map = await getPrevNextMap();

    await cache.put("prev-next-map", map, 1000 * revalidateInterval);
  }

  const prevNext: PrevNextElement | null = map[slug] || null;

  return prevNext;
}

/**
 * Get tag by slug.
 *
 * @param slug The unique slug for the tag.
 * @returns tag with partially populated comics.
 */
export async function getTagLinksBySlug(slug: string) {
  const tagResult = await apiCall(`/tags/${slug}`);
  const tagData: TagEntityResponse = await tagResult.json();
  guardNotFoundResponse(tagData);
  return tagData.data;
}

/**
 * Get an array containing all tag slugs.
 * @returns array of tag slugs
 */
export async function getAllTagSlugs() {
  const result = await apiCall("/tags/?select=slug");
  const tagsJson: SlugCollectionResponse = await result.json();
  guardNotFoundResponse(tagsJson);
  return tagsJson.data;
}

export async function getPageBySlug(slug: string) {
  const result = await apiCall(`/pages/${slug}`);
  const pageJson: PageEntityResponse = await result.json();
  guardNotFoundResponse(pageJson);
  return pageJson.data;
}
export async function getAbout() {
  return await getPageBySlug("about");
}

export async function getArchivePage(pageNumber: number) {
  const result = await apiCall(
    `/comics/?page=${pageNumber}&page_size=${archivePageSize}`,
  );
  const archiveJson: ComicCollectionResponse = await result.json();
  guardNotFoundResponse(archiveJson);
  return archiveJson.data;
}

export async function getArchivePageCount() {
  const result = await apiCall("/comics/_count");
  const pageCountJson = await result.json();
  guardNotFoundResponse(pageCountJson);
  const pageCount =
    Math.ceil(pageCountJson.data.count / Number(archivePageSize)) || 1;
  return pageCount;
}

/**
 * Get site settings from cache or API.
 *
 * @returns SiteSettings object.
 */
export async function getCachedSiteSettings() {
  const cache = accessCache(buildCacheFile);
  let settings: SiteSettings | unknown = await cache.get("site-settings");

  if (!settings) {
    settings = await getSiteSettings();
    await cache.put("site-settings", settings, 1000 * revalidateInterval);
  }

  return settings as SiteSettings;
}

/**
 * Get site settings.
 *
 * @returns SiteSettings object.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const result = await apiCall("/settings");
  const jsonData: SettingCollectionResponse = await result.json();

  if (isNotFoundResponse(jsonData)) {
    throw new Error(jsonData.errors.detail);
  }

  const settings: SettingCollection = jsonData.data;
  const siteSettings = convertSettingsArrayToObject(settings);

  return siteSettings;
}

function convertSettingsArrayToObject(
  settingsArray: SettingCollection,
): SiteSettings {
  const settingsObject: SiteSettings = {
    site_title: "",
    meta_title: "",
    meta_description: "",
  };

  settingsArray.forEach((setting) => {
    if (setting.key in Object.keys(settingsObject)) {
      settingsObject[setting.key as keyof SiteSettings] = setting.value;
    }
  });

  return settingsObject;
}
