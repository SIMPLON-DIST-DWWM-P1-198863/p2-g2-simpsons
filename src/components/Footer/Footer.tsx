import { useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);

  const handleTextClick = () => {
    setIsMessageVisible((prev) => !prev);
  };

  return (
    <footer className="footer">
      <div className="all">
        <p className="fan">© 2026 Fan Simpsons 2.0</p>
        <h1
          onClick={handleTextClick}
          role="button"
          aria-expanded={isMessageVisible}
          className="title"
        >
          Mentions Légales & Clause de Non-Affiliation
        </h1>

        {isMessageVisible && (
          <div className="textes">
            <p>
              Ce site internet est une page de fans indépendante, à but
              strictement informatif, culturel et non lucratif. Il n'est en
              aucun cas affilié, approuvé, associé ou parrainé par The Walt
              Disney Company, 20th Television, Fox Corporation, ou les créateurs
              de la série Les Simpson.
            </p>
            <p>
              Toutes les marques déposées, logos, noms de personnages, images et
              extraits de la série Les Simpson mentionnés ou affichés sur ce
              site sont la propriété exclusive de leurs détenteurs de droits
              respectifs.
            </p>
            <p>
              L'utilisation de ces éléments est faite à des fins de critique,
              d'analyse, d'illustration et d'information, dans le cadre du droit
              de citation.
            </p>
            <p>
              Si vous êtes le titulaire des droits d'un contenu présent sur ce
              site et que vous souhaitez son retrait, merci de nous contacter
              directement.
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
