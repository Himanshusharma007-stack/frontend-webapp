import { IconButton } from "@material-tailwind/react";
import { Pencil, RotateCw } from "lucide-react";

export default function DynamicTable(props) {
  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          className="mx-5"
          onClick={props.getMenuByRestoId}
          disabled={props.isLoading}
        >
          <RotateCw
            className={props.isLoading ? "animate-spin" : ""}
            onClick={() => props.refresh()}
          />
        </button>
      </div>
      <div class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="relative">
          {/* Loading table animation */}
          {props.isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <div className="loader">Loading...</div>
            </div>
          )}
          <table class="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                {props.header.map((head) => (
                  <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      {head.title}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.items.map((item) => (
                <tr>
                  {props.header.map((head) => (
                    <td class="p-4 border-b border-blue-gray-50">
                      {head.value != "edit" ? (
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {item[head.value]}
                        </p>
                      ) : (
                        <button>
                          <Pencil
                            className="h-4"
                            onClick={() => {
                              props.editClicked(item);
                            }}
                          />
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
