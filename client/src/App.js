import "./App.css";
import { Route } from "react-router-dom";

import VideoGames from "./components/VideoGames/VideoGames.jsx";
import Inicio from "./components/Inicio/Inicio.jsx";
import VideoGamesDetails from "./components/VideoGamesDetails/VideoGamesDetails";

import CreateVideogame from "./components/CreateVideogame/CreateVideogame";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getVideogames } from "./actions/index";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogames());
  }, []);
  return (
    <div className="App">
      <Route exact path="/">
        <Inicio />
      </Route>

      <Route exact path="/home">
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
