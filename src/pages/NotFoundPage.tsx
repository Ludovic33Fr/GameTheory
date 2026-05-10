import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

export default function NotFoundPage() {
  return (
    <Layout>
      <div style={{ padding: 'var(--space-12) var(--space-16)', textAlign: 'center' }}>
        <h1>404</h1>
        <p>Cette page n'existe pas.</p>
        <Link to="/" style={{ color: 'var(--accent-primary)' }}>Retour à l'accueil</Link>
      </div>
    </Layout>
  );
}
