import { useUser } from "../context/contexts";
import { base_url } from "../assets/server";
import { useRef } from "react";
import EditComment from "./EditComment";

export default function CommentCard({ comment, isPublisher }) {
    const { user } = useUser();
    const ref = useRef(null);

    const deleteComment = async () => {
        try {
            const res = await fetch(`${base_url}/comments/${comment.id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${user.token}`,
                },
            });
            if (res.ok) {
                ref.current.remove();
            }
        } catch (error) {
            console.error("Failed to delete comment", error);
        }
    };
  return (
    <li ref={ref} className="py-3 sm:py-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src={comment.user?.avatar || "https://i.pravatar.cc/300"}
            alt="Neil image"
          />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium capitalize text-gray-900 truncate dark:text-white">
            {comment.user?.first_name} {comment.user?.last_name}{" "}
            <span className="hidden sm:inline-block">
              ({" "}
              {comment.user?.user_roll === "publisher"
                ? "Publisher"
                : comment.user?.username}{" "}
              )
            </span>
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {" "}
            {new Date(comment.commentDate).toLocaleString()}
          </p>
          <p className="font-normal lowercase first-letter:uppercase text-gray-900 dark:text-white">
            {comment.commentContent}
          </p>
        </div>
        {(user?.user.username === comment.user?.username || isPublisher) && (
          <div className="inline-flex gap-2 flex-col text-base font-semibold text-gray-900 dark:text-white">
            <button onClick={deleteComment} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Delete
            </button>
            {user?.user.username === comment.user?.username && (
              <EditComment comment={comment} />
            )}
          </div>
        )}
      </div>
    </li>
  );
}
