import { useLocation } from "react-router-dom";
import BaseLayout from "./baseLayout";
import ArticlesContainer from "../components/ArticlesContainer";
import { base_url } from "../assets/server";
import { useEffect, useState } from "react";

export default function Search() {
  const [searchArticles, setSearchArticles] = useState([]);
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("q");
  useEffect(()=>{
    fetch(`${base_url}/articles/search?q=${search}`)
      .then((res) => res.json())
      .then((data) => setSearchArticles(data));
  },[search])

  return (
    <BaseLayout>
      <ArticlesContainer heading={`Search results for: ${search}`} data={searchArticles} />
    </BaseLayout>
  );
}
