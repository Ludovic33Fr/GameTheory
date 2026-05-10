import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { HubMap } from '../components/HubMap';

export default function HomePage() {
  return (
    <Layout>
      <motion.section
        style={{ padding: 'var(--space-12) var(--space-16)', textAlign: 'center', borderBottom: '1px solid var(--border-subtle)' }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="label-mono">Démonstrations interactives</span>
        <h1 style={{ fontSize: 'var(--text-3xl)', margin: 'var(--space-3) 0' }}>Théorie des jeux</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>
          Six concepts fondamentaux, expliqués avec des démos cliquables. Survole un nœud pour voir ses connexions.
        </p>
      </motion.section>
      <section style={{ padding: 'var(--space-12) var(--space-6)' }}>
        <HubMap />
      </section>
    </Layout>
  );
}
