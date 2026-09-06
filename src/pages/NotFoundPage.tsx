import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Plate, Pictogram } from '../components/Sign';
import { CONCEPT_ROUTES } from '../content/concepts';
import styles from './Directory.module.css';

export default function NotFoundPage() {
  return (
    <Layout crumbs={[{ label: 'Page introuvable' }]} title="Page introuvable">
      <section className={styles.lost}>
        <Plate icon="warn" size="lg" />
        <div>
          <div className={styles.lostCode}>404</div>
          <h1 className={styles.title}>Cette porte n'existe pas</h1>
          <p className={styles.lostBody}>
            L'adresse demandée ne correspond à aucune destination du terminal. Le panneau
            ci-dessous mène aux six concepts.
          </p>
          <div className={styles.lostActions}>
            <Link to="/" className={styles.count}>
              <Pictogram id="arrowLeft" size={14} />
              Retour au panneau
            </Link>
            <Link to="/glossaire" className={styles.count}>
              <Pictogram id="glossary" size={14} />
              Glossaire
            </Link>
          </div>
        </div>
      </section>

      <ul className={styles.list}>
        {CONCEPT_ROUTES.map((c) => (
          <li key={c.id} className={styles.item}>
            <span className={styles.itemIndex}>{c.gate}</span>
            <div>
              <Link to={c.path} className={styles.term}>
                {c.title}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
