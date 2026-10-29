# IndexNow

Bing and other IndexNow participants are pinged after a deployment so a content change
does not wait for the next crawl. Google does not consume IndexNow; it discovers the
same changes through the sitemap and `lastmod`.

## One-time setup

1. Generate a key (any 8–128 hex characters):

   ```bash
   openssl rand -hex 16
   ```

2. Write it to `public/<key>.txt`. The file must contain the key and nothing else:

   ```bash
   printf '%s' "$KEY" > "public/$KEY.txt"
   ```

3. Set the same value as `INDEXNOW_KEY` in the shell that runs the ping. Do not commit it
   as a secret; the key is public by design and only proves you control the host.

## Pinging after a deploy

```bash
pnpm build
INDEXNOW_KEY=<key> pnpm indexnow
```

The script reads `out/sitemap.xml`, so it never submits a URL the build does not contain.
It submits the whole list because a static export has no revision history per URL; the
search engine deduplicates unchanged pages.

Pass `INDEXNOW_DRY_RUN=1` to print the payload without sending it. The dry run does not need
the key file, so the payload can be inspected before the key is created.
