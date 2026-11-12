import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Author from "./components/Author/Author";
import Characters from "./pages/Characters";
import CharacterDetail from "./pages/CharacterDetail";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Simpsons from "./components/Simpsons/Simpsons";

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
      </Routes>

      <Footer />
    </>
  );
}

export default App;
