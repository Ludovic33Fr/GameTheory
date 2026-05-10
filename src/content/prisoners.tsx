import { GlossaryTerm } from '../components/GlossaryTerm';
import { KaTeXBlock } from '../components/KaTeXBlock';

export const prisonersContent = {
  category: 'Jeu simultané',
  summary: 'Deux suspects, deux choix. Quand la rationalité individuelle conduit-elle à un résultat collectivement sous-optimal ?',

  body: (
    <>
      <h2>Pourquoi ce résultat ?</h2>
      <p>
        Pour chaque <GlossaryTerm id="joueur">joueur</GlossaryTerm>, <GlossaryTerm id="trahison">trahir</GlossaryTerm> est
        une <GlossaryTerm id="strategie-dominante">stratégie dominante</GlossaryTerm> : peu importe ce que fait l'autre,
        on s'en tire mieux en trahissant. C'est ce qui rend ce jeu fascinant — la rationalité individuelle produit un
        résultat sous-optimal pour tout le monde.
      </p>
      <p style={{ marginTop: 'var(--space-3)' }}>
        Le profil (Trahir, Trahir) est l'unique <GlossaryTerm id="equilibre-nash">équilibre de Nash</GlossaryTerm> en
        stratégies pures de ce jeu. Pourtant, (Coopérer, Coopérer) donnerait à chacun un meilleur résultat. Cet écart
        entre rationalité individuelle et optimum collectif est au cœur de nombreux problèmes économiques et sociaux.
      </p>
    </>
  ),

  deepDive: (
    <>
      <p>
        Soit <KaTeXBlock tex="u_i(s)" inline /> le paiement du joueur <KaTeXBlock tex="i" inline /> pour le profil
        de stratégies <KaTeXBlock tex="s" inline />. Une stratégie <KaTeXBlock tex="s_i^*" inline /> est strictement
        dominante si :
      </p>
      <KaTeXBlock tex="u_i(s_i^*, s_{-i}) > u_i(s_i, s_{-i}) \quad \forall s_i \neq s_i^*, \, \forall s_{-i}" />
      <p>
        Dans le dilemme du prisonnier, on a <KaTeXBlock tex="u_i(D, s_{-i}) > u_i(C, s_{-i})" inline /> pour
        toute action <KaTeXBlock tex="s_{-i}" inline /> de l'autre joueur. Trahir domine strictement Coopérer.
      </p>
    </>
  ),

  references: [
    { author: 'Albert W. Tucker', title: 'A Two-Person Dilemma (1950, conférence à Stanford)' },
    { author: 'Robert Axelrod', title: 'The Evolution of Cooperation', url: 'https://www.basicbooks.com/titles/robert-axelrod/the-evolution-of-cooperation/9780465005642/' },
  ],
};
