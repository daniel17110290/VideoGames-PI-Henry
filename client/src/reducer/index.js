import {
  GET_VIDEOGAMES,
  ORDENAR_VIDEOGAMES_ALFA,
  ORDENAR_VIDEOGAMES_RATING,
  RESET,
  FILTRAR_GENEROS,
  FILTRAR_ORIGEN,
  BUSCAR_GAME,
  LOADING,
} from "../constantes/actions";
import {
  ordenarAlfa,
  ordenarRating,
  filtrarGenero,
  filtrarOrigen,
} from "../utils/index";
let intialStore = {
  videoGames: [],
  reset: [],
  loading: false,
  error: "",
};

export default function rootReducer(state = intialStore, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videoGames: action.payload,
        reset: action.payload,
        loading: true,
        error: action.error,
      };
    case ORDENAR_VIDEOGAMES_ALFA:
      return {
        ...state,
        videoGames: ordenarAlfa(action.payload, state.videoGames),
      };
    case ORDENAR_VIDEOGAMES_RATING:
      return {
        ...state,
        videoGames: ordenarRating(action.payload, state.videoGames),
      };
    case RESET:
      return {
        ...state,
        videoGames: state.reset,
      };
    case FILTRAR_GENEROS:
      return {
        ...state,
        videoGames: filtrarGenero(action.payload, state.videoGames),
      };
    case FILTRAR_ORIGEN:
      return {
        ...state,
        videoGames: filtrarOrigen(action.payload, state.videoGames),
      };
    case BUSCAR_GAME:
      return {
        ...state,
        videoGames: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    default:
      return state;
  }
}
