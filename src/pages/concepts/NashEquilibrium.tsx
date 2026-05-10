import { useMemo, useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import {
  EditablePayoffMatrix,
  bestResponses,
  type PayoffMatrix22,
} from '../../components/EditablePayoffMatrix';
import { nashContent } from '../../content/nash';

interface Preset {
  id: string;
  title: string;
  rowLabels: [string, string];
  colLabels: [string, string];
  rowPlayer: string;
  colPlayer: string;
  story: string;
  insight: string;
  payoffs: PayoffMatrix22;
}

const PRESETS: Preset[] = [
  {
    id: 'prisoners',
    title: 'Dilemme du prisonnier',
    rowLabels: ['Coopérer', 'Trahir'],
    colLabels: ['Coopérer', 'Trahir'],
    rowPlayer: 'Toi',
    colPlayer: 'Adversaire',
    story:
      "Trahir est strictement dominant pour les deux joueurs. L'unique équilibre de Nash est le pire pour la collectivité — c'est tout le drame du jeu.",
    insight: '1 équilibre, et c\'est le pire pour les deux.',
    payoffs: [
      [[-1, -1], [-3, 0]],
      [[0, -3], [-2, -2]],
    ],
  },
  {
    id: 'battle-sexes',
    title: 'Bataille des sexes',
    rowLabels: ['Opéra', 'Match'],
    colLabels: ['Opéra', 'Match'],
    rowPlayer: 'Toi',
    colPlayer: 'Ton/ta partenaire',
    story:
      "Vous voulez sortir ensemble, mais tu préfères l'opéra et l'autre le match. Aucun ne veut y aller seul. Deux équilibres existent — qui cède ?",
    insight: '2 équilibres asymétriques.',
    payoffs: [
      [[3, 2], [0, 0]],
      [[0, 0], [2, 3]],
    ],
  },
  {
    id: 'chicken',
    title: 'Chicken',
    rowLabels: ['Esquiver', 'Foncer'],
    colLabels: ['Esquiver', 'Foncer'],
    rowPlayer: 'Toi',
    colPlayer: 'Adversaire',
    story:
      "Vous foncez l'un vers l'autre. Celui qui dévie passe pour un lâche. Si aucun ne dévie, catastrophe.",
    insight: "2 équilibres : c'est l'autre qui craque.",
    payoffs: [
      [[0, 0], [-1, 1]],
      [[1, -1], [-10, -10]],
    ],
  },
];

function clone(p: PayoffMatrix22): PayoffMatrix22 {
  return [
    [[p[0][0][0], p[0][0][1]], [p[0][1][0], p[0][1][1]]],
    [[p[1][0][0], p[1][0][1]], [p[1][1][0], p[1][1][1]]],
  ];
}

function payoffsEqual(a: PayoffMatrix22, b: PayoffMatrix22): boolean {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      if (a[i][j][0] !== b[i][j][0]) return false;
      if (a[i][j][1] !== b[i][j][1]) return false;
    }
  }
  return true;
}

function Demo() {
  const [presetId, setPresetId] = useState<string>(PRESETS[0].id);
  const preset = PRESETS.find((p) => p.id === presetId)!;
  const [payoffs, setPayoffs] = useState<PayoffMatrix22>(() => clone(preset.payoffs));

  const br = useMemo(() => bestResponses(payoffs), [payoffs]);
  const isModified = !payoffsEqual(payoffs, preset.payoffs);

  const selectPreset = (id: string) => {
    const next = PRESETS.find((p) => p.id === id)!;
    setPresetId(id);
    setPayoffs(clone(next.payoffs));
  };

  const resetToPreset = () => {
    setPayoffs(clone(preset.payoffs));
  };

  const nashCount = br.nash.length;

  return (
    <div>
      <div role="tablist" style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
        {PRESETS.map((p) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={presetId === p.id}
            onClick={() => selectPreset(p.id)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${presetId === p.id ? 'var(--accent-primary)' : 'var(--border-default)'}`,
              background: presetId === p.id ? 'var(--accent-primary-soft)' : 'var(--bg-elevated)',
              color: presetId === p.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontSize: 'var(--text-sm)',
              fontWeight: presetId === p.id ? 700 : 500,
            }}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="demoSplit">
        <div>
          <EditablePayoffMatrix
            payoffs={payoffs}
            rowLabels={preset.rowLabels}
            colLabels={preset.colLabels}
            rowPlayer={preset.rowPlayer}
            colPlayer={preset.colPlayer}
            onChange={setPayoffs}
          />

          <div style={{ marginTop: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <div
              style={{
                padding: 'var(--space-2) var(--space-3)',
                background: 'var(--bg-base)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-default)',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {nashCount === 0 && '0 équilibre en stratégies pures'}
              {nashCount === 1 && '1 équilibre de Nash'}
              {nashCount > 1 && `${nashCount} équilibres de Nash`}
            </div>
            {isModified && (
              <button
                onClick={resetToPreset}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  border: '1px solid var(--border-default)',
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-secondary)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-xs)',
                  cursor: 'pointer',
                }}
              >
                ↺ Restaurer le preset
              </button>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="label-mono">{preset.title}</span>
              {isModified && (
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-warning)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  modifié
                </span>
              )}
            </div>
            <p style={{ marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
              {preset.story}
            </p>
            <p style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)', color: 'var(--accent-primary)', fontSize: 'var(--text-sm)', fontStyle: 'italic' }}>
              {preset.insight}
            </p>
          </div>

          <div
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
            }}
          >
            <div className="label-mono" style={{ marginBottom: 'var(--space-2)' }}>Mode d'emploi</div>
            <ol style={{ paddingLeft: 'var(--space-4)' }}>
              <li>Pour chaque colonne, le joueur ligne souligne sa case avec le meilleur gain.</li>
              <li>Pour chaque ligne, le joueur colonne souligne sa case avec le meilleur gain.</li>
              <li>Une cellule avec <em>les deux</em> soulignements est un équilibre : aucun joueur ne gagne à dévier seul.</li>
            </ol>
            <p style={{ marginTop: 'var(--space-2)' }}>
              Modifie n'importe quel chiffre pour voir les équilibres se déplacer en direct.
            </p>
          </div>
        </div>
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
