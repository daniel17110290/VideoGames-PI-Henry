import { useSelector } from "react-redux";
import { useEffect } from "react";
import VideoGame from "../VideoGame/VideoGame";
import { getVideogames } from "../../actions";
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import "./styles/VideoGames.css";
export default function VideoGames() {
  let videoGames = useSelector((state) => state.videoGames);
  const dispatch = useDispatch();
  let loading = useSelector((state) => state.loading);
  let error = useSelector((state) => state.error);
  useEffect(() => {
    dispatch(getVideogames(loading));
  }, []);

  return (
    <div className="main">
      <div className="container-loader">{!loading && <Loader />}</div>
      <div className="container-error">
        {error && <Message msg={`${error}`} bgColor="#dc3545" />}
      </div>
      <div className="container-videoGames">
        {videoGames &&
          videoGames.map((videogame) => {
            return (
              <VideoGame
                name={videogame.name}
                genres={videogame.genres}
                urlImg={videogame.urlImg}
                id={videogame.id}
                className="container-game"
              />
            );
          })}
      </div>
    </div>
  );
}
