import { useUser } from "../context/contexts";
import { base_url } from "../assets/server";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

export default function AddArticle() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      content: e.target.content.value,
      tag: e.target.category.value,
    };
    fetch(`${base_url}/articles/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data["id"]) {
          navigate(`/article/${data["id"]}`);
        } else {
          setError(data);
        }
      })
      .catch((err) => setError(err));
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user?.user.user_roll !== "publisher") {
      navigate("/");
    }
  }, []);
  return (
    <div className="w-full h-full grid p-10 overflow-auto">
      {error && <Alert message={"Some error occured "} type="error" />}
      <form
        className="w-full grid md:w-4/5 lg:w-2/5 mx-auto grid-cols-1 gap-3"
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
            id="title"
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
            id="content"
            rows="20"
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
              id="category"
              type="text"
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
  );
}
