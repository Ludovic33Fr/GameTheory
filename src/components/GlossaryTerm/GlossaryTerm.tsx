import { ReactNode, useState, useId } from 'react';
import { findGlossaryEntry } from '../../content/glossary';
import styles from './GlossaryTerm.module.css';

interface GlossaryTermProps {
  id: string;
  children: ReactNode;
}

export function GlossaryTerm({ id, children }: GlossaryTermProps) {
  const [open, setOpen] = useState(false);
  const tipId = useId();
  const entry = findGlossaryEntry(id);

  return (
    <span
      className={styles.term}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      aria-describedby={open && entry ? tipId : undefined}
    >
      {children}
      {open && entry && (
        <span role="tooltip" id={tipId} className={styles.tooltip}>
          <strong>{entry.term}</strong>
          {entry.definition}
        </span>
      )}
    </span>
  );
}
