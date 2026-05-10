import { GlossaryTerm } from '../components/GlossaryTerm';
import { KaTeXBlock } from '../components/KaTeXBlock';

export const mixedStrategiesContent = {
  category: 'Stratégies probabilistes',
  summary: "Quand aucune stratégie pure n'est stable, randomiser devient rationnel. Pierre-feuille-ciseaux est l'exemple parfait.",

  body: (
    <>
      <h2>Pourquoi mélanger ?</h2>
      <p>
        Dans certains jeux — typiquement à <GlossaryTerm id="somme-nulle">somme nulle</GlossaryTerm> où les
        intérêts sont strictement opposés — aucune <GlossaryTerm id="strategie-pure">stratégie pure</GlossaryTerm>{' '}
        n'est stable. Si tu joues toujours « pierre », ton adversaire jouera « papier ». Tu dois donc être
        imprévisible : c'est l'idée d'une <GlossaryTerm id="strategie-mixte">stratégie mixte</GlossaryTerm>.
      </p>
      <p style={{ marginTop: 'var(--space-3)' }}>
        Dans Pierre-feuille-ciseaux, l'unique équilibre de Nash consiste à jouer chaque action avec probabilité
        1/3. Toute déviation de l'adversaire face à cet équilibre laisse son espérance de gain inchangée — c'est
        ce qui rend l'équilibre stable.
      </p>
    </>
  ),

  deepDive: (
    <>
      <p>L'espérance de gain du joueur 1 face à un profil mixte <KaTeXBlock tex="(\sigma_1, \sigma_2)" inline /> est :</p>
      <KaTeXBlock tex="u_1(\sigma_1, \sigma_2) = \sum_{a \in A_1} \sum_{b \in A_2} \sigma_1(a)\, \sigma_2(b)\, u_1(a, b)" />
      <p>
        Au théorème de Nash (1950), tout jeu fini admet au moins un équilibre en stratégies mixtes. Pour
        Pierre-feuille-ciseaux, l'équilibre est <KaTeXBlock tex="\sigma^* = (1/3, 1/3, 1/3)" inline />.
      </p>
    </>
  ),
};
