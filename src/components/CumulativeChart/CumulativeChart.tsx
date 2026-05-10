import styles from './CumulativeChart.module.css';

interface Props {
  /** Cumulative running totals for each side, indexed by round (excluding round 0). */
  you: number[];
  opp: number[];
  youLabel?: string;
  oppLabel?: string;
  /** Hint shown when a higher value means a better outcome. With PD's negative payoffs, higher = better. */
  caption?: string;
}

const W = 600;
const H = 240;
const PAD_L = 40;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 28;
const INNER_W = W - PAD_L - PAD_R;
const INNER_H = H - PAD_T - PAD_B;

export function CumulativeChart({
  you,
  opp,
  youLabel = 'Toi',
  oppLabel = 'Adversaire',
  caption,
}: Props) {
  if (you.length === 0) {
    return (
      <div className={styles.empty}>
        Le graphique apparaîtra après le premier coup joué.
      </div>
    );
  }

  // Always include 0 (origin) so axes feel anchored.
  const all = [0, ...you, ...opp];
  let yMin = Math.min(...all);
  let yMax = Math.max(...all);
  if (yMin === yMax) {
    yMin -= 1;
    yMax += 1;
  }
  const ticks = niceTicks(yMin, yMax, 4);
  yMin = ticks[0];
  yMax = ticks[ticks.length - 1];

  const N = you.length;
  const x = (i: number) => PAD_L + (i / N) * INNER_W;
  const y = (v: number) => PAD_T + INNER_H - ((v - yMin) / (yMax - yMin)) * INNER_H;

  const buildPath = (arr: number[]) => {
    const pts = [0, ...arr];
    return pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ');
  };

  const youLast = you[you.length - 1];
  const oppLast = opp[opp.length - 1];

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className="label-mono">Score cumulé</span>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.swatch} style={{ background: 'var(--accent-primary)' }} />
            {youLabel} <span style={{ color: 'var(--text-primary)' }}>{youLast}</span>
          </span>
          <span className={styles.legendItem}>
            <span className={styles.swatch} style={{ background: 'var(--accent-secondary)' }} />
            {oppLabel} <span style={{ color: 'var(--text-primary)' }}>{oppLast}</span>
          </span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} role="img" aria-label="Score cumulé">
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={y(t)}
              y2={y(t)}
              className={t === 0 ? styles.zeroLine : styles.gridline}
            />
            <text x={PAD_L - 6} y={y(t) + 4} textAnchor="end" className={styles.tickLabel}>
              {t}
            </text>
          </g>
        ))}
        <line x1={PAD_L} x2={PAD_L} y1={PAD_T} y2={PAD_T + INNER_H} className={styles.axis} />
        <line
          x1={PAD_L}
          x2={W - PAD_R}
          y1={PAD_T + INNER_H}
          y2={PAD_T + INNER_H}
          className={styles.axis}
        />
        <text x={PAD_L} y={H - 8} className={styles.tickLabel}>0</text>
        <text x={W - PAD_R} y={H - 8} textAnchor="end" className={styles.tickLabel}>{N}</text>
        <text x={(PAD_L + W - PAD_R) / 2} y={H - 8} textAnchor="middle" className={styles.tickLabel}>
          tours
        </text>

        <path d={buildPath(opp)} fill="none" stroke="var(--accent-secondary)" strokeWidth="2" />
        <path d={buildPath(you)} fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" />

        <circle cx={x(N)} cy={y(youLast)} r="3.5" fill="var(--accent-primary)" />
        <circle cx={x(N)} cy={y(oppLast)} r="3" fill="var(--accent-secondary)" />
      </svg>
      {caption && (
        <p style={{ marginTop: 'var(--space-2)', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
          {caption}
        </p>
      )}
    </div>
  );
}

function niceTicks(min: number, max: number, count: number): number[] {
  const range = max - min;
  const raw = range / count;
  const mag = Math.pow(10, Math.floor(Math.log10(Math.max(Math.abs(raw), 1e-9))));
  const norm = raw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const out: number[] = [];
  for (let v = lo; v <= hi + step / 2; v += step) {
    out.push(Math.round(v * 1000) / 1000);
  }
  return out.length >= 2 ? out : [min, max];
}
