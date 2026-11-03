import { useEffect, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { getCharacters } from "../Services/characters";
import type { Character } from "../Types/Character";
import "./SearchBar.css";

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

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">
          🔍
        </span>

        <input
          className="search-input"
          type="search"
          value={search}
          onChange={handleSearch}
          placeholder="Rechercher un personnage..."
          aria-label="Rechercher un personnage"
          autoComplete="off"
        />

        {search !== "" && (
          <button
            className="search-clear"
            type="button"
            onClick={clearSearch}
            aria-label="Effacer la recherche"
          >
            ✕
          </button>
        )}
      </div>

      {error && (
        <p className="search-error">
          Impossible de charger les personnages.
        </p>
      )}

      {search.trim() !== "" && !error && (
        <ul className="search-results">
          {results.map((character) => (
            <li key={character.id}>
              <Link
                to={`/characters/${character.id}`}
                onClick={clearSearch}
              >
                <span className="result-icon" aria-hidden="true">
                  👤
                </span>
                {character.name}
              </Link>
            </li>
          ))}

          {results.length === 0 && (
            <li className="no-results">
              Aucun personnage trouvé 😕
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
