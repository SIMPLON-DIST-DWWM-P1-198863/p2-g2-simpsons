import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CharacterDetails from "./Pages/CharacterDetails";
import "./App.css";
import Author from "./components/Author";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
        </Routes>
      </BrowserRouter>
      <section>
        <Author />
      </section>
    </>
  );
}

export default App;
