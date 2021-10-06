export function ordenarAlfa(type, list) {
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

export function ordenarRating(type, list) {
  list = JSON.parse(JSON.stringify(list));
  if (type === "ascendente") {
    list.sort((a, b) => {
      if (a.rating > b.rating) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (type === "descendente") {
    list.sort((a, b) => {
      if (a.rating < b.rating) {
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

export function filtrarGenero(genero, videoGames) {
  videoGames = JSON.parse(JSON.stringify(videoGames));
  videoGames = videoGames.filter((videogame) =>
    videogame.genres.includes(genero)
  );
  return videoGames;
}

export function filtrarOrigen(type, videoGames) {
  videoGames = JSON.parse(JSON.stringify(videoGames));
  if (type === "existente") {
    videoGames = videoGames.filter(
      (videogame) => !videogame.hasOwnProperty("fromDB")
    );
  } else if (type === "creado") {
    videoGames = videoGames.filter((videogame) =>
      videogame.hasOwnProperty("fromDB")
    );
  }
  return videoGames;
}
