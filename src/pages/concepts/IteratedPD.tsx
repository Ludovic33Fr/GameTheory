import { useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { Pictogram, FlapValue } from '../../components/Sign';
import { iteratedPDContent } from '../../content/iteratedPD';
import { ALL_STRATEGIES, runTournament } from '../../games/axelrod';
import { prisonersDilemma } from '../../games/prisoners';
import type { TournamentResult } from '../../games/axelrod/tournament';
import d from '../../styles/demo.module.css';

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

  const tooFew = selected.size < 2;

  return (
    <div>
      <div className={d.card}>
        <div className={d.cardTitle}>Stratégies engagées</div>
        <div className={d.tabs} style={{ marginBottom: 'var(--space-4)' }}>
          {ALL_STRATEGIES.map((s) => {
            const on = selected.has(s.id);
            return (
              <button
                key={s.id}
                onClick={() => toggle(s.id)}
                className={`${d.tab} ${on ? d.tabOn : ''}`}
                aria-pressed={on}
                title={s.description}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                <span className={`${d.mark} ${on ? d.markOn : ''}`} />
                {s.name}
              </button>
            );
          })}
        </div>

        <div className={d.fieldRow}>
          <label htmlFor="rounds">Tours par match</label>
          <input
            id="rounds"
            type="number"
            min={5}
            max={500}
            value={rounds}
            onChange={(e) => setRounds(Math.max(5, Math.min(500, Number(e.target.value) || 5)))}
            className={d.numField}
          />
          <button
            onClick={runIt}
            disabled={tooFew}
            className={d.play}
            style={{ marginLeft: 'auto', flex: 'none' }}
          >
            Lancer le tournoi
          </button>
        </div>

        {tooFew && (
          <p className={d.warnStrip}>
            <Pictogram id="warn" size={18} />
            Sélectionne au moins 2 stratégies pour lancer le tournoi.
          </p>
        )}
      </div>

      {result && (
        <div className={d.card} style={{ marginTop: 'var(--space-4)' }}>
          <div className={d.cardTitle}>Classement</div>
          <table className={d.table}>
            <thead>
              <tr>
                <th className={d.rank}>Rang</th>
                <th>Stratégie</th>
                <th className={d.numCol}>Score total</th>
              </tr>
            </thead>
            <tbody>
              {result.standings.map((s, i) => (
                <tr key={s.strategy.id}>
                  <td className={`${d.rank} ${i === 0 ? d.rankTop : ''}`}>{i + 1}</td>
                  <td>{s.strategy.name}</td>
                  <td className={`${d.numCol} ${i === 0 ? d.rankTop : ''}`}>
                    <FlapValue value={s.totalScore} />
                  </td>
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
      demoHint="Engage des stratégies, lance le tournoi : le classement bascule à chaque nouvelle exécution."
      demo={<Demo />}
      body={iteratedPDContent.body}
      deepDive={iteratedPDContent.deepDive}
      relatedIds={['prisoners', 'commons']}
    />
  );
}
