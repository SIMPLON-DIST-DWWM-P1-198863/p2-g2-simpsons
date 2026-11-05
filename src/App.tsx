import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Author from "./components/Author";
import Characters from "./pages/Characters";
import CharacterDetail from "./components/CharacterDetail";

function App() {
  return (
    <>
      <Author />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
