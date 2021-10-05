import { Link } from "react-router-dom";
export default function Inicio() {
  return (
    <div>
      <Link to="/home">
        <button>HOME</button>
      </Link>
    </div>
  );
}
