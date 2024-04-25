import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/contexts";
import { base_url } from "../assets/server";

export default function Logout() {
    const { setUser } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${base_url}/users/logout/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
            },
            body: JSON.stringify({}),
        }).then((res) =>{
            if (res.status === 200) {
                localStorage.removeItem("token");
                setUser(null);
                navigate("/");
                return res.json();
            } else {
                console.error("Some error occured");
            }
        });
    }, []);
    return <div className="w-full h-screen grid place-items-center overflow-auto p-10 md:p-0"></div>;
}