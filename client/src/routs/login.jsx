import { Link } from "react-router-dom";
import { useUser } from "../context/contexts";
import { base_url } from "../assets/server";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

export default function Login() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: e.target.username.value,
            password: e.target.password.value,
        };
        fetch(`${base_url}/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data["token"]) {
                    localStorage.setItem("token", JSON.stringify(data["token"]));
                    setUser(data);
                    navigate("/");
                } else {
                    setError(data);
                }
            })
            .catch((err) => setError(err));
    };

    useEffect(()=>{
        if (user) {
            navigate("/");
        }
    })
  return (
    <div className="w-full relative h-screen grid place-items-center overflow-auto p-10 md:p-0">
        {error && <Alert message={"Wrong Credentials"} type="error" error={{error,setError}}/>}
      <form className="w-full grid md:w-4/5 lg:w-2/5 m-auto gap-10" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="username"
            id="username"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="username"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            Login
        </button>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {" "}
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-700 hover:text-blue-800 font-medium text-sm text-center dark:text-blue-600 dark:hover:text-blue-700"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}