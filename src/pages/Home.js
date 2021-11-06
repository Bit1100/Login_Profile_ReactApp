import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();

  const handleRedirect = () => {
    navigate("login");
  };

  return (
    <div className="loader flex justify-center items-center">
      <button onClick={handleRedirect} className="btn btn-primary">
        Go to Login Page
      </button>
    </div>
  );
};

export default Home;
