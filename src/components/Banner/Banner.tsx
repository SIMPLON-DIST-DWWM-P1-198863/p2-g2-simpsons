import { useState } from "react";
import "./Banner.css";

export default function Banner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <section className="home-banner">
      <button
        className="banner-close"
        onClick={() => setVisible(false)}
        aria-label="Fermer la bannière"
        title="Fermer">
        &times;
      </button>

      <img src="/homerdonut.png" className="banner-image banner-image-left" />

      <div className="banner-content">
        <h1>D'oh ! Bienvenue à Springfield !</h1>
        <p>
          Tout l'univers des Simpson à portée de clic. Découvrez les
          personnages, leurs histoires et les secrets de la série !
        </p>
        <span>Laurie · Jonathan · Serigne</span>
      </div>

      <img src="/homerdonut.png" className="banner-image banner-image-right" />
    </section>
  );
}
