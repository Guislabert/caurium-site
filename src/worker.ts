/**
 * Asset worker for the public site.
 *
 * Static files are served by the Workers Static Assets binding configured in
 * `wrangler.jsonc`; this entry only adds one rule the asset layer cannot express:
 * a `www.` host answers 301 to the same path on the apex. Serving the same page from
 * two hostnames splits canonical URLs and duplicates every route.
 */
export interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      url.protocol = 'https:';
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
