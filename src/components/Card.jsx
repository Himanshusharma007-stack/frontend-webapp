import Rating from "./Ratings";

export default function Card({obj}) {
  return (
    <div className="w-60 h-60 rounded-lg">
      <img src={obj.image} className="object-cover rounded-lg" />
      <div>
        <div className="flex justify-center">
          <Rating count={obj.rating} />
        </div>
        <h1 className="text-lg font-bold">{obj.name}</h1>
        <p>{obj.cuisine}</p>
      </div>
    </div>
  );
}
