import { GlossaryTerm } from '../components/GlossaryTerm';
import { KaTeXBlock } from '../components/KaTeXBlock';

export const sequentialContent = {
  category: 'Jeu séquentiel',
  summary: 'Quand les joueurs jouent à tour de rôle et observent les choix précédents. Se résout par induction à rebours.',

  body: (
    <>
      <h2>Le jeu de l'entrant et du monopole</h2>
      <p>
        Une entreprise envisage d'entrer sur un marché tenu par un monopole. Si elle entre, le monopole peut soit
        engager une guerre des prix (Combattre), soit partager le marché (Accommoder). Pour résoudre ce jeu, on
        utilise l'<GlossaryTerm id="induction-rebours">induction à rebours</GlossaryTerm> : on part des feuilles de
        l'arbre et on remonte en supposant qu'à chaque nœud, le joueur joue ce qui est optimal pour lui à cet
        instant.
      </p>
      <p style={{ marginTop: 'var(--space-3)' }}>
        Au nœud du monopole, accommoder rapporte 2, combattre rapporte -1 ; il accommode donc. Sachant cela,
        l'entrant choisit d'entrer (gain 2) plutôt que de rester dehors (gain 0). L'équilibre parfait en
        sous-jeux est (Entrer, Accommoder).
      </p>
    </>
  ),

  deepDive: (
    <>
      <p>Un équilibre parfait en sous-jeux (SPNE) est un profil de stratégies qui forme un équilibre de Nash dans chaque sous-jeu :</p>
      <KaTeXBlock tex="\forall \text{sous-jeu } G', \quad \sigma|_{G'} \text{ est un \'equilibre de Nash de } G'" />
      <p>
        L'induction à rebours sélectionne automatiquement un SPNE pour les jeux à information parfaite et horizon
        fini. La menace « si tu entres, je combats » n'est pas crédible car combattre donnerait au monopole -1
        alors qu'accommoder donne 2.
      </p>
    </>
  ),
};
