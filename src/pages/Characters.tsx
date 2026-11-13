import "./Characters.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Author from "../components/Author/Author";
import Simpsons from "../components/Simpsons/Simpsons";

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

  if (loading)
    return <div className="characters-carousel-container">Chargement...</div>;
  if (characters.length === 0)
    return (
      <div className="characters-carousel-container">Aucun personnage.</div>
    );

  // Calcul des index pour afficher 3 cartes (Précédent, Actif, Suivant)
  const prevIndex = (currentIndex - 1 + characters.length) % characters.length;
  const nextIndex = (currentIndex + 1) % characters.length;

  const leftCharacter = characters[prevIndex];
  const centerCharacter = characters[currentIndex];
  const rightCharacter = characters[nextIndex];

  return (
    <div className="characters-carousel-container">
      <div className="carousel-wrapper">
        {/* Bouton Précédent */}
        <button className="carousel-arrow" onClick={prevCharacter}>
          ◀
        </button>

        <div className="carousel-track">
          {/* 1. Carte de gauche (Simple / Latérale) */}
          <Link
            to={`/character/${leftCharacter.id}`}
            className="character-card side-card"
          >
            <img src={`/img/${leftCharacter.img}`} alt={leftCharacter.name} />
            <h3>{leftCharacter.name}</h3>
            <p className="card-sub">{leftCharacter.role}</p>
          </Link>

          {/* 2. Carte centrale (Active / Détaillée avec le grand fond jaune, sans les citations) */}
          <Link
            to={`/character/${centerCharacter.id}`}
            className="character-card active-card"
          >
            <img
              src={`/img/${centerCharacter.img}`}
              alt={centerCharacter.name}
            />
            <h3>{centerCharacter.name}</h3>
            <p className="role">
              <strong>Rôle :</strong> {centerCharacter.role}
            </p>
            <p className="description">{centerCharacter.description}</p>

            {/* Le bouton d'invitation à voir la fiche complète (où se trouvent les anecdotes) */}
            <span className="details-hint">🔍 Découvrez-moi</span>
          </Link>

          {/* 3. Carte de droite (Simple / Latérale) */}
          <Link
            to={`/character/${rightCharacter.id}`}
            className="character-card side-card"
          >
            <img src={`/img/${rightCharacter.img}`} alt={rightCharacter.name} />
            <h3>{rightCharacter.name}</h3>
            <p className="card-sub">{rightCharacter.role}</p>
          </Link>
        </div>

        {/* Bouton Suivant */}
        <button className="carousel-arrow" onClick={nextCharacter}>
          ▶
        </button>
      </div>

      <div className="carousel-indicators">
        <span>
          {currentIndex + 1} / {characters.length}
        </span>
      </div>
      <Simpsons />
      <Author />
    </div>
  );
}
