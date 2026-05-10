import { Layout } from '../components/Layout';

export default function GlossaryPage() {
  return (
    <Layout crumbs={[{ label: 'Glossaire' }]}>
      <div style={{ padding: 'var(--space-12) var(--space-16)' }}>
        <h1>Glossaire</h1>
        <p>À venir.</p>
      </div>
    </Layout>
  );
}
