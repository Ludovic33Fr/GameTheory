import styles from './EditablePayoffMatrix.module.css';

export type Payoff = [number, number];
export type PayoffMatrix22 = [[Payoff, Payoff], [Payoff, Payoff]];

export interface BestResponses {
  /** rowBest[i][j] = true iff playing row i is a best response to column j (for the row player). */
  rowBest: boolean[][];
  /** colBest[i][j] = true iff playing column j is a best response to row i (for the column player). */
  colBest: boolean[][];
  /** Pure-strategy Nash equilibria, as [rowIdx, colIdx] pairs. */
  nash: Array<[number, number]>;
}

/** Computes best responses and pure Nash equilibria for a 2x2 payoff matrix. */
export function bestResponses(payoffs: PayoffMatrix22): BestResponses {
  const rowBest = [
    [false, false],
    [false, false],
  ];
  const colBest = [
    [false, false],
    [false, false],
  ];

  // Row player chooses to maximise their payoff (index 0) given the column.
  for (let j = 0; j < 2; j++) {
    const v0 = payoffs[0][j][0];
    const v1 = payoffs[1][j][0];
    if (v0 >= v1) rowBest[0][j] = true;
    if (v1 >= v0) rowBest[1][j] = true;
  }

  // Column player chooses to maximise their payoff (index 1) given the row.
  for (let i = 0; i < 2; i++) {
    const v0 = payoffs[i][0][1];
    const v1 = payoffs[i][1][1];
    if (v0 >= v1) colBest[i][0] = true;
    if (v1 >= v0) colBest[i][1] = true;
  }

  const nash: Array<[number, number]> = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      if (rowBest[i][j] && colBest[i][j]) nash.push([i, j]);
    }
  }
  return { rowBest, colBest, nash };
}

interface Props {
  payoffs: PayoffMatrix22;
  rowLabels: [string, string];
  colLabels: [string, string];
  rowPlayer: string;
  colPlayer: string;
  onChange: (next: PayoffMatrix22) => void;
}

export function EditablePayoffMatrix({
  payoffs,
  rowLabels,
  colLabels,
  rowPlayer,
  colPlayer,
  onChange,
}: Props) {
  const br = bestResponses(payoffs);

  const updateCell = (i: number, j: number, who: 0 | 1, raw: string) => {
    const value = Number.parseFloat(raw);
    const next: PayoffMatrix22 = [
      [[...payoffs[0][0]], [...payoffs[0][1]]],
      [[...payoffs[1][0]], [...payoffs[1][1]]],
    ] as PayoffMatrix22;
    next[i][j][who] = Number.isFinite(value) ? value : 0;
    onChange(next);
  };

  return (
    <div className={styles.wrap}>
      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `auto repeat(2, minmax(120px, 1fr))` }}
      >
        <div className={styles.cornerLabel}>
          {colPlayer} →
          <br />
          {rowPlayer} ↓
        </div>
        <div className={styles.colHeader}>{colLabels[0]}</div>
        <div className={styles.colHeader}>{colLabels[1]}</div>

        {[0, 1].map((i) => (
          <div key={i} style={{ display: 'contents' }}>
            <div className={styles.rowLabel}>{rowLabels[i]}</div>
            {[0, 1].map((j) => {
              const [a, b] = payoffs[i][j];
              const rowMark = br.rowBest[i][j];
              const colMark = br.colBest[i][j];
              const isNash = br.nash.some(([ni, nj]) => ni === i && nj === j);
              return (
                <div
                  key={j}
                  className={`${styles.cell} ${isNash ? styles.nash : ''}`}
                >
                  {isNash && <span className={styles.nashBadge}>Nash</span>}
                  <input
                    type="number"
                    step="1"
                    value={a}
                    onChange={(e) => updateCell(i, j, 0, e.target.value)}
                    className={`${styles.input} ${rowMark ? styles.bestResponse : ''}`}
                    aria-label={`Gain ${rowPlayer}, ${rowLabels[i]} contre ${colLabels[j]}`}
                  />
                  <span className={styles.separator}>·</span>
                  <input
                    type="number"
                    step="1"
                    value={b}
                    onChange={(e) => updateCell(i, j, 1, e.target.value)}
                    className={`${styles.input} ${colMark ? styles.bestResponse : ''}`}
                    aria-label={`Gain ${colPlayer}, ${colLabels[j]} contre ${rowLabels[i]}`}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.sample}>5</span>
          <span>meilleure réponse</span>
        </span>
        <span className={styles.legendItem}>
          <span className={styles.sampleNash}>3 · 3</span>
          <span>équilibre de Nash (les deux jouent leur meilleure réponse)</span>
        </span>
      </div>
    </div>
  );
}
