import TopHeadlines from '../components/TopHeadlines';
import ContainerWithHeading from '../components/ContainerWithHeading';
import Search from '../components/Search';

export default function BaseLayout({ children }) {
  return (
    <section className="p-4 gap-4 h-full overflow-hidden grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 dark:bg-gray-700">
      <div className="hidden overflow-y-auto lg:block col-span-3">
        <TopHeadlines />
      </div>
      <div className="font-bold h-full overflow-y-auto col-span-4 lg:col-span-6">
        {children}
      </div>
      <div className="hidden sm:block col-span-2 lg:col-span-3 relative ">
        <ContainerWithHeading heading={"Search"}>
          <Search />
        </ContainerWithHeading>
      </div>
    </section>
  );
}
