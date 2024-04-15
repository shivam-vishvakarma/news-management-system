import CategoryCard from "../components/CategoryCard";
import { useLoaderData } from "react-router-dom";
import { catogaries } from "../assets/server";

export async function loader() {
  return { catogaries };
}
export default function Category() {
    const { catogaries } = useLoaderData();
  return (
    <div className="grid grid-cols-1 overflow-auto md:grid-cols-3 dark:bg-gray-700 p-4 gap-4">
      {
        catogaries.map((catogary, index) => (
          <CategoryCard key={index} title={catogary.name} link={`${catogary.link}`}/>
        ))
      }
    </div>
  )
}