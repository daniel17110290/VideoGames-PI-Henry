import "./styles/VideoGame.css";

import { Link } from "react-router-dom";
export default function VideoGame({ name, urlImg, genres, id, rating }) {
  return (
    <div className="container-main">
      <div className="container-info">
        <Link to={`/videogame/${id}`}>
          <img src={urlImg} alt="Not Found" />
        </Link>
        <div className="container-text">
          <h3>{name}</h3>
          <div className="container-genres">
            {genres.map((genre) => {
              return <p>{genre}</p>;
            })}
          </div>
          <div>
            <h4>Rating: {rating}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
