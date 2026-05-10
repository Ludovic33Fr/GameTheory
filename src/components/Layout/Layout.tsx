import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import styles from './Layout.module.css';

interface Crumb { label: string; to?: string; }

interface LayoutProps {
  children: ReactNode;
  crumbs?: Crumb[];
}

export function Layout({ children, crumbs }: LayoutProps) {
  return (
    <div className={styles.shell}>
      <Header crumbs={crumbs} />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
