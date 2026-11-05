import { Routes, Route } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer";
import Author from "./components/Author";
import Characters from "./pages/Characters";
import CharacterDetail from "./components/CharacterDetail";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
      <Author />
      <Footer />
    </>
  );
}

export default App;
