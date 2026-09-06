import { describe, it, expect } from 'vitest';
import { ROOT_ID, TREE, pathTo, walk } from './decisionTree';
import { GAMES, gameById } from './games';
import { CONCEPT_ROUTES } from './concepts';

/** Toutes les feuilles de l'arbre, par parcours exhaustif. */
function leaves(nodeId = ROOT_ID, acc: string[] = []): string[] {
  for (const opt of TREE[nodeId].options) {
    if ('game' in opt.next) acc.push(opt.next.game);
    else leaves(opt.next.node, acc);
  }
  return acc;
}

describe("l'arbre du guichet", () => {
  it('ne renvoie que vers des nœuds et des fiches qui existent', () => {
    for (const node of Object.values(TREE)) {
      expect(node.options.length).toBeGreaterThanOrEqual(2);
      expect(node.options.length).toBeLessThanOrEqual(4);
      for (const opt of node.options) {
        if ('game' in opt.next) expect(gameById(opt.next.game), opt.next.game).toBeDefined();
        else expect(TREE[opt.next.node], opt.next.node).toBeDefined();
      }
    }
  });

  it('aboutit à chaque fiche exactement une fois', () => {
    const found = leaves().sort();
    const expected = GAMES.map((g) => g.id).sort();
    expect(found).toEqual(expected);
  });

  it('retrouve le chemin de chaque fiche et le rejoue', () => {
    for (const g of GAMES) {
      const path = pathTo(g.id);
      expect(path, g.id).not.toBeNull();
      expect(walk(path!).game).toBe(g.id);
    }
  });

  it('tronque un chemin invalide au lieu de planter', () => {
    const r = walk([0, 9, 9]);
    expect(r.steps.length).toBe(1);
    expect(r.node?.id).toBe('quand');
    expect(r.game).toBeUndefined();
  });

  it('ne pointe que vers des concepts existants', () => {
    const ids = new Set<string>(CONCEPT_ROUTES.map((c) => c.id));
    for (const g of GAMES) {
      expect(g.concepts.length).toBeGreaterThan(0);
      for (const c of g.concepts) expect(ids.has(c), `${g.id} → ${c}`).toBe(true);
      if (g.onSite) expect(ids.has(g.onSite)).toBe(true);
    }
  });
});
