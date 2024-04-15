import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const category = params.category;
  return { category };
}

export default function CategoryPage() {
    const { category } = useLoaderData();
  return (
    <div>
      <h1>CategoryPage of {category}</h1>
    </div>
  );
}