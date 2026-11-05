import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Author from "./components/Author/Author";
import Characters from "./pages/Characters";
import CharacterDetail from "./pages/CharacterDetail";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
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
