import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { HubMap } from '../components/HubMap';
import { Plate, Pictogram } from '../components/Sign';
import { CONCEPT_ROUTES, connectionsOf, type ConceptId } from '../content/concepts';
import { GAMES, gamesForConcept } from '../content/games';
import styles from './HomePage.module.css';

export default function HomePage() {
  /**
   * Une seule intention partagée par le panneau et le plan : survoler une
   * destination allume sa ligne et ses correspondances des deux côtés.
   */
  const [active, setActive] = useState<ConceptId | null>(null);

  return (
    <Layout>
      <section className={styles.marquee}>
        <Plate icon="arrowDown" size="lg" />
        <h1 className={styles.marqueeHead}>
          <span className={styles.marqueeKind}>Concepts</span>
          <span className={styles.marqueeRange}>01&ndash;06</span>
        </h1>
        <div className={styles.marqueeSide}>
          <p>
            Six concepts fondamentaux, expliqués avec des démos cliquables. Chaque concept
            indique ses correspondances : aucune page n'est un cul-de-sac.
          </p>
          <span className={styles.walk}>
            <Pictogram id="info" size={16} />
            Compte 5 à 10 minutes par concept
          </span>
        </div>
      </section>

      <nav className={styles.rows} aria-label="Les six concepts">
        {CONCEPT_ROUTES.map((c) => {
          const links = connectionsOf(c.id);
          const games = gamesForConcept(c.id);
          return (
            <div
              key={c.id}
              className={`${styles.row} ${active === c.id ? styles.active : ''}`}
              onMouseEnter={() => setActive(c.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(c.id)}
              onBlur={() => setActive(null)}
            >
              <Plate icon={c.icon} size="lg" className={styles.rowPlate} />
              <span className={styles.gate}>{c.gate}</span>
              <span className={styles.rowBody}>
                {/* Le lien couvre toute la ligne ; les jeux restent des liens à part. */}
                <Link to={c.path} className={styles.rowLink}>
                  <span className={styles.rowTitle}>{c.title}</span>
                </Link>
                <span className={styles.transfers}>
                  <span className={styles.transfersLabel}>Correspondances</span>
                  {links.map((l) => (
                    <span
                      key={l.route.id}
                      className={`${styles.transfer} ${
                        active === l.route.id ? styles.transferOn : ''
                      }`}
                      title={l.route.title}
                    >
                      {l.route.gate}
                    </span>
                  ))}
                </span>
                {games.length > 0 && (
                  <span className={styles.games}>
                    <span className={styles.transfersLabel}>
                      {games.length > 1 ? 'Jeux' : 'Jeu'}
                    </span>
                    {games.map((g) => (
                      <Link key={g.id} to={`/quel-jeu/${g.id}`} className={styles.gameChip}>
                        {g.title}
                      </Link>
                    ))}
                  </span>
                )}
              </span>
              <Pictogram id="arrowRight" size={30} className={styles.rowArrow} />
            </div>
          );
        })}
      </nav>

      <section className={styles.desk} aria-labelledby="desk-titre">
        <Plate icon="info" size="lg" />
        <div className={styles.deskBody}>
          <h2 id="desk-titre" className={styles.deskTitle}>
            Vous ne savez pas quelle porte&nbsp;?
          </h2>
          <p className={styles.deskText}>
            Décrivez votre situation en trois ou quatre questions : le guichet identifie
            lequel des {GAMES.length} jeux vous jouez et vous indique la porte à prendre.
          </p>
        </div>
        <Link to="/quel-jeu" className={styles.deskLink}>
          <span className={styles.deskBox}>
            <Pictogram id="arrowRight" size={15} />
          </span>
          Quel jeu jouez-vous&nbsp;?
        </Link>
      </section>

      <section className={`${styles.planBand} onBlack`} aria-labelledby="plan-titre">
        <div className={styles.planHead}>
          <Plate icon="map" size="md" tone="yellow" />
          <h2 id="plan-titre" className={styles.planTitle}>
            Plan du terminal
          </h2>
          <p className={styles.planNote}>
            Le trait dit de quelle nature est le lien. Survole une destination pour isoler
            ses correspondances.
          </p>
        </div>
        <HubMap active={active} onActive={setActive} />
      </section>
    </Layout>
  );
}
