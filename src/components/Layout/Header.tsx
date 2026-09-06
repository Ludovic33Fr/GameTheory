import { Link, useLocation } from 'react-router-dom';
import { Plate, Pictogram } from '../Sign';
import styles from './Header.module.css';

interface Crumb {
  label: string;
  to?: string;
}

interface HeaderProps {
  crumbs?: Crumb[];
}

const NAV = [
  { to: '/quel-jeu', label: 'Quel jeu ?', icon: 'info' as const },
  { to: '/glossaire', label: 'Glossaire', icon: 'glossary' as const },
  { to: '/aller-plus-loin', label: 'Aller plus loin', icon: 'book' as const },
];

export function Header({ crumbs = [] }: HeaderProps) {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <a href="#contenu" className={styles.skip}>
        Aller au contenu
      </a>

      <div className={styles.left}>
        <Link to="/" className={styles.brand} aria-label="GameTheory, accueil">
          <Plate icon="terminal" size="sm" />
          <span className={styles.brandName}>GameTheory</span>
        </Link>
        {crumbs.length > 0 && (
          <nav className={styles.crumbTrail} aria-label="Fil d'ariane">
            {crumbs.map((c, i) => (
              <span key={i} className={styles.crumbTrail}>
                <Pictogram id="chevron" size={9} className={styles.crumbSep} />
                {c.to ? (
                  <Link to={c.to} className={styles.crumb}>
                    {c.label}
                  </Link>
                ) : (
                  <span className={`${styles.crumb} ${styles.crumbCurrent}`}>{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>

      <nav className={styles.nav} aria-label="Navigation principale">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={styles.navItem}
            aria-current={
              location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)
                ? 'page'
                : undefined
            }
          >
            <Pictogram id={item.icon} size={16} />
            <span className={styles.navLabel}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
