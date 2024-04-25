import { useEffect, useState } from "react";
import ContainerWithHeading from "./ContainerWithHeading";
import HeadlineCard from "./HeadlineCard";
import { base_url } from "../assets/server";

export default function Headlines() {
    const [topHeadlines, setTopHeadlines] = useState([]);
    useEffect(()=>{
        fetch(`${base_url}/articles/headlines`)
          .then((res) => res.json())
          .then((data) => setTopHeadlines(data));
    },[])
    return (
      <ContainerWithHeading heading={"Top Headlines"}>
        {topHeadlines.map((item) => (
          <HeadlineCard
            title={item.articleTitle}
            des={item.articleContent}
            link={`/article/${item.id}`}
            key={item.id}
          />
        ))}
      </ContainerWithHeading>
    );
}