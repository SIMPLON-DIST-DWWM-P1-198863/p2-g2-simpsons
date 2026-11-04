import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import CharacterDetails from "./pages/CharacterDetails";
import "./App.css";
import Footer from "./components/Footer";
import Author from "./components/Author";
import Header from "./components/header/Header";

const authorName = "Matt Abraham Groegning";
const authorBirthDate = "15 février 1954";

function App() {
  return (
    <>
      <Author />
      <Footer />
    </>
  );
}

export default App;
