import { data } from "../assets/server";
import ContainerWithHeading from "../components/ContainerWithHeading";
import Search from "../components/Search";
import { useLoaderData } from 'react-router-dom';
import TopHeadlines from "../components/TopHeadlines";
import ArticlesContainer from "../components/ArticlesContainer";

export async function loader() {
  const topHeadlines = data;
  const articles = data;
  return { topHeadlines, articles };
}

export default function Index() {
    const { topHeadlines, articles }= useLoaderData();
  return (
    <section className=" px-4 py-1 pt-3 gap-4 h-full overflow-hidden grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 dark:bg-gray-700">
      <div className="hidden overflow-y-auto lg:block col-span-3">
        <TopHeadlines data={ topHeadlines }/>
      </div>
      <div className="font-bold h-full overflow-y-auto col-span-4 lg:col-span-6">
        <ArticlesContainer data={articles} />
      </div>
      <div className="hidden sm:block col-span-2 lg:col-span-3 relative ">
        <ContainerWithHeading heading={"Search"}>
          <Search/>
        </ContainerWithHeading>
      </div>
    </section>
  );
}
