import ArticlesContainer from "./ArticlesContainer";
import { base_url } from "../assets/server";
import { useEffect, useState } from "react";
import ContainerWithHeading from "./ContainerWithHeading";
import { useNavigate } from "react-router-dom";
import CommentContainer from "./CommentContainer";

export default function PublisherDashboard({ user }) {
    const [articles, setArticles] = useState([]);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        fetch(`${base_url}/articles/publisher_articles`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${user.token}`
            }
        })
          .then((res) => res.json())
          .then((data) =>{
            setArticles(data)
          });
        
          fetch(`${base_url}/comments/publisher-comments`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${user.token}`
            }
          })
            .then((res) => res.json())
            .then((data) => {
              setComments(data)
            });
    },[])
  return (
    <section className="px-4 py-1 pt-3 gap-4 h-full overflow-hidden grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 dark:bg-gray-700">
      <div className="hidden overflow-y-auto lg:block col-span-3">
        <ContainerWithHeading
          heading={"Comments & Reviews"}
        >
            <CommentContainer comments={comments} publisher={true} />
        </ContainerWithHeading>
      </div>
      <div className="font-bold h-full overflow-y-auto col-span-4 lg:col-span-6">
        <ArticlesContainer heading="Your Articles" data={articles} publisher={true}/>
      </div>
      <div className="hidden sm:block col-span-2 lg:col-span-3 relative">
        <ContainerWithHeading heading={"Actions"}>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate("/add-article")}
              className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Article
            </button>
          </div>
        </ContainerWithHeading>
      </div>
    </section>
  );
}
