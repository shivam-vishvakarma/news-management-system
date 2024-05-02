import ContainerWithHeading from "./ContainerWithHeading";
import ArticleCard from "./ArticleCard";
import { base_url } from "../assets/server";
import { useUser } from "../context/contexts";
import { useRef, useState } from "react";
import EditArticle from "./EditArticle";

export default function ArticlesContainer({
  data = [],
  heading = "Trending News",
  publisher = false,
}) {
  const { user } = useUser();
  const ref = useRef(null);

  const deleteArticle = (id) => {
    fetch(`${base_url}/articles/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user.token}`,
      },
    }).then((res) => {
      if (res.ok) {
        document.querySelector(`section[data-id="${id}"]`).remove();
      }
    });
  };

  return (
    <ContainerWithHeading heading={heading}>
      {data &&
        data.map((item, index) => (
          <section
            data-id={item.id}
            key={index}
            className="grid gap-2"
            ref={ref}
          >
            <ArticleCard
              title={item.articleTitle}
              des={item.articleContent}
              link={`/article/${item.id}`}
            />
            {publisher && (
              <section className="flex gap-2 relative">
                <EditArticle article={item}/>
                <button
                  className="text-white bg-red-700  hover:bg-red-800 focus:ring-1 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={() => {
                    deleteArticle(item.id);
                  }}
                >
                  Delete
                </button>
              </section>
            )}
          </section>
        ))}
    </ContainerWithHeading>
  );
}
