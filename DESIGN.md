---
name: GameTheory
description: Six concepts de théorie des jeux signalés comme un terminal d'aéroport.
colors:
  sign-yellow: "#ffcc00"
  sign-yellow-lit: "#ffdb47"
  sign-yellow-shade: "#e0b100"
  sign-black: "#0b0b0b"
  panel-frame: "#1a1a1a"
  backplate: "#131313"
  backplate-lit: "#1f1f1f"
  surface-gray: "#e6e6e6"
  icon-white: "#ffffff"
  paper: "#fbfbfa"
  ink-yellow: "#0b0b0b"
  ink-yellow-2: "#4a3c00"
  ink-black: "#ffffff"
  ink-black-2: "#b9b6ae"
  ink-paper: "#16150f"
  ink-paper-2: "#57544a"
typography:
  gate:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(46px, 8.4vw, 120px)"
    fontWeight: 900
    lineHeight: 0.78
    letterSpacing: "-0.05em"
    fontFeature: "tnum"
  display:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(36px, 6.4vw, 84px)"
    fontWeight: 900
    lineHeight: 0.96
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(28px, 4.2vw, 42px)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(22px, 2.6vw, 28px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.68
    letterSpacing: "normal"
  label:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.09em"
rounded:
  none: "0"
  field: "6px"
  plate: "10px"
  card: "12px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "20": "80px"
  "24": "96px"
components:
  plate:
    backgroundColor: "{colors.sign-black}"
    textColor: "{colors.icon-white}"
    rounded: "{rounded.plate}"
    size: "44px"
  plate-yellow:
    backgroundColor: "{colors.sign-yellow}"
    textColor: "{colors.sign-black}"
    rounded: "{rounded.plate}"
    size: "44px"
  button-primary:
    backgroundColor: "{colors.sign-black}"
    textColor: "{colors.icon-white}"
    rounded: "{rounded.plate}"
    padding: "12px 20px 12px 12px"
  button-primary-hover:
    backgroundColor: "{colors.panel-frame}"
    textColor: "{colors.icon-white}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.sign-black}"
    rounded: "{rounded.plate}"
    padding: "12px 20px 12px 12px"
  button-ghost-hover:
    backgroundColor: "{colors.sign-black}"
    textColor: "{colors.sign-yellow}"
  play-primary:
    backgroundColor: "{colors.sign-yellow}"
    textColor: "{colors.sign-black}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
  play-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.sign-yellow}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
  panel:
    backgroundColor: "{colors.backplate}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.card}"
    padding: "16px"
  reading-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-paper}"
    rounded: "{rounded.card}"
    padding: "clamp(24px, 4vw, 48px)"
  sign-row:
    backgroundColor: "{colors.sign-yellow}"
    textColor: "{colors.ink-yellow}"
    rounded: "{rounded.none}"
    padding: "clamp(16px, 2.4vw, 24px) clamp(20px, 5vw, 72px)"
  sign-row-hover:
    backgroundColor: "{colors.sign-yellow-lit}"
    textColor: "{colors.ink-yellow}"
  matrix-cell:
    backgroundColor: "#1d1d1d"
    textColor: "{colors.icon-white}"
    rounded: "{rounded.field}"
    padding: "16px 12px"
  matrix-cell-equilibrium:
    backgroundColor: "{colors.sign-yellow}"
    textColor: "{colors.sign-black}"
    rounded: "{rounded.field}"
    padding: "16px 12px"
---

# Design System: GameTheory

## Overview

**Creative North Star : « Le panneau de terminal »**

Le site est un terminal signalé. À chaque jonction, ce que le visiteur peut faire ensuite est
écrit en grand, au-dessus de sa tête : un numéro de porte monumental, un nom de destination,
une flèche calée sur le bord du panneau qu'elle désigne. Le jaune Schiphol est le sol de la
page, pas un accent ; l'encre noire porte tout le texte de navigation ; les plaques noires en
métal perforé accueillent la donnée qu'on manipule ; le papier n'apparaît que là où il y a de
la lecture longue à faire.

Ce monde a été choisi contre deux défauts prévisibles du sujet. Le premier est le tableau de
bord sombre à accent fluo — c'est exactement ce que ce site était avant : noir `#0a0a0f`, cyan
`#22d3ee`, Inter, filets d'un pixel. Le second est l'explicatif crème à serif contrasté et
accent terracotta, l'opposé attendu du premier. Les deux sont des anti-références confirmées.

La signalétique d'aéroport a gagné sur deux axes précis : l'identification (n'importe qui a
déjà lu un panneau de terminal ; il ne faut être ni joueur, ni économiste) et la clarté
produit (« une décision par jonction, seulement les choix qui restent » est mot pour mot le
critère de succès du produit — trois concepts visités au lieu d'un).

**Key Characteristics :**
- Jaune signalétique en aplat pleine largeur, réservé à la navigation.
- Une seule famille typographique, du corps de texte au numéro de porte.
- Pictogrammes blancs pleins dans des carrés noirs — jamais d'émoji, jamais de glyphe Unicode.
- Filets noirs de 2px comme seul séparateur de régions.
- L'état se lit à une marque, pas à une teinte.

## Colors

Deux couleurs portent tout — un jaune saturé et un noir presque pur — plus un papier et un
gris de plaque pour les deux seules choses qui ne sont pas de la signalétique : la lecture
longue et la donnée manipulable.

### Primary
- **Jaune Schiphol** (`#ffcc00`) : le sol de la page. Bandes de panneau, lignes de destination,
  bandeaux de correspondance, plaques du plan, valeurs retenues sur fond noir. C'est la couleur
  de la navigation et de rien d'autre.
- **Jaune éclairé** (`#ffdb47`) : la face éclairée d'un panneau. Survol d'une ligne de
  destination ou d'un bouton jaune, jamais un état au repos.
- **Jaune d'ombre** (`#e0b100`) : soulignement des liens dans la colonne de lecture, piste du
  navigateur, fond de la barre de défilement.

### Neutral
- **Encre de panneau** (`#0b0b0b`) : tout le texte sur jaune, les plaques à pictogramme, les
  filets de séparation, les boutons pleins.
- **Cadre de panneau** (`#1a1a1a`) : survol des plaques noires.
- **Plaque encastrée** (`#131313`) : fond des régions de donnée, texturé d'une trame de métal
  perforé (`radial-gradient` de 1px, pas de 6px, blanc à 5,5 %).
- **Papier** (`#fbfbfa`) : la carte de lecture, et uniquement elle.
- **Encre secondaire sur jaune** (`#4a3c00`) : teintée depuis la teinte du panneau, jamais un
  gris. 7,2:1 sur `#ffcc00`.
- **Encre secondaire sur plaque** (`#b9b6ae`) : 9,2:1 sur `#131313`.

### Named Rules
**La règle du jaune réservé.** Le jaune ne sert qu'à la signalétique : bandes, lignes de
destination, correspondances, plaques du plan, valeur retenue. Un jaune posé sur un élément
qui ne conduit nulle part et ne signale aucun état retenu casse le monde.

**La règle de la marque.** Un état se lit d'abord à une marque, pas à une teinte : coin plein
noir sur la case d'équilibre, case cochée sur une stratégie retenue, hachure diagonale sur un
contrôle refusé, soulignement épais sur une meilleure réponse. La couleur redouble la marque,
elle ne la remplace jamais. Aucune information n'est portée par la seule opposition
vert/rouge.

## Typography

**Famille unique :** Source Sans 3 (repli `ui-sans-serif`, `system-ui`, `-apple-system`,
`Segoe UI`, `sans-serif`).

**Character :** un humaniste à ouvertures larges, choisi comme la face obtenable la plus proche
du Frutiger Next LT de la planche de référence. Les vrais systèmes signalétiques n'emploient
qu'une famille et jouent tout sur l'échelle et la graisse : ici l'écart va de 12px/700 pour
une étiquette de région à 120px/900 pour un numéro de porte, sans jamais changer de face.

### Hierarchy
- **Gate** (900, `clamp(46px, 8.4vw, 120px)`, 0.78, `-0.05em`, chiffres tabulaires) : le numéro
  de porte. C'est une marque de repérage, pas de la prose — c'est ce qui l'autorise à dépasser
  le plafond d'affichage habituel.
- **Display** (900, `clamp(36px, 6.4vw, 84px)`, 0.96, `-0.03em`) : le titre d'un concept, le
  titre d'une page de répertoire. `text-wrap: balance`.
- **Headline** (900, `clamp(28px, 4.2vw, 42px)`, 1) : le titre d'une bande — « Plan du
  terminal », « Correspondances ».
- **Title** (700, `clamp(22px, 2.6vw, 28px)`, 1.1) : le nom d'une destination dans une ligne,
  les `h2` de la colonne de lecture.
- **Body** (400, 17px, 1.68, mesure 66ch) : la prose pédagogique, sur papier uniquement.
- **Label** (700, 12px, `0.09em`, capitales) : le nom d'une région, l'en-tête d'une plaque, le
  type d'une correspondance.

### Named Rules
**La règle du surtitre interdit.** Aucune petite étiquette tracée ne se pose au-dessus d'un
titre plus gros. Une région est nommée par son propre titre, accompagné de sa plaque à
pictogramme. Le seul couple à deux échelles autorisé est celui du panneau lui-même
(« Concepts » / « 01–06 »), parce qu'il forme un seul énoncé et qu'il vient de la grammaire
typographique du panneau de référence.

**La règle des chiffres tabulaires.** Tout chiffre comparable — gain, score, numéro de porte,
compteur d'équilibres — est en `font-variant-numeric: tabular-nums`. Un chiffre qui bouge de
largeur quand il change n'est pas un relevé.

## Layout

Pleine largeur, par bandes. Chaque région est une bande à fond plein qui court d'un bord à
l'autre, séparée de la suivante par un filet noir de 2px — jamais par une marge. Il n'y a pas
de conteneur centré : la marge de concourse est `--gutter: clamp(20px, 5vw, 72px)` appliquée
en padding horizontal à chaque bande, et tout est calé à gauche sur cette marge.

Les lignes de destination sont une grille `auto auto 1fr auto` : plaque, numéro, bloc titre,
flèche. La flèche est calée sur le bord droit de la bande qu'elle désigne, jamais flottante.

La trame d'espacement est de 4px (`--space-1` à `--space-24`). Il y a plus d'espace au-dessus
d'un titre qu'en dessous. La colonne de lecture est capée à 66ch (`--measure`).

**Ruptures :**
- `1080px` : la bande de lecture passe à deux colonnes (colonne de prose à gauche, plaque de
  formalisation à droite) plutôt que de laisser la moitié du panneau vide.
- `860px` : les démonstrations à deux colonnes (`.demoSplit`) s'empilent ; les en-têtes de
  bande passent en colonne.
- `780px` : le répertoire du pied de page s'empile.
- `700px` : le plan du terminal devient défilable horizontalement et l'annonce explicitement.
- `620px` : la plaque à pictogramme disparaît des lignes de destination, le numéro de porte
  tombe à 46px, précédent/suivant s'empile.
- `560px` : la piste d'ariane tombe. **La marque reste** — c'est le seul repère de retour.
- `480px` : les relevés passent de trois à deux colonnes.

## Elevation & Depth

Le système n'a pas de hiérarchie d'ombres. La profondeur vient de la matière : un fond jaune
plein, une plaque noire encastrée à trame perforée, une carte de papier. Deux surfaces
adjacentes se distinguent par leur matériau et par le filet de 2px qui les sépare, jamais par
une ombre portée.

### Shadow Vocabulary
- **hang** (`box-shadow: 0 16px 34px -14px rgba(11, 11, 11, 0.55)`) : l'ombre d'un panneau
  suspendu à sa potence. Réservée à la bande d'en-tête collante, à l'infobulle du glossaire et
  au lien d'évitement quand il prend le focus — c'est-à-dire aux seuls éléments qui flottent
  réellement au-dessus du contenu.

### Named Rules
**La règle de l'élévation déclarée une fois.** Une surface porte un cadre **ou** une ombre,
jamais les deux. Les plaques et les cartes portent un filet ; seuls les éléments suspendus
portent `hang`.

## Shapes

Le panneau est carré : les bandes pleine largeur n'ont aucun rayon. Le rayon apparaît
uniquement sur les objets posés dessus, et par paliers : `6px` pour un champ, une case de
matrice ou une puce, `10px` pour une plaque à pictogramme ou un bouton, `12px` pour une carte
ou une plaque encastrée.

Les filets sont noirs et épais : `--rule: 2px solid #0b0b0b` entre régions,
`--rule-on-black: 2px solid #2c2c2c` à l'intérieur d'une plaque noire. Il n'y a pas de bordure
d'un pixel dans ce système.

Les pictogrammes sont dessinés sur une grille de 32, en formes pleines, avec des filets à 2,6–3
quand un trait est nécessaire. Les flèches ont une hampe rectangulaire et une tête triangulaire
pleine, conformément à la planche de référence.

## Components

### Buttons
- **Shape :** rayon `10px` (`--r-plate`) pour les boutons de navigation, `6px` pour les boutons
  d'action dans une démonstration.
- **Primary :** fond `#0b0b0b`, texte blanc, une flèche dans un carré à filet blanc de 2px
  posée à gauche du libellé. Padding `12px 20px 12px 12px`.
- **Hover :** fond `#1a1a1a`, la flèche glisse de 2px vers la droite.
- **Ghost :** fond transparent, filet interne noir de 2px ; au survol le bouton s'inverse
  (fond noir, texte jaune).
- **Action de démonstration :** `play` en jaune plein sur noir, `play` + `playAlt` en contour
  jaune pour l'option symétrique. Deux options d'un même choix se distinguent par le
  remplissage, jamais par la teinte.
- **Disabled :** le libellé reste lisible (`#8f8c85`, ≥4,5:1) et c'est une hachure diagonale
  qui dit « pas maintenant ».

### Plates (composant signature)
Le carré noir à pictogramme est l'unité de base du système. Trois tailles : `sm` 34px,
`md` 44px, `lg` `clamp(52px, 6vw, 64px)`. Trois tons : noir plein (le défaut), jaune plein
(sur une plaque noire), contour (filet noir de 2px sur jaune). Elle précède systématiquement
le titre d'une région et le nom d'une destination.

### Cards / Containers
- **Plaque encastrée** (`panel`) : fond `#131313` texturé d'une trame perforée, filet noir de
  2px, rayon 12px, en-tête à `#1f1f1f` séparé par un filet `#2c2c2c`. Toute donnée manipulable
  vit dedans.
- **Carte de lecture** (`prose`) : fond `#fbfbfa`, filet noir de 2px, rayon 12px, padding
  `clamp(24px, 4vw, 48px)`. Réservée à la prose longue.

### Inputs / Fields
- **Champ numérique :** fond noir pur, filet `#333` de 2px, rayon 6px, chiffres tabulaires.
  Au focus, le filet passe au jaune.
- **Curseur :** piste de 6px en `#3a3a3a`, poignée rectangulaire jaune de 18×26 à filet noir de
  2px. Hauteur totale 34px pour rester atteignable au doigt.
- **Gain éditable (matrice) :** aucun cadre, le chiffre est le champ. La meilleure réponse est
  soulignée de 3px, l'équilibre allume la case en jaune et lui pose son cartouche « NASH ».

### Navigation
Bande jaune collante en haut, filet noir en bas, ombre `hang`. À gauche : plaque de marque +
« GAMETHEORY » en 900 capitales, puis la piste d'ariane séparée par des chevrons dessinés. À
droite : les liens de ressources, chacun avec son pictogramme ; la page courante devient une
pastille noire à texte jaune (`aria-current="page"`). Sous 720px les libellés passent en
lecture d'écran seule et il ne reste que les pictogrammes ; sous 560px la piste d'ariane
tombe, la marque jamais.

### Le plan du terminal (composant signature)
Le réseau des six concepts en SVG sur plaque noire. Les nœuds sont des plaques jaunes de
196×66 portant un numéro de porte et un titre sur deux lignes ; ce sont de vrais `<a href>`
SVG, avec navigation client interceptée. **Le tracé porte le type de la correspondance** :
trait plein de 6px pour un exemple canonique, plein de 3px pour une extension, tirets pour une
répétition, double trait (évidement de 3px dans un trait de 8px) pour un passage à N joueurs.
Survoler une destination allume ses arêtes et éteint les autres — et le même survol allume la
ligne correspondante dans le panneau des six destinations, dans les deux sens.

### La ligne de destination (accueil)
Chaque porte de l'accueil porte trois lignes sous son titre : le titre lui-même (le lien,
étiré sur toute la ligne), ses **correspondances** en numéros de porte, et **ses jeux** — les
fiches du répertoire dont elle est la porte principale — en puces noires à texte jaune,
cliquables à part. Le répertoire du guichet reprend le même ordre par porte, avec le numéro
devant chaque jeu : ce qu'on lit sur l'accueil et ce qu'on lit au guichet est le même panneau.

### Le guichet Renseignements (`/quel-jeu`)
Un arbre de décision de trois à quatre questions qui aboutit à la fiche d'un jeu. Une seule
question à la fois, en `headline`, sur bande jaune ; les réponses sont des lignes de
destination portant une **plaque-lettre** (A, B, C, D — les lettres de porte, qui sont aussi
les raccourcis clavier), un libellé en `title`, un exemple concret en `body` secondaire, et
une flèche calée à droite. La piste des réponses données court dans une bande `sign-yellow-shade`
sous le titre : chaque réponse est une puce noire cliquable qui ramène à sa question. Le
changement de question bascule (volet), rien ne fond. Le chemin vit dans l'URL (`?r=0.2.1`),
donc le bouton Retour du navigateur fonctionne et un état se partage.

### La fiche d'un jeu (`/quel-jeu/:id`)
Le panneau de la destination trouvée : titre en `display`, alias en puces à filet, puis une
bande de faits de structure (qui décide, quand, combien de fois) chacun avec sa plaque, et le
chemin de réponses qui y mène. La plaque noire « Le jeu » porte la matrice de gains avec ses
équilibres marqués quand le jeu en a une, et la situation racontée. La lecture (ce qui se
passe, ce qu'il enseigne) est sur papier. Les « portes à prendre » réutilisent les lignes de
correspondance des pages concept, et la page se ferme sur deux flèches calées aux bords.

### Le volet basculant (mouvement)
Le système n'a qu'un geste, et c'est celui des tableaux d'affichage à volets : une valeur qui
change bascule sur son axe horizontal (`rotateX`, 260ms, `cubic-bezier(0.2, 0.9, 0.2, 1)`),
elle ne fond pas. Il s'applique au compteur d'équilibres, aux scores, à l'espérance de gain et
aux totaux de tournoi — partout où un chiffre est un relevé. Le composant `FlapValue` lit
`useReducedMotion` et rend la valeur sans animation quand l'utilisateur le demande.

## Do's and Don'ts

### Do:
- **Do** faire courir chaque région d'un bord à l'autre et la séparer de la suivante par
  `--rule` (2px noir). Une région qui flotte dans une marge n'est pas un panneau.
- **Do** caler toute flèche sur le bord du panneau qu'elle désigne : à gauche pour un retour,
  à droite pour une suite.
- **Do** faire précéder le titre de chaque région par sa plaque à pictogramme.
- **Do** doubler tout état par une marque lisible en niveaux de gris (coin plein, case cochée,
  hachure, soulignement).
- **Do** mettre `font-variant-numeric: tabular-nums` sur tout chiffre comparable.
- **Do** passer par `FlapValue` pour un chiffre qui change, et par `useReducedMotion` pour
  toute animation ajoutée.
- **Do** garder la prose longue sur la carte de papier, capée à 66ch.

### Don't:
- **Don't** poser du jaune sur un élément qui ne conduit nulle part et ne signale aucun état
  retenu. Le jaune est de la signalétique.
- **Don't** poser une petite étiquette tracée en capitales au-dessus d'un titre plus gros.
- **Don't** employer un glyphe Unicode ou une émoji comme icône : les pictogrammes sont
  dessinés dans `src/components/Sign/Pictogram.tsx`, sur la grille de 32.
- **Don't** introduire une seconde famille typographique, ni de monospace décorative. Les
  chiffres tabulaires de Source Sans 3 couvrent tous les besoins de relevé.
- **Don't** utiliser une bordure d'un pixel. Le système n'a que des filets de 2px.
- **Don't** cumuler cadre et ombre portée sur une même surface.
- **Don't** signaler une information par la seule opposition vert/rouge : ce système n'a ni
  vert ni rouge.
- **Don't** ajouter une entrée de mouvement identique sur chaque section. Il y a un seul geste,
  le volet, et il ne s'applique qu'aux valeurs qui changent.
