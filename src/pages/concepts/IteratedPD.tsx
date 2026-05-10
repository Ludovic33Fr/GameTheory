import { useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { iteratedPDContent } from '../../content/iteratedPD';
import { ALL_STRATEGIES, runTournament } from '../../games/axelrod';
import { prisonersDilemma } from '../../games/prisoners';
import type { TournamentResult } from '../../games/axelrod/tournament';

function Demo() {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(['tit-for-tat', 'always-c', 'always-d', 'grudger'])
  );
  const [rounds, setRounds] = useState(50);
  const [result, setResult] = useState<TournamentResult | null>(null);

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const runIt = () => {
    const strategies = ALL_STRATEGIES.filter((s) => selected.has(s.id));
    if (strategies.length < 2) return;
    setResult(runTournament(strategies, rounds, prisonersDilemma.payoff));
  };

  return (
    <div>
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <div className="label-mono">Stratégies engagées</div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'var(--space-3)' }}>
          {ALL_STRATEGIES.map((s) => (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              style={{
                padding: 'var(--space-2) var(--space-3)',
                border: `1px solid ${selected.has(s.id) ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                background: selected.has(s.id) ? 'var(--accent-primary-soft)' : 'var(--bg-base)',
                color: selected.has(s.id) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
              }}
              title={s.description}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <label style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Tours par match :</label>
          <input
            type="number"
            min={5}
            max={500}
            value={rounds}
            onChange={(e) => setRounds(Math.max(5, Math.min(500, Number(e.target.value) || 5)))}
            style={{ width: 80, padding: 'var(--space-2)', background: 'var(--bg-base)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
          />
          <button
            onClick={runIt}
            disabled={selected.size < 2}
            style={{
              marginLeft: 'auto',
              padding: 'var(--space-2) var(--space-4)',
              background: selected.size < 2 ? 'var(--bg-base)' : 'var(--accent-primary)',
              color: selected.size < 2 ? 'var(--text-muted)' : 'var(--bg-base)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              cursor: selected.size < 2 ? 'not-allowed' : 'pointer',
            }}
          >
            Lancer le tournoi
          </button>
        </div>
        {selected.size < 2 && (
          <div style={{ marginTop: 'var(--space-2)', color: 'var(--accent-warning)', fontSize: 'var(--text-sm)' }}>
            Sélectionne au moins 2 stratégies.
          </div>
        )}
      </div>

      {result && (
        <div style={{ marginTop: 'var(--space-4)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
          <div className="label-mono">Classement</div>
          <table style={{ width: '100%', marginTop: 'var(--space-3)', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: 'var(--space-2)' }}>#</th>
                <th style={{ padding: 'var(--space-2)' }}>Stratégie</th>
                <th style={{ padding: 'var(--space-2)', textAlign: 'right' }}>Score total</th>
              </tr>
            </thead>
            <tbody>
              {result.standings.map((s, i) => (
                <tr key={s.strategy.id} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: 'var(--space-2)', color: i === 0 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>{i + 1}</td>
                  <td style={{ padding: 'var(--space-2)', color: 'var(--text-primary)' }}>{s.strategy.name}</td>
                  <td style={{ padding: 'var(--space-2)', textAlign: 'right', color: i === 0 ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>{s.totalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function IteratedPDPage() {
  return (
    <ConceptPage
      conceptId="iterated"
      conceptNumber={4}
      category={iteratedPDContent.category}
      summary={iteratedPDContent.summary}
      demo={<Demo />}
      body={iteratedPDContent.body}
      deepDive={iteratedPDContent.deepDive}
      relatedIds={['prisoners', 'commons']}
    />
  );
}
