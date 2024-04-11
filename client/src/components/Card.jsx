import { Link } from "react-router-dom";

export default function Card( {title=' Noteworthy technology acquisitions 2021', des=' Here are the biggest enterprise technology acquisitions of 2021 so far,in reverse chronological order.', link='/', numbersOfLines=3,}) {
  return (
    <Link
      to={link}
      className="block leading-5 w-full p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className=" text-xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
       {title}
      </h5>
      <p className={`font-normal [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden text-ellipsis text-gray-700 dark:text-gray-400 `}>
        {des}
      </p>

    </Link>
  );
}
