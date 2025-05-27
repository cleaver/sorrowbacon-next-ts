export const apiServer = process.env.API_SERVER || "http://cascade:4000";

console.log("------------------------------------------------------------------");
console.log("apiServer:", apiServer);
console.log("------------------------------------------------------------------");

export const apiKey = process.env.API_KEY;

export const webHost = process.env.WEB_HOST || "https://sorrowbacon.com";

export const buildCacheFile = process.env.BUILD_CACHE_FILE || "build.cache";

export const archivePageSize = process.env.ARCHIVE_PAGE_SIZE || 20;

export const revalidateInterval: number = !!process.env.REVALIDATE_INTERVAL
  ? +process.env.REVALIDATE_INTERVAL
  : 60;

export const mailchimpUrl = process.env.NEXT_PUBLIC_MAILCHIMP_URL || "";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
