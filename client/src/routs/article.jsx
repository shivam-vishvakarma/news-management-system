import { useLoaderData } from "react-router-dom";
import { useUser } from "../context/contexts";
import { base_url } from "../assets/server";
import CommentContainer from "../components/CommentContainer";
import { useEffect, useState } from "react";
import TagContainer from "../components/TagContainer";

export async function loader({ params }) {
  let res = await fetch(`${base_url}/articles/${params.Id}`);
  const article = await res.json();
  res = await fetch(`${base_url}/articles/${params.Id}/comments`);
  const commentsList = await res.json();
  return { article, commentsList };
}

export default function Article() {
  const { user } = useUser();
  const { article, commentsList } = useLoaderData();
  const [comments, setComments] = useState(commentsList);
  const [tags, setTags] = useState([]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const res = await fetch(`${base_url}/articles/${article.id}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user.token}`,
      },
      body: JSON.stringify({ commentContent: comment}),
    });
    if (res.ok) {
      e.target.reset();
      const newComment = await res.json();
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  };

  useEffect(()=>{
    setTags(article.tag.split(" "))
  },[article.tag])
  return (
    <article className="px-4 gap-4 h-full dark:text-white overflow-hidden grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 dark:bg-gray-700">
      <div className="hidden overflow-y-auto sm:block lg:col-span-3"></div>
      <section className="font-bold h-full overflow-y-auto col-span-4 lg:col-span-6 bg-white dark:bg-gray-800/50 p-4">
        <h1 className="text-3xl md:text-5xl capitalize">
          {article.articleTitle}
        </h1>
        <address className="flex items-center border
        -y-2 border-white dark:border-gray-900 my-4 p-4 shadow font-extralight">
          <div className="flex-shrink-0">
            <img
              className="w-8 h-8 rounded-full"
              src={article.publisher?.avatar || "https://i.pravatar.cc/300"}
              alt="Neil image"
            />
          </div>
          <div className="ms-4">
            <h3 className="text-lg">{article.publisher?.publisherName}</h3>
            <h6>{new Date(article.articleDate).toLocaleString()}</h6>
          </div>
        </address>
        <p className="text-xl font-light md:text-2xl mx-2 mb-4">
          {article.articleContent}
        </p>
        <div className="p-[.7px] bg-white dark:bg-gray-900"></div>
        <section className="m-7">
          <h3 className="text-lg font-normal">Comments -</h3>
          {user && (
            <form
              className="flex flex-col gap-4 my-4 w-3/4"
              onSubmit={handleCommentSubmit}
            >
              <textarea
                name="comment"
                id="comment"
                cols="30"
                rows="3"
                required
                placeholder="Write your comment here..."
                className="h-10 md:h-20 bg-gray-50 outline-none p-2 font-normal dark:bg-gray-700"
              ></textarea>
              <input
                type="submit"
                value="Post Comment"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              />
            </form>
          )}
          <CommentContainer comments={comments} article={article} />
        </section>
      </section>
      {user?.user.user_roll === "publisher" && (
        <div className="hidden md:block lg:col-span-3">
          <TagContainer tags={tags} setTags={setTags} articleId={article.id} />
        </div>
      )}
    </article>
  );
}