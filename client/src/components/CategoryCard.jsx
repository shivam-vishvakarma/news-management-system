import { Link } from "react-router-dom";

export default function CategoryCard({ title, link }) {
  return (
    <Link
      to={link}
      className="flex h-24 md:h-32 items-center justify-center leading-5 w-full p-2 odd:bg-white even:bg-stone-100 border odd:border-gray-200 even:border-stone-200 rounded-lg shadow hover:bg-gray-100 odd:dark:bg-gray-800 even:dark:bg-slate-800/50 odd:dark:border-gray-800 even:dark:border-zinc-600 dark:hover:bg-gray-700"
    >
      <h5 className=" text-xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
        {title}
      </h5>
    </Link>
  );
}
