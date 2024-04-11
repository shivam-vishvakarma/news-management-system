import CategoryCard from "../components/CategoryCard"
import { catogaries } from "../assets/server"
export default function Category() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 dark:bg-gray-700 p-4 gap-4">
      {
        catogaries.map((catogary, index) => (
          <CategoryCard key={index} title={catogary.name} link={catogary.link}/>
        ))
      }
    </div>
  )
}