import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { glossary } from '../content/glossary';

export default function GlossaryPage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term, 'fr'));
  return (
    <Layout crumbs={[{ label: 'Glossaire' }]}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: 'var(--space-12) var(--space-16)', maxWidth: 820 }}
      >
        <span className="label-mono">Glossaire</span>
        <h1 style={{ fontSize: 'var(--text-3xl)', margin: 'var(--space-2) 0 var(--space-3)' }}>Termes essentiels</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 600, lineHeight: 1.6 }}>
          Les notions qui reviennent dans plusieurs concepts. Référez-vous-y au besoin.
        </p>
        <dl style={{ marginTop: 'var(--space-8)' }}>
          {sorted.map((entry) => (
            <div key={entry.id} style={{ marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)' }}>
              <dt style={{ fontSize: 'var(--text-lg)', color: 'var(--text-primary)', fontWeight: 600 }}>{entry.term}</dt>
              <dd style={{ marginTop: 'var(--space-2)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{entry.definition}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </Layout>
  );
}
