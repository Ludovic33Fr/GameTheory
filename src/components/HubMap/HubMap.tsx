import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CONCEPT_ROUTES, type ConceptId } from '../../routes';
import styles from './HubMap.module.css';

interface NodePos { id: ConceptId; x: number; y: number; }
const NODES: NodePos[] = [
  { id: 'prisoners',  x: 200, y: 320 },
  { id: 'nash',       x: 460, y: 220 },
  { id: 'mixed',      x: 700, y: 320 },
  { id: 'iterated',   x: 200, y: 140 },
  { id: 'sequential', x: 460, y: 60  },
  { id: 'commons',    x: 700, y: 140 },
];

interface Edge { from: ConceptId; to: ConceptId; }
const EDGES: Edge[] = [
  { from: 'prisoners', to: 'nash' },
  { from: 'prisoners', to: 'iterated' },
  { from: 'prisoners', to: 'commons' },
  { from: 'mixed', to: 'nash' },
  { from: 'sequential', to: 'nash' },
  { from: 'iterated', to: 'commons' },
];

export function HubMap() {
  const [hovered, setHovered] = useState<ConceptId | null>(null);
  const navigate = useNavigate();

  const isEdgeHighlighted = (e: Edge) => hovered !== null && (e.from === hovered || e.to === hovered);

  return (
    <div className={styles.wrap}>
      <svg viewBox="0 0 880 400" className={styles.svg} role="img" aria-label="Carte des concepts">
        {EDGES.map((e, i) => {
          const a = NODES.find((n) => n.id === e.from)!;
          const b = NODES.find((n) => n.id === e.to)!;
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className={`${styles.edge} ${isEdgeHighlighted(e) ? styles.highlighted : ''}`}
            />
          );
        })}
        {NODES.map((n, i) => {
          const route = CONCEPT_ROUTES.find((c) => c.id === n.id)!;
          const isMuted = hovered !== null && hovered !== n.id && !EDGES.some((e) => (e.from === hovered && e.to === n.id) || (e.to === hovered && e.from === n.id));
          return (
            <motion.g
              key={n.id}
              className={styles.node}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(n.id)}
              onBlur={() => setHovered(null)}
              onClick={() => navigate(route.path)}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(route.path); }}
              role="link"
              aria-label={route.title}
            >
              <circle cx={n.x} cy={n.y} r={56} className={styles.nodeCircle} />
              <text x={n.x} y={n.y - 4} textAnchor="middle" className={`${styles.nodeLabel} ${isMuted ? styles.muted : ''}`}>
                {route.title.split(' ').slice(0, 2).join(' ')}
              </text>
              <text x={n.x} y={n.y + 14} textAnchor="middle" className={`${styles.nodeLabel} ${isMuted ? styles.muted : ''}`}>
                {route.title.split(' ').slice(2).join(' ')}
              </text>
            </motion.g>
          );
        })}
      </svg>
      <div className={styles.fallback}>
        {CONCEPT_ROUTES.map((c) => (
          <Link key={c.id} to={c.path} className={styles.fallbackItem}>{c.title} →</Link>
        ))}
      </div>
    </div>
  );
}
