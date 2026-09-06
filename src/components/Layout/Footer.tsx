import { Link } from 'react-router-dom';
import { CONCEPT_ROUTES } from '../../content/concepts';
import { Plate, Pictogram } from '../Sign';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={`${styles.footer} onBlack`}>
      <div className={styles.grid}>
        <div>
          <Link to="/" className={styles.brand}>
            <Plate icon="terminal" size="sm" />
            <span className={styles.brandName}>GameTheory</span>
          </Link>
          <p className={styles.tagline}>
            Six concepts de théorie des jeux, expliqués par des démonstrations qu'on manipule.
          </p>
        </div>

        <div className={styles.columns}>
          <div>
            <h2 className={styles.colTitle}>Concepts</h2>
            <ul className={styles.list}>
              {CONCEPT_ROUTES.slice(0, 3).map((c) => (
                <li key={c.id}>
                  <Link to={c.path} className={styles.link}>
                    <span className={styles.gate}>{c.gate}</span>
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {/* Suite de la même colonne : le titre est lu, l'entretoise aligne. */}
            <h2 className={styles.colTitleHidden}>Concepts (suite)</h2>
            <div className={styles.colSpacer} aria-hidden="true" />
            <ul className={styles.list}>
              {CONCEPT_ROUTES.slice(3).map((c) => (
                <li key={c.id}>
                  <Link to={c.path} className={styles.link}>
                    <span className={styles.gate}>{c.gate}</span>
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={styles.colTitle}>Ressources</h2>
            <ul className={styles.list}>
              <li>
                <Link to="/quel-jeu" className={styles.link}>
                  <Pictogram id="info" size={15} />
                  Quel jeu jouez-vous ?
                </Link>
              </li>
              <li>
                <Link to="/glossaire" className={styles.link}>
                  <Pictogram id="glossary" size={15} />
                  Glossaire
                </Link>
              </li>
              <li>
                <Link to="/aller-plus-loin" className={styles.link}>
                  <Pictogram id="book" size={15} />
                  Aller plus loin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.baseline}>
        <span>Démonstrations de théorie des jeux · {new Date().getFullYear()}</span>
        <span>Les six concepts sont reliés : aucune page n'est un cul-de-sac.</span>
      </div>
    </footer>
  );
}
