import { useMemo, useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { PayoffMatrix } from '../../components/PayoffMatrix';
import { CumulativeChart } from '../../components/CumulativeChart';
import { prisonersDilemma } from '../../games/prisoners';
import { prisonersContent } from '../../content/prisoners';
import {
  alwaysCooperate,
  alwaysDefect,
  grudger,
  randomStrat,
  titForTat,
} from '../../games/axelrod/strategies';
import type { ActionProfile, IteratedStrategy } from '../../games/types';

const LABELS = [['Coopérer', 'Trahir'], ['Coopérer', 'Trahir']];

const ITERATED_STRATEGIES: IteratedStrategy[] = [
  titForTat,
  grudger,
  alwaysDefect,
  alwaysCooperate,
  randomStrat,
];

interface Round {
  you: string;
  opp: string;
  yourGain: number;
  oppGain: number;
}

function SingleRoundDemo() {
  const [played, setPlayed] = useState<ActionProfile | null>(null);
  return (
    <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <PayoffMatrix
        game={prisonersDilemma}
        equilibria={[['D', 'D']]}
        actionLabels={LABELS}
        onCellClick={setPlayed}
      />
      <div
        style={{
          flex: 1,
          minWidth: 240,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4)',
          color: 'var(--text-secondary)',
          fontSize: 'var(--text-sm)',
          lineHeight: 1.6,
        }}
      >
        {played === null
          ? 'Clique une cellule de la matrice pour explorer un profil. Les deux joueurs choisissent simultanément.'
          : (() => {
              const [a, b] = played;
              const [pa, pb] = prisonersDilemma.payoff(played);
              const labelA = a === 'C' ? 'Coopérer' : 'Trahir';
              const labelB = b === 'C' ? 'Coopérer' : 'Trahir';
              const isEq = a === 'D' && b === 'D';
              return (
                <>
                  <strong style={{ color: 'var(--text-primary)' }}>Profil : {labelA} / {labelB}</strong>
                  <div style={{ marginTop: 'var(--space-2)' }}>
                    Paiements : Joueur A = {pa}, Joueur B = {pb}.
                  </div>
                  <div style={{ marginTop: 'var(--space-2)' }}>
                    {isEq
                      ? "C'est l'équilibre de Nash : aucun joueur n'a intérêt à dévier seul."
                      : 'Au moins un joueur regretterait son choix face à celui de l\'autre.'}
                  </div>
                </>
              );
            })()}
      </div>
    </div>
  );
}

function IteratedPlayground() {
  const [strategyId, setStrategyId] = useState<string>(titForTat.id);
  const [history, setHistory] = useState<Round[]>([]);

  const strategy = ITERATED_STRATEGIES.find((s) => s.id === strategyId)!;

  const cumulative = useMemo(() => {
    const you: number[] = [];
    const opp: number[] = [];
    let yt = 0;
    let ot = 0;
    for (const r of history) {
      yt += r.yourGain;
      ot += r.oppGain;
      you.push(yt);
      opp.push(ot);
    }
    return { you, opp, totals: { you: yt, opp: ot } };
  }, [history]);

  const play = (myMove: 'C' | 'D') => {
    const profiles: ActionProfile[] = history.map((r) => [r.you, r.opp]);
    const oppMove = strategy.decide(profiles, 1);
    const [pa, pb] = prisonersDilemma.payoff([myMove, oppMove]);
    setHistory((h) => [...h, { you: myMove, opp: oppMove, yourGain: pa, oppGain: pb }]);
  };

  const reset = () => setHistory([]);
  const changeStrategy = (id: string) => {
    setStrategyId(id);
    setHistory([]);
  };

  const last = history[history.length - 1];
  const lastLabelYou = last ? (last.you === 'C' ? 'Coopérer' : 'Trahir') : null;
  const lastLabelOpp = last ? (last.opp === 'C' ? 'Coopérer' : 'Trahir') : null;
  const winnerColor =
    cumulative.totals.you > cumulative.totals.opp
      ? 'var(--accent-success)'
      : cumulative.totals.you < cumulative.totals.opp
        ? 'var(--accent-danger)'
        : 'var(--text-secondary)';

  return (
    <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-8)', borderTop: '1px dashed var(--border-default)' }}>
      <span className="label-mono">// Joue plusieurs tours</span>
      <p style={{ marginTop: 'var(--space-2)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', maxWidth: 600 }}>
        Choisis une stratégie pour l'adversaire, puis joue tour par tour. Les paiements sont des « années de
        prison » — plus haut sur le graphique = mieux. Changer de stratégie remet le score à zéro.
      </p>

      <div className="demoSplit" style={{ marginTop: 'var(--space-4)' }}>
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
          <div className="label-mono" style={{ marginBottom: 'var(--space-3)' }}>Stratégie de l'adversaire</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {ITERATED_STRATEGIES.map((s) => {
              const active = s.id === strategyId;
              return (
                <button
                  key={s.id}
                  onClick={() => changeStrategy(s.id)}
                  style={{
                    textAlign: 'left',
                    padding: 'var(--space-3)',
                    border: `1px solid ${active ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                    background: active ? 'var(--accent-primary-soft)' : 'var(--bg-base)',
                    color: active ? 'var(--accent-primary)' : 'var(--text-primary)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{s.name}</div>
                  <div style={{ marginTop: 2, fontSize: 'var(--text-xs)', color: active ? 'var(--accent-primary)' : 'var(--text-muted)', fontWeight: 400, lineHeight: 1.4 }}>
                    {s.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
            <div className="label-mono">Joue ton coup</div>
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
              <button
                onClick={() => play('C')}
                style={{
                  flex: 1,
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'var(--accent-success)',
                  color: 'var(--bg-base)',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: 'var(--text-base)',
                }}
              >
                Coopérer
              </button>
              <button
                onClick={() => play('D')}
                style={{
                  flex: 1,
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'var(--accent-danger)',
                  color: 'var(--bg-base)',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: 'var(--text-base)',
                }}
              >
                Trahir
              </button>
              <button
                onClick={reset}
                disabled={history.length === 0}
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'var(--bg-base)',
                  color: history.length === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  cursor: history.length === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                ↺ Reset
              </button>
            </div>

            <div style={{ marginTop: 'var(--space-4)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
              <Stat label="Toi" value={cumulative.totals.you} accent={winnerColor} />
              <Stat label="Adv" value={cumulative.totals.opp} />
              <Stat label="Tours" value={history.length} />
            </div>

            {last && (
              <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-3)', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Tour précédent :</span>{' '}
                <span style={{ color: 'var(--text-primary)' }}>{lastLabelYou}</span> / <span style={{ color: 'var(--text-primary)' }}>{lastLabelOpp}</span>{' '}
                <span style={{ color: 'var(--text-muted)' }}>→</span>{' '}
                <span style={{ fontFamily: 'var(--font-mono)' }}>({last.yourGain}, {last.oppGain})</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <CumulativeChart
          you={cumulative.you}
          opp={cumulative.opp}
          caption="Plus haut = mieux (les paiements sont des années de prison, donc négatifs ou nuls)."
        />
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div style={{ padding: 'var(--space-2) var(--space-3)', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
      <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{label}</div>
      <div style={{ marginTop: 2, color: accent ?? 'var(--text-primary)', fontWeight: 700, fontSize: 'var(--text-lg)' }}>{value}</div>
    </div>
  );
}

function Demo() {
  return (
    <div>
      <SingleRoundDemo />
      <IteratedPlayground />
    </div>
  );
}

export default function PrisonersDilemmaPage() {
  return (
    <ConceptPage
      conceptId="prisoners"
      conceptNumber={1}
      category={prisonersContent.category}
      summary={prisonersContent.summary}
      demo={<Demo />}
      body={prisonersContent.body}
      deepDive={prisonersContent.deepDive}
      relatedIds={['nash', 'iterated', 'commons']}
    />
  );
}
