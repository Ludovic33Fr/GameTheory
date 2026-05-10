import { GlossaryTerm } from '../components/GlossaryTerm';
import { KaTeXBlock } from '../components/KaTeXBlock';

export const commonsContent = {
  category: 'Jeu à N joueurs',
  summary: "Lorsqu'une ressource commune est exploitée par plusieurs, l'intérêt individuel peut détruire la ressource pour tous. Hardin, 1968.",

  body: (
    <>
      <h2>Le pâturage commun</h2>
      <p>
        Plusieurs bergers font paître leurs bêtes sur un pâturage commun de capacité limitée. Tant que la
        charge totale reste sous la capacité, la productivité augmente avec le nombre de bêtes. Au-delà, le
        pâturage s'épuise et la productivité collective s'effondre.
      </p>
      <p style={{ marginTop: 'var(--space-3)' }}>
        Pour chaque berger, ajouter une bête supplémentaire est rationnel : il en récupère tout le produit, alors
        que la dégradation est partagée par tous. C'est une <GlossaryTerm id="externalite">externalité</GlossaryTerm>{' '}
        négative classique. Sans coordination, la ressource est surexploitée.
      </p>
    </>
  ),

  deepDive: (
    <>
      <p>Productivité totale du pâturage en fonction du nombre total de bêtes <KaTeXBlock tex="N" inline /> et de la capacité <KaTeXBlock tex="K" inline /> :</p>
      <KaTeXBlock tex="P(N) = N \cdot \max\left(0, 1 - \frac{N}{K}\right)" />
      <p>L'optimum collectif est atteint en <KaTeXBlock tex="N^* = K/2" inline />. À l'équilibre de Nash non coopératif, chaque berger augmente sa bête tant que le gain marginal individuel reste positif, ce qui produit <KaTeXBlock tex="N_{\mathrm{NE}} > N^*" inline /> et une surexploitation.</p>
    </>
  ),
};
