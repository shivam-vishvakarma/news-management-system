import ContainerWithHeading from "./ContainerWithHeading";
import ArticleCard from "./ArticleCard";

export default function ArticlesContainer({ data, heading = "Trending News" }) {
  return (
    <ContainerWithHeading heading={heading}>
      {data.map((item) => (
        <ArticleCard
          title={item.title}
          des={item.des}
          link={item.link}
          key={item.link}
        />
      ))}
    </ContainerWithHeading>
  );
}