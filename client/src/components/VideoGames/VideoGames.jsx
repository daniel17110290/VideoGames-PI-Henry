import { useSelector } from "react-redux";

import VideoGame from "../VideoGame/VideoGame";

import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
export default function VideoGames() {
  let videoGames = useSelector((state) => state.videoGames);

  return (
    <div>
      <Nav />
      {videoGames.map((videogame) => {
        return (
          <Link to={`/videogame/${videogame.id}`}>
            <VideoGame
              name={videogame.name}
              genres={videogame.genres}
              urlImg={videogame.urlImg}
            />
          </Link>
        );
      })}
    </div>
  );
}
