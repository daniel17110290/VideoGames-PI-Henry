export default function VideoGame({ name, urlImg, genres }) {
  return (
    <div>
      <p>
        <h3>{name}</h3>
        <p>
          <span>{genres}</span>
        </p>
      </p>
      <img src={urlImg} alt="Not Found" width="200px" />
    </div>
  );
}
