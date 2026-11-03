import "./Characters.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface CharacterData {
  id: number;
  name: string;
  role: string;
  img: string; 
  description: string;
}

export default function Characters() {
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://materiel-apprentissage.github.io/api/simpsons.json")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const nextCharacter = () => {
    if (characters.length === 0) return;
    setCurrentIndex((prev) => (prev === characters.length - 1 ? 0 : prev + 1));
  };

  const prevCharacter = () => {
    if (characters.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? characters.length - 1 : prev - 1));
  };

  if (loading) return <div className="characters-carousel">Chargement...</div>;
  if (characters.length === 0) return <div className="characters-carousel">Aucun personnage.</div>;

  const currentCharacter = characters[currentIndex];

  return (
    <div className="characters-carousel">
      <h2>Galerie des Personnages de Springfield</h2>

      {/* Le Link prend toute la largeur et hérite du style */}
      <Link to={`/character/${currentCharacter.id}`} className="character-link-card">
        <div className="character-card">
          <img 
            src={`/img/${currentCharacter.img}`} 
            alt={currentCharacter.name}
          />
          <h3>{currentCharacter.name}</h3>
          <p className="role"><strong>Rôle :</strong> {currentCharacter.role}</p>
          <p>{currentCharacter.description}</p>
          <span className="details-hint">🔍 Cliquez pour voir sa fiche complète</span>
        </div>
      </Link>

      <div className="carousel-buttons">
        <button onClick={prevCharacter}>◀ Précédent</button>
        <span>{currentIndex + 1} / {characters.length}</span>
        <button onClick={nextCharacter}>Suivant ▶</button>
      </div>
    </div>
  );
}