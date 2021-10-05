import axios from "axios";
import {
  GET_VIDEOGAMES,
  ORDENAR_VIDEOGAMES,
  FILTRAR_GENEROS,
  FILTRAR_CREADOS,
  FILTRAR_EXISTENTES,
} from "../constantes/actions";
import { VIDEOGAMES_URL } from "../constantesUrl";

export function getVideogames() {
  return function (dispatch) {
    return axios.get(VIDEOGAMES_URL).then((videogames) => {
      dispatch({
        type: GET_VIDEOGAMES,
        payload: videogames.data,
      });
    });
  };
}

export function ordernarVideogames(payload) {
  return {
    type: ORDENAR_VIDEOGAMES,
    payload,
  };
}
