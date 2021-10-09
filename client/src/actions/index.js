import axios from "axios";
import {
  GET_VIDEOGAMES,
  ORDENAR_VIDEOGAMES_ALFA,
  ORDENAR_VIDEOGAMES_RATING,
  RESET,
  FILTRAR_GENEROS,
  FILTRAR_ORIGEN,
  BUSCAR_GAME,
  LOADING,
  NEXT_PAGE,
  PREV_PAGE,
} from "../constantes/actions";
import { VIDEOGAMES_URL } from "../constantesUrl";

export function getVideogames() {
  return function (dispatch) {
    return axios
      .get(VIDEOGAMES_URL)
      .then((videogames) => {
        dispatch({
          type: GET_VIDEOGAMES,
          payload: videogames.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_VIDEOGAMES,
          error: error,
        });
      });
  };
}

export function ordenarVideogamesAlfa(payload) {
  return {
    type: ORDENAR_VIDEOGAMES_ALFA,
    payload,
  };
}

export function ordenarVideogamesRating(payload) {
  return {
    type: ORDENAR_VIDEOGAMES_RATING,
    payload,
  };
}

export function resetear() {
  return {
    type: RESET,
  };
}

export function filtrarGenero(payload) {
  return {
    type: FILTRAR_GENEROS,
    payload,
  };
}

export function filtrarOrigen(payload) {
  return {
    type: FILTRAR_ORIGEN,
    payload,
  };
}

export function buscarGame(name) {
  return function (dispatch) {
    return axios
      .get(`${VIDEOGAMES_URL}?name=${name}`)
      .then((videogames) => {
        dispatch({
          type: BUSCAR_GAME,
          payload: videogames.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: BUSCAR_GAME,
          error: error,
        });
      });
  };
}

export function loading() {
  return {
    type: LOADING,
    loading: false,
  };
}

export function nextPage() {
  return {
    type: NEXT_PAGE,
  };
}

export function prevPage() {
  return {
    type: PREV_PAGE,
  };
}
