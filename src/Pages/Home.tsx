
import { Link } from "react-router-dom";
import SearchBar from "../Components/SearchBar";

function Home() {
  return (
    <main>
      <h1>Les Simpson</h1>
      <p>Retrouve les habitants de Springfield !</p>

      <SearchBar />

      <h2>Explorer les personnages</h2>
      <p>Utilise la barre de recherche pour trouver une fiche.</p>

      <Link to="/characters/1">Découvrir Homer Simpson</Link>
    </main>
  );
}

export default Home;
