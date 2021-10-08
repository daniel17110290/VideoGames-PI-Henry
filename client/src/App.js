import "./App.css";
import { Route } from "react-router-dom";
import VideoGames from "./components/VideoGames/VideoGames.jsx";
import Inicio from "./components/Inicio/Inicio.jsx";
import VideoGamesDetails from "./components/VideoGamesDetails/VideoGamesDetails";
import Nav from "./components/Nav/Nav.jsx";
import CreateVideogame from "./components/CreateVideogame/CreateVideogame";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Inicio className="inicio" />
      </Route>
      <Route exact path="/home">
        <Nav />
        <VideoGames />
      </Route>
      <Route path="/videogame/:id">
        <VideoGamesDetails />
      </Route>
      <Route path="/create">
        <CreateVideogame />
      </Route>
    </div>
  );
}

export default App;
