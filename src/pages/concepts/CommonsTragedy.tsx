import { useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { Pictogram, FlapValue, signStyles } from '../../components/Sign';
import { commonsContent } from '../../content/commons';
import { commonsOutcome, optimalHerdSize } from '../../games/commons';
import d from '../../styles/demo.module.css';

function Demo() {
  const [herders, setHerders] = useState(4);
  const [perHerder, setPerHerder] = useState(20);
  const capacity = 200;
  const out = commonsOutcome({ herders, perHerder, capacity });
  const opt = optimalHerdSize({ herders, capacity });
  const overload = out.totalCattle > capacity;

  const points = Array.from({ length: 50 }, (_, i) => {
    const N = (i + 1) * ((capacity * 1.6) / 50);
    return { N, P: Math.max(0, N * (1 - N / capacity)) };
  });
  const maxP = Math.max(...points.map((p) => p.P));
  const xOf = (n: number) => 20 + (n / (capacity * 1.6)) * 270;
  const yOf = (p: number) => 160 - (p / maxP) * 140;

  return (
    <div className="demoSplit">
      <div className={d.card}>
        <div className={d.cardTitle}>Paramètres</div>

        <div className={d.sliderRow}>
          <label className={d.sliderHead} htmlFor="herders">
            <span>Bergers</span>
            <span className={d.sliderValue}>{herders}</span>
          </label>
          <input
            id="herders"
            type="range"
            min={1}
            max={20}
            value={herders}
            onChange={(e) => setHerders(Number(e.target.value))}
            className={signStyles.range}
          />
        </div>

        <div className={d.sliderRow}>
          <label className={d.sliderHead} htmlFor="perHerder">
            <span>Bêtes par berger</span>
            <span className={d.sliderValue}>{perHerder}</span>
          </label>
          <input
            id="perHerder"
            type="range"
            min={1}
            max={50}
            value={perHerder}
            onChange={(e) => setPerHerder(Number(e.target.value))}
            className={signStyles.range}
          />
        </div>

        <div className={d.stats}>
          <div className={d.stat}>
            <div className={d.statLabel}>Bêtes / capacité</div>
            <div className={d.statValue}>
              <FlapValue value={out.totalCattle} />
              <span style={{ color: 'var(--ink-black-2)', fontSize: 'var(--t-sm)' }}>
                {' '}
                / {capacity}
              </span>
            </div>
          </div>
          <div className={`${d.stat} ${overload ? '' : d.statLead}`}>
            <div className={d.statLabel}>Productivité</div>
            <div className={d.statValue}>
              <FlapValue value={out.collectiveProductivity.toFixed(1)} />
            </div>
          </div>
          <div className={d.stat}>
            <div className={d.statLabel}>Par berger</div>
            <div className={d.statValue}>
              <FlapValue value={out.perHerderReturn.toFixed(2)} />
            </div>
          </div>
        </div>

        <p className={d.note} style={{ marginTop: 'var(--space-3)' }}>
          Optimum collectif : {opt.toFixed(1)} bêtes par berger.
        </p>

        {overload && (
          <p className={d.warnStrip}>
            <Pictogram id="warn" size={18} />
            Pâturage surexploité : {out.totalCattle} bêtes pour une capacité de {capacity}.
          </p>
        )}
      </div>

      <div className={d.card}>
        <div className={d.cardTitle}>Productivité collective P(N)</div>
        <svg
          viewBox="0 0 300 180"
          style={{ width: '100%', marginTop: 'var(--space-3)' }}
          role="img"
          aria-label="Courbe de productivité collective en fonction du nombre de bêtes"
        >
          <line x1="20" y1="160" x2="290" y2="160" stroke="#4d4d4d" strokeWidth="1.5" />
          <line x1="20" y1="10" x2="20" y2="160" stroke="#4d4d4d" strokeWidth="1.5" />

          {/* Capacité du pâturage : la limite imprimée sur le panneau. */}
          <line
            x1={xOf(capacity)}
            y1="10"
            x2={xOf(capacity)}
            y2="160"
            stroke="#6a6a6a"
            strokeDasharray="3 5"
          />
          <text x={xOf(capacity) + 5} y="20" fill="#8e8b84" fontSize="10" fontWeight="700">
            capacité
          </text>

          <polyline
            fill="none"
            stroke="var(--icon-white)"
            strokeWidth="2.5"
            points={points.map((p) => `${xOf(p.N)},${yOf(p.P)}`).join(' ')}
          />

          {/* Position courante : trait plein, et une marque carrée si on dépasse. */}
          <line
            x1={xOf(out.totalCattle)}
            y1="10"
            x2={xOf(out.totalCattle)}
            y2="160"
            stroke="var(--sign-yellow)"
            strokeWidth="2"
            strokeDasharray={overload ? '6 4' : undefined}
          />
          {overload ? (
            <rect
              x={xOf(out.totalCattle) - 6}
              y={yOf(out.collectiveProductivity) - 6}
              width="12"
              height="12"
              fill="var(--sign-yellow)"
              stroke="var(--sign-black)"
              strokeWidth="2"
            />
          ) : (
            <circle
              cx={xOf(out.totalCattle)}
              cy={yOf(out.collectiveProductivity)}
              r="6"
              fill="var(--sign-yellow)"
            />
          )}
        </svg>
        <p className={d.note} style={{ marginTop: 'var(--space-3)' }}>
          Chaque berger gagne à ajouter une bête ; la courbe, elle, s'effondre passé la
          capacité. Le trait jaune est la position courante.
        </p>
      </div>
    </div>
  );
}

export default function CommonsTragedyPage() {
  return (
    <ConceptPage
      conceptId="commons"
      conceptNumber={6}
      category={commonsContent.category}
      summary={commonsContent.summary}
      demoHint="Ajoute des bergers ou des bêtes : la position courante glisse le long de la courbe jusqu'à la faire chuter."
      demo={<Demo />}
      body={commonsContent.body}
      deepDive={commonsContent.deepDive}
      relatedIds={['prisoners', 'iterated']}
    />
  );
}
