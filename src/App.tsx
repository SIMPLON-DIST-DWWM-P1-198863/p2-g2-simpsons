import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CharacterDetails from "./Pages/CharacterDetails";
import "./App.css";
import Author from "./Components/Author";

const authorName = "Matt Abraham Groegning";
const authorBirthDate = "15 février 1954";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/characters/:id"
          element={<CharacterDetails />}
        />
      </Routes>
    </BrowserRouter>
      <section>
        <Author
          mattSrc="/MattGroening.jpg"
          name={authorName}
          birthDate={authorBirthDate}
        />
        <p>
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          molestias culpa, numquam quas odio adipisci repudiandae quidem
          voluptatibus aliquam, nobis officia totam veritatis est tenetur
          accusamus tempore, corrupti dolor velit? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quaerat ratione veritatis cumque odio
          aliquam possimus asperiores, nostrum, adipisci eaque illo, ducimus
          dignissimos deleniti quos. Fuga rerum error quisquam cumque esse!"
        </p>
      </section>
    </>
  );
}

export default App;
