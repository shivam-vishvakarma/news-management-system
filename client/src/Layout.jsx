import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useUser } from "./context/contexts";
import { base_url } from "./assets/server";

export default function Layout() {
    const {user,setUser} = useUser();
    useEffect(()=>{
        let token = JSON.parse(localStorage.getItem("token"));
        if (token){
            fetch(`${base_url}/users/me`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Token ${token}`
                }
            })
            .then(res=>res.json())
            .then(data=>{
                setUser({token:token,user:data})
            })
        }
    },[])
  return (
    <div className="h-screen grid overflow-hidden overflow-x-auto grid-rows-[max-content_1fr]">
      <Navbar />
      <Outlet />
    </div>
  );
}
