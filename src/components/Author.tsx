import "./Author.css";
import "./reset.css";

import { useState } from "react";

export default function Author() {
  const [ouvert, setOuvert] = useState(false);

  const name = "Matt Abraham Groening";
  const birthDate = "15 février 1954";
  const mattSrc = "/MattGroening.jpg";
  const description =
    " Matthew Abram Groening, est un dessinateur, scénariste et producteur américain né le 15 février 1954 à Portland, dans l'Oregon, aux États-Unis. Il est principalement connu pour avoir créé Les Simpson, l'une des séries d'animation les plus célèbres de l'histoire de la télévision. Dès son enfance, Matt Groening se passionne pour le dessin et l'humour. Après ses études, il s'installe à Los Angeles en 1977, où il rencontre des difficultés financières et enchaîne plusieurs petits emplois. Pour exprimer ses frustrations, il crée la bande dessinée Life in Hell, publiée à partir de 1980. Son succès lui permet de se faire connaître et d'attirer l'attention de professionnels de la télévision. En 1986, le producteur James L. Brooks lui propose d'imaginer de courts dessins animés pour l'émission The Tracey Ullman Show. Groening décide alors de créer une nouvelle famille plutôt que d'utiliser les personnages de sa bande dessinée. Il s'inspire notamment de sa propre famille pour choisir les prénoms des personnages : Homer, Marge, Lisa et Maggie. Bart, quant à lui, tire son nom du mot anglais brat, qui signifie « sale gosse ». La famille est composée de cinq personnages aux personnalités très différentes : Homer, le père maladroit ; Marge, la mère qui tente de maintenir l'équilibre familial ; Bart, le garçon rebelle ; Lisa, l'enfant intelligente et engagée ; et Maggie, le bébé silencieux.Les Simpson apparaissent pour la première fois à la télévision le 19 avril 1987, dans The Tracey Ullman Show. À cette époque, les épisodes sont de courts sketches animés. Le public apprécie rapidement leur humour et leur représentation imparfaite de la famille américaine. Face à ce succès, Fox décide de leur consacrer une série indépendante. Le premier épisode, Simpsons Roasting on an Open Fire, est diffusé le 17 décembre 1989. La série développe alors des histoires plus longues et introduit progressivement les nombreux habitants de Springfield. Les Simpson se démarquent des autres dessins animés en proposant un humour qui s'adresse aussi bien aux enfants qu'aux adultes. La série se moque de la société américaine, de la politique, de l'école, des médias et du monde du travail. Des personnages secondaires comme M. Burns, Ned Flanders et Moe enrichissent cet univers et permettent d'aborder de nombreux sujets. En 2007, la famille arrive au cinéma avec Les Simpson, le film, qui rencontre un important succès international. La série devient alors une véritable franchise mondiale, avec des produits dérivés, des jeux vidéo et de nombreuses références dans la culture populaire. Matt Groening a reçu de nombreuses distinctions grâce à son travail sur Les Simpson. Il compte notamment 14 Emmy Awards toutes catégories confondues, selon sa fiche officielle, dont plusieurs sont liés à la série.Les Simpson ont également reçu d'autres distinctions, notamment un Peabody Award en reconnaissance de leur contribution à la télévision.Concernant les Oscars, Matt Groening n'a pas remporté d'Oscar pour Les Simpson. Ses récompenses les plus importantes sont principalement liées à la télévision, notamment les Emmy Awards. Matt Groening a profondément marqué l'histoire de l'animation en démontrant qu'une série animée pouvait divertir tout en proposant une critique de la société. Grâce à ses personnages reconnaissables et à son humour satirique, Les Simpson sont devenus une référence mondiale. La série doit également son succès au travail collectif de James L. Brooks, Sam Simon, des scénaristes, des animateurs et des comédiens qui ont contribué à développer cet univers. En dehors des Simpson, Matt Groening est également connu pour : Life in Hell (1980-2012), sa bande dessinée humoristique.Futurama (1999), une série d'animation de science-fiction créée avec David X. Cohen.Désenchantée (Disenchantment, 2018-2023), une série d'animation fantastique diffusée sur Netflix.";
  return (
    <section className="conteneur" id="matt-groening">
      <div className="carte-conteneur" onClick={() => setOuvert(!ouvert)}>
        <div className="texte">
          <div className="nameBirth">
            <h2 className="name">{name}</h2>
            <h3 className="birthDate">Né le {birthDate}</h3>
          </div>
          <img src={mattSrc} alt={name} className="imgmatt" />
          <p className={`description ${ouvert ? "ouverte" : ""}`}>
            {description}
          </p>
        </div>

        <button className={`fleche ${ouvert ? "ouverte" : ""}`} />
      </div>
    </section>
  );
}
