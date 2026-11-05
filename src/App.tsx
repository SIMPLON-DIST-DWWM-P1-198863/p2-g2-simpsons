import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CharacterDetails from "./pages/CharacterDetails";

import Author from "./components/Author";
import Header from "./components/header/Header";

import "./App.css";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
      </Routes>

      <section>
        <Author />
      </section>
    </>
  );
}

export default App;
