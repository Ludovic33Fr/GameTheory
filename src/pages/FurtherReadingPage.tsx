import { Layout } from '../components/Layout';

export default function FurtherReadingPage() {
  return (
    <Layout crumbs={[{ label: 'Aller plus loin' }]}>
      <div style={{ padding: 'var(--space-12) var(--space-16)' }}>
        <h1>Aller plus loin</h1>
        <p>À venir.</p>
      </div>
    </Layout>
  );
}
