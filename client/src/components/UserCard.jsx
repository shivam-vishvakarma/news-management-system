import { useRef } from "react";

export default function UserCard({ user, actions=false  }) {
  const ref=useRef()
  
    return(
        <li ref={ref} className="py-3 sm:py-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src={user?.avatar || "https://i.pravatar.cc/300"}
            alt="user image"
          />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium capitalize text-gray-900 truncate dark:text-white">
            {user?.first_name} {user?.last_name}{" "} {user?.user_role}
            
  
          </p>
          <p> {user?.username}</p>


        </div>
        {(actions) && (
          <div className="inline-flex gap-2 flex-col text-base font-semibold text-gray-900 dark:text-white">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Delete
            </button>
            
          </div>
        )}
      </div>
    </li>
  );
    
}
   



