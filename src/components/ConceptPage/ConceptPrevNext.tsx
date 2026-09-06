import { Link } from 'react-router-dom';
import { CONCEPT_ROUTES, type ConceptId } from '../../content/concepts';
import { Pictogram } from '../Sign';
import styles from './ConceptPage.module.css';

interface Props {
  current: ConceptId;
}

export function ConceptPrevNext({ current }: Props) {
  const idx = CONCEPT_ROUTES.findIndex((c) => c.id === current);
  const prev = idx > 0 ? CONCEPT_ROUTES[idx - 1] : null;
  const next = idx < CONCEPT_ROUTES.length - 1 ? CONCEPT_ROUTES[idx + 1] : null;

  return (
    <nav className={styles.prevNext} aria-label="Concept précédent et suivant">
      {prev ? (
        <Link to={prev.path} className={styles.prevNextLink}>
          <Pictogram id="arrowLeft" size={26} />
          <span>
            <span className={styles.prevNextLabel}>Porte {prev.gate}</span>
            <span className={styles.prevNextName}>{prev.title}</span>
          </span>
        </Link>
      ) : (
        <Link to="/" className={styles.prevNextLink}>
          <Pictogram id="arrowLeft" size={26} />
          <span>
            <span className={styles.prevNextLabel}>Retour</span>
            <span className={styles.prevNextName}>Tous les concepts</span>
          </span>
        </Link>
      )}

      {next ? (
        <Link to={next.path} className={`${styles.prevNextLink} ${styles.next}`}>
          <span>
            <span className={styles.prevNextLabel}>Porte {next.gate}</span>
            <span className={styles.prevNextName}>{next.title}</span>
          </span>
          <Pictogram id="arrowRight" size={26} />
        </Link>
      ) : (
        <Link to="/" className={`${styles.prevNextLink} ${styles.next}`}>
          <span>
            <span className={styles.prevNextLabel}>Retour</span>
            <span className={styles.prevNextName}>Tous les concepts</span>
          </span>
          <Pictogram id="arrowRight" size={26} />
        </Link>
      )}
    </nav>
  );
}
