import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import { getCharacters } from "../services/characters";
import CharacterMindMap from "../components/characterMindMap/CharacterMindMap";
import "./CharacterDetail.css";

export default function CharacterDetail() {
  const { id } = useParams();

  const [showMindMap, setShowMindMap] = useState(false);

  const characters = getCharacters();

  const characterIndex = characters.findIndex((item) => item.id === Number(id));

  const character = characters[characterIndex];

  if (!character) {
    return <p>Personnage introuvable !</p>;
  }

  const previousCharacter = characters[characterIndex - 1];
  const nextCharacter = characters[characterIndex + 1];

  return (
    <div className="character-detail-container">
      <Link to="/" className="back-button">
        ⬅ Retour à l'accueil
      </Link>

      {/* Fiche du personnage */}
      <div className="navigation-wrapper">
        {previousCharacter ? (
          <Link
            to={`/character/${previousCharacter.id}`}
            className="nav-arrow"
            aria-label="Personnage précédent">
            ‹
          </Link>
        ) : (
          <span />
        )}

        <div className="character-profile-card">
          <div className="image-container">
            <img
              src={`/img/${character.img}`}
              alt={character.name}
              className="profile-img"
            />
          </div>

          <div className="profile-content">
            <h1>{character.name}</h1>

            <div className="pills-container">
              <span className="pill">
                {typeof character.age === "number"
                  ? `${character.age} ans`
                  : "Âge inconnu"}
              </span>

              <span className="pill">
                {character.occupation ?? "Profession inconnue"}
              </span>
            </div>

            <p className="bio">
              <strong>Biographie :</strong> {character.description}
            </p>
          </div>
        </div>

        {nextCharacter ? (
          <Link
            to={`/character/${nextCharacter.id}`}
            className="nav-arrow"
            aria-label="Personnage suivant">
            ›
          </Link>
        ) : (
          <span />
        )}
      </div>

      {/* Carte mentale dépliable */}
      <section className="character-relations">
        <h2>Les relations de {character.name}</h2>

        <button
          type="button"
          className="mindmap-toggle"
          onClick={() => setShowMindMap((previous) => !previous)}
          aria-expanded={showMindMap}>
          {showMindMap ? "Masquer les relations ▲" : "Voir les relations ▼"}
        </button>

        {showMindMap && (
          <div className="mindmap-container">
            <CharacterMindMap selectedCharacterId={character.id} />{" "}
          </div>
        )}
      </section>
    </div>
  );
}
