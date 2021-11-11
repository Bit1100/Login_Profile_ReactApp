import { useContext } from "react";
import { context } from "../context";
import useInput from "../hooks/userInput";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { ImHappy } from "react-icons/im";
import { AiOutlineSend } from "react-icons/ai";
import { IconContext } from "react-icons";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    validateLoginData,
    error,
    setError,
    hasValidated,
    setHasValidated,
    redirectPopup,
  } = useContext(context);

  const { bind: bindUsername, reset: resetUsername } = useInput("");

  const { bind: bindPassword, reset: resetPassword } = useInput("");

  function resetForm() {
    resetUsername();
    resetPassword();
    setHasValidated(false);
  }

  const handleRedirect = () => {
    navigate("../profile");
    setError({ msg: "", errStatus: false, msgClass: "" });
  };

  return (
    <div className="container">
      <IconContext.Provider value={{ className: "icons" }}>
        <form
          onSubmit={(e) => {
            validateLoginData(e);
            if (hasValidated) {
              resetForm();
              handleRedirect();
              setTimeout(() => {
                redirectPopup("Redirected to Profile Page");
              }, 2000);
            }
          }}
          className="form flex flex-col items-center"
        >
          <h2 className="heading">
            Login Form <ImHappy />
          </h2>
          {error.errStatus ? (
            <p className="form-error">
              <BiErrorCircle />
              {error.msg}
            </p>
          ) : error.msgClass ? (
            <p className={`form-error ${error.msgClass}`}>
              <ImHappy />
              {error.msg}
            </p>
          ) : (
            ""
          )}
          <div className="form-item">
            <input
              name="id"
              type="hidden"
              value={new Date().getTime().toString()}
            />
          </div>
          <div className="form-item">
            <FaUserCircle />
            <input
              name="username"
              type="text"
              {...bindUsername}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-item">
            <AiFillLock />
            <input
              name="password"
              type="password"
              {...bindPassword}
              placeholder="Enter your password"
            />
          </div>
          <div className="confirmation flex justify-betweem items-center">
            <button
              type="submit"
              className={
                error.errStatus
                  ? "btn btn-secondary danger"
                  : error.msgClass
                  ? "btn btn-primary success"
                  : "btn btn-secondary"
              }
            >
              {hasValidated ? "Redirect" : "Submit"}
              <AiOutlineSend />
            </button>
          </div>
        </form>
      </IconContext.Provider>
    </div>
  );
};

export default LoginForm;
