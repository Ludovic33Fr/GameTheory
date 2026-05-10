import { useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { PayoffMatrix } from '../../components/PayoffMatrix';
import { findPureNashEquilibria } from '../../games/nash';
import { prisonersDilemma } from '../../games/prisoners';
import { battleOfTheSexes, chicken } from '../../games/examples';
import { nashContent } from '../../content/nash';
import type { NormalFormGame } from '../../games/types';

const GAMES: { game: NormalFormGame; labels: string[][] }[] = [
  { game: prisonersDilemma, labels: [['Coopérer', 'Trahir'], ['Coopérer', 'Trahir']] },
  { game: battleOfTheSexes, labels: [['Opéra', 'Foot'], ['Opéra', 'Foot']] },
  { game: chicken, labels: [['Esquiver', 'Foncer'], ['Esquiver', 'Foncer']] },
];

function Demo() {
  const [idx, setIdx] = useState(0);
  const { game, labels } = GAMES[idx];
  const eq = findPureNashEquilibria(game);

  return (
    <div>
      <div role="tablist" style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        {GAMES.map((g, i) => (
          <button
            key={g.game.id}
            role="tab"
            aria-selected={idx === i}
            onClick={() => setIdx(i)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${idx === i ? 'var(--accent-primary)' : 'var(--border-default)'}`,
              background: idx === i ? 'var(--accent-primary-soft)' : 'var(--bg-elevated)',
              color: idx === i ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontSize: 'var(--text-sm)',
            }}
          >
            {g.game.name}
          </button>
        ))}
      </div>
      <PayoffMatrix game={game} equilibria={eq} actionLabels={labels} />
      <div style={{ marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
        {eq.length === 0 && 'Aucun équilibre de Nash en stratégies pures (il en existe un en stratégies mixtes).'}
        {eq.length === 1 && 'Un seul équilibre en stratégies pures (mis en évidence en cyan).'}
        {eq.length > 1 && `${eq.length} équilibres en stratégies pures — c'est un jeu de coordination.`}
      </div>
    </div>
  );
}

export default function NashEquilibriumPage() {
  return (
    <ConceptPage
      conceptId="nash"
      conceptNumber={2}
      category={nashContent.category}
      summary={nashContent.summary}
      demo={<Demo />}
      body={nashContent.body}
      deepDive={nashContent.deepDive}
      relatedIds={['prisoners', 'mixed']}
    />
  );
}
