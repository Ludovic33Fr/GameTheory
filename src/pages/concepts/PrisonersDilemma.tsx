import { useMemo, useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { PayoffMatrix } from '../../components/PayoffMatrix';
import { CumulativeChart } from '../../components/CumulativeChart';
import { Plate, Pictogram, FlapValue } from '../../components/Sign';
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
import d from '../../styles/demo.module.css';

const LABELS = [
  ['Coopérer', 'Trahir'],
  ['Coopérer', 'Trahir'],
];

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
    <div className={d.rack}>
      <PayoffMatrix
        game={prisonersDilemma}
        equilibria={[['D', 'D']]}
        actionLabels={LABELS}
        onCellClick={setPlayed}
      />
      <div className={`${d.card} ${d.grow} ${d.note}`}>
        {played === null ? (
          <p>
            Clique une cellule de la matrice pour explorer un profil. Les deux joueurs
            choisissent simultanément.
          </p>
        ) : (
          (() => {
            const [a, b] = played;
            const [pa, pb] = prisonersDilemma.payoff(played);
            const labelA = a === 'C' ? 'Coopérer' : 'Trahir';
            const labelB = b === 'C' ? 'Coopérer' : 'Trahir';
            const isEq = a === 'D' && b === 'D';
            return (
              <>
                <strong>
                  Profil : {labelA} / {labelB}
                </strong>
                <p>
                  Paiements : Joueur A = {pa}, Joueur B = {pb}.
                </p>
                <p>
                  {isEq
                    ? "C'est l'équilibre de Nash : aucun joueur n'a intérêt à dévier seul."
                    : "Au moins un joueur regretterait son choix face à celui de l'autre."}
                </p>
              </>
            );
          })()
        )}
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
  const youLead = cumulative.totals.you > cumulative.totals.opp;
  const oppLead = cumulative.totals.opp > cumulative.totals.you;

  return (
    <section className={d.section}>
      <div className={d.sectionHead}>
        <Plate icon="iterated" size="sm" tone="yellow" />
        <h3 className={d.sectionTitle}>Joue plusieurs tours</h3>
      </div>
      <p className={d.hint}>
        Choisis une stratégie pour l'adversaire, puis joue tour par tour. Les paiements sont
        des « années de prison » — plus haut sur le graphique = mieux. Changer de stratégie
        remet le score à zéro.
      </p>

      <div className="demoSplit">
        <div className={d.card}>
          <div className={d.cardTitle}>Stratégie de l'adversaire</div>
          <div className={d.choices}>
            {ITERATED_STRATEGIES.map((s) => {
              const active = s.id === strategyId;
              return (
                <button
                  key={s.id}
                  onClick={() => changeStrategy(s.id)}
                  className={`${d.choice} ${active ? d.choiceOn : ''}`}
                  aria-pressed={active}
                >
                  <span className={d.choiceName}>
                    <span className={`${d.mark} ${active ? d.markOn : ''}`} />
                    {s.name}
                  </span>
                  <span className={d.choiceDesc}>{s.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={d.stack}>
          <div className={d.card}>
            <div className={d.cardTitle}>Joue ton coup</div>
            <div className={d.actions}>
              <button onClick={() => play('C')} className={d.play}>
                Coopérer
              </button>
              <button onClick={() => play('D')} className={`${d.play} ${d.playAlt}`}>
                Trahir
              </button>
              <button onClick={reset} disabled={history.length === 0} className={d.reset}>
                <Pictogram id="iterated" size={14} />
                Remettre à zéro
              </button>
            </div>

            <div className={d.stats}>
              <Stat label="Toi" value={cumulative.totals.you} lead={youLead} />
              <Stat label="Adversaire" value={cumulative.totals.opp} lead={oppLead} />
              <Stat label="Tours" value={history.length} />
            </div>

            {last && (
              <div className={d.last}>
                <span>Tour précédent :</span>
                <span className={d.lastStrong}>{lastLabelYou}</span>
                <span>/</span>
                <span className={d.lastStrong}>{lastLabelOpp}</span>
                <Pictogram id="arrowRight" size={12} />
                <span className={d.lastPayoff}>
                  ({last.yourGain}, {last.oppGain})
                </span>
              </div>
            )}
          </div>

          <CumulativeChart
            you={cumulative.you}
            opp={cumulative.opp}
            caption="Plus haut = mieux (les paiements sont des années de prison, donc négatifs ou nuls)."
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, lead }: { label: string; value: number; lead?: boolean }) {
  return (
    <div className={`${d.stat} ${lead ? d.statLead : ''}`}>
      <div className={d.statLabel}>
        {lead && <Pictogram id="arrowUp" size={9} />}
        {label}
      </div>
      <div className={d.statValue}>
        <FlapValue value={value} />
      </div>
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
      demoHint="Deux démonstrations : un coup unique à explorer case par case, puis une partie répétée contre l'adversaire de ton choix."
      demo={<Demo />}
      body={prisonersContent.body}
      deepDive={prisonersContent.deepDive}
      relatedIds={['nash', 'iterated', 'commons']}
    />
  );
}
