# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Le lecteur principal est un **curieux autodidacte**. Il arrive sur le site sans professeur, sans
programme et sans évaluation, souvent par un lien ou une recherche. Il veut comprendre un concept
de théorie des jeux en cinq à dix minutes, en manipulant une démonstration plutôt qu'en lisant une
démonstration formelle. Il n'est pas captif : il part dès qu'il s'ennuie ou qu'il ne comprend pas.
Le site est en français.

## Product Purpose

Rendre six concepts fondamentaux de théorie des jeux compréhensibles par la manipulation directe.
Chaque concept a une démonstration cliquable qui fait comprendre avant que le texte n'explique.
Le succès n'est pas « une page lue » mais **« trois concepts visités »** : le visiteur arrive pour
un concept et repart en ayant suivi les liens vers deux autres. Les relations entre concepts, et
la carte qui les rend visibles, sont le cœur du produit, pas une navigation accessoire.

## Positioning

La plupart des ressources de théorie des jeux sont soit des cours formels (matrices statiques,
notation académique), soit des vulgarisations sans manipulation. Ici, chaque concept est un objet
qu'on peut tripoter : on édite les gains d'une matrice et l'équilibre se recalcule, on choisit des
stratégies et le tournoi itéré tourne sous les yeux. La formalisation mathématique existe mais est
repliée derrière un `<details>` — elle est disponible, jamais imposée.

## Operating Context

Navigateur, desktop et mobile. Session courte, lecture unique, aucun compte, aucun état persistant.
Le visiteur peut atterrir sur n'importe quelle page concept directement (URL partagée) : chaque
page doit être auto-suffisante et proposer sa propre suite.

## Capabilities and Constraints

- Six concepts : dilemme du prisonnier, équilibre de Nash, stratégies mixtes, dilemme itéré,
  jeux séquentiels, tragédie des biens communs. Routes en français, déjà publiques.
- Pages transverses : `/glossaire`, `/aller-plus-loin`, 404.
- Démonstrations interactives réelles : `PayoffMatrix`, `EditablePayoffMatrix` (gains éditables,
  équilibre recalculé), tournoi Axelrod avec sélecteur de stratégies, `CumulativeChart`, `HubMap`.
  Le moteur de jeu vit dans `src/games/` et est couvert par des tests Vitest.
- Rendu mathématique via KaTeX ; contenu long via react-markdown + remark-math.
- Stack imposée par l'existant : React 18, Vite 5, React Router 6, framer-motion, CSS Modules +
  variables CSS. Déploiement Vercel (SPA rewrite).
- Pas de backend, pas d'analytics, pas de compte utilisateur.

## Brand Commitments

Nom : **GameTheory**. Aucun logo ni charte imposée par ailleurs — le nom seul est acquis.

## Evidence on Hand

Tout le contenu pédagogique français existe déjà dans `src/content/` (six fichiers concept,
glossaire, références bibliographiques réelles). **Ce texte est intouchable** : il ne doit pas être
réécrit sans accord explicite. Les démonstrations sont fonctionnelles et testées — elles peuvent
être revêtues, jamais altérées dans leur comportement.

Aucune donnée d'usage, aucun témoignage, aucune métrique d'audience : rien de tel ne doit être
inventé ni affiché.

## Product Principles

1. **La manipulation précède l'explication.** Sur chaque page concept, ce qu'on peut toucher passe
   avant ce qu'on doit lire.
2. **Le lien vaut la page.** Un concept isolé est un échec ; la relation entre concepts est le
   contenu principal, pas un footer de navigation.
3. **La formalisation est offerte, jamais imposée.** Les maths restent accessibles en un clic et
   invisibles par défaut.
4. **Rien n'est gagné.** Le lecteur n'est pas captif : chaque écran doit justifier les trente
   secondes suivantes.
5. **Aucune invention.** Pas de chiffre, de citation ou de résultat qui ne vienne du contenu réel.

## Accessibility & Inclusion

Contenu francophone. Un hook `useReducedMotion` existe déjà et gate les animations : toute motion
ajoutée doit passer par lui. Les démonstrations sont au clavier (`tabIndex`, `onKeyDown`) et
doivent le rester ; la carte des concepts a déjà un repli en liste et doit garder un équivalent
non-graphique.
