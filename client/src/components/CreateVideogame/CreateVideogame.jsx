import { Link, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loading } from "../../actions";
import "./styles/CreateVideogame.css";
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
          <button className="button">HOME</button>
        </Link>
      </div>
      <div className="container-form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="name"
            id="name"
            value={videogame.name}
            placeholder="Name..."
            onChange={(e) => onInputChange(e)}
            required
            className="input"
          />

          <textarea
            name="description"
            id="description"
            placeholder="Description..."
            onChange={(e) => onInputChange(e)}
            className="input"
            required
          ></textarea>

          <input
            type="date"
            name="release_date"
            id="release_date"
            value={videogame.release_date}
            onChange={(e) => onInputChange(e)}
            className="input"
          />

          <input
            type="number"
            name="rating"
            id="rating"
            value={videogame.rating}
            min="0"
            max="5"
            onChange={(e) => onInputChange(e)}
            className="input"
          />

          <select name="genres" id="genres" className="select">
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

          <select name="platforms" id="platforms" required className="select">
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
          <div className="container-create">
            <button type="submit" className="button">
              Crear
            </button>
          </div>
          {create && <Redirect to="/home" />}
        </form>
      </div>
    </div>
  );
}
