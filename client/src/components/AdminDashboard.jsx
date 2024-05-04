import {useUser} from "../context/contexts";
import { useNavigate } from "react-router-dom"

export default function AdminDashboard() {
    const { user } = useUser();
    const navigate = useNavigate();
    if (!user) {
        navigate('/login')
    }
    if (user && user.user.user_roll !== 'admin') {
        navigate('/')
    }
    window.location.href = 'http://localhost:8000/admin'
  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
}
