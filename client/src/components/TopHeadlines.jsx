import ContainerWithHeading from "./ContainerWithHeading";
import HeadlineCard from "./HeadlineCard";

export default function Headlines({data=[]}) {
    return (
      <ContainerWithHeading heading={"Top Headlines"}>
        {data.map((item) => (
          <HeadlineCard
            title={item.title}
            des={item.des}
            link={item.link}
            key={item.link}
          />
        ))}
      </ContainerWithHeading>
    );
}