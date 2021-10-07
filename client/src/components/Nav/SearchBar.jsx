import { useState } from "react";
import { useDispatch } from "react-redux";
import { buscarGame } from "../../actions";
import "./styles/SearchBar.css";
export default function SearchBar() {
  let dispatch = useDispatch();
  let [nameVideogame, setNameVideogame] = useState({
    name: "",
  });

  function handleInput(e) {
    setNameVideogame({ name: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(buscarGame(nameVideogame.name));
    setNameVideogame({ name: "" });
  }
  return (
    <div className="container-principal">
      <form onSubmit={(e) => handleSubmit(e)} className="">
        <input
          type="text"
          name="search"
          placeholder="Buscar..."
          value={nameVideogame.name}
          onChange={(e) => handleInput(e)}
          className="input"
        />
        <button type="submit" className="button">
          Buscar
        </button>
      </form>
    </div>
  );
}
