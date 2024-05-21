import { useRouteError } from "react-router-dom";

// export default function ErrorPage() {
//   const error = useRouteError();
//   console.error(error);

//   return (
//     <div id="error-page">
//       <h1>Oops!</h1>
//       <p>Sorry, an unexpected error has occurred.</p>
//       <p>
//         <i>{error.statusText || error.message}</i>
//       </p>
//     </div>
//   );
// }

import { ArrowLeft } from "lucide-react";
import React from "react";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="py-10">
      <div className="text-center">
        <p className="text-base font-semibold text-black">
          {error.status}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl">
          {error.statusText || error.message}
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">{error.data}</p>
        {/* <div className="mt-4 flex items-center justify-center gap-x-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <ArrowLeft size={16} className="mr-2" />
            Go back
          </button>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Contact us
          </button>
        </div> */}
      </div>
    </div>
  );
}
