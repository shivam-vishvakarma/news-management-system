import Card from "../components/Card";
import { data } from "../assets/server";
import ContainerWithHeading from "../components/ContainerWithHeading";
import Articles from "../components/Articles";
import Search from "../components/Search";

export default function Index() {
  return (
    <section className=" p-4 gap-4 h-full overflow-hidden grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 dark:bg-gray-700">
      <div className="hidden overflow-y-scroll lg:block col-span-3">
        <ContainerWithHeading heading={"Top Headlines"}>
          {data.map((item) => (
            <Card
              title={item.title}
              des={item.des}
              link={item.link}
              key={item.link}
            />
          ))}
        </ContainerWithHeading>
      </div>
      <div className="font-bold h-full overflow-y-scroll col-span-4 lg:col-span-6">
        <ContainerWithHeading heading={"Trending News"}>
          {data.map((item) => (
            <Articles
              title={item.title}
              des={item.des}
              link={item.link}
              key={item.link}
            />
          ))}
        </ContainerWithHeading>
      </div>
      <div className="hidden sm:block col-span-2 lg:col-span-3 relative ">
        <ContainerWithHeading heading={"Search"}>
          <Search/>
        </ContainerWithHeading>
      </div>
    </section>
  );
}
