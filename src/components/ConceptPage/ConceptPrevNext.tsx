import { Link } from 'react-router-dom';
import { CONCEPT_ROUTES, type ConceptId } from '../../routes';
import styles from './ConceptPage.module.css';

interface Props { current: ConceptId; }

export function ConceptPrevNext({ current }: Props) {
  const idx = CONCEPT_ROUTES.findIndex((c) => c.id === current);
  const prev = idx > 0 ? CONCEPT_ROUTES[idx - 1] : null;
  const next = idx < CONCEPT_ROUTES.length - 1 ? CONCEPT_ROUTES[idx + 1] : null;
  return (
    <div className={styles.prevNext}>
      {prev ? <Link to={prev.path}>← {prev.title}</Link> : <Link to="/">← Retour au hub</Link>}
      {next ? <Link to={next.path}>{next.title} →</Link> : <span />}
    </div>
  );
}
