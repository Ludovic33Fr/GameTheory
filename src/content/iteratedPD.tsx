import { GlossaryTerm } from '../components/GlossaryTerm';
import { KaTeXBlock } from '../components/KaTeXBlock';

export const iteratedPDContent = {
  category: 'Jeu répété',
  summary: 'Quand le dilemme du prisonnier se répète, la coopération peut émerger. Le tournoi d\'Axelrod (1980) en a donné la démonstration historique.',

  body: (
    <>
      <h2>Pourquoi la coopération peut émerger</h2>
      <p>
        Si les joueurs savent qu'ils vont se rencontrer à nouveau, la <GlossaryTerm id="cooperation">coopération</GlossaryTerm>{' '}
        peut devenir rationnelle : trahir aujourd'hui, c'est s'exposer à une <GlossaryTerm id="trahison">trahison</GlossaryTerm>{' '}
        en représailles demain. Robert Axelrod a organisé en 1980 un tournoi où des chercheurs ont soumis des
        stratégies pour le dilemme du prisonnier itéré. La gagnante, étonnamment, était la plus simple de toutes :{' '}
        <GlossaryTerm id="tit-for-tat">tit-for-tat</GlossaryTerm>.
      </p>
      <p style={{ marginTop: 'var(--space-3)' }}>
        Choisis 2 à 6 stratégies dans la démo et lance un tournoi en round-robin. Observe : les stratégies
        « gentilles » (qui ne trahissent jamais en premier) tendent à dominer dans une population mixte.
      </p>
    </>
  ),

  deepDive: (
    <>
      <p>
        Score total d'une stratégie <KaTeXBlock tex="\sigma_i" inline /> contre toutes les autres dans un tournoi de{' '}
        <KaTeXBlock tex="T" inline /> tours par match :
      </p>
      <KaTeXBlock tex="S(\sigma_i) = \sum_{j \neq i} \sum_{t=1}^{T} u_i(\sigma_i(h_t), \sigma_j(h_t))" />
      <p>
        Axelrod identifie quatre propriétés des stratégies gagnantes : être <em>gentil</em> (ne jamais trahir en
        premier), <em>réciproque</em> (répondre à la trahison), <em>indulgent</em> (ne pas garder rancune
        indéfiniment), <em>clair</em> (prévisible pour permettre la coopération).
      </p>
    </>
  ),
};
