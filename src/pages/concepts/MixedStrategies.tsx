import { useState, useMemo } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { mixedStrategiesContent } from '../../content/mixedStrategies';
import { normalize, expectedPayoff, sampleAction } from '../../games/mixed';

const ACTIONS = ['R', 'P', 'S'] as const;
const LABELS: Record<string, string> = { R: 'Pierre 🪨', P: 'Papier 📄', S: 'Ciseaux ✂️' };

const rpsPayoff = (a: string, b: string): number => {
  if (a === b) return 0;
  const beats: Record<string, string> = { R: 'S', P: 'R', S: 'P' };
  return beats[a] === b ? 1 : -1;
};

function Demo() {
  const [weights, setWeights] = useState<{ R: number; P: number; S: number }>({ R: 1, P: 1, S: 1 });
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
    (acc, r) => ({ wins: acc.wins + (r.result > 0 ? 1 : 0), losses: acc.losses + (r.result < 0 ? 1 : 0), draws: acc.draws + (r.result === 0 ? 1 : 0) }),
    { wins: 0, losses: 0, draws: 0 }
  );

  return (
    <div style={{ display: 'grid', gap: 'var(--space-6)', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)' }}>
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <div className="label-mono">Stratégie du bot</div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', margin: 'var(--space-2) 0 var(--space-3)' }}>
          Règle les probabilités du bot. Tes choix à toi sont supposés uniformes pour calculer l'espérance.
        </p>
        {ACTIONS.map((a) => (
          <div key={a} style={{ marginBottom: 'var(--space-3)' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
              <span>{LABELS[a]}</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{(botMix[a] * 100).toFixed(0)}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(weights[a] * 100)}
              onChange={(e) => setWeights({ ...weights, [a]: Number(e.target.value) / 100 })}
              style={{ width: '100%' }}
              aria-label={`Probabilité ${LABELS[a]}`}
            />
          </div>
        ))}
        <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
          Espérance de gain (face à ton uniforme) : <span style={{ color: ev > 0 ? 'var(--accent-success)' : ev < 0 ? 'var(--accent-danger)' : 'var(--accent-primary)' }}>{ev.toFixed(3)}</span>
        </div>
      </div>

      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <div className="label-mono">Joue</div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
          {ACTIONS.map((a) => (
            <button
              key={a}
              onClick={() => play(a)}
              style={{ flex: 1, padding: 'var(--space-3)', background: 'var(--bg-base)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: 'var(--text-base)' }}
            >
              {LABELS[a]}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Score : <span style={{ color: 'var(--accent-success)' }}>{totals.wins}</span> /{' '}
          <span style={{ color: 'var(--text-muted)' }}>{totals.draws}</span> /{' '}
          <span style={{ color: 'var(--accent-danger)' }}>{totals.losses}</span> (V/N/D)
        </div>
        <ul style={{ marginTop: 'var(--space-3)', listStyle: 'none', padding: 0, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
          {history.map((r, i) => (
            <li key={i} style={{ padding: 'var(--space-1) 0', color: r.result > 0 ? 'var(--accent-success)' : r.result < 0 ? 'var(--accent-danger)' : 'var(--text-muted)' }}>
              {LABELS[r.user]} vs {LABELS[r.bot]} → {r.result > 0 ? 'Gagné' : r.result < 0 ? 'Perdu' : 'Nul'}
            </li>
          ))}
        </ul>
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
      demo={<Demo />}
      body={mixedStrategiesContent.body}
      deepDive={mixedStrategiesContent.deepDive}
      relatedIds={['nash']}
    />
  );
}
