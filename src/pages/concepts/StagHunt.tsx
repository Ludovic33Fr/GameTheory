import { useMemo, useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { PayoffMatrix } from '../../components/PayoffMatrix';
import { Plate, Pictogram, FlapValue, signStyles } from '../../components/Sign';
import { stagHuntContent } from '../../content/stagHunt';
import { findPureNashEquilibria } from '../../games/nash';
import {
  DEFAULT_STAG_HUNT,
  evolveStagShare,
  expectedGains,
  isStagHunt,
  makeStagHunt,
  trustThreshold,
  type StagHuntPayoffs,
} from '../../games/stagHunt';
import d from '../../styles/demo.module.css';

const LABELS = [
  ['Cerf', 'Lièvre'],
  ['Cerf', 'Lièvre'],
];

/** Générations simulées dans la population de chasseurs. */
const GENERATIONS = 30;

const FIELDS: { key: keyof StagHuntPayoffs; label: string }[] = [
  { key: 'stag', label: 'Cerf pris à deux' },
  { key: 'hare', label: 'Lièvre' },
  { key: 'alone', label: 'Cerf raté, seul' },
];

function payoffsEqual(a: StagHuntPayoffs, b: StagHuntPayoffs): boolean {
  return a.stag === b.stag && a.hare === b.hare && a.alone === b.alone;
}

function pct(x: number): string {
  return `${Math.round(x * 100)} %`;
}

/* ---------- Graphique : la part de chasseurs de cerf, génération par génération ---------- */

const CW = 600;
const CH = 220;
const PAD_L = 44;
const PAD_R = 16;
const PAD_T = 14;
const PAD_B = 28;
const IW = CW - PAD_L - PAD_R;
const IH = CH - PAD_T - PAD_B;

function ShareChart({ path, threshold }: { path: number[]; threshold: number | null }) {
  const n = path.length - 1;
  const x = (i: number) => PAD_L + (i / n) * IW;
  const y = (v: number) => PAD_T + IH - v * IH;
  const line = path.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const final = path[n];

  return (
    <svg
      viewBox={`0 0 ${CW} ${CH}`}
      className={d.shareSvg}
      role="img"
      aria-label={`Part de chasseurs de cerf sur ${n} générations : de ${pct(path[0])} à ${pct(final)}.`}
    >
      {[0, 0.25, 0.5, 0.75, 1].map((v) => (
        <g key={v}>
          <line x1={PAD_L} x2={CW - PAD_R} y1={y(v)} y2={y(v)} className={d.shareGrid} />
          <text x={PAD_L - 8} y={y(v) + 4} textAnchor="end" className={d.shareTick}>
            {Math.round(v * 100)}
          </text>
        </g>
      ))}
      <line x1={PAD_L} x2={PAD_L} y1={PAD_T} y2={PAD_T + IH} className={d.shareAxis} />
      <line x1={PAD_L} x2={CW - PAD_R} y1={PAD_T + IH} y2={PAD_T + IH} className={d.shareAxis} />
      <text x={PAD_L} y={CH - 8} className={d.shareTick}>
        génération 0
      </text>
      <text x={CW - PAD_R} y={CH - 8} textAnchor="end" className={d.shareTick}>
        {n}
      </text>

      {threshold !== null && threshold > 0 && threshold < 1 && (
        <>
          <line
            x1={PAD_L}
            x2={CW - PAD_R}
            y1={y(threshold)}
            y2={y(threshold)}
            className={d.shareThreshold}
          />
          <text
            x={CW - PAD_R}
            y={y(threshold) - 6}
            textAnchor="end"
            className={d.shareThresholdLabel}
          >
            seuil {pct(threshold)}
          </text>
        </>
      )}

      <path d={line} className={d.shareLine} />
      <circle cx={x(n)} cy={y(final)} r={5} className={d.shareDot} />
    </svg>
  );
}

/* ---------- La démonstration ---------- */

function Demo() {
  const [payoffs, setPayoffs] = useState<StagHuntPayoffs>(DEFAULT_STAG_HUNT);
  const [trustPct, setTrustPct] = useState(60);
  const [sharePct, setSharePct] = useState(60);

  const game = useMemo(() => makeStagHunt(payoffs), [payoffs]);
  const equilibria = useMemo(() => findPureNashEquilibria(game), [game]);
  const threshold = useMemo(() => trustThreshold(payoffs), [payoffs]);
  const gains = expectedGains(payoffs, trustPct / 100);
  const path = useMemo(
    () => evolveStagShare(payoffs, sharePct / 100, GENERATIONS),
    [payoffs, sharePct]
  );

  const valid = isStagHunt(payoffs);
  const modified = !payoffsEqual(payoffs, DEFAULT_STAG_HUNT);
  const finalShare = path[path.length - 1];

  const setField = (key: keyof StagHuntPayoffs, raw: string) => {
    const v = Number.parseFloat(raw);
    setPayoffs({ ...payoffs, [key]: Number.isFinite(v) ? v : 0 });
  };

  const verdict =
    gains.stag > gains.hare
      ? { text: 'Pars au cerf.', stag: true }
      : gains.stag < gains.hare
        ? { text: 'Rabats-toi sur le lièvre.', stag: false }
        : { text: 'Les deux se valent : tu es pile sur le seuil.', stag: null };

  return (
    <div>
      <div className="demoSplit">
        <div className={d.card}>
          <div className={d.cardTitle}>Les gains</div>
          <div className={d.stack}>
            {FIELDS.map((f) => (
              <label key={f.key} className={d.fieldRow} htmlFor={`stag-${f.key}`}>
                <span style={{ flex: 1, minWidth: 120 }}>{f.label}</span>
                <input
                  id={`stag-${f.key}`}
                  type="number"
                  step="1"
                  value={payoffs[f.key]}
                  onChange={(e) => setField(f.key, e.target.value)}
                  className={d.numField}
                />
              </label>
            ))}
          </div>

          <div style={{ marginTop: 'var(--space-4)' }}>
            <PayoffMatrix game={game} equilibria={equilibria} actionLabels={LABELS} />
          </div>

          <div className={d.countStrip}>
            <span className={d.count}>
              <span className={d.countNum}>
                <FlapValue value={equilibria.length} />
              </span>
              {equilibria.length > 1 ? 'équilibres de Nash' : 'équilibre de Nash'}
            </span>
            {modified && (
              <button onClick={() => setPayoffs(DEFAULT_STAG_HUNT)} className={d.reset}>
                <Pictogram id="iterated" size={14} />
                Gains du manuel
              </button>
            )}
          </div>

          {!valid && (
            <div className={d.warnStrip}>
              <Pictogram id="warn" size={16} />
              <span>
                Avec ces gains, ce n'est plus une chasse au cerf : il faut que le cerf à deux
                rapporte plus que le lièvre, et le lièvre plus que le cerf raté.
              </span>
            </div>
          )}
        </div>

        <div className={d.stack}>
          <div className={d.card}>
            <div className={d.cardTitle}>Ton pari</div>
            <div className={d.sliderRow}>
              <label className={d.sliderHead} htmlFor="stag-trust">
                <span>Chance que l'autre parte au cerf</span>
                <span className={d.sliderValue}>{trustPct} %</span>
              </label>
              <input
                id="stag-trust"
                type="range"
                min={0}
                max={100}
                value={trustPct}
                onChange={(e) => setTrustPct(Number(e.target.value))}
                className={signStyles.range}
              />
            </div>

            <div className={d.stats}>
              <div className={`${d.stat} ${verdict.stag === true ? d.statLead : ''}`}>
                <div className={d.statLabel}>Cerf, espéré</div>
                <div className={d.statValue}>
                  <FlapValue value={gains.stag.toFixed(2)} />
                </div>
              </div>
              <div className={`${d.stat} ${verdict.stag === false ? d.statLead : ''}`}>
                <div className={d.statLabel}>Lièvre, assuré</div>
                <div className={d.statValue}>
                  <FlapValue value={gains.hare.toFixed(2)} />
                </div>
              </div>
              <div className={d.stat}>
                <div className={d.statLabel}>Seuil</div>
                <div className={d.statValue}>
                  <FlapValue value={threshold === null ? '—' : pct(threshold)} />
                </div>
              </div>
            </div>

            <div className={d.last}>
              <span className={d.lastStrong}>{verdict.text}</span>
            </div>
          </div>

          <div className={d.card}>
            <div className={d.cardTitle}>Mode d'emploi</div>
            <ol className={d.steps}>
              <li>Les deux cases jaunes sont les équilibres : (Cerf, Cerf) et (Lièvre, Lièvre).</li>
              <li>
                Le curseur dit à quel point tu fais confiance à l'autre. Le lièvre rapporte
                toujours pareil ; le cerf ne vaut quelque chose que si l'autre vient.
              </li>
              <li>
                Le <em>seuil</em> est la confiance minimale pour que le cerf soit le bon pari.
                Change les gains : il bouge.
              </li>
            </ol>
          </div>
        </div>
      </div>

      <section className={d.section}>
        <div className={d.sectionHead}>
          <Plate icon="commons" size="sm" tone="yellow" />
          <h3 className={d.sectionTitle}>Une population de chasseurs</h3>
        </div>
        <p className={d.hint}>
          Imagine un village où chacun chasse comme son voisin l'a fait de mieux. À chaque
          génération, le choix qui a le mieux nourri gagne du terrain. La part de chasseurs de
          cerf finit toujours à 0 ou à 100 % : le seuil est la ligne de partage, et il est
          instable.
        </p>

        <div className="demoSplit">
          <div className={d.card}>
            <div className={d.cardTitle}>Au départ</div>
            <div className={d.sliderRow}>
              <label className={d.sliderHead} htmlFor="stag-share">
                <span>Part de chasseurs de cerf</span>
                <span className={d.sliderValue}>{sharePct} %</span>
              </label>
              <input
                id="stag-share"
                type="range"
                min={0}
                max={100}
                value={sharePct}
                onChange={(e) => setSharePct(Number(e.target.value))}
                className={signStyles.range}
              />
            </div>
            <div className={d.stats}>
              <div className={d.stat}>
                <div className={d.statLabel}>Génération 0</div>
                <div className={d.statValue}>
                  <FlapValue value={`${sharePct} %`} />
                </div>
              </div>
              <div className={`${d.stat} ${finalShare > 0.5 ? d.statLead : ''}`}>
                <div className={d.statLabel}>Génération {GENERATIONS}</div>
                <div className={d.statValue}>
                  <FlapValue value={pct(finalShare)} />
                </div>
              </div>
              <div className={d.stat}>
                <div className={d.statLabel}>Issue</div>
                <div className={d.statValue} style={{ fontSize: 'var(--t-base)' }}>
                  <FlapValue
                    value={finalShare > 0.99 ? 'Cerf' : finalShare < 0.01 ? 'Lièvre' : 'En cours'}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={d.card}>
            <div className={d.cardTitle}>Part de chasseurs de cerf, en %</div>
            <ShareChart path={path} threshold={threshold} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default function StagHuntPage() {
  return (
    <ConceptPage
      conceptId="staghunt"
      conceptNumber={3}
      category={stagHuntContent.category}
      summary={stagHuntContent.summary}
      demoHint="Glisse le curseur de confiance : le bon choix bascule au seuil. Change un gain : le seuil se déplace."
      demo={<Demo />}
      body={stagHuntContent.body}
      deepDive={stagHuntContent.deepDive}
      relatedIds={['nash', 'prisoners']}
    />
  );
}
