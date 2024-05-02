import { useLoaderData } from "react-router-dom";
import ArticlesContainer from "../components/ArticlesContainer";
import BaseLayout from "./baseLayout";
import { base_url } from "../assets/server";

export async function loader({ params }) {
  const category = params.category;
  const res = await fetch(`${base_url}/categories/${category}`);
    const data = await res.json();
  return { category, data };
}

export default function CategoryPage() {
    const { category, data } = useLoaderData();
  return (
    <BaseLayout>
      <ArticlesContainer heading={`${category.replace("_", " " )} News`} data={data} />
    </BaseLayout>
  );
}