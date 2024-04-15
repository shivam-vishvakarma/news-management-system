import { data } from "../assets/server";
import { useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
  const article = await data[params.Id-1];
  if (!article) {
    throw new Response("", { status: 404, statusText: "Not Found" });
  }
  return { article };
}

export default function Article() {
    const { article } = useLoaderData();
  return (
    <article className="w-full grid md:w-4/5 lg:w-3/5 m-auto bg-red-400">
      <h1>{article.title}</h1>
      <p>{article.des}</p>
    </article>
  );
}
