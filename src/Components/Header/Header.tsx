
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">

        <Link to="/" className="header-logo">
          <img src="/homer.png" alt="Logo des Simpson" className="header-logo-image" />
        </Link>

        <nav className="header-nav">
          <Link to="/">Accueil</Link>
          <Link to="/characters">Personnages</Link>
          <Link to="/episodes">Épisodes</Link>
          <Link to="/about">À propos</Link>
        </nav>

        <div className="header-search">
          <SearchBar />
        </div>

      </div>
    </header>
  );
}

export default Header;
