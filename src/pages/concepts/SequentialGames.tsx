import { useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { Pictogram } from '../../components/Sign';
import { sequentialContent } from '../../content/sequential';
import {
  entrantMonopoly,
  solveBackwardInduction,
  type GameTreeNode,
} from '../../games/sequential';
import d from '../../styles/demo.module.css';

interface NodeViewProps {
  node: GameTreeNode;
  highlightPath: string[];
  /** Ce nœud est-il atteint par le chemin d'équilibre ? */
  onPath: boolean;
}

function NodeView({ node, highlightPath, onPath }: NodeViewProps) {
  if (node.kind === 'leaf') {
    return (
      <div className={`${d.treeLeaf} ${onPath ? d.treeLeafOn : ''}`}>
        <span className={d.treeLeafLabel}>{node.label}</span>
        <span className={d.treeLeafPayoff}>({node.payoffs.join(', ')})</span>
      </div>
    );
  }
  return (
    <div className={d.treeNode}>
      <span className={d.treePlayer}>
        <Pictogram id="sequential" size={12} />
        {node.player}
      </span>
      {node.actions.map((a, i) => {
        const branchOn = onPath && highlightPath.includes(a.label);
        return (
          <div key={i} className={`${d.treeBranch} ${branchOn ? d.treeBranchOn : ''}`}>
            <div className={d.treeAction}>{a.label}</div>
            <NodeView node={a.child} highlightPath={highlightPath} onPath={branchOn} />
          </div>
        );
      })}
    </div>
  );
}

function Demo() {
  const [solved, setSolved] = useState(false);
  const solution = solveBackwardInduction(entrantMonopoly);
  const path = solved ? solution.path.map((p) => p.action) : [];

  return (
    <div>
      <div className={d.card}>
        <div className={d.cardTitle}>Arbre du jeu</div>
        <NodeView node={entrantMonopoly} highlightPath={path} onPath={solved} />
      </div>

      <div className={d.solution}>
        <button
          onClick={() => setSolved((v) => !v)}
          className={`${d.play} ${solved ? d.playAlt : ''}`}
          style={{ flex: 'none' }}
        >
          {solved ? 'Réinitialiser' : 'Résoudre par induction à rebours'}
        </button>
        {solved && (
          <span className={d.solutionText}>
            SPNE : <strong>({solution.path.map((s) => s.action).join(', ')})</strong> — paiements{' '}
            <strong>({solution.payoffs.join(', ')})</strong>.
          </span>
        )}
      </div>
    </div>
  );
}

export default function SequentialGamesPage() {
  return (
    <ConceptPage
      conceptId="sequential"
      conceptNumber={5}
      category={sequentialContent.category}
      summary={sequentialContent.summary}
      demoHint="Résous l'arbre : le chemin d'équilibre s'allume branche par branche jusqu'à la feuille retenue."
      demo={<Demo />}
      body={sequentialContent.body}
      deepDive={sequentialContent.deepDive}
      relatedIds={['nash']}
    />
  );
}
