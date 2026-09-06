import { Layout } from '../components/Layout';
import { Plate } from '../components/Sign';
import { glossary } from '../content/glossary';
import styles from './Directory.module.css';

export default function GlossaryPage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term, 'fr'));

  return (
    <Layout crumbs={[{ label: 'Glossaire' }]} title="Glossaire">
      <section className={styles.head}>
        <Plate icon="glossary" size="lg" />
        <div>
          <h1 className={styles.title}>Termes essentiels</h1>
          <p className={styles.lede}>
            Les notions qui reviennent dans plusieurs concepts. Référez-vous-y au besoin.
          </p>
          <p className={styles.count}>{sorted.length} entrées</p>
        </div>
      </section>

      <dl className={styles.list}>
        {sorted.map((entry, i) => (
          <div key={entry.id} className={styles.item}>
            <span className={styles.itemIndex}>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <dt className={styles.term}>{entry.term}</dt>
              <dd className={styles.definition}>{entry.definition}</dd>
            </div>
          </div>
        ))}
      </dl>
    </Layout>
  );
}
