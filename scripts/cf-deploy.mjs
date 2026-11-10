/**
 * `npm run cf:deploy`: build for Cloudflare Workers and deploy (preview at *.workers.dev).
 *
 * Why not plain `opennextjs-cloudflare deploy`: it runs wrangler through the node_modules/.bin
 * cmd shim, which breaks on Windows because the project path contains "&". So both tools are
 * started with node directly. OPEN_NEXT_DEPLOY stops wrangler from handing `deploy` back to
 * OpenNext (and the broken shim). The static-assets cache needs no remote populate step.
 */
import { spawnSync } from "node:child_process";

const run = (script, args, env = {}) => {
  const { status } = spawnSync(process.execPath, [script, ...args], {
    stdio: "inherit",
    env: { ...process.env, ...env },
  });
  if (status !== 0) process.exit(status ?? 1);
};

run("node_modules/@opennextjs/cloudflare/dist/cli/index.js", ["build"]);
run("node_modules/wrangler/bin/wrangler.js", ["deploy"], { OPEN_NEXT_DEPLOY: "true" });
