
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCharacters } from "../Services/characters";
import type { Character } from "../Types/Character";

function CharacterDetails() {
  const { id } = useParams<{ id: string }>();

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setCharacter(null);

    getCharacters()
      .then((characters) => {
        const found = characters.find(
          (item) => item.id === Number(id)
        );

        setCharacter(found ?? null);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Chargement du personnage...</p>;

  if (error) return <p>Erreur lors du chargement des données.</p>;

  if (!character) return <p>Personnage introuvable.</p>;

  const excluded = ["id", "name", "img", "description"];

  return (
    <main>
      <Link to="/">← Retour à l'accueil</Link>

      <h1>{character.name}</h1>

      <img
        src={`https://materiel-apprentissage.github.io/api/${character.img}`}
        alt={character.name}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      <p>{character.description}</p>

      <h2>Informations</h2>

      <ul>
        {Object.entries(character)
          .filter(([key, value]) =>
            !excluded.includes(key) && value !== undefined
          )
          .map(([key, value]) => (
            <li key={key}>
              <strong>
                {key.charAt(0).toUpperCase() + key.slice(1)} :
              </strong>{" "}
              {Array.isArray(value) ? value.join(", ") : value}
            </li>
          ))}
      </ul>
    </main>
  );
}

export default CharacterDetails;
