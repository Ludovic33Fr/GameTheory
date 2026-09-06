import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Plate, Pictogram } from '../components/Sign';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ROOT_ID, TREE, walk, type Path } from '../content/decisionTree';
import { GAMES } from '../content/games';
import { conceptById } from '../content/concepts';
import styles from './WhichGame.module.css';

const LETTERS = ['A', 'B', 'C', 'D'];

function parsePath(raw: string | null): Path {
  if (!raw) return [];
  return raw
    .split('.')
    .map((s) => Number.parseInt(s, 10))
    .filter((n) => Number.isInteger(n) && n >= 0);
}

export default function WhichGamePage() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  const path = useMemo(() => parsePath(params.get('r')), [params]);
  const state = useMemo(() => walk(path), [path]);
  const node = state.node ?? TREE[ROOT_ID];

  const setPath = useCallback(
    (next: Path) => {
      if (next.length === 0) setParams({}, { replace: false });
      else setParams({ r: next.join('.') }, { replace: false });
    },
    [setParams]
  );

  /* Un chemin qui aboutit à un jeu mène à sa fiche : la question n'a plus lieu d'être. */
  useEffect(() => {
    if (state.game) navigate(`/quel-jeu/${state.game}`, { replace: true });
  }, [state.game, navigate]);

  /* À chaque réponse, la question suivante remonte sous le panneau : on ne
     reste pas planté au niveau des réponses de la question d'avant. */
  const questionRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    questionRef.current?.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
  }, [path, reduced]);

  const choose = useCallback(
    (idx: number) => {
      const option = node.options[idx];
      if (!option) return;
      if ('game' in option.next) navigate(`/quel-jeu/${option.next.game}`);
      else setPath([...path, idx]);
    },
    [node, path, setPath, navigate]
  );

  const back = useCallback(() => setPath(path.slice(0, -1)), [path, setPath]);
  const restart = useCallback(() => setPath([]), [setPath]);

  /* Au clavier : A, B, C, D choisissent ; ← ou Retour arrière revient en arrière. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      const letter = e.key.toUpperCase();
      const idx = LETTERS.indexOf(letter);
      if (idx !== -1 && idx < node.options.length) {
        e.preventDefault();
        choose(idx);
      } else if ((e.key === 'Backspace' || e.key === 'ArrowLeft') && path.length > 0) {
        e.preventDefault();
        back();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [node, choose, back, path.length]);

  const questionNumber = state.steps.length + 1;

  return (
    <Layout crumbs={[{ label: 'Quel jeu ?' }]} title="Quel jeu jouez-vous ?">
      <section className={styles.head}>
        <Plate icon="info" size="lg" />
        <div>
          <h1 className={styles.title}>Quel jeu jouez-vous ?</h1>
          <p className={styles.lede}>
            Décrivez votre situation en trois ou quatre questions. Le panneau vous indique le
            jeu dont il s'agit — et la porte à prendre pour le comprendre.
          </p>
        </div>
      </section>

      <nav className={styles.trail} aria-label="Vos réponses">
        <span className={styles.trailLabel}>Vos réponses</span>
        {state.steps.map((s, i) => (
          <button
            key={s.node.id}
            type="button"
            className={styles.trailStep}
            onClick={() => setPath(path.slice(0, i))}
            title={`Revenir à : ${s.node.question}`}
          >
            <span className={styles.trailStepLetter}>{LETTERS[path[i]]}</span>
            {s.choice.label}
          </button>
        ))}
        <span className={styles.trailNext} aria-hidden="true">
          {questionNumber}
        </span>
      </nav>

      <section ref={questionRef} className={styles.question} aria-live="polite">
        <div
          key={node.id}
          className={`${styles.questionInner} ${reduced ? '' : styles.questionFlap}`}
        >
          <p className={styles.questionCount}>Question {questionNumber}</p>
          <h2 className={styles.questionText}>{node.question}</h2>
          {node.hint && <p className={styles.questionHint}>{node.hint}</p>}
        </div>
      </section>

      <div className={styles.options} role="group" aria-label="Réponses possibles">
        {node.options.map((opt, i) => (
          <button key={i} type="button" className={styles.option} onClick={() => choose(i)}>
            <span className={styles.letter} aria-hidden="true">
              {LETTERS[i]}
            </span>
            <span>
              <span className={styles.optionLabel}>{opt.label}</span>
              {opt.example && <span className={styles.optionExample}>{opt.example}</span>}
            </span>
            <Pictogram id="arrowRight" size={28} className={styles.optionArrow} />
          </button>
        ))}
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.control} onClick={back} disabled={path.length === 0}>
          <Pictogram id="arrowLeft" size={18} />
          Question précédente
        </button>
        <span className={styles.keyHint}>
          Au clavier :{' '}
          {LETTERS.slice(0, node.options.length).map((l) => (
            <kbd key={l} className={styles.key}>
              {l}
            </kbd>
          ))}
          pour répondre, <kbd className={styles.key}>←</kbd> pour revenir
        </span>
        <button type="button" className={styles.control} onClick={restart} disabled={path.length === 0}>
          <Pictogram id="iterated" size={16} />
          Recommencer
        </button>
      </div>

      <section aria-labelledby="repertoire-titre">
        <div className={styles.directoryHead}>
          <Plate icon="glossary" size="md" />
          <h2 id="repertoire-titre" className={styles.directoryTitle}>
            Les {GAMES.length} jeux du répertoire
          </h2>
          <p className={styles.directoryNote}>
            Rangés par porte, comme sur l'accueil. Le carré blanc signale une démonstration sur le site.
          </p>
        </div>
        <ul className={styles.directory}>
          {[...GAMES]
            .sort((a, b) =>
              conceptById(a.concepts[0]).gate.localeCompare(conceptById(b.concepts[0]).gate)
            )
            .map((g) => (
            <li key={g.id} style={{ display: 'contents' }}>
              <Link to={`/quel-jeu/${g.id}`} className={styles.directoryItem}>
                <span className={styles.directoryGate}>{conceptById(g.concepts[0]).gate}</span>
                <span
                  className={`${styles.directoryMark} ${g.onSite ? styles.directoryMarkOnSite : ''}`}
                  aria-hidden="true"
                />
                {g.title}
              </Link>
            </li>
            ))}
        </ul>
      </section>
    </Layout>
  );
}
