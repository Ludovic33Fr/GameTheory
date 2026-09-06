import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import styles from './Layout.module.css';

interface Crumb {
  label: string;
  to?: string;
}

interface LayoutProps {
  children: ReactNode;
  crumbs?: Crumb[];
  /** Titre de l'onglet. Le nom du site est ajouté après. */
  title?: string;
}

const SITE = 'GameTheory';

export function Layout({ children, crumbs, title }: LayoutProps) {
  const { pathname } = useLocation();

  /* Une nouvelle destination s'ouvre en haut de page : on ne garde pas le
     défilement de la page précédente, sinon on atterrit au milieu du panneau. */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : `${SITE} — six concepts de théorie des jeux`;
  }, [title]);

  return (
    <div className={styles.shell}>
      <Header crumbs={crumbs} />
      <main id="contenu" className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
