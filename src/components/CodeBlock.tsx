'use client';

import { useRef, useState } from 'react';

export function CodeBlock({
  code,
  language,
  title,
  note,
}: {
  code: string;
  language: string;
  title: string;
  note?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus('idle'), 2000);
  }

  return (
    <figure className="min-w-0 max-w-full">
      <div className="code-shell" data-language={language}>
        <div className="code-shell__head">
          <p className="code-shell__title">
            {title} <span className="text-[#6f6e68]">/ {language}</span>
          </p>
          <button type="button" onClick={copy} className="copy-button">
            {status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy'}
          </button>
        </div>
        <pre tabIndex={0} aria-label={`${title} code`}>
          <code>{code}</code>
        </pre>
      </div>
      <span aria-live="polite" className="sr-only">
        {status === 'copied'
          ? 'Code copied to clipboard.'
          : status === 'failed'
            ? 'Copy failed.'
            : ''}
      </span>
      {note ? <p className="mt-2 text-xs leading-5 text-muted">{note}</p> : null}
    </figure>
  );
}
