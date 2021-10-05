import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
export default function VideoGamesDetails() {
  let [videogame, setVideogame] = useState({});

  let { id } = useParams();
  async function getVideogame(id) {
    let videogame = await axios.get(
      `http://localhost:3001/videogames/videogame/${id}`
    );
    videogame = videogame.data;
    setVideogame(videogame);
  }
  useEffect(() => {
    getVideogame(id);
  }, []);
  console.log(videogame);
  return (
    <div>
      <div>
        <Link to="/home">
          <button>HOME</button>
        </Link>
      </div>
      <p>
        <h3>{videogame.name}</h3>
        <p>
          <span>{videogame.genres}</span>
        </p>
      </p>
      <img src={videogame.urlImg} alt="Not Found" width="200px" />
      <div>
        <p>{videogame.description}</p>
        <p>Creado en: {videogame.released}</p>
      </div>
      <div>
        <p>Rating: {videogame.rating}</p>
      </div>
      <div>
        <p>Plataformas</p>
        <p>{videogame.platforms}</p>
      </div>
    </div>
  );
}
