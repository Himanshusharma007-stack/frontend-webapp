export default function MenuCard(props) {
  return (
    <div className="p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7 md:col-span-10 p-4">
          <h1 className="font-bold text-xl">{props.item.name}</h1>
          <h1 className="font-bold text-l">₹ {props.item.price}</h1>
          <p className="font-light">{props.item.description}</p>

          {!props.item?.quantity ? (
            <button
              className="mt-4 uppercase font-bold text-green-600	border-solid border-2 p-1 rounded-lg px-12"
              onClick={() => props.addClicked(props.item)}
            >
              Add
            </button>
          ) : (
            <div className="mt-4 font-bold text-green-600">
              <button
                className="	border-solid border-2 p-1 rounded-lg px-5"
                onClick={() => props.decreamentBtnClicked(props.item)}
              >
                -
              </button>
              <span className="mx-2"> {props.item?.quantity} </span>
              <button
                className="	border-solid border-2 p-1 rounded-lg px-5"
                onClick={() => props.increamentBtnClicked(props.item)}
              >
                +
              </button>
            </div>
          )}
        </div>
        <div className="col-span-5 md:col-span-2 flex items-center justify-center">
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
  );
}
