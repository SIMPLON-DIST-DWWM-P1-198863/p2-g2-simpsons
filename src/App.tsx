import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CharacterDetails from "./pages/CharacterDetails";
import "./App.css";
import Footer from "./components/Footer";
import Author from "./components/Author";

function App() {
  return (
    <>
      <Author />
      <Footer />
    </>
  );
}

export default App;
