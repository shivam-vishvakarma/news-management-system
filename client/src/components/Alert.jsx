import { Link } from "react-router-dom";

export default function Alert({
  message,
  type = "info",
  link = { to: "", text: "" },
  error = { error: null, setError: null },
}) {
  const variant = {
    success: "bg-green-50 dark:bg-green-800 dark:text-green-400",
    error: "bg-red-50 dark:bg-red-800 dark:text-red-400",
    warning: "bg-yellow-50 dark:bg-yellow-800 dark:text-yellow-400",
    info: "bg-blue-50 dark:bg-blue-800 dark:text-blue-400",
  };
  return (
    <div
      id="infoAlert"
    //   ref={alert}
      className={`flex absolute top-10 items-center p-4 mb-4 rounded-lg w-full sm:w-4/5 lg:w-3/5 ${variant[type]}`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="ms-3 text-sm font-medium">
        {message}
        {link.to && (
          <Link
            to={link.to}
            className="font-semibold underline hover:no-underline"
          >
            {link.text}
          </Link>
        )}
      </div>
      <button
        type="button"
        className={`ms-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 ${variant[
          type
        ].replace("bg", "text")}`}
        onClick={() => {
          error.setError(null);
        }}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}
