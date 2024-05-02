import Tag from "./Tag";
import { base_url } from "../assets/server";
import { useUser } from "../context/contexts";

export default function TagContainer({ tags, setTags, articleId}) {
    const { user } = useUser();

    const handleDismisTag = async (tag) => {
        const res = await fetch(`${base_url}/articles/${articleId}/remove_tag/`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${user.token}`,
            },
            body: JSON.stringify({tag})
        })
        if(res.ok){
            setTags((prevTags) => prevTags.filter((t) => t !== tag))
        }
    }

    const handleAddTag = async (e) => {
        e.preventDefault();
        const tag = e.target[0].value;
        const res = await fetch(`${base_url}/articles/${articleId}/add_tag/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${user.token}`,
            },
            body: JSON.stringify({tag})
        })
        if(res.ok){
            e.target.reset();
            setTags((prevTags) => [...prevTags, tag])
        }
    }

  return (
    <div className="flex flex-wrap gap-2 bg-white dark:bg-gray-800/50 p-2 my-4 rounded-lg">
      <div className="flex w-full flex-wrap gap-2 justify-center ">
        {tags.map((tag, index) => (
          <Tag
            key={index}
            tag={tag}
            onDismiss={() => handleDismisTag(tag)}
          />
        ))}
      </div>
      <form className="flex gap-2 w-full" onSubmit={handleAddTag}>
        <input
          type="text"
          placeholder="Add a tag"
          className="block w-full p-2 outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </form>
    </div>
  );
}