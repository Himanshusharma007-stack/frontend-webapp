import Card from "../components/Card";

export default function Homepage() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl">Book your food</h1>
        <p className="uppercase">Save your time and save your money</p>

        <div className="text-center mt-3">
          <div className="flex justify-center items-center space-x-2">
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="Enter Cafe name or location"
            ></input>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
