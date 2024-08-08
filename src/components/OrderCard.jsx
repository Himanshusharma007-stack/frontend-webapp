export default function OrderCard(props) {
  return (
    <div className="mt-3 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
      <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
        <div className="p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
            {[
              ["Order ID", props?.rawData?.orderId || ""],
              ["Date", props?.rawData?.createdAt],
              ["Total Amount", "₹" + props?.rawData?.amount || 0],
              ["Status", props?.orderStatus || ""],
            ].map(([key, value]) => (
              <div key={key} className="mb-4">
                <div className="text-sm font-semibold">{key}</div>
                <div
                  className={`${
                    value == "Preparing"
                      ? "text-green-400"
                      : value == "Ready"
                      ? "text-red-400"
                      : value == "Delivered"
                      ? "text-blue-400"
                      : ""
                  } text-sm font-medium text-gray-700 truncate`}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="p-8">
          <ul className="-my-7 divide-y divide-gray-200">
            {props.items.map((item) => (
              <li
                key={item._id}
                className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
              >
                <div className="flex flex-1 items-stretch">
                  <div className="flex-shrink-0">
                    {item.imageUrl ? (
                      <img
                        className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                        src={item.imageUrl}
                        alt={item.imageUrl}
                      />
                    ) : (
                      <div className="h-20 w-20 flex items-center justify-center bg-gray-300 text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="ml-5 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900">
                        {item.name} from - {item?.restaurant?.name}
                      </p>
                      <p className="mt-1.5 text-sm font-medium text-gray-500">
                        {item.description}
                      </p>
                    </div>

                    <p className="mt-4 text-sm font-medium text-gray-500">
                      x {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="ml-auto flex flex-col items-end justify-between">
                  <p className="text-right text-sm font-bold text-gray-900">
                    ₹{item.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
