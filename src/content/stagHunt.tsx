import { GlossaryTerm } from '../components/GlossaryTerm';
import { KaTeXBlock } from '../components/KaTeXBlock';

export const stagHuntContent = {
  category: 'Jeu de coordination',
  summary:
    "Deux chasseurs, un cerf qui ne se prend qu'à deux, un lièvre qui se prend seul. Le meilleur résultat exige de faire confiance — et rien ne l'impose.",

  body: (
    <>
      <h2>Le dilemme sans tentation</h2>
      <p>
        La chasse au cerf ressemble au dilemme du prisonnier, à un gain près : ici, quand l'autre
        coopère, on gagne plus à coopérer aussi qu'à le trahir. Il n'y a pas de{' '}
        <GlossaryTerm id="strategie-dominante">stratégie dominante</GlossaryTerm>. Le bon choix
        dépend entièrement de ce que l'on croit que l'autre va faire.
      </p>
      <p style={{ marginTop: 'var(--space-3)' }}>
        Le jeu a deux <GlossaryTerm id="equilibre-nash">équilibres de Nash</GlossaryTerm> en
        stratégies pures. (Cerf, Cerf) est le meilleur pour tous les deux : on dit qu'il{' '}
        <GlossaryTerm id="dominance-en-paiement">domine en paiement</GlossaryTerm>. (Lièvre, Lièvre)
        ne rapporte que le lièvre, mais il ne fait courir aucun risque : il{' '}
        <GlossaryTerm id="dominance-en-risque">domine en risque</GlossaryTerm>. Le concept d'équilibre
        ne départage pas les deux. C'est le premier <GlossaryTerm id="jeu-de-coordination">jeu de
        coordination</GlossaryTerm> du parcours : le problème n'est plus d'aligner les incitations,
        mais de s'accorder sur un équilibre.
      </p>

      <h2>Le seuil de confiance</h2>
      <p>
        Partir au cerf est un pari sur l'autre. Avec les gains du manuel (4 pour le cerf à deux,
        3 pour le lièvre, 0 pour le cerf raté), il faut croire à au moins trois chances sur quatre
        que l'autre parte au cerf pour que le pari vaille le coup. En dessous, le lièvre est la
        réponse rationnelle — même si l'on sait parfaitement que le cerf serait meilleur pour
        tous. La démonstration te laisse déplacer ce seuil : rends le cerf plus gros, ou le retour
        bredouille plus dur, et regarde la confiance exigée bouger.
      </p>
      <p style={{ marginTop: 'var(--space-3)' }}>
        Ce qui débloque le cerf, ce n'est pas la bonne volonté mais tout ce qui rend l'autre
        prévisible : un engagement visible, un historique commun, un signal coûteux à envoyer.
        Les groupes qui coopèrent ne sont pas ceux dont les membres sont plus généreux ; ce sont
        ceux où chacun a des raisons de croire que les autres suivront.
      </p>
    </>
  ),

  deepDive: (
    <>
      <p>
        Soit <KaTeXBlock tex="C" inline /> le gain du cerf pris à deux, <KaTeXBlock tex="L" inline /> celui
        du lièvre et <KaTeXBlock tex="Z" inline /> celui du chasseur de cerf resté seul, avec{' '}
        <KaTeXBlock tex="C > L > Z" inline />. Si l'autre part au cerf avec probabilité{' '}
        <KaTeXBlock tex="p" inline />, les gains espérés sont :
      </p>
      <KaTeXBlock tex="\mathbb{E}[\text{Cerf}] = p\,C + (1-p)\,Z \qquad \mathbb{E}[\text{Lièvre}] = L" />
      <p>Partir au cerf est le meilleur pari dès que :</p>
      <KaTeXBlock tex="p \;\geq\; p^* = \frac{L - Z}{C - Z}" />
      <p>
        Avec <KaTeXBlock tex="(C, L, Z) = (4, 3, 0)" inline />, on trouve{' '}
        <KaTeXBlock tex="p^* = 3/4" inline />. Harsanyi et Selten (1988) appellent{' '}
        <em>dominant en risque</em> l'équilibre vers lequel on se tourne quand on est incertain
        de l'autre : ici (Lièvre, Lièvre), puisque <KaTeXBlock tex="p^* > 1/2" inline />. L'équilibre{' '}
        <em>dominant en paiement</em>, (Cerf, Cerf), ne l'emporte que si la confiance dépasse{' '}
        <KaTeXBlock tex="p^*" inline />.
      </p>
      <p>
        Dans une population où une part <KaTeXBlock tex="x" inline /> des chasseurs part au cerf,
        la dynamique du réplicateur fait croître cette part quand{' '}
        <KaTeXBlock tex="x > p^*" inline /> et la fait décroître sinon :{' '}
        <KaTeXBlock tex="p^*" inline /> sépare les bassins d'attraction des deux équilibres.
      </p>
    </>
  ),
};
