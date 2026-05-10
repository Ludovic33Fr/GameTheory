import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Démonstrations de théorie des jeux · {new Date().getFullYear()}</p>
    </footer>
  );
}
