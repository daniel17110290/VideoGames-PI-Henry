import { Link } from "react-router-dom";
export default function Inicio() {
  return (
    <div>
      <Link to="/home">
        <button className="button">HOME</button>
      </Link>
    </div>
  );
}
