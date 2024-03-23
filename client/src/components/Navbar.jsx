import { NavLink } from "react-router-dom";

const navClass =  ({isActive})=> isActive ? "block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500" : "block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"

export default function Navbar() {
  return (
    <header className="top-0 sticky ">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink
            to="/"
            className="flex items-center space-x-3 "
          >
            {/* hme baad me sunny ki photo add karni hai kyu ki hm charo ki to hai  nhi ek sath ki photo agar pragati de deti hai usaka lga denge  */}
            {/* <img
              src="https://flowbite.com/images/flowbite-logo.svg"
              className="h-8"
              alt="Newsy Logo"
            /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Newsy
            </span>
          </NavLink>
          <div className="flex md:order-2 gap-2 space-x-3 md:space-x-0 ">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
            <button
              type="button"
              className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Signup
            </button>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8  md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className={navClass}
                  
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/category"
                  className={navClass}
                >
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/articles"
                  className={navClass}
                >
                  Articles
                </NavLink>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
