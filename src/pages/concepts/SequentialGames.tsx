import { Layout } from '../../components/Layout';

export default function SequentialGamesPage() {
  return (
    <Layout crumbs={[{ label: 'Concepts', to: '/' }, { label: 'Jeux séquentiels' }]}>
      <div style={{ padding: 'var(--space-12) var(--space-16)' }}>
        <h1>Placeholder — Jeux séquentiels</h1>
      </div>
    </Layout>
  );
}
