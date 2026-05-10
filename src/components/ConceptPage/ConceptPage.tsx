import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '../Layout';
import { CONCEPT_ROUTES, type ConceptId } from '../../routes';
import { ConceptPrevNext } from './ConceptPrevNext';
import styles from './ConceptPage.module.css';

interface ConceptPageProps {
  conceptId: ConceptId;
  conceptNumber: number;          // 01..06
  category: string;               // ex: "Jeu simultané"
  summary: string;
  demo: ReactNode;                // composant interactif
  body: ReactNode;                // texte explicatif
  deepDive?: ReactNode;           // contenu repliable avec maths
  relatedIds?: ConceptId[];
}

export function ConceptPage({
  conceptId,
  conceptNumber,
  category,
  summary,
  demo,
  body,
  deepDive,
  relatedIds = [],
}: ConceptPageProps) {
  const concept = CONCEPT_ROUTES.find((c) => c.id === conceptId)!;
  const related = relatedIds
    .map((id) => CONCEPT_ROUTES.find((c) => c.id === id))
    .filter((c): c is typeof CONCEPT_ROUTES[number] => Boolean(c));

  const padNum = String(conceptNumber).padStart(2, '0');

  return (
    <Layout crumbs={[{ label: 'Concepts', to: '/' }, { label: concept.title }]}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <section className={styles.hero}>
          <span className="label-mono">Concept {padNum} · {category}</span>
          <h1>{concept.title}</h1>
          <p className={styles.summary}>{summary}</p>
        </section>

        <section className={styles.demo} aria-label="Démonstration interactive">
          <span className="label-mono">// Démo interactive</span>
          <div style={{ marginTop: 'var(--space-4)' }}>{demo}</div>
        </section>

        <section className={styles.section}>{body}</section>

        {deepDive && (
          <section className={styles.deepDive}>
            <details>
              <summary>Voir la formalisation mathématique</summary>
              <div className={styles.body}>{deepDive}</div>
            </details>
          </section>
        )}

        {related.length > 0 && (
          <section className={styles.related}>
            <span className="label-mono">// Concepts liés</span>
            <div className={styles.chips}>
              {related.map((r) => (
                <Link key={r.id} to={r.path} className={styles.chip}>{r.title}</Link>
              ))}
            </div>
          </section>
        )}

        <ConceptPrevNext current={conceptId} />
      </motion.div>
    </Layout>
  );
}
