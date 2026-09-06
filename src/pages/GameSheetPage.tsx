import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PayoffMatrix } from '../components/PayoffMatrix';
import { Plate, Pictogram } from '../components/Sign';
import { findPureNashEquilibria } from '../games/nash';
import { conceptById } from '../content/concepts';
import { pathTo, walk } from '../content/decisionTree';
import {
  GAMES,
  gameById,
  PLAYERS_LABEL,
  REPETITION_LABEL,
  TIMING_LABEL,
} from '../content/games';
import transfer from '../components/ConceptPage/ConceptPage.module.css';
import styles from './GameSheet.module.css';
import NotFoundPage from './NotFoundPage';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function GameSheetPage() {
  const { gameId = '' } = useParams();
  const game = gameById(gameId);

  const route = useMemo(() => {
    const p = pathTo(gameId);
    return p ? { path: p, steps: walk(p).steps } : null;
  }, [gameId]);

  const equilibria = useMemo(
    () => (game?.matrix ? findPureNashEquilibria(game.matrix.game) : []),
    [game]
  );

  if (!game) return <NotFoundPage />;

  const mainConcept = game.concepts[0];
  const siblings = GAMES.filter((g) => g.id !== game.id && g.concepts[0] === mainConcept).slice(0, 3);

  return (
    <Layout
      crumbs={[{ label: 'Quel jeu ?', to: '/quel-jeu' }, { label: game.title }]}
      title={game.title}
    >
      <section className={styles.hero}>
        <Plate icon="terminal" size="lg" />
        <div>
          <p className={styles.found}>
            <Pictogram id="info" size={13} />
            Jeu identifié
          </p>
          <h1 className={styles.title}>{game.title}</h1>
          {game.aliases && game.aliases.length > 0 && (
            <p className={styles.aliases}>
              {game.aliases.map((a) => (
                <span key={a} className={styles.alias}>
                  {a}
                </span>
              ))}
            </p>
          )}
          <p className={styles.tagline}>{game.tagline}</p>
        </div>
      </section>

      <section className={styles.facts} aria-label="Structure du jeu">
        <div className={styles.fact}>
          <Plate icon="prisoners" size="sm" />
          <span>
            <span className={styles.factLabel}>Qui décide</span>
            <span className={styles.factValue}>{PLAYERS_LABEL[game.players]}</span>
          </span>
        </div>
        <div className={styles.fact}>
          <Plate icon={game.timing === 'simultane' ? 'nash' : 'sequential'} size="sm" />
          <span>
            <span className={styles.factLabel}>Quand</span>
            <span className={styles.factValue}>{TIMING_LABEL[game.timing]}</span>
          </span>
        </div>
        <div className={styles.fact}>
          <Plate icon="iterated" size="sm" />
          <span>
            <span className={styles.factLabel}>Combien de fois</span>
            <span className={styles.factValue}>{REPETITION_LABEL[game.repeated]}</span>
          </span>
        </div>
        {route && (
          <div className={styles.route}>
            <span className={styles.routeLabel}>Le chemin</span>
            {route.steps.map((s, i) => (
              <Link
                key={s.node.id}
                to={`/quel-jeu?r=${route.path.slice(0, i).join('.')}`}
                className={styles.routeStep}
                title={s.node.question}
              >
                <span className={styles.routeLetter}>{LETTERS[route.path[i]]}</span>
                {s.choice.label}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className={`${styles.gameBand} onBlack`} aria-labelledby="jeu-titre">
        <div className={styles.gameHead}>
          <Plate icon="mixed" size="md" tone="yellow" />
          <h2 id="jeu-titre" className={styles.gameTitle}>
            Le jeu&nbsp;: {game.title}
          </h2>
        </div>
        <div className={styles.gameGrid}>
          {game.matrix && (
            <div>
              <PayoffMatrix
                game={game.matrix.game}
                equilibria={equilibria}
                actionLabels={game.matrix.labels}
              />
              {equilibria.length === 0 && (
                <p className={styles.noPure}>
                  <Pictogram id="mixed" size={14} />
                  Aucun équilibre en stratégies pures : l'équilibre est un tirage au sort.
                </p>
              )}
            </div>
          )}
          <div>
            <p className={styles.story}>
              <strong>La situation</strong>
              {game.story}
            </p>
            {game.onSite && (
              <Link to={conceptById(game.onSite).path} className={styles.demoLink}>
                <span className={styles.demoBox}>
                  <Pictogram id="arrowRight" size={15} />
                </span>
                Manipuler la démonstration
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className={styles.readBand}>
        <div className="prose">
          <h2>Ce qui se passe</h2>
          <p>{game.whatHappens}</p>
          <h2>Ce qu'il enseigne</h2>
          <p>{game.lesson}</p>
        </div>
      </section>

      <section className={transfer.transferBand} aria-labelledby="portes-titre">
        <div className={transfer.transferHead}>
          <Plate icon="arrowRight" size="md" />
          <h2 id="portes-titre" className={transfer.transferTitle}>
            Les portes à prendre
          </h2>
        </div>
        {game.concepts.map((id, i) => {
          const c = conceptById(id);
          return (
            <Link key={id} to={c.path} className={transfer.transferRow}>
              <Plate icon={c.icon} size="md" className={transfer.transferPlate} />
              <span className={transfer.transferGate}>{c.gate}</span>
              <span>
                <span className={transfer.transferName}>{c.title}</span>
                <span className={transfer.transferKind}>
                  {i === 0 ? 'Concept principal' : 'Concept lié'}
                </span>
              </span>
              <Pictogram id="arrowRight" size={26} className={transfer.transferArrow} />
            </Link>
          );
        })}
      </section>

      {siblings.length > 0 && (
        <section className={styles.siblings} aria-labelledby="voisins-titre">
          <div className={styles.siblingsHead}>
            <Plate icon="map" size="md" />
            <h2 id="voisins-titre" className={styles.siblingsTitle}>
              Jeux voisins
            </h2>
          </div>
          {siblings.map((g) => (
            <Link key={g.id} to={`/quel-jeu/${g.id}`} className={styles.siblingRow}>
              <span>
                <span className={styles.siblingName}>{g.title}</span>
                <span className={styles.siblingTag}>{g.tagline}</span>
              </span>
              <Pictogram id="arrowRight" size={22} />
            </Link>
          ))}
        </section>
      )}

      <nav className={styles.controls} aria-label="Guichet">
        <Link to="/quel-jeu" className={styles.control}>
          <Pictogram id="arrowLeft" size={26} />
          <span>
            <span className={styles.controlLabel}>Renseignements</span>
            <span className={styles.controlName}>Refaire le questionnaire</span>
          </span>
        </Link>
        <Link to="/" className={`${styles.control} ${styles.controlRight}`}>
          <span>
            <span className={styles.controlLabel}>Retour</span>
            <span className={styles.controlName}>Tous les concepts</span>
          </span>
          <Pictogram id="arrowRight" size={26} />
        </Link>
      </nav>
    </Layout>
  );
}
