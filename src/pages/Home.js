import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { context } from "../context";

const Home = () => {
  const { redirectPopup } = useContext(context);
  const navigate = useNavigate();

  const handleRedirect = () => {
    redirectPopup("Redirecting to Login Page");
    setTimeout(() => {
      navigate("login");
    }, 4000);
  };

  return (
    <div className="loader flex justify-center items-center">
      <button onClick={handleRedirect} className="btn btn-primary">
        Login Here <AiOutlineLogin />
      </button>
    </div>
  );
};

export default Home;
