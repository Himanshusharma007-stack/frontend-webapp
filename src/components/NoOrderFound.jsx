import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function NoOrderFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center px-2 md:px-0">
      <div>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
          No Orders found
        </h1>
        <p className="mt-4 text-gray-500">
          Sorry, you don't place any order yet please place any order.
        </p>
        <div className="mt-6 flex items-center space-x-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} className="mr-2" />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
