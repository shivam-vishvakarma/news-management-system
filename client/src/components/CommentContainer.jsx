import CommentCard from "./CommentCard";

export default function CommentContainer({ comments, publisher=false }){
    return (
      <>
        {comments && (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} isPublisher={publisher} />
            ))}
          </ul>
        )}
      </>
    );
}