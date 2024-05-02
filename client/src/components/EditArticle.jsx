import { useRef, useState } from "react";
import { base_url } from "../assets/server";
import { useUser } from "../context/contexts";

export default function EditArticle({ article }) {
  const modal = useRef(null);
  const { user } = useUser();
  const [formData, setFormData] = useState({
    articleTitle: article.articleTitle,
    articleContent: article.articleContent,
    tag: article.tag,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${base_url}/articles/${article.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user.token}`,
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        modal.current.close();
        window.location.reload();
      }
    });
  };
  return (
    <>
      <button
        onClick={() => modal.current.showModal()}
        className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Edit
      </button>
      <dialog
        id="editArticle"
        ref={modal}
        onClick={() => modal.current.close()}
        className="backdrop:bg-white/10 dark:text-white dark:bg-gray-600 dark:backdrop:bg-black/10 shadow-xl backdrop:backdrop-blur-sm p-5 rounded-lg absolute w-2/5 -top-30"
      >
        <div
          className="flex flex-col gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold">Edit Article</h2>
            <button
              onClick={() => modal.current.close()}
              className="text-xl px-2 font-semibold"
            >
              X
            </button>
          </div>
          <form
            className="w-full grid mx-auto grid-cols-1 gap-3"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="articleTitle"
                value={formData.articleTitle}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title"
                required
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Content
              </label>
              <textarea
                id="articleContent"
                rows="20"
                value={formData.articleContent}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <label
                  htmlFor="tag"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Categories
                </label>
                <input
                  id="tag"
                  type="text"
                  value={formData.tag}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Article
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
