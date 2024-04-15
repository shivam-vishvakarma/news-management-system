import { Form } from "react-router-dom";
export default function Search() {
  return (
    <>
      <div
        onClick={() => search.showModal()}
        className=" min-h-10 bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-md flex justify-end p-1 cursor-pointer"
      >
        <button className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Search
        </button>
      </div>
      <dialog
        id="search"
        onClick={() => search.close()}
        className="backdrop:bg-white/10 dark:text-white dark:bg-gray-600 dark:backdrop:bg-black/10 shadow-xl backdrop:backdrop-blur-sm p-5 rounded-lg absolute w-2/5 -top-60"
      >
        <div
          className="flex flex-col gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold">Search</h2>
            <button
              onClick={() => search.close()}
              className="text-xl px-2 font-semibold"
            >
              X
            </button>
          </div>
          <Form method="GET" action="/search" className="flex gap-2">
            <input
              name="q"
              type="text"
              autoFocus
              className="w-full border text-lg font-normal px-2 dark:bg-gray-500 outline-none border-gray-200 dark:border-gray-800 rounded-xl shadow-sm"
            />
            <button
              type="submit"
              className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </Form>
        </div>
      </dialog>
    </>
  );
}
