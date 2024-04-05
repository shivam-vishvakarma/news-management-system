import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
export default function Layout() {
  return (
    <div className="h-screen grid">
      <Navbar />
      <Outlet />
    </div>
  );
}
