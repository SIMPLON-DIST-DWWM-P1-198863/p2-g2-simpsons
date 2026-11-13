import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";

import Characters from "./pages/Characters";
import CharacterDetail from "./pages/CharacterDetail";
import Header from "./components/Header/Header";
import CharacterMindMap from "./components/characterMindMap/CharacterMindMap";
import Banner from "./components/Banner/Banner";
import ScrollToHash from "./components/ScrollToHash";

function App() {
  return (
    <>
      <ScrollToHash />
      <Header />
      <Banner />

      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/mindmap" element={<CharacterMindMap />} />{" "}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
