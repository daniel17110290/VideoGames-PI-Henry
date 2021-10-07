import { Link, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loading } from "../../actions";
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
  let dispatch = useDispatch();
  let [create, setCreate] = useState(false);

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
    setCreate(true);
    alert("Juego Creado!!!");
    dispatch(loading());
  }
  return (
    <div>
      <div>
        <Link to="/home">
          <button>HOME</button>
        </Link>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <p>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={videogame.name}
            placeholder="Name..."
            onChange={(e) => onInputChange(e)}
            required
          />
        </p>
        <p>
          <label htmlFor="description">Description: </label>
          <textarea
            name="description"
            id="description"
            placeholder="Description..."
            onChange={(e) => onInputChange(e)}
            required
          ></textarea>
        </p>
        <p>
          <label htmlFor="release_date">Release Date: </label>
          <input
            type="date"
            name="release_date"
            id="release_date"
            value={videogame.release_date}
            onChange={(e) => onInputChange(e)}
          />
        </p>
        <p>
          <label htmlFor="rating">Rating: </label>
          <input
            type="number"
            name="rating"
            id="rating"
            value={videogame.rating}
            min="0"
            max="5"
            onChange={(e) => onInputChange(e)}
          />
        </p>
        <p>
          <label htmlFor="genres">Genres:</label>
          <select name="genres" id="genres" multiple>
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
          <label htmlFor="platforms">Platforms:</label>
          <select name="platforms" id="platforms" multiple required>
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
        {create && <Redirect to="/home" />}
      </form>
    </div>
  );
}
