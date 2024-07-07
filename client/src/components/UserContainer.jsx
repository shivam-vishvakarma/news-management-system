import UserCard from "./UserCard";
export default function UserContainer({users=[], isPublisher=false}){
    
    return(
        <>
        {users && (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => {
              
                return <UserCard key={user.id} user={user} isPublisher={isPublisher} />;
            })}
          </ul>
        )}
      </>
    )
}
