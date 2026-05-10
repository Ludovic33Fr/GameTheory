import { useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { PayoffMatrix } from '../../components/PayoffMatrix';
import { prisonersDilemma } from '../../games/prisoners';
import { prisonersContent } from '../../content/prisoners';
import type { ActionProfile } from '../../games/types';

const LABELS = [['Coopérer', 'Trahir'], ['Coopérer', 'Trahir']];

function Demo() {
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
