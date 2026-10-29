
import { useEffect, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { getCharacters } from "../Services/characters";
import type { Character } from "../Types/Character";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getCharacters()
      .then(setCharacters)
      .catch(() => setError(true));
  }, []);

  const results = characters
    .filter((character) =>
      character.name.toLowerCase().includes(search.trim().toLowerCase())
    )
    .slice(0, 8);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="search"
        value={search}
        onChange={handleSearch}
        placeholder="Rechercher un personnage..."
        aria-label="Rechercher un personnage"
      />

      {error && <p>Impossible de charger les personnages.</p>}

      {search.trim() !== "" && !error && (
        <ul className="search-results">
          {results.map((character) => (
            <li key={character.id}>
              <Link
                to={`/characters/${character.id}`}
                onClick={() => setSearch("")}
              >
                {character.name}
              </Link>
            </li>
          ))}

          {results.length === 0 && (
            <li>Aucun personnage trouvé.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
