import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./CharacterDetail.css";
import charactersData from "../types/characterDetail.json";

export default function CharacterDetail() {
  const { id } = useParams();
  const characterId = Number(id);
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // charactersData est maintenant un tableau, on récupère tous les IDs valides
  const validIds = charactersData.map((c: any) => c.id);
  const currentIndex = validIds.indexOf(characterId);

  const prevId =
    currentIndex > 0
      ? validIds[currentIndex - 1]
      : validIds[validIds.length - 1];
  const nextId =
    currentIndex < validIds.length - 1 && currentIndex !== -1
      ? validIds[currentIndex + 1]
      : validIds[0];

  useEffect(() => {
    // On cherche directement le personnage dans le tableau importé
    const found = charactersData.find((c: any) => c.id === characterId);

    if (found) {
      setCharacter(found);
      setLoading(false);
    } else {
      // Sécurité si l'ID n'est pas trouvé, on prend le premier (Homer)
      setCharacter(charactersData[0]);
      setLoading(false);
    }
  }, [characterId]);

  if (loading)
    return <div className="character-detail-container">Chargement...</div>;
  if (!character)
    return (
      <div className="character-detail-container">Personnage introuvable !</div>
    );

  return (
    <div className="character-detail-container">
      {/* Bouton retour vers la page d'accueil / liste des personnages */}
      <Link to="/" className="back-button">
        ⬅ Retour à la liste!
      </Link>

      <div className="navigation-wrapper">
        {/* Carte principale du personnage uniquement */}
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
              {character.age && (
                <span className="pill">{character.age} ans</span>
              )}
              <span className="pill">
                {character.occupation || character.role}
              </span>
              {character.quote && (
                <span className="pill quote-pill">"{character.quote}"</span>
              )}
            </div>

            <p className="bio">{character.description}</p>

            {character.anekdote && (
              <p className="anekdote-text">
                <em>Anecdote : {character.anekdote}</em>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Flèches de navigation  */}
      <div className="bottom-nav-arrows">
        <Link
          to={`/character/${prevId}`}
          className="nav-arrow left-arrow"
          title="Personnage précédent"
        >
          ❮
        </Link>

        <Link
          to={`/character/${nextId}`}
          className="nav-arrow right-arrow"
          title="Personnage suivant"
        >
          ❯
        </Link>
      </div>
    </div>
  );
}
