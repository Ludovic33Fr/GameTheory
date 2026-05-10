import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

interface Crumb { label: string; to?: string; }

interface HeaderProps {
  crumbs?: Crumb[];
}

export function Header({ crumbs = [] }: HeaderProps) {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <div className={styles.crumbs}>
        <Link to="/" className={styles.brand}>GameTheory</Link>
        {crumbs.map((c, i) => (
          <span key={i} className={styles.crumbs}>
            <span className={styles.crumbSep}>/</span>
            {c.to ? <Link to={c.to}>{c.label}</Link> : <span className={styles.crumbCurrent}>{c.label}</span>}
          </span>
        ))}
      </div>
      <nav className={styles.nav} aria-label="Navigation principale">
        <Link to="/glossaire" aria-current={location.pathname === '/glossaire' ? 'page' : undefined}>Glossaire</Link>
        <Link to="/aller-plus-loin" aria-current={location.pathname === '/aller-plus-loin' ? 'page' : undefined}>Aller plus loin</Link>
      </nav>
    </header>
  );
}
