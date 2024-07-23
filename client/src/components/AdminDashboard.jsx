import ArticlesContainer from "./ArticlesContainer";
import { base_url } from "../assets/server";
import { useEffect, useState, useRef } from "react";
import ContainerWithHeading from "./ContainerWithHeading";
import { useNavigate } from "react-router-dom";
import CommentContainer from "./CommentContainer";
import UserContainer from "./UserContainer";




export default function AdminDashboard({ user }) {
  const navigate = useNavigate();
  const container = useRef(null);
  const [activeTab, setActiveTab] = useState(1);
  const [articles, setArticles] = useState([{}]);
  const [users, setUsers] = useState([]);
  

  const getMyArticles = () => {
    fetch(`${base_url}/articles/publisher_articles`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${user.token}`
      }
  })
    .then((res) => res.json())
    .then((data) =>{
      setArticles(data)
    });
  }

  const getArticles = () => {
    fetch(`${base_url}/articles/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
      })
      .catch((err) => console.error(err));
  };

  const getPublishers = () => {
    fetch(`${base_url}/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.error(err));
  }


  const [comments, setComments] = useState([]);
  const getComments = () => {
    fetch(`${base_url}/comments/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (activeTab === 1) {
      getArticles();
    }
    else if(activeTab===2){
      getPublishers();}
    else if (activeTab === 5) {
      getComments();
    }
    else if (activeTab === 8) {
      getMyArticles();
    }
    
  }, [ activeTab  ]);

  return (
    <section className="px-4 py-1 pt-3 gap-4 h-full overflow-hidden grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 dark:bg-gray-700">
      <div className="hidden overflow-y-auto lg:block col-span-3">
        <ContainerWithHeading heading={"Tabs "}>
          {/* <CommentContainer comments={comments} publisher={true} /> */}
          <button
            onClick={() => setActiveTab(1)}
            className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-4 mt-2 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            All Articles
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-4 mt-2 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Publishers{" "}
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-4 mt-2 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            All Users{" "}
          </button>
          <button
            onClick={() => setActiveTab(4)}
            className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-4 mt-2 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Publisher Requests{" "}
          </button>
          <button
            onClick={() => setActiveTab(5)}
            className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-4 mt-2 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            All Comments{" "}
          </button>
          <button
            onClick={() => setActiveTab(6)}
            className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-4 mt-2 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Unapproved Publishers{" "}
          </button>
          <button
            onClick={() => setActiveTab(7)}
            className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-4 mt-2 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Blocked User{" "}
          </button>
          <button
            onClick={() => setActiveTab(8)}
            className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-4 mt-2 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {" "}
            My Article{" "}
          </button>
        </ContainerWithHeading>
      </div>
      <div
        ref={container}
        className="font-bold h-full overflow-y-auto col-span-4 lg:col-span-6"
      >
        {activeTab === 1 && (
          <ArticlesContainer
            data={articles}
            heading={"All Articles"}
            publisher={true}
          />
        )}
        {activeTab === 2 && (
          <UserContainer
          users={users}

          />
        )}
        {activeTab === 5 && (
          <CommentContainer comments={comments}  publisher={true} />
        )}
        {activeTab === 8 && (
          <ArticlesContainer
            data={articles}
            heading={"Your Articles"}
            publisher={true}
          />
        )}

      </div>
      <div className="hidden sm:block col-span-2 lg:col-span-3 relative">
        <ContainerWithHeading heading={"Actions"}>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate("/add-article")}
              className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Article
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add User
            </button>
          </div>
        </ContainerWithHeading>
      </div>
    </section>
  );
}
