import { GlossaryTerm } from '../components/GlossaryTerm';
import { KaTeXBlock } from '../components/KaTeXBlock';

export const nashContent = {
  category: 'Concept central',
  summary: "Un état où aucun joueur n'a intérêt à dévier seul. Le concept transversal de toute la théorie des jeux non coopérative.",

  body: (
    <>
      <h2>Définition intuitive</h2>
      <p>
        Un <GlossaryTerm id="equilibre-nash">équilibre de Nash</GlossaryTerm> est un profil de{' '}
        <GlossaryTerm id="strategie">stratégies</GlossaryTerm> dans lequel, en supposant les choix des autres
        joueurs fixés, aucun joueur n'a intérêt à changer de stratégie. C'est un point de stabilité : tout le
        monde fait ce qu'il a de mieux à faire compte tenu de ce que font les autres.
      </p>
      <p style={{ marginTop: 'var(--space-3)' }}>
        Un même jeu peut avoir zéro, un, ou plusieurs équilibres. Et l'équilibre n'est pas toujours optimal
        au sens collectif — le dilemme du prisonnier est l'illustration la plus connue de ce paradoxe.
      </p>
      <p style={{ marginTop: 'var(--space-3)' }}>
        La chasse au cerf montre l'autre face du problème : deux équilibres, (Cerf, Cerf) et (Lièvre, Lièvre).
        Le premier est meilleur pour tous, le second est sans risque. Rien dans la définition de l'équilibre
        ne dit lequel sera joué — c'est la confiance entre les joueurs, pas leur calcul, qui tranche.
      </p>
    </>
  ),

  deepDive: (
    <>
      <p>Définition formelle d'un équilibre de Nash en stratégies pures :</p>
      <KaTeXBlock tex="s^* = (s_1^*, \ldots, s_n^*) \text{ est un équilibre de Nash si :}" />
      <KaTeXBlock tex="\forall i, \forall s_i \in S_i, \quad u_i(s_i^*, s_{-i}^*) \geq u_i(s_i, s_{-i}^*)" />
      <p>
        John Nash a démontré en 1950 que tout jeu fini admet au moins un équilibre, à condition d'autoriser les
        <GlossaryTerm id="strategie-mixte"> stratégies mixtes</GlossaryTerm>.
      </p>
    </>
  ),
};
