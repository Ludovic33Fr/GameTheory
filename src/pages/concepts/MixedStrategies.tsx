import { useState, useMemo } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { Pictogram, FlapValue, signStyles } from '../../components/Sign';
import type { PictogramId } from '../../components/Sign';
import { mixedStrategiesContent } from '../../content/mixedStrategies';
import { normalize, expectedPayoff, sampleAction } from '../../games/mixed';
import d from '../../styles/demo.module.css';

const ACTIONS = ['R', 'P', 'S'] as const;
const LABELS: Record<string, string> = { R: 'Pierre', P: 'Papier', S: 'Ciseaux' };
const ICONS: Record<string, PictogramId> = { R: 'rock', P: 'paper', S: 'scissors' };

const rpsPayoff = (a: string, b: string): number => {
  if (a === b) return 0;
  const beats: Record<string, string> = { R: 'S', P: 'R', S: 'P' };
  return beats[a] === b ? 1 : -1;
};

function Demo() {
  const [weights, setWeights] = useState<{ R: number; P: number; S: number }>({
    R: 1,
    P: 1,
    S: 1,
  });
  const [history, setHistory] = useState<{ user: string; bot: string; result: number }[]>([]);

  const botMix = useMemo(() => normalize(weights), [weights]);
  const userUniform = { R: 1 / 3, P: 1 / 3, S: 1 / 3 };
  const ev = expectedPayoff(userUniform, botMix, rpsPayoff);

  const play = (userAction: string) => {
    const botAction = sampleAction(botMix);
    const result = rpsPayoff(userAction, botAction);
    setHistory((h) => [{ user: userAction, bot: botAction, result }, ...h].slice(0, 10));
  };

  const totals = history.reduce(
    (acc, r) => ({
      wins: acc.wins + (r.result > 0 ? 1 : 0),
      losses: acc.losses + (r.result < 0 ? 1 : 0),
      draws: acc.draws + (r.result === 0 ? 1 : 0),
    }),
    { wins: 0, losses: 0, draws: 0 }
  );

  return (
    <div className="demoSplit">
      <div className={d.card}>
        <div className={d.cardTitle}>Stratégie du bot</div>
        <p className={d.hint}>
          Règle les probabilités du bot. Tes choix à toi sont supposés uniformes pour calculer
          l'espérance.
        </p>
        {ACTIONS.map((a) => (
          <div key={a} className={d.sliderRow}>
            <label className={d.sliderHead} htmlFor={`mix-${a}`}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Pictogram id={ICONS[a]} size={15} />
                {LABELS[a]}
              </span>
              <span className={d.sliderValue}>{(botMix[a] * 100).toFixed(0)} %</span>
            </label>
            <input
              id={`mix-${a}`}
              type="range"
              min={0}
              max={100}
              value={Math.round(weights[a] * 100)}
              onChange={(e) => setWeights({ ...weights, [a]: Number(e.target.value) / 100 })}
              className={signStyles.range}
              aria-label={`Probabilité ${LABELS[a]}`}
            />
          </div>
        ))}
        <div className={d.countStrip}>
          <span className={d.count}>
            <span className={d.countNum}>
              <FlapValue value={ev.toFixed(3)} />
            </span>
            espérance de gain face à ton uniforme
          </span>
        </div>
      </div>

      <div className={d.card}>
        <div className={d.cardTitle}>Joue</div>
        <div className={d.actions}>
          {ACTIONS.map((a) => (
            <button
              key={a}
              onClick={() => play(a)}
              className={`${d.play} ${d.playAlt}`}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <Pictogram id={ICONS[a]} size={17} />
              {LABELS[a]}
            </button>
          ))}
        </div>

        <div className={d.stats}>
          <Stat label="Gagné" value={totals.wins} lead={totals.wins > totals.losses} />
          <Stat label="Nul" value={totals.draws} />
          <Stat label="Perdu" value={totals.losses} />
        </div>

        <ul className={d.log}>
          {history.map((r, i) => (
            <li key={i} className={d.logItem}>
              <Pictogram id={ICONS[r.user]} size={14} />
              <span>vs</span>
              <Pictogram id={ICONS[r.bot]} size={14} />
              <span
                className={r.result > 0 ? d.logWin : r.result < 0 ? d.logLoss : undefined}
                style={{ marginLeft: 'auto' }}
              >
                {r.result > 0 ? 'Gagné' : r.result < 0 ? 'Perdu' : 'Nul'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Stat({ label, value, lead }: { label: string; value: number; lead?: boolean }) {
  return (
    <div className={`${d.stat} ${lead ? d.statLead : ''}`}>
      <div className={d.statLabel}>{label}</div>
      <div className={d.statValue}>
        <FlapValue value={value} />
      </div>
    </div>
  );
}

export default function MixedStrategiesPage() {
  return (
    <ConceptPage
      conceptId="mixed"
      conceptNumber={3}
      category={mixedStrategiesContent.category}
      summary={mixedStrategiesContent.summary}
      demoHint="Déséquilibre le bot avec les curseurs, puis joue : l'espérance bascule dès que le mélange n'est plus uniforme."
      demo={<Demo />}
      body={mixedStrategiesContent.body}
      deepDive={mixedStrategiesContent.deepDive}
      relatedIds={['nash']}
    />
  );
}
