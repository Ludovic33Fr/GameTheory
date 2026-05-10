import { Layout } from '../../components/Layout';

export default function CommonsTragedyPage() {
  return (
    <Layout crumbs={[{ label: 'Concepts', to: '/' }, { label: 'Tragédie des biens communs' }]}>
      <div style={{ padding: 'var(--space-12) var(--space-16)' }}>
        <h1>Placeholder — Tragédie des biens communs</h1>
      </div>
    </Layout>
  );
}
