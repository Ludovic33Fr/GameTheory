import { useMemo, useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import {
  EditablePayoffMatrix,
  bestResponses,
  type PayoffMatrix22,
} from '../../components/EditablePayoffMatrix';
import { Pictogram, FlapValue } from '../../components/Sign';
import { nashContent } from '../../content/nash';
import d from '../../styles/demo.module.css';

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
    insight: "1 équilibre, et c'est le pire pour les deux.",
    payoffs: [
      [
        [-1, -1],
        [-3, 0],
      ],
      [
        [0, -3],
        [-2, -2],
      ],
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
      [
        [3, 2],
        [0, 0],
      ],
      [
        [0, 0],
        [2, 3],
      ],
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
      [
        [0, 0],
        [-1, 1],
      ],
      [
        [1, -1],
        [-10, -10],
      ],
    ],
  },
];

function clone(p: PayoffMatrix22): PayoffMatrix22 {
  return [
    [
      [p[0][0][0], p[0][0][1]],
      [p[0][1][0], p[0][1][1]],
    ],
    [
      [p[1][0][0], p[1][0][1]],
      [p[1][1][0], p[1][1][1]],
    ],
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

  const resetToPreset = () => setPayoffs(clone(preset.payoffs));

  const nashCount = br.nash.length;

  return (
    <div>
      <div role="tablist" className={d.tabs}>
        {PRESETS.map((p) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={presetId === p.id}
            onClick={() => selectPreset(p.id)}
            className={`${d.tab} ${presetId === p.id ? d.tabOn : ''}`}
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

          <div className={d.countStrip}>
            <span className={d.count}>
              <span className={d.countNum}>
                <FlapValue value={nashCount} />
              </span>
              {nashCount === 0
                ? 'équilibre en stratégies pures'
                : nashCount === 1
                  ? 'équilibre de Nash'
                  : 'équilibres de Nash'}
            </span>
            {isModified && (
              <button onClick={resetToPreset} className={d.reset}>
                <Pictogram id="iterated" size={14} />
                Restaurer le préréglage
              </button>
            )}
          </div>
        </div>

        <div className={d.stack}>
          <div className={d.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
              <span className={d.cardTitle}>{preset.title}</span>
              {isModified && (
                <span className={d.badge}>
                  <Pictogram id="warn" size={11} />
                  modifié
                </span>
              )}
            </div>
            <p className={d.note}>{preset.story}</p>
            <p className={d.insight}>{preset.insight}</p>
          </div>

          <div className={d.card}>
            <div className={d.cardTitle}>Mode d'emploi</div>
            <ol className={d.steps}>
              <li>Pour chaque colonne, le joueur ligne souligne sa case avec le meilleur gain.</li>
              <li>Pour chaque ligne, le joueur colonne souligne sa case avec le meilleur gain.</li>
              <li>
                Une cellule avec <em>les deux</em> soulignements est un équilibre : aucun
                joueur ne gagne à dévier seul.
              </li>
            </ol>
            <p className={d.note} style={{ marginTop: 'var(--space-3)' }}>
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
      demoHint="Change un gain : le compteur d'équilibres bascule au moment où l'équilibre se déplace."
      demo={<Demo />}
      body={nashContent.body}
      deepDive={nashContent.deepDive}
      relatedIds={['prisoners', 'mixed']}
    />
  );
}
