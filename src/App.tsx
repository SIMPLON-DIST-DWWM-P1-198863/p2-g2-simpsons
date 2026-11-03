import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Characters from "./components/Characters";
import CharacterDetail from "./components/CharacterDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Characters />} />
        
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;