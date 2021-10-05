import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateVideogame() {
  let [videogame, setVideogame] = useState({
    name: "",
    description: "",
    release_date: "",
    rating: 0,
    genres: [],
    platforms: [],
  });
  let [genres, setGenres] = useState([]);

  let [platforms, setPlatforms] = useState([]);

  function addPlatform(e) {
    setVideogame({
      ...videogame,
      platforms: [...videogame.platforms, e.target.value],
    });
  }
  function onInputChange(e) {
    setVideogame((videogame) => {
      return {
        ...videogame,
        [e.target.name]: e.target.value,
      };
    });
  }
  async function getGenres() {
    let genres = await axios.get("http://localhost:3001/genres");
    genres = genres.data;
    setGenres(genres);
  }
  useEffect(() => {
    getGenres();
  }, []);

  function agregarGenero(id) {
    setVideogame({
      ...videogame,
      genres: [...videogame.genres, id],
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post("http://localhost:3001/videogames/videogame/", videogame);
    alert("Juego Creado!!!");
  }
  console.log(videogame);
  return (
    <div>
      <div>
        <Link to="/home">
          <button>HOME</button>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <p>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={videogame.name}
            placeholder="Name..."
            onChange={onInputChange}
          />
        </p>
        <p>
          <label>Description: </label>
          <textarea
            name="description"
            placeholder="Description..."
            onChange={onInputChange}
          ></textarea>
        </p>
        <p>
          <label>Release Date: </label>
          <input
            type="date"
            name="release_date"
            value={videogame.release_date}
            onChange={onInputChange}
          />
        </p>
        <p>
          <label>Rating: </label>
          <input
            type="number"
            name="rating"
            value={videogame.rating}
            min="0"
            max="5"
            onChange={onInputChange}
          />
        </p>
        <p>
          <label htmlFor="">Genres:</label>
          <select name="genres" multiple>
            {genres.map((genre) => {
              return (
                <option
                  name={genre.name}
                  onClick={() => agregarGenero(genre.id)}
                >
                  {genre.name}
                </option>
              );
            })}
          </select>
        </p>
        <p>
          <label htmlFor="">Platforms:</label>
          <select name="platforms" multiple>
            <option value="PC" onClick={(e) => addPlatform(e)}>
              PC
            </option>
            <option value="Play Station 5" onClick={(e) => addPlatform(e)}>
              Play Station 5
            </option>
            <option value="Play Station 4" onClick={(e) => addPlatform(e)}>
              Play Station 4
            </option>
            <option value="Xbox One" onClick={(e) => addPlatform(e)}>
              Xbox One
            </option>
            <option value="Xbox Series S/X" onClick={(e) => addPlatform(e)}>
              Xbox Series S/X
            </option>
            <option value="Nintendo Switch" onClick={(e) => addPlatform(e)}>
              Nintendo Switch
            </option>
            <option value="iOS" onClick={(e) => addPlatform(e)}>
              iOS
            </option>
            <option value="Android" onClick={(e) => addPlatform(e)}>
              Android
            </option>
          </select>
        </p>
        <input type="submit" value="Crear" />
      </form>
    </div>
  );
}
