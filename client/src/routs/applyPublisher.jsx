import { useNavigate } from "react-router-dom";
import { useUser } from "../context/contexts";
import { useEffect, useRef, useState } from "react";
import { base_url } from "../assets/server";

export default function ApplyPublisher() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { user, setUser } = useUser();
  const [isApplied, setIsApplied] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      publisherName: e.target.publisher_name.value,
      city: e.target.city.value,
      country: e.target.country.value,
      phone: e.target.phone.value,
    };
    fetch(`${base_url}/publishers/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data["error"]) {
          setError(data["error"]);
        } else if (data["user"]) {
          setUser({ token: user.token, user: data });
          navigate("/");
        }
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    async function checkPublisher() {
      if (!user) navigate("/login");
      else if (user && user.user.user_roll === "publisher")
        navigate("/dashboard");
      else {
        const res = await fetch(`${base_url}/publishers/is_applied`, {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        });
        const data = await res.json();
        setIsApplied(data.is_applied);
        console.log(isApplied, data.is_applied);
      }
    }
    checkPublisher();
  }, []);
  return (
    <div className="w-full h-screen grid place-items-center p-10 overflow-auto">
      {isApplied ? (
        <div className="w-full h-full flex justify-center items-center flex-col gap-5">
          <h1 className="text-gray-900 dark:text-white text-3xl">
            You have already applied for publisher
          </h1>
          {user?.user?.user_roll == "publisher" ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Go to dashboard
            </button>
          ) : (
            <>
              <p className="text-gray-900 dark:text-white text-xl">
                Wait for some time
              </p>
              <button
                onClick={() => navigate("/")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go to home
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {error && <Alert message={"Some error occured "} type="error" />}
          <form
            className="w-full grid md:w-4/5 lg:w-2/5 m-auto gap-3"
            onSubmit={handleSubmit}
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="publisher_name"
                id="publisher_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="publisher_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Publisher name
              </label>
              {error && (
                <p className="text-red-500 text-sm">{error.publisher_name}</p>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="city"
                id="city"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="city"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                City
              </label>
              {error && <p className="text-red-500 text-sm">{error.city}</p>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="country"
                id="country"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="country"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Country
              </label>
              {error && <p className="text-red-500 text-sm">{error.country}</p>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                name="phone"
                id="phone"
                pattern="[0-9]{10}"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                size={10}
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone
              </label>
              {error && <p className="text-red-500 text-sm">{error.phone}</p>}
            </div>
            <button
              type="submit"
              className="text-white disabled:bg-blue-500 hover:disabled:bg-blue-500 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Apply
            </button>
          </form>
        </>
      )}
    </div>
  );
}
