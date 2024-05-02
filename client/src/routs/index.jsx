import { base_url } from "../assets/server";
import ArticlesContainer from "../components/ArticlesContainer";
import { useEffect, useState } from "react";
import BaseLayout from "./baseLayout";

export default function Index() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch(`${base_url}/articles/trending`)
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);
  return (
    <BaseLayout>
      <ArticlesContainer data={articles} />
    </BaseLayout>
  );
}
