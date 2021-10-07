import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ordenarVideogamesAlfa,
  ordenarVideogamesRating,
  resetear,
  filtrarGenero,
  filtrarOrigen,
} from "../../actions";
import "./styles/Nav.css";
export default function Nav() {
  let dispatch = useDispatch();

  function reiniciar() {
    dispatch(resetear());
  }

  function filtrarPorGenero(genero) {
    reiniciar();
    dispatch(filtrarGenero(genero));
  }
  function filtrarPorOrigen(origen) {
    reiniciar();
    dispatch(filtrarOrigen(origen));
  }
  function ordenarAlfa(tipo) {
    reiniciar();
    dispatch(ordenarVideogamesAlfa(tipo));
  }
  function ordenarRating(tipo) {
    reiniciar();
    dispatch(ordenarVideogamesRating(tipo));
  }
  return (
    <div className="container-nav">
      <div>
        <button onClick={reiniciar} className="button">
          RESET
        </button>

        <Link to="/create">
          <button className="button">Create Video Game</button>
        </Link>
      </div>

      <div className="container-select">
        <div>
          <select
            name="ordenamiento alfabetico"
            onClick={(e) => ordenarAlfa(e.target.value)}
          >
            <option value="todos">Ordenar por Alfabeto</option>
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
          </select>
        </div>
        <div>
          <select
            name="ordenamiento rating"
            onClick={(e) => ordenarRating(e.target.value)}
          >
            <option value="todos">Ordenar por Rating</option>
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
          </select>
        </div>
        <div>
          <select
            name="genero"
            onClick={(e) => {
              if (e.target.value === "todos") {
                reiniciar();
              } else {
                filtrarPorGenero(e.target.value);
              }
            }}
          >
            <option value="todos">Filtrar por Género</option>
            <option value="Action">Acción</option>
            <option value="Indie">Indie</option>
            <option value="Adventure">Aventura</option>
            <option value="RPG">RPG</option>
            <option value="Strategy">Estrategia</option>
            <option value="Shooter">Shooter</option>
            <option value="Casual">Casual</option>
            <option value="Simulation">Simulación</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Arcade">Arcade</option>
            <option value="Platformer">Juego de Plataformas</option>
            <option value="Racing">Carreras</option>
            <option value="Massively Multiplayer">Multijugador Masivo</option>
            <option value="Sports">Deportes</option>
            <option value="Fighting">Peleas</option>
            <option value="Family">Familia</option>
            <option value="Board Games">Juegos de Mesa</option>
            <option value="Educational">Educativo</option>
            <option value="Card">Tarjetas</option>
          </select>
        </div>
        <div>
          <select
            name="origen"
            onClick={(e) => {
              if (e.target.value === "todos") {
                reiniciar();
              } else {
                filtrarPorOrigen(e.target.value);
              }
            }}
          >
            <option value="todos">Filtrar por Orígen</option>
            <option value="existente">Existente</option>
            <option value="creado">Creado</option>
          </select>
        </div>
      </div>
      <div className="container-searchBar">
        <SearchBar />
      </div>
    </div>
  );
}
