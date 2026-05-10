import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { references } from '../content/references';

export default function FurtherReadingPage() {
  return (
    <Layout crumbs={[{ label: 'Aller plus loin' }]}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: 'var(--space-12) var(--space-16)', maxWidth: 820 }}
      >
        <span className="label-mono">Aller plus loin</span>
        <h1 style={{ fontSize: 'var(--text-3xl)', margin: 'var(--space-2) 0 var(--space-3)' }}>Références</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 600, lineHeight: 1.6 }}>
          Une sélection courte des ouvrages et articles qui ont façonné le champ.
        </p>
        <ul style={{ marginTop: 'var(--space-8)', listStyle: 'none', padding: 0 }}>
          {references.map((r) => (
            <li key={r.id} style={{ marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)' }}>{r.year}</div>
              <div style={{ marginTop: 'var(--space-1)', color: 'var(--text-primary)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>{r.title}</div>
              <div style={{ marginTop: 'var(--space-1)', color: 'var(--text-secondary)' }}>{r.author}</div>
              <p style={{ marginTop: 'var(--space-2)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{r.blurb}</p>
              {r.url && (
                <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', fontSize: 'var(--text-sm)' }}>
                  Lire en ligne →
                </a>
              )}
            </li>
          ))}
        </ul>
      </motion.div>
    </Layout>
  );
}
