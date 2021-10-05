import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { createDispatchHook, useDispatch, useSelector } from "react-redux";
import { ordernarVideogames } from "../../actions";
import { useEffect, useState } from "react";
export default function Nav() {
  let videoGames = useSelector((state) => state.videoGames);

  let dispatch = useDispatch();
  function order(e) {
    e.preventDefault();
    dispatch(ordernarVideogames(e.target.value, videoGames));
  }
  return (
    <div>
      <div>
        <Link to="/create">
          <button>Create Video Game</button>
        </Link>
      </div>
      <p>Ordenamiento</p>

      <label>Alfabetico</label>
      <div>
        <input
          type="radio"
          name="ordenamiento"
          id="ascendente"
          value="ascendente"
          onClick={(e) =>
            dispatch(ordernarVideogames(e.target.value, videoGames))
          }
        />
        <label for="ascendente">Ascendente</label>
      </div>
      <div>
        <input
          type="radio"
          name="ordenamiento"
          id="descendente"
          value="descendente"
          onClick={(e) =>
            dispatch(ordernarVideogames(e.target.value, videoGames))
          }
        />
        <label for="descendente">Descendente</label>
      </div>

      <label>Rating</label>
      <select name="rating">
        <option value="">Ordenar</option>
        <option value="ascendente">1-5</option>
        <option value="descendente">5-1</option>
      </select>

      <div>
        <p>Filtrado</p>

        <label>Género</label>
        <select name="genero">
          <option value="todos">Todos</option>
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
        <label>Orígen</label>
        <select name="origen">
          <option value="todos">Todos</option>
          <option value="existente">Existente</option>
          <option value="creado">Creado</option>
        </select>
      </div>

      <SearchBar />
    </div>
  );
}
