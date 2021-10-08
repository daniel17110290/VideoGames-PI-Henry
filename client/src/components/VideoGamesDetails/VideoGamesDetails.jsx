import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./styles/VideoGamesDetails.css";
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
          <button className="button">HOME</button>
        </Link>
      </div>

      <div className="container-details">
        <img
          src={videogame.urlImg}
          alt="Not Found"
          className="videogame-image"
        />
        <div>
          <div className="container-description">
            <h3>{videogame.name}</h3>
            <p className="videogame-description">{videogame.description}</p>
            <p>Creado en: {videogame.released}</p>
          </div>
          <div>
            <h4>Rating:</h4>
            <p>{videogame.rating}</p>
          </div>

          <div>
            <h4>Géneros:</h4>
            <div className="container-tipo-generos">
              {videogame.genres &&
                videogame.genres.map((genre) => {
                  return <p>{genre}</p>;
                })}
            </div>
          </div>

          <h4>Plataformas</h4>
          <div className="container-tipo-platforms">
            {videogame.platforms &&
              videogame.platforms.map((platform) => {
                return <p>{platform}</p>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
