import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Author from "./components/Author/Author";
import Characters from "./pages/Characters";
import CharacterDetail from "./pages/CharacterDetail";
import Header from "./components/Header/Header";
import CharacterMindMap from "./components/characterMindMap/CharacterMindMap";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/mindmap" element={<CharacterMindMap />} />{" "}
      </Routes>
      <Author />
      <Footer />
    </>
  );
}

export default App;
