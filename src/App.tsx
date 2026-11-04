import { BrowserRouter, Routes, Route } from "react-router-dom";
/*import Home from "./pages/Home";*/
import CharacterDetails from "./pages/CharacterDetails";
import "./App.css";
import Footer from "./components/Footer";
import Author from "./components/Author";
import Characters from "./pages/Characters";
import CharacterDetail from "./components/CharacterDetail";
/*import CharacterDetail from "./components/CharacterDetail";*/

function App() {
  return (
    <>
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
