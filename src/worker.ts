/**
 * Asset worker for the public site.
 *
 * Static files are served by the Workers Static Assets binding configured in
 * `wrangler.jsonc`. This entry only adds rules the asset layer cannot express:
 * a `www.` host answers 301 to the apex, and `/pricing/` answers 301 to `/access/`
 * now that the preview is free and has no prices.
 */
export interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

/** Paths that existed before the site stopped publishing prices. */
const MOVED: Record<string, string> = {
  '/pricing': '/access/',
  '/pricing/': '/access/',
};

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      url.protocol = 'https:';
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }

    const moved = MOVED[url.pathname];
    if (moved) {
      url.pathname = moved;
      url.protocol = 'https:';
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
