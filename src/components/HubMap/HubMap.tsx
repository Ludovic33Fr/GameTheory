import { useNavigate } from 'react-router-dom';
import { Pictogram } from '../Sign';
import {
  CONCEPT_EDGES,
  CONCEPT_ROUTES,
  EDGE_KIND_LABEL,
  conceptById,
  connectionsOf,
  type ConceptId,
  type EdgeKind,
} from '../../content/concepts';
import styles from './HubMap.module.css';

const W = 900;
const H = 440;
const PLATE_W = 196;
const PLATE_H = 66;

const POS: Record<ConceptId, { x: number; y: number }> = {
  iterated: { x: 150, y: 66 },
  sequential: { x: 750, y: 66 },
  nash: { x: 450, y: 176 },
  prisoners: { x: 150, y: 286 },
  mixed: { x: 750, y: 286 },
  commons: { x: 450, y: 396 },
};

const EDGE_CLASS: Record<EdgeKind, string> = {
  exemple: styles.edgeExemple,
  extension: styles.edgeExtension,
  repetition: styles.edgeRepetition,
  echelle: styles.edgeEchelle,
};

interface HubMapProps {
  /** Destination mise en avant, partagée avec le panneau des six lignes. */
  active?: ConceptId | null;
  onActive?: (id: ConceptId | null) => void;
}

export function HubMap({ active = null, onActive }: HubMapProps) {
  const navigate = useNavigate();

  const isOnEdge = (from: ConceptId, to: ConceptId) =>
    active !== null && (from === active || to === active);

  const isNodeLinked = (id: ConceptId) =>
    active === id ||
    CONCEPT_EDGES.some(
      (e) => (e.from === active && e.to === id) || (e.to === active && e.from === id)
    );

  return (
    <div className={styles.wrap}>
      <div className={styles.scroller}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className={styles.svg}
          role="img"
          aria-label="Plan des six concepts et de leurs correspondances"
        >
          {CONCEPT_EDGES.map((e, i) => {
            const a = POS[e.from];
            const b = POS[e.to];
            const lit = isOnEdge(e.from, e.to);
            const dim = active !== null && !lit;
            const tone = lit ? styles.edgeLit : dim ? styles.edgeDim : '';
            return (
              <g key={i}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  className={`${styles.edge} ${EDGE_CLASS[e.kind]} ${tone}`}
                />
                {e.kind === 'echelle' && (
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    className={`${styles.edge} ${styles.edgeEchelleCore}`}
                  />
                )}
              </g>
            );
          })}

          {CONCEPT_ROUTES.map((c) => {
            const p = POS[c.id];
            const x = p.x - PLATE_W / 2;
            const y = p.y - PLATE_H / 2;
            const dim = active !== null && !isNodeLinked(c.id);
            return (
              <a
                key={c.id}
                href={c.path}
                className={`${styles.node} ${active === c.id ? styles.nodeOn : ''} ${
                  dim ? styles.nodeDim : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(c.path);
                }}
                onMouseEnter={() => onActive?.(c.id)}
                onMouseLeave={() => onActive?.(null)}
                onFocus={() => onActive?.(c.id)}
                onBlur={() => onActive?.(null)}
                aria-label={`${c.title}, porte ${c.gate}`}
              >
                <rect
                  x={x - 4}
                  y={y - 4}
                  width={PLATE_W + 8}
                  height={PLATE_H + 8}
                  rx={12}
                  className={styles.focusRing}
                  fill="none"
                />
                <rect
                  x={x}
                  y={y}
                  width={PLATE_W}
                  height={PLATE_H}
                  rx={8}
                  className={styles.nodePlate}
                />
                <text x={x + 16} y={p.y + 10} className={styles.gate}>
                  {c.gate}
                </text>
                <text x={x + 62} y={p.y - 3} className={styles.title}>
                  {c.lines[0]}
                </text>
                <text x={x + 62} y={p.y + 14} className={styles.title}>
                  {c.lines[1]}
                </text>
              </a>
            );
          })}
        </svg>
      </div>

      <p className={styles.scrollHint}>
        <Pictogram id="arrowRight" size={14} />
        Fais glisser le plan pour voir les six destinations
      </p>

      <ul className={styles.legend}>
        {(Object.keys(EDGE_KIND_LABEL) as EdgeKind[]).map((kind) => (
          <li key={kind} className={styles.legendItem}>
            <svg width="34" height="10" className={styles.legendSwatch} aria-hidden="true">
              <line
                x1="0"
                y1="5"
                x2="34"
                y2="5"
                className={`${styles.edge} ${EDGE_CLASS[kind]}`}
              />
              {kind === 'echelle' && (
                <line
                  x1="0"
                  y1="5"
                  x2="34"
                  y2="5"
                  className={`${styles.edge} ${styles.edgeEchelleCore}`}
                />
              )}
            </svg>
            {EDGE_KIND_LABEL[kind]}
          </li>
        ))}
      </ul>

      {/* Le même réseau en texte. Les plaques du plan sont déjà des liens :
          on décrit ici les correspondances, sans créer de tabulations fantômes. */}
      <ul className={styles.srOnly}>
        {CONCEPT_ROUTES.map((c) => (
          <li key={c.id}>
            {c.title} — correspondances :{' '}
            {connectionsOf(c.id)
              .map((l) => `${conceptById(l.route.id).title} (${EDGE_KIND_LABEL[l.kind]})`)
              .join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}
