import { data } from "../assets/server";
import { useLoaderData } from "react-router-dom";
import ContainerWithHeading from "../components/ContainerWithHeading";
import Search from "../components/Search";
import TopHeadlines from "../components/TopHeadlines";
import ArticlesContainer from "../components/ArticlesContainer";

export async function loader() {
  const articles = data;
  const topHeadlines = data;
  return { articles, topHeadlines };
}

export default function Articles() {
  const { articles, topHeadlines } = useLoaderData();
  return (
    <section className=" p-4 gap-4 h-full overflow-hidden grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 dark:bg-gray-700">
      <div className="hidden overflow-y-auto lg:block col-span-3">
        <TopHeadlines data={topHeadlines} />
      </div>
      <div className="font-bold h-full overflow-y-auto col-span-4 lg:col-span-6">
        <ArticlesContainer data={articles} heading="News Articles" />
      </div>
      <div className="hidden sm:block col-span-2 lg:col-span-3 relative ">
        <ContainerWithHeading heading={"Search"}>
          <Search />
        </ContainerWithHeading>
      </div>
    </section>
  );
}
