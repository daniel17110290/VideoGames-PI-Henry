import { useSelector } from "react-redux";
import { useEffect } from "react";
import VideoGame from "../VideoGame/VideoGame";
import { getVideogames, nextPage, prevPage } from "../../actions";
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import "./styles/VideoGames.css";
export default function VideoGames() {
  let videoGames = useSelector((state) => state.videoGames);
  let loading = useSelector((state) => state.loading);
  let error = useSelector((state) => state.error);
  let currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  function paginaSig() {
    if (currentPage < videoGames.length) {
      dispatch(nextPage());
    }
  }

  function paginaAnt() {
    if (currentPage > 0) {
      dispatch(prevPage());
    }
  }

  function paginaVideogames() {
    return videoGames.slice(currentPage, currentPage + 15);
  }

  return (
    <div className="main">
      <div>
        <button className="button" onClick={paginaAnt}>
          Prev
        </button>
        <button className="button" onClick={paginaSig}>
          Next
        </button>
      </div>
      <div className="container-loader">{!loading && <Loader />}</div>
      <div className="container-error">
        {error && <Message msg={`${error}`} bgColor="#dc3545" />}
      </div>
      <div className="container-videoGames">
        {paginaVideogames() &&
          paginaVideogames().map((videogame) => {
            return (
              <VideoGame
                name={videogame.name}
                genres={videogame.genres}
                urlImg={videogame.urlImg}
                id={videogame.id}
                rating={videogame.rating}
              />
            );
          })}
      </div>
      <div>
        <button className="button" onClick={paginaAnt}>
          Prev
        </button>
        <button className="button" onClick={paginaSig}>
          Next
        </button>
      </div>
    </div>
  );
}
