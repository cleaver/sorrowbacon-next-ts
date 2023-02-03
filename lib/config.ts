export const apiServer = process.env.API_SERVER || 'http://strapi:1337';

export const apiKey = process.env.API_KEY;

export const webHost = process.env.WEB_HOST || 'https://sorrowbacon.com';

export const buildCacheFile = process.env.BUILD_CACHE_FILE || 'build.cache';

export const archivePageSize = process.env.ARCHIVE_PAGE_SIZE || 20;

export const revalidateInterval: number = !!process.env.REVALIDATE_INTERVAL
  ? +process.env.REVALIDATE_INTERVAL
  : 900;
