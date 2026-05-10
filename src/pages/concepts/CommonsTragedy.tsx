import { useState } from 'react';
import { ConceptPage } from '../../components/ConceptPage';
import { commonsContent } from '../../content/commons';
import { commonsOutcome, optimalHerdSize } from '../../games/commons';

function Demo() {
  const [herders, setHerders] = useState(4);
  const [perHerder, setPerHerder] = useState(20);
  const capacity = 200;
  const out = commonsOutcome({ herders, perHerder, capacity });
  const opt = optimalHerdSize({ herders, capacity });
  const overload = out.totalCattle > capacity;

  const points = Array.from({ length: 50 }, (_, i) => {
    const N = (i + 1) * (capacity * 1.6 / 50);
    return { N, P: Math.max(0, N * (1 - N / capacity)) };
  });
  const maxP = Math.max(...points.map((p) => p.P));

  return (
    <div className="demoSplit">
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <div className="label-mono">Paramètres</div>
        <div style={{ marginTop: 'var(--space-3)' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            <span>Bergers</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{herders}</span>
          </label>
          <input type="range" min={1} max={20} value={herders} onChange={(e) => setHerders(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div style={{ marginTop: 'var(--space-3)' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            <span>Bêtes par berger</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{perHerder}</span>
          </label>
          <input type="range" min={1} max={50} value={perHerder} onChange={(e) => setPerHerder(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
          <div>Total : <span style={{ color: 'var(--text-primary)' }}>{out.totalCattle}</span> / {capacity} ({((out.totalCattle / capacity) * 100).toFixed(0)}%)</div>
          <div>Productivité collective : <span style={{ color: overload ? 'var(--accent-danger)' : 'var(--accent-success)' }}>{out.collectiveProductivity.toFixed(2)}</span></div>
          <div>Par berger : <span style={{ color: 'var(--text-secondary)' }}>{out.perHerderReturn.toFixed(2)}</span></div>
          <div style={{ marginTop: 'var(--space-2)', color: 'var(--text-muted)' }}>Optimum collectif : {opt.toFixed(1)} bêtes/berger</div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <div className="label-mono">Productivité collective P(N)</div>
        <svg viewBox="0 0 300 180" style={{ width: '100%', marginTop: 'var(--space-3)' }} role="img" aria-label="Courbe de productivité">
          <line x1="20" y1="160" x2="290" y2="160" stroke="var(--border-default)" />
          <line x1="20" y1="10" x2="20" y2="160" stroke="var(--border-default)" />
          <polyline
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="2"
            points={points.map((p) => `${20 + (p.N / (capacity * 1.6)) * 270},${160 - (p.P / maxP) * 140}`).join(' ')}
          />
          <line
            x1={20 + (out.totalCattle / (capacity * 1.6)) * 270}
            y1="10"
            x2={20 + (out.totalCattle / (capacity * 1.6)) * 270}
            y2="160"
            stroke={overload ? 'var(--accent-danger)' : 'var(--accent-warning)'}
            strokeDasharray="4 4"
          />
          <circle
            cx={20 + (out.totalCattle / (capacity * 1.6)) * 270}
            cy={160 - (out.collectiveProductivity / maxP) * 140}
            r="5"
            fill={overload ? 'var(--accent-danger)' : 'var(--accent-warning)'}
          />
          <line
            x1={20 + (capacity / (capacity * 1.6)) * 270}
            y1="10"
            x2={20 + (capacity / (capacity * 1.6)) * 270}
            y2="160"
            stroke="var(--text-muted)"
            strokeDasharray="2 4"
          />
          <text x={20 + (capacity / (capacity * 1.6)) * 270 + 4} y="20" fill="var(--text-muted)" fontSize="10" fontFamily="monospace">capacité</text>
        </svg>
      </div>
    </div>
  );
}

export default function CommonsTragedyPage() {
  return (
    <ConceptPage
      conceptId="commons"
      conceptNumber={6}
      category={commonsContent.category}
      summary={commonsContent.summary}
      demo={<Demo />}
      body={commonsContent.body}
      deepDive={commonsContent.deepDive}
      relatedIds={['prisoners', 'iterated']}
    />
  );
}
