import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../Layout';
import { Plate, Pictogram } from '../Sign';
import {
  EDGE_KIND_LABEL,
  conceptById,
  connectionsOf,
  type ConceptId,
} from '../../content/concepts';
import { ConceptPrevNext } from './ConceptPrevNext';
import styles from './ConceptPage.module.css';

interface ConceptPageProps {
  conceptId: ConceptId;
  conceptNumber: number; // 01..06
  category: string; // ex: "Jeu simultané"
  summary: string;
  demo: ReactNode; // composant interactif
  body: ReactNode; // texte explicatif
  deepDive?: ReactNode; // contenu repliable avec maths
  /** Conservé pour compatibilité : les correspondances viennent du réseau. */
  relatedIds?: ConceptId[];
  /** Une phrase qui dit quoi manipuler. Elle sert le lecteur, pas la décoration. */
  demoHint?: string;
}

export function ConceptPage({
  conceptId,
  category,
  summary,
  demo,
  body,
  deepDive,
  demoHint,
}: ConceptPageProps) {
  const concept = conceptById(conceptId);
  const transfers = connectionsOf(conceptId);

  return (
    <Layout crumbs={[{ label: 'Concepts', to: '/' }, { label: concept.title }]} title={concept.title}>
      <section className={styles.hero}>
        <Plate icon={concept.icon} size="lg" />
        <div>
          <div className={styles.heroGate}>{concept.gate}</div>
          <h1 className={styles.heroTitle}>{concept.title}</h1>
          <div className={styles.heroMeta}>
            <span className={styles.heroMetaItem}>{category}</span>
            <span className={styles.heroMetaItem}>
              <Pictogram id="map" size={14} />
              {transfers.length} correspondance{transfers.length > 1 ? 's' : ''}
            </span>
          </div>
          <p className={styles.summary}>{summary}</p>
        </div>
      </section>

      <section className={`${styles.demoBand} onBlack`} aria-labelledby="demo-titre">
        <div className={styles.bandHead}>
          <Plate icon="mixed" size="md" tone="yellow" />
          <h2 id="demo-titre" className={styles.bandTitle}>
            Démonstration
          </h2>
          {demoHint && <p className={styles.bandHint}>{demoHint}</p>}
        </div>
        {demo}
      </section>

      <section className={styles.readBand}>
        <div className="prose">{body}</div>
        {deepDive && (
          <div className={`${styles.deepDive} onBlack`}>
            <p className={styles.deepDiveIntro}>
              <Plate icon="info" size="sm" tone="yellow" />
              Le concept en notation formelle. Disponible en un clic, jamais imposé.
            </p>
            <details>
              <summary>
                Afficher la formalisation mathématique
                <Pictogram id="chevron" size={12} className={styles.deepDiveCaret} />
              </summary>
              <div className={styles.deepDiveBody}>{deepDive}</div>
            </details>
          </div>
        )}
      </section>

      {transfers.length > 0 && (
        <section className={styles.transferBand} aria-labelledby="corr-titre">
          <div className={styles.transferHead}>
            <Plate icon="arrowRight" size="md" />
            <h2 id="corr-titre" className={styles.transferTitle}>
              Correspondances
            </h2>
          </div>
          {transfers.map((t) => (
            <Link key={t.route.id} to={t.route.path} className={styles.transferRow}>
              <Plate icon={t.route.icon} size="md" className={styles.transferPlate} />
              <span className={styles.transferGate}>{t.route.gate}</span>
              <span>
                <span className={styles.transferName}>{t.route.title}</span>
                <span className={styles.transferKind}>{EDGE_KIND_LABEL[t.kind]}</span>
              </span>
              <Pictogram id="arrowRight" size={26} className={styles.transferArrow} />
            </Link>
          ))}
        </section>
      )}

      <ConceptPrevNext current={conceptId} />
    </Layout>
  );
}
