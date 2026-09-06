import { Layout } from '../components/Layout';
import { Plate, Pictogram } from '../components/Sign';
import { references } from '../content/references';
import styles from './Directory.module.css';

export default function FurtherReadingPage() {
  return (
    <Layout crumbs={[{ label: 'Aller plus loin' }]} title="Aller plus loin">
      <section className={styles.head}>
        <Plate icon="book" size="lg" />
        <div>
          <h1 className={styles.title}>Références</h1>
          <p className={styles.lede}>
            Une sélection courte des ouvrages et articles qui ont façonné le champ.
          </p>
          <p className={styles.count}>{references.length} références</p>
        </div>
      </section>

      <ul className={styles.list}>
        {references.map((r) => (
          <li key={r.id} className={styles.item}>
            <span className={styles.itemIndex}>{r.year}</span>
            <div>
              <h2 className={styles.term}>{r.title}</h2>
              <p className={styles.definition}>{r.blurb}</p>
              <p className={styles.meta}>
                <span>{r.author}</span>
                {r.url && (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.out}
                  >
                    Lire en ligne
                    <Pictogram id="link" size={14} />
                  </a>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
