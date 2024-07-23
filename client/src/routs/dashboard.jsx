import { useUser } from "../context/contexts";
import PublisherDashboard from "../components/PublisherDashboard";
import AdminDashboard from "../components/AdminDashboard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();
  if (!user) {
    useEffect(()=>{
        navigate("/login");
    },[user])
    return (
      <div className="flex justify-center">
        <p className="text-gray-900 dark:text-white text-4xl">
          You need to be logged in to view this page
        </p>
      </div>
    );
  } else if (user?.user.user_roll === "publisher") {
    return <PublisherDashboard user={user} />;
  } else if (user?.user.user_roll === "admin") {
    return <AdminDashboard user={user} />;
  } else {
    return ( 
      <div className="flex justify-center">
        <p className="text-gray-900 dark:text-white text-4xl">
          You are not authorized to view this page
        </p>
      </div>
    );
  }
}
