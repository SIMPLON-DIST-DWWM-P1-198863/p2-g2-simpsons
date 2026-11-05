import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CharacterDetails from "./pages/CharacterDetails";
import Footer from "./components/Footer";
import Author from "./components/Author";
import Simpsons from "./components/Simpsons/Simpsons";

function App() {
  return (
    <>
      <Simpsons />
      <Author />
      <Footer />
    </>
  );
}

export default App;
