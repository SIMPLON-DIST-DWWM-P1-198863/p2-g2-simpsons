import { BrowserRouter, Routes, Route } from "react-router-dom";

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
      <Author />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
