import { useEffect, useRef } from 'react';
import katex from 'katex';
import styles from './KaTeXBlock.module.css';

interface KaTeXBlockProps {
  tex: string;
  inline?: boolean;
}

export function KaTeXBlock({ tex, inline = false }: KaTeXBlockProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(tex, ref.current, {
        displayMode: !inline,
        throwOnError: false,
        output: 'html',
      });
    }
  }, [tex, inline]);

  return <span ref={ref} className={inline ? styles.inline : styles.block} aria-label={tex} />;
}
