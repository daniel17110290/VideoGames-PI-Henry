import {
  GET_VIDEOGAMES,
  ORDENAR_VIDEOGAMES,
  FILTRAR_GENEROS,
  FILTRAR_CREADOS,
  FILTRAR_EXISTENTES,
} from "../constantes/actions";

let intialStore = {
  videoGames: [],
};

function ordenar(type, list) {
  list = JSON.parse(JSON.stringify(list));
  if (type === "ascendente") {
    list.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (type === "descendente") {
    list.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      } else if (a.name > b.name) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  return list;
}

export default function rootReducer(state = intialStore, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videoGames: action.payload,
      };
    case ORDENAR_VIDEOGAMES:
      return {
        ...state,
        videoGames: ordenar(action.payload, state.videoGames),
      };

    default:
      return state;
  }
}
