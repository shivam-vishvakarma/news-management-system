import CommentCard from "./CommentCard";
import { Link } from "react-router-dom";

export default function CommentContainer({ comments, publisher=false }){
    return (
      <>
        {comments && (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {comments.map((comment) => {
              if (publisher) {
                return (
                  <Link to ={`/article/${comment.articalId}`} >
                    <CommentCard key={comment.id} comment={comment} isPublisher={publisher} />
                 </Link>
                );
              }
              return <CommentCard key={comment.id} comment={comment} isPublisher={publisher} />;
            })}
          </ul>
        )}
      </>
    );
}