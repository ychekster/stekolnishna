/**
 * OpenNext adapter config for deploying to Cloudflare Workers.
 *
 * The site is prerendered at build time and nothing revalidates yet, so the cache is read
 * from the deployed static assets: no R2 bucket needed (R2 asks for a card even on the free
 * plan). Switch to R2/KV once the CMS starts revalidating pages.
 */
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
