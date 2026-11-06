import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const closeAboutMenu = () => {
    setIsAboutOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo gauche */}
        <Link to="/" className="header-logo">
          <img src="/public/homer.png" alt="Logo Homer" />
        </Link>

        {/* Logo central */}
        <Link to="/" className="header-title">
          <img src="/public/theSimpsons.png" alt="Les Simpson" />
        </Link>

        {/* Navigation */}
        <nav className="header-nav">
          <Link to="/#personnages">Personnages</Link>

          <div className="about-menu">
            <button
              type="button"
              className={`about-button ${isAboutOpen ? "active" : ""}`}
              aria-expanded={isAboutOpen}
              onClick={() => setIsAboutOpen(!isAboutOpen)}>
              About <span className="about-arrow">⌄</span>
            </button>

            <div className={`about-dropdown ${isAboutOpen ? "open" : ""}`}>
              <Link to="/#matt-groening" onClick={closeAboutMenu}>
                Matt Groening
              </Link>

              <Link to="/#simpsons" onClick={closeAboutMenu}>
                Les Simpson
              </Link>
            </div>
          </div>
        </nav>

        {/* Barre de recherche */}
        <div className="header-search">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

export default Header;
