import { useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { sequentialContent } from '../../content/sequential';
import { entrantMonopoly, solveBackwardInduction, type GameTreeNode } from '../../games/sequential';

function NodeView({ node, depth, highlightPath }: { node: GameTreeNode; depth: number; highlightPath: string[] }) {
  if (node.kind === 'leaf') {
    return (
      <div style={{ marginLeft: depth * 24, padding: 'var(--space-2) var(--space-3)', background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', display: 'inline-block' }}>
        <div style={{ color: 'var(--text-secondary)' }}>{node.label}</div>
        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>({node.payoffs.join(', ')})</div>
      </div>
    );
  }
  return (
    <div style={{ marginLeft: depth * 24, marginTop: 'var(--space-3)' }}>
      <div className="label-mono" style={{ color: 'var(--accent-secondary)' }}>{node.player}</div>
      {node.actions.map((a, i) => {
        const isOnPath = highlightPath.includes(a.label);
        return (
          <div key={i} style={{ marginTop: 'var(--space-2)', paddingLeft: 'var(--space-3)', borderLeft: `2px solid ${isOnPath ? 'var(--accent-primary)' : 'var(--border-subtle)'}` }}>
            <div style={{ color: isOnPath ? 'var(--accent-primary)' : 'var(--text-secondary)', fontSize: 'var(--text-sm)', fontWeight: isOnPath ? 700 : 400, padding: 'var(--space-1) 0' }}>{a.label}</div>
            <NodeView node={a.child} depth={depth + 1} highlightPath={highlightPath} />
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
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <NodeView node={entrantMonopoly} depth={0} highlightPath={path} />
      </div>
      <div style={{ marginTop: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <button
          onClick={() => setSolved((v) => !v)}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: solved ? 'var(--bg-elevated)' : 'var(--accent-primary)',
            color: solved ? 'var(--text-primary)' : 'var(--bg-base)',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            border: solved ? '1px solid var(--border-default)' : 0,
          }}
        >
          {solved ? 'Réinitialiser' : 'Résoudre par induction à rebours'}
        </button>
        {solved && (
          <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            SPNE : ({solution.path.map((s) => s.action).join(', ')}) — paiements ({solution.payoffs.join(', ')}).
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
      demo={<Demo />}
      body={sequentialContent.body}
      deepDive={sequentialContent.deepDive}
      relatedIds={['nash']}
    />
  );
}
