export default function MenuCard(props) {
    return (
        <div className="p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-10 p-4">
          <h1 className="font-bold text-xl">{props.item.name}</h1>
          <h1 className="font-bold text-l">₹ {props.item.price}</h1>
          <p className="font-light">{props.item.description}</p>
          <button className="uppercase font-bold text-green-600	border-solid border-2 p-1 rounded-lg px-8">
            Add
          </button>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          {props.item.imageUrl ? (
            <img
              src={props.item.imageUrl}
              alt={props.item.name}
              className="h-32 w-auto object-cover rounded-lg"
            />
          ) : (
            <div className="h-32 w-32 flex items-center justify-center bg-gray-300 text-gray-500">
              No Image
            </div>
          )}
        </div>
      </div>
    </div>
    )
}