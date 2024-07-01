import Rating from "./Ratings";

export default function Card({ obj, cardClicked }) {
  return (
    <button
      className="w-60 h-60 rounded-lg duration-300 hover:scale-105"
      onClick={() => cardClicked(obj)}
    >
      <div className="w-full h-40 overflow-hidden rounded-lg">
        <img
          src={obj.image}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="flex justify-center mt-1">
          <Rating count={obj.rating} />
        </div>
        <h1 className="text-lg font-bold">{obj.name}</h1>
        <p>{obj.cuisine}</p>
      </div>
    </button>
  );
}
