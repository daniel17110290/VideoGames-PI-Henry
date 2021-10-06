import { useState } from "react";
import { useDispatch } from "react-redux";
import { buscarGame } from "../../actions";

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
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="search"
          placeholder="Buscar..."
          value={nameVideogame.name}
          onChange={(e) => handleInput(e)}
        />
        <input type="submit" value="Buscar" />
      </form>
    </div>
  );
}
