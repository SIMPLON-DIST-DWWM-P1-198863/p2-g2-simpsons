import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Characters from "./components/Characters";
import CharacterDetail from "./components/CharacterDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route de la page d'accueil (le carrousel) */}
        <Route path="/" element={<Characters />} />
        
        {/* Route de la page dédiée au personnage */}
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;