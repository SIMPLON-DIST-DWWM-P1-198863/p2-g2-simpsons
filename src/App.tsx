import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";

import Characters from "./pages/Characters";
import CharacterDetail from "./pages/CharacterDetail";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Banner />

      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
